/**
 * Editorial Blog - Main Script
 * Provides subtle microinteractions and responsive behavior
 * Vanilla JavaScript, no dependencies
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // DOM Elements cache
  const elements = {
    siteHeader: document.getElementById('siteHeader'),
    readingProgress: document.getElementById('readingProgress'),
    backToTop: document.getElementById('backToTop'),
    menuToggle: document.querySelector('.menu-toggle'),
    mobileMenu: document.getElementById('mobileMenu'),
    navLinks: document.querySelectorAll('.nav-link'),
    animatedElements: document.querySelectorAll('[data-animate]')
  };

  // State
  let isMenuOpen = false;
  let ticking = false;
  let backToTopTimeout = null;

  /**
   * Initialize all interactions
   */
  function init() {
    // Always initialize reveal animations (with reduced motion support)
    initRevealAnimations();

    // Only initialize non-scroll interactions if user hasn't requested reduced motion
    if (!prefersReducedMotion.matches) {
      initScrollBehavior();
      initReadingProgress();
      initBackToTop();
    } else {
      // For reduced motion: immediately show elements and hide scrolling effects
      elements.animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;
        if (isInViewport) {
          el.classList.add('is-visible');
        }
      });
    }

    // Always initialize these (accessibility)
    initMobileMenu();
    initSmoothScroll();
    initNavLinkHighlight();
  }

  /**
   * Smooth scroll for in-page anchors
   */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        if (!targetId) return;

        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Header scroll behavior - subtle shadow on scroll
   */
  function initScrollBehavior() {
    let lastScrollY = window.scrollY;

    const handleScroll = function() {
      const scrollY = window.scrollY;

      if (elements.siteHeader) {
        if (scrollY > 10) {
          elements.siteHeader.classList.add('scrolled');
        } else {
          elements.siteHeader.classList.remove('scrolled');
        }
      }

      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Reading progress indicator (top bar)
   */
  function initReadingProgress() {
    if (!elements.readingProgress) return;

    const updateProgress = function() {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;

      elements.readingProgress.style.width = Math.min(scrolled, 100) + '%';
    };

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Initial calculation
    updateProgress();
  }

  /**
   * Back to top button
   */
  function initBackToTop() {
    if (!elements.backToTop) return;

    const toggleVisibility = function() {
      const scrollTop = window.scrollY;

      if (scrollTop > 400) {
        elements.backToTop.classList.add('back-to-top--visible');
      } else {
        elements.backToTop.classList.remove('back-to-top--visible');
      }
    };

    window.addEventListener('scroll', function() {
      if (backToTopTimeout) {
        clearTimeout(backToTopTimeout);
      }
      backToTopTimeout = setTimeout(toggleVisibility, 100);
    });

    // Click handler
    elements.backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Mobile menu toggle
   */
  function initMobileMenu() {
    if (!elements.menuToggle || !elements.mobileMenu) return;

    elements.menuToggle.addEventListener('click', function() {
      isMenuOpen = !isMenuOpen;

      elements.menuToggle.setAttribute('aria-expanded', isMenuOpen);

      if (isMenuOpen) {
        elements.mobileMenu.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      } else {
        elements.mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (isMenuOpen && !elements.menuToggle.contains(e.target) && !elements.mobileMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close menu on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
      }
    });

    // Close menu when clicking a link
    const mobileLinks = elements.mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function closeMobileMenu() {
    isMenuOpen = false;
    elements.menuToggle.setAttribute('aria-expanded', 'false');
    elements.mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /**
   * Section reveal animations using IntersectionObserver
   */
  function initRevealAnimations() {
    if (!elements.animatedElements.length) return;

    // First, check which elements are already in the viewport
    elements.animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isInViewport = rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;

      if (isInViewport) {
        el.classList.add('is-visible');
      }
    });

    // Then set up the observer for remaining elements
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.animatedElements.forEach(el => {
      // Only observe if not already revealed
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });
  }

  /**
   * Navigation link highlighting based on current page
   */
  function initNavLinkHighlight() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    elements.navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();