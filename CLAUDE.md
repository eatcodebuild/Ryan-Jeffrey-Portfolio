# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # node index.js  → http://localhost:3000
npm run dev      # nodemon index.js (nodemon is NOT in package.json — install it globally)
```

There are no tests, linter, or build step. `npm test` is the default placeholder and exits 1.

Required `.env` (gitignored): `EMAIL_USER`, `EMAIL_PASS` (Gmail SMTP app password), `ADMIN_USER`, `ADMIN_PASS`. `PORT` optional. `MONGO_URI` is referenced only in commented-out code.

## Architecture

Express 4 server (`index.js`) serving a static portfolio site. No frontend framework, no bundler, no database connection — Bootstrap 5.3 and particles.js come from CDN, everything else is hand-written HTML/CSS/vanilla JS in `public/`.

**Two different page-rendering paths.** `routes/pages.js` `sendFile`s plain HTML from `public/` for `/`, `/about`, `/contact`, `/projects`, `/blog`. Only two pages use EJS (`public/views/`): `blogPost.ejs` (`/blog/:id`) and `login.ejs`. Note `public/` is also the static root, so views sit inside the static directory. When adding a page, follow the static-HTML path unless it needs server data.

**Content is JSON files, not a database.** `JSON/projects.json` and `JSON/blogs.json` are read from disk per request by `routes/projects.js` and `routes/blogs.js` and exposed at `GET /get/projects` and `GET /get/blogs`. `public/script.js` fetches those endpoints and builds the DOM client-side. Editing content means editing those JSON files — no admin write path exists.

`models/blog.js` and `models/project.js` are Mongoose schemas that nothing imports; the `mongoose.connect` block in `index.js` is commented out. Their field shapes have **drifted** from the live JSON (model: `description_para_1/2`, `articleA/B/C`; JSON: `description[]`, `techStack[]`, `articleParagraphs[]`, `id`). Trust the JSON files, not the models.

**`public/script.js` is loaded on every page** and dispatches on `window.location.pathname` inside `DOMContentLoaded` (`/projects` → `loadProjects`, `/blog` → `displayBlogs`, `/blog/*` → `renderArticles`). Top-level code in that file (nav darkening, `particlesJS(...)` init) runs everywhere, so any page missing `#particles-js` still executes the init.

**Blog article bodies bypass EJS.** `blogPost.ejs` serialises paragraphs into a `data-articles` attribute on `#articleContainer`; `renderArticles()` parses it and appends `<p>` elements client-side.

### Local development gotcha

`public/script.js` line 1 hardcodes `const URL = "https://www.ryancjeffrey.com"` and all client fetches use it. A local server will still pull production data until you swap it for the commented-out `http://localhost:3000` line — and remember to swap it back before committing.

### Adding a project

Append to `JSON/projects.json` with `title`, `description` (array of paragraphs), `project_link`, `github_link`, `img`, `has_repo`, `techStack`. Layout alternates left/right by array index. Each `techStack` string becomes a CSS class via `t.replace(".js","").toLowerCase()`, so a new technology needs matching `.techBadge.<name>` colour and `.techBadge.<name>::before` icon rules in `public/styles.css` (~line 1167 onward) or the badge renders bare.

### Adding a blog post

Append to `JSON/blogs.json` with a unique numeric `id` (`/blog/:id` does `parseInt`), `title`, `datePosted`, `img`, `articleParagraphs`.

### Auth / admin

Session-based (`express-session`, in-memory store). `POST /login` compares plaintext against `ADMIN_USER`/`ADMIN_PASS`; `GET /admin` checks `req.session.isAuthenticated` then `sendFile`s `public/admin.html`. The session secret is hardcoded in `index.js` and `cookie.secure` is `false`. `admin.html` is a static mockup — its buttons have no handlers and no CRUD endpoints exist.

### Home page intro

`public/stars.js` (loaded only by `index.html`) runs a one-time starfield intro gated on `sessionStorage.getItem("introPlayed")`, then reveals `#homeContent` and attaches the `scroll-up`/`scroll-left`/`scroll-right` reveal classes that `checkScroll()` in `script.js` activates.

### Shared page boilerplate is duplicated

Every HTML file and EJS view repeats its own `<head>` (gtag `G-TJS2EK17MV`, Google Fonts `@import`, Bootstrap CDN with SRI, particles.js CDN), navbar and footer. There is no layout/partial system — changes to any of these must be applied file by file, and new pages also need an entry in `public/sitemap.xml`.

## Deployment

Vercel (`vercel.json`): `@vercel/node` build of `index.js` with all routes rewritten to it. Live at https://www.ryancjeffrey.com. Work happens on `dev`; `main` is the PR target.
