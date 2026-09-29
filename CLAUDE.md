# CLAUDE.md

Project-specific guidance for working in this repo.

## Absent Narratives Intelligent Textbook

MkDocs Material intelligent textbook for a Minnesota high school elective
(grades 10-12). Built with the `book-installer` / `microsim-generator` /
`chapter-content-generator` / etc. skill suite documented at
`~/.claude/skills/`.

Before generating content for the chapters, lesson plans, quizzes, FAQ or
other student-facing text, read the `CONTENT-GENERATION-GUIDE.md` file. Note
that the teacher guide, instructor guide, or other instructor-facing content
does not need to use the mascot described in `CONTENT-GENERATION-GUIDE.md`.

## Build & Verify

```bash
source .venv/bin/activate
mkdocs build --strict
```

Project Python deps live in `.venv` (system Python is externally managed).

## MicroSims

MicroSim batch tooling lives at
`/Users/miles.lawson/Documents/projects/claude-skills/src/microsim-utils/`.
See `docs/sims/index.md` for the current catalog.
