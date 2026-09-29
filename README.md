# Absent Narratives

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://milesclawson.github.io/absent-narratives-textbook/)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

*Absent Narratives: A Comprehensive Study of Marginalized Voices in History* — an AI-assisted intelligent textbook for an 18-week high school social studies elective.

## View the Live Site

Visit the interactive textbook at: **[milesclawson.github.io/absent-narratives-textbook](https://milesclawson.github.io/absent-narratives-textbook/)**

> Not yet deployed to GitHub Pages — see [Deploy to GitHub Pages](#deploy-to-github-pages) below.

## Overview

This is an interactive, AI-generated intelligent textbook examining how race, ethnicity, nationality, gender, and sexuality have shaped the untold and marginalized narratives of history. Built for grades 10–12 as an 18-week Minnesota social studies elective, it asks students to question, investigate, interpret, and reflect on the stories of those whose experiences have been overlooked or intentionally obscured — building cultural literacy and critical historical-thinking skills along the way.

Built using MkDocs with the Material theme, the book incorporates a 200-concept learning graph, 14 fully developed chapters with per-chapter quizzes and curated references, an ISO 11179-compliant glossary, a 114-question FAQ, and 29 interactive MicroSims spanning p5.js simulations, Leaflet maps, vis-network concept explorers, vis-timeline chronologies, Mermaid diagrams, and a Chart.js data comparator. All content follows the 2001 revision of Bloom's Taxonomy for learning outcomes and is sequenced using concept dependency graphs to ensure proper prerequisite ordering.

Whether you're a student encountering this history for the first time or an educator looking for structured, discussion-ready course materials, this textbook provides comprehensive coverage with hands-on interactive elements that make difficult historical material accessible without minimizing it.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 200 |
| Chapters | 14 |
| MicroSims | 29 (28 content sims + 1 learning-graph viewer) |
| Diagrams | 28 |
| Total Words | 105,147 |
| Equivalent Printed Pages | ~442 |
| Glossary Terms | 200 |
| FAQ Questions | 114 |
| Quiz Questions | 140 (10 per chapter) |
| Curated References | 140 (10 per chapter) |
| Mascot Poses | 7 (placeholder art — see [Mascot](#learning-mascot-sage-the-raven)) |

**Development Stage:** Beta — content complete; mascot artwork and analytics pending.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/milesclawson/absent-narratives-textbook.git
cd absent-narratives-textbook
```

### Installation — Install Dependencies

This project uses a Python virtual environment (system Python is externally managed):

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install mkdocs mkdocs-material
```

### Build and Serve Locally

```bash
source .venv/bin/activate
mkdocs build --strict
mkdocs serve
```

Open your browser to `http://127.0.0.1:8000`.

### Deploy to GitHub Pages

```bash
source .venv/bin/activate
mkdocs gh-deploy
```

This builds the site and pushes it to the `gh-pages` branch.

### Usage — Using the Book

**Navigation:**

- Use the left sidebar to browse chapters, the learning graph, MicroSims, glossary, and FAQ
- Click the search icon to search all content
- Each chapter includes a quiz and an annotated reference list
- Green dots in the nav mark pages that are content-complete and reviewed

**Interactive MicroSims:**

- Found under the "MicroSims" section, and embedded inline within relevant chapters
- Each simulation runs standalone in your browser via its `main.html`
- Explore maps, timelines, causal chains, and comparison tools with clicks, sliders, and dropdowns

**Customization:**

- Edit markdown files in `docs/chapters/` to modify chapter content
- Modify `mkdocs.yml` to change site structure or navigation
- Add new MicroSims in `docs/sims/` (see `CONTENT-GENERATION-GUIDE.md` for the mascot voice/placement rules used across the book)

## Learning Mascot: Sage the Raven

The book uses a pedagogical mascot, **Sage the Raven**, styled after the book's own theme: ravens are associated across cultures with memory and carrying messages between what is hidden and what is known — fitting for a course about uncovering absent narratives. See [`docs/img/mascot/character-sheet.md`](./docs/img/mascot/character-sheet.md) for the full character design and [`docs/img/mascot/image-prompts.md`](./docs/img/mascot/image-prompts.md) for the AI image prompts used to generate each pose.

The seven pose images currently in the repository are simple placeholder graphics generated programmatically so the site builds cleanly; replacing them with real illustrations (via the prompts above) is an open task.

## Repository Structure

```text
absent-narratives-textbook/
├── docs/                          # MkDocs documentation source
│   ├── chapters/                  # 14 chapters
│   │   ├── 01-foundations-of-historical-inquiry/
│   │   │   ├── index.md          # Chapter content
│   │   │   ├── quiz.md           # 10-question chapter quiz
│   │   │   └── references.md     # 10 curated references
│   │   └── ...
│   ├── sims/                      # 29 interactive MicroSims
│   │   ├── sentencing-outcome-comparator/
│   │   │   ├── main.html         # Standalone simulation
│   │   │   ├── *.js              # MicroSim logic
│   │   │   └── index.md          # Documentation + lesson plan
│   │   └── ...
│   ├── learning-graph/             # Learning graph data, quality reports, book metrics
│   │   ├── learning-graph.json    # 200 concepts, 308 dependency edges
│   │   ├── book-metrics.md        # This README's source-of-truth statistics
│   │   └── ...
│   ├── img/mascot/                 # Sage the Raven: character sheet, prompts, pose art
│   ├── css/                        # extra.css, mascot.css
│   ├── glossary.md                 # 200 ISO 11179-compliant definitions
│   └── faq.md                      # 114 frequently asked questions
├── overrides/404.html              # Custom 404 page (mascot warning pose)
├── CONTENT-GENERATION-GUIDE.md     # Mascot voice/placement rules for content authors
├── mkdocs.yml                      # MkDocs configuration
└── README.md                       # This file
```

## Contributing

This is primarily a single-author curriculum project, but corrections and
suggestions are welcome:

1. Open an issue describing the correction or suggestion
2. Or fork the repository, make your change, and open a pull request

Please keep the tone and voice consistent with [`CONTENT-GENERATION-GUIDE.md`](./CONTENT-GENERATION-GUIDE.md) when editing student-facing content.

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/milesclawson/absent-narratives-textbook/issues)

When reporting issues, please include a description of the problem, steps to reproduce (for bugs), and screenshots where applicable.

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [docs/license.md](./docs/license.md) for full details.

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** — Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** — Beautiful, responsive theme
- **[p5.js](https://p5js.org/)** — Creative coding library from NYU ITP, used in 13 MicroSims
- **[vis-network](https://visjs.org/) / [vis-timeline](https://visjs.org/)** — Network and timeline visualization libraries
- **[Leaflet](https://leafletjs.com/)** — Interactive mapping library
- **[Chart.js](https://www.chartjs.org/)** — Charting library
- **[Mermaid](https://mermaid.js.org/)** — Diagramming and charting tool
- **[KaTeX](https://katex.org/)** — Fast math typesetting
- **[Claude AI](https://claude.ai)** by Anthropic — AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** — Free hosting for open source projects

## Contact

**Miles Lawson**

- GitHub: [@milesclawson](https://github.com/milesclawson)

Questions, suggestions, or collaboration opportunities? Feel free to open an issue on GitHub.
