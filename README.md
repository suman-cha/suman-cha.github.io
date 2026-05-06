# Suman Cha — Personal Site

Academic-minimal portfolio site. White / navy / blue palette, Serif headlines (Fraunces) + Sans body (Inter), light/dark theme toggle, top-nav layout. Built with [Astro](https://astro.build) and deployed to GitHub Pages.

```
Home  →  intro + selected research + selected projects
Research  →  papers grouped by year, with PDF / arXiv / Code / BibTeX
Projects  →  card grid with title + tagline + period
```

---

## Run locally

```bash
cd /Users/sumancha/Claude-Workspace/outputs/blog
npm install         # only the first time
npm run dev         # starts http://localhost:4321
npm run build       # type-check + production build into dist/
npm run preview     # preview the built dist/
```

Node 18+ required (project tested on 25.x).

---

## Add a new paper

Create one Markdown file in `src/content/research/` per paper. The filename becomes the entry id; only the frontmatter is required (body is optional and currently unused).

```yaml
---
title: "Your paper title"
authors: "A. Author, B. Coauthor"
venue: "NeurIPS 2026"        # journal, conference, or "Preprint"
year: 2026
pdf: "https://..."           # optional
arxiv: "https://arxiv.org/abs/..."  # optional
code: "https://github.com/..."      # optional
featured: true                # show on Home (top 3)
order: 0                      # tiebreaker within the same year (smaller = first)
bibtex: |
  @article{key2026title,
    title  = {...},
    author = {...},
    year   = {2026}
  }
---

Optional body in markdown.
```

Papers are auto-grouped by year on `/research`. Featured ones appear in the Home → "Selected Research" column (max 3).

---

## Add a new project

Create one Markdown file in `src/content/projects/`:

```yaml
---
title: "Project name"
tagline: "One-line description, ~80–120 chars."
period: "2025 — 2026"
featured: true     # show on Home (top 3)
order: 0           # smaller = appears first
---

Optional body.
```

---

## Customize the profile

Open `src/pages/index.astro` and edit:

- `<h1 class="hero-title">` — your name / line break
- `.hero-bio` paragraph — short bio
- `.hero-affil` — affiliation line

Profile photo: replace the `.photo-placeholder` block in `src/pages/index.astro` with an `<img src="/me.jpg" />` and put `me.jpg` in `public/`.

Social links: edit `src/components/SocialLinks.astro`. Each entry has `label`, `href`, `icon`. Set `href: "#"` to keep a placeholder visible without linking out.

Brand monogram (top-left "SC"): change in `src/components/Header.astro` (`.brand-mark` text).

Favicon: `public/favicon.svg`.

---

## Customize the look

Design tokens live in `src/styles/global.css`:

- `--color-bg`, `--color-text`, `--color-accent` for light theme
- `[data-theme="dark"]` block for dark theme
- `--font-serif`, `--font-sans`, `--font-mono` for typography
- `--content-width`, `--content-width-wide` for layout widths

The whole site re-skins from these variables.

### Default theme

Open `src/layouts/BaseLayout.astro` → bootstrap script. By default the site picks the user's OS preference; to force light or dark, replace the `theme = ...` line with `'light'` or `'dark'`.

---

## Deploy to GitHub Pages

The repo is configured for **`suman-cha.github.io`** (user-pages style — root URL, no `base` path).

1. Create a new repo named **`suman-cha.github.io`** under your GitHub account (`suman-cha`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "init: portfolio site"
   git branch -M main
   git remote add origin https://github.com/suman-cha/suman-cha.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source = GitHub Actions**.
4. The workflow `.github/workflows/deploy.yml` will run automatically on every push to `main` and publish to `https://suman-cha.github.io`.

If you instead want a project page (e.g. `suman-cha.github.io/blog`), set in `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://suman-cha.github.io',
  base: '/blog',
});
```

---

## Project layout

```
.
├── astro.config.mjs           # site URL + build options
├── src/
│   ├── content.config.ts      # collection schemas (research, projects)
│   ├── content/
│   │   ├── research/          # one .md per paper
│   │   └── projects/          # one .md per project
│   ├── layouts/BaseLayout.astro
│   ├── components/
│   │   ├── Header.astro       # top nav
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro  # light/dark switch
│   │   ├── SocialLinks.astro
│   │   ├── PaperCard.astro
│   │   └── ProjectCard.astro
│   ├── pages/
│   │   ├── index.astro        # Home
│   │   ├── research.astro     # Research listing
│   │   └── projects.astro     # Projects listing
│   └── styles/global.css      # design tokens + reset
├── public/
│   └── favicon.svg
└── .github/workflows/deploy.yml
```
