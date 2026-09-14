# Zed — Design Portfolio

Static portfolio site for Zed, a graphic designer. One-page home with hero, work preview, services, about, and contact sections, plus a `work.html` gallery and `case.html` case-study page.

## Pages

- `index.html` — homepage
- `work.html` — project gallery with category filter
- `case.html` — case-study view (reads a `?type=` query param)
- `index.php` — small success/error fragment for a PHP contact form (not used by the static pages)

## Deploy

Push the folder and enable GitHub Pages. No build step needed (HTML, CSS, JS, and images are all local). `index.php` is ignored by Pages.

## Assets

- Images referenced relatively from the repo root (`brand identity (2).jpeg`, `website ui (2).jpeg`, `social media design.jpeg`, plus `F1.jpg`, `20241107_190929.jpg`).
- `style.css` and `script.js` loaded from the repo root.