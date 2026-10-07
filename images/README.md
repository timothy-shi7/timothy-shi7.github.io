# Images Directory

Place all article and site images in this directory.

## Image Guidelines

### Hero Images
- Aspect ratio: 16:9 (landscape)
- Minimum width: 1200px
- File format: PNG or JPEG
- File name: `hero.jpg` or `hero.png`
- Replace the placeholder in `index.html` hero section

### Article Images
- Aspect ratio: 4:3 (recommended)
- Minimum width: 800px
- Use descriptive file names (e.g., `figure-01.jpg`, `figure-02.jpg`)
- Add captions and attribution in the article markup

### Image Components
The site uses two image placeholder patterns:

1. **Hero Image Placeholder**: Full-width, 16:9 aspect ratio
   - Located in the hero section of `index.html`
   - Replace the `.hero-image-placeholder` div with an `<img>` tag

2. **Figure Image Placeholder**: Responsive, with caption support
   - Used in article body sections
   - Supports `.figure--left` and `.figure--right` positioning
   - Replace `.figure__wrapper--placeholder` divs with actual `<img>` tags inside `.figure__wrapper`

## Accessibility
- Always include descriptive `alt` attributes
- Add `aria-describedby` for images with captions
- Ensure sufficient color contrast with overlays