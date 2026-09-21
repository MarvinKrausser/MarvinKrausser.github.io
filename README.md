# Marvin Kraußer – Portfolio

Personal portfolio website of Marvin Kraußer, Media Informatics student (B.Sc.) at Ulm University and working student in software engineering at Siemens Mobility.

**Live:** https://marvinkrausser.github.io

The site is built with plain HTML, CSS and JavaScript. It has no framework, no build step and no runtime dependencies.

## Highlights

- **Content-driven:** all texts, projects, career entries and tags live in language-specific JSON files (`lang/en.json`, `lang/de.json`). The page is generated from them at load time, so adding a project or a job means editing JSON, not markup.
- **Bilingual (EN / DE):** the language is picked from a cookie, falling back to the browser language, and can be switched at any time. Dates are formatted per locale with `Intl.DateTimeFormat`.
- **Light / dark theme:** the choice is persisted in a cookie.
- **Responsive:** a fixed sidebar on desktop and a slide-in navigation on small screens and touch devices.
- **Navigation:** a scroll spy highlights the section currently in view, and the scroll position is restored after a reload or language switch.
- **Lightweight:** lazy-loaded images, no external libraries, no tracking.

## Featured projects

| Project | Stack | Repository |
| --- | --- | --- |
| CNN Website – bird classification and real-time face detection, served from a containerised backend | React, PyTorch, NGINX, Caddy, Docker Compose | [CNN_Website](https://github.com/MarvinKrausser/CNN_Website) |
| PixelCNN Generator – autoregressive image generation with a seminar paper | Python, PyTorch, CUDA, LaTeX | [pixelcnn](https://github.com/MarvinKrausser/pixelcnn) |
| Online Multiplayer Board Game – server, Unity client and AI players, built with five other students using Scrum | C#, .NET, Unity, Docker | [BoardgameServer](https://github.com/MarvinKrausser/BoardgameServer) |
| Tower Defense Game – single-player game with level editor and A\* pathfinding | C#, Unity | [TowerDefenseGame](https://github.com/MarvinKrausser/TowerDefenseGame) |

## How it works

`index.html` contains only the static shell: sidebar, mobile navigation and empty containers. On load, `scripts/main.js` picks the language, fetches `lang/<lang>.json` and `config/img_config.json`, and renders everything else.

The JavaScript is split into small ES modules, each with one responsibility:

```
scripts/
  main.js               entry point: wires up the controls, loads data, renders
  core/
    cookies.js          cookie helpers
    dom.js              small element-creation helper
    dates.js            locale-aware date formatting
    data.js             loading of language and image config files
  ui/
    theme.js            light / dark toggle
    language.js         language detection and dropdown
    navbar.js           sidebar and mobile navigation
    scroll.js           scroll restoration and scroll spy
  sections/
    common.js           shared section skeleton (header, tags)
    sidebar.js          status lines under the name
    introduction.js
    work.js             career entries
    projects.js         project entries with image / text blocks
```

The stylesheets are organised the same way. `styles/main.css` imports the individual files in cascade order:

```
styles/
  main.css              entry point, imports everything below
  base/
    variables.css       colours, fonts and sizes as CSS custom properties (light and dark)
    base.css            resets and typography
    utilities.css       helper classes
  layout/
    sidebar.css         fixed desktop sidebar
    navbar.css          desktop navigation links
    mobile_bar.css      slide-in mobile navigation
    main_content.css    page margins and breakpoints
  components/
    theme_switch.css    light / dark toggle
    lang_dropdown.css   language picker
    mobile_menu_button.css
    tags.css
    text_link.css
  sections/
    introduction.css
    section_header.css  shared header of work and project sections
    project_blocks.css  image / text blocks
    work.css            career entries
```

Colours, spacing and fonts are CSS custom properties, and dark mode is a single class that overrides them.

## Project structure

```
.
├── index.html          static shell
├── lang/               en.json, de.json – all page content
├── config/             img_config.json – image ids, paths and crop positions
├── scripts/            ES modules (see above)
├── styles/             stylesheets (see above)
├── images/, images_jpg/  screenshots and diagrams for the projects
├── pdfs/               seminar paper, talk slides, user and developer handbooks
├── Dockerfile          NGINX image serving the site
├── compose.yaml        Compose service definition
└── nginx.conf
```

## Run locally

The page loads its content with `fetch` and uses ES modules, so it has to be served over HTTP. Opening `index.html` directly from disk does not work.

```bash
git clone https://github.com/MarvinKrausser/MarvinKrausser.github.io.git
cd MarvinKrausser.github.io
python3 -m http.server 8000
```

Then open http://localhost:8000.

### With Docker

```bash
docker build -t portfolio_website .
docker run --rm -p 8081:8081 portfolio_website
```

The site is then available at http://localhost:8081. `compose.yaml` runs the same image as a service on an external Docker network (`cnn_network`), so it can sit behind a reverse proxy next to the other projects.

## Adding content

1. **Project:** add an entry to `content_projects` in both `lang/en.json` and `lang/de.json`. Each block references an image id from `config/img_config.json`. Use `--link--` inside a block's text to place an inline link from its `links` list.
2. **Career entry:** add an entry to `content_work` with its role, dates, tasks and tech tags.

The sidebar and mobile navigation entries are generated automatically.

## Development notes

- The repository follows a feature-branch workflow, so `main` stays deployable.
- No build tooling is involved, so a change to a file is visible on the next reload.
