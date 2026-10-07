# SITE_NAME — Editorial Publication

A sophisticated, responsive static editorial blog template designed for academic assignments. The site is built with clean HTML, CSS, and vanilla JavaScript — no frameworks, no build process, and no external dependencies.

## Project Structure

```
/
├── index.html          # Main article page (contains the featured article)
├── about.html          # About page with project/author information
├── sources.html        # Bibliography / references page
├── css/
│   └── style.css       # Complete design system and styles
├── js/
│   └── script.js       # Interactive behaviors (scroll, menu, animations)
├── images/
│   └── README.md       # Image guidelines and conventions
└── README.md           # This file
```

## Design System

### Color Palette
- **Background**: Warm off-white (`#FAF8F5`)
- **Surface**: Pure white (`#FFFFFF`)
- **Text Primary**: Dark charcoal (`#1A1A1A`)
- **Text Secondary**: Medium gray (`#4A4A4A`)
- **Accent**: Earth-tone terracotta (`#C4623D`)

### Typography
- **Serif Display**: Playfair Display (headings)
- **Sans-serif UI**: Inter (body, navigation, metadata)
- Fluid typography using `clamp()` for responsive scaling

### CSS Custom Properties
All design tokens are defined as CSS variables in `:root`, making customization straightforward.

## Customization Guide

### Replacing Content

| Element | Location | Placeholder |
|---------|----------|-------------|
| Site name | All pages | `SITE_NAME` |
| Article title | `index.html` hero | `ARTICLE_TITLE` |
| Article subtitle | `index.html` hero | `ARTICLE_SUBTITLE` |
| Author | `index.html` meta, `about.html` | `AUTHOR_NAME` |
| Publication date | `index.html` meta | `PUBLICATION_DATE` |
| Category/eyebrow | All pages | `CATEGORY_LABEL` |
| Section titles | `index.html` | `SECTION_TITLE` |
| Section numbers | `index.html` | `01`, `02`, `03`, etc. |
| Source titles | `index.html`, `sources.html` | `SOURCE_TITLE` |

### Replacing Images

1. Place your image files in the `images/` directory.
2. In `index.html`, replace the `.hero-image-placeholder` div with:
   ```html
   <img src="images/hero.jpg" alt="Descriptive alt text">
   ```
3. Replace `.figure__wrapper--placeholder` divs with:
   ```html
   <div class="figure__wrapper">
     <img src="images/figure-01.jpg" alt="Descriptive alt text" class="figure__img">
   </div>
   ```

## Features

- **Responsive layout**: Adapts from large desktop monitors to mobile phones
- **Sticky header**: Subtle shadow on scroll
- **Reading progress indicator**: Top-bar showing scroll progress
- **Back-to-top button**: Appears after scrolling down
- **Section reveal animations**: Elements fade in as they enter viewport
- **Mobile navigation**: Hamburger menu with slide-down animation
- **Pull quotes**: Distinctive styling for key statements
- **Accessible**: Semantic HTML, keyboard navigation, reduced motion support
- **Print styles**: Optimized for printing

## Deployment

This is a static website that works on any static hosting platform:

- **GitHub Pages**: Push to a `gh-pages` branch or serve from root
- **Cloudflare Pages**: Direct drag-and-drop or Git integration
- **Netlify**: Direct drag-and-drop or Git integration

All paths are relative — no configuration needed for subdirectory deployment.

## Development

This project uses no build tools. Simply open `index.html` in your browser after making changes.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Gracefully degrades on older browsers
- `prefers-reduced-motion` media query respected

## License

This is an academic assignment project. Replace this section with your own licensing information if needed.