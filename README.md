<h1 align="center">Mozilla Firefox Club — VIT Bhopal</h1>

<p align="center">
  The official website of the Mozilla Firefox Club at VIT Bhopal University.<br/>
  A motion-driven single page built with React, TypeScript, Vite and Tailwind CSS.
</p>

<p align="center">
  <a href="#-about">About</a> ·
  <a href="#-whats-on-the-page">What's on the page</a> ·
  <a href="#-getting-started">Getting started</a> ·
  <a href="#-editing-content">Editing content</a> ·
  <a href="#-deployment">Deployment</a> ·
  <a href="#-contributing">Contributing</a>
</p>

---

## About

The Mozilla Firefox Club is a student community at VIT Bhopal: coders, designers, writers and storytellers who learn together, build things that matter and host events across campus.

This repo is the club's website. It's built to feel like a piece of motion design rather than a template.

## What's on the page

| Section | What it does |
| --- | --- |
| **Intro** | Film-reel loader: frames flash inside a window, which morphs into a circle around the Nightly logo and opens onto the site |
| **Hero** | "Mozilla Firefox Club" reveals letter by letter |
| **About** | The manifesto lights up word by word as you scroll |
| **Events** | Hover a row and a tilted preview card follows your cursor |
| **Marquee** | A word strip that reacts to scroll speed and direction |
| **Team** | Core leads; click one to expand their team |
| **Contact** | Email, socials and address |
| **Footer** | The Nightly logo rotates and scales with scroll and tilts toward the cursor |

Plus smooth scrolling, a custom blend-mode cursor and a hidden scrollbar. These switch off automatically on touch devices and when the user prefers reduced motion.

## Tech stack

- **React 18** + **TypeScript** (strict)
- **Vite 6** for the dev server and bundling
- **Tailwind CSS v4** via `@tailwindcss/vite`, with theme tokens in `src/index.css`
- **No animation libraries**: all motion runs on one shared `requestAnimationFrame` loop in `src/motion.ts`
- **GitHub Actions** for CI, **Cloudflare Pages** for hosting

## Getting started

Requires **Node.js 20+**.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run typecheck` | Run the TypeScript check |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the production build locally |

## Project structure

```
src/
├── App.tsx            # Page layout + feature flags
├── data.ts            # All site content (typed)
├── motion.ts          # Shared animation loop, smooth scroll, mouse state
├── index.css          # Tailwind import, theme tokens, base styles
├── main.tsx
└── components/        # Loader, Cursor, Header, Hero, About, Events,
                       # Marquee, Team, Contact, Footer
```

## Deployment

The site is a static build hosted on **Cloudflare Pages**.
| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | `NODE_VERSION = 20` (environment variable) |

Every push to `main` goes live. Every pull request gets its own preview link, so you can see the change before it's merged.

## Contributing

1. Create a branch: `git checkout -b feat/your-change`
2. Make your change and run `npm run build` locally
3. Open a pull request

CI (`.github/workflows/ci.yml`) runs on every pull request and push to `main`. It type-checks, builds, smoke-tests the dev and preview servers, and uploads `dist/` as an artifact. A PR needs every step green.

---

<p align="center">
  Built and maintained by the Technical team of the Mozilla Firefox Club 
</p>
