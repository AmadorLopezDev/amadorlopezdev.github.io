# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog/portfolio site for Amador López Parra built with Astro 5 and Tailwind CSS. The site uses a chalkboard visual theme (dark background with chalk-white text and "Schoolbell" handwriting font). Content is primarily in Spanish.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
```

## Architecture

**Framework**: Astro 5 with Tailwind CSS integration

**Content Structure**:
- Blog posts are Markdown files in `src/pages/blog/*.md`
- Posts use frontmatter with: `title`, `description`, `date`, `layout`, `tags`, `image`
- Posts are sorted by date (newest first) via `src/utils/posts.js`
- Pagination handled in `src/pages/blog/page/[page].astro`

**Layout System**:
- Single main layout at `src/layouts/Layout.astro` - all pages use this
- Layout includes Header, Footer, ConsentBanner components and Google Analytics/GTM setup
- Blog posts specify layout in frontmatter: `layout: ../../layouts/Layout.astro`

**Key Directories**:
- `src/components/` - Reusable Astro components (Header, Footer, BlogCard, ConsentBanner)
- `src/pages/` - File-based routing (blog/, content/, legal/)
- `public/img/` - Blog images and static assets
- `public/utils/` - Client-side JS (menu.js, loadMore.js)

**Styling**:
- Tailwind configured with custom chalkboard theme colors (`chalk`, `board`, `board-dark`)
- Custom `chalkboard` font family using Schoolbell
- Global styles in `src/styles/global.css`

**RSS**: Generated via `src/pages/rss.xml.js` using @astrojs/rss
