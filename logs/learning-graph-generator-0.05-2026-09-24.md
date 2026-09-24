# Session Log — learning-graph-generator v0.05

**Date:** 2026-09-24
**Book:** Absent Narratives: A Comprehensive Study of Marginalized Voices in History

## Steps Completed

1. **Course description quality assessment** — skipped re-run. Existing
   `quality_score: 100` in `docs/course-description.md` frontmatter was
   above the 85 threshold (set by the `course-description-analyzer` skill
   earlier in the same session).
2. **Concept labels** — generated 200 concepts across 14 taxonomy
   categories, saved to `concept-list.md`.
3. **Dependency graph** — hand-authored dependency edges (not auto-generated
   by an LLM prompt loop) to guarantee an acyclic structure by construction
   (every dependency ID is strictly less than its concept's own ID). Written
   with `csv` module (Python 3.14) to `learning-graph.csv`.
4. **Quality validation** — `analyze-graph.py` (bundled with this skill,
   unversioned in its header). Result: valid DAG, 0 cycles, 0 orphaned
   nodes, 1 connected component, 9 foundational concepts, 55 terminal nodes
   (27.5%), max dependency chain length 19.
5. **Concept taxonomy** — 14 categories, `concept-taxonomy.md`.
6. **Taxonomy names** — `taxonomy-names.json` (14 entries).
7. **Taxonomy added to CSV** — included directly in the same CSV write as
   step 3 (single `learning-graph.csv` with `TaxonomyID` column from the
   start, rather than a separate `add-taxonomy.py` pass).
8. **Metadata** — `metadata.json` (title/description/creator/date/version/
   license).
9. **Color config** — `color-config.json`, 14 named CSS colors from the
   skill's recommended palette.
10. **Complete JSON** — `csv-to-json.py` (reports itself as v0.04) →
    `learning-graph.json`: 200 nodes, 308 edges, 14 groups, 9 foundational
    concepts. No missing-taxonomy-name warnings.
11. **Schema validation** — ran `validate-learning-graph.py` against the
    bundled `learning-graph-schema.json`. It reported a type mismatch on
    `groups.<ID>.color` (schema expects a nested object; the script and the
    skill's own documented example both emit a flat string). Cross-checked
    against `dakota-textbook`'s existing, working `learning-graph.json` —
    it uses the same flat-string format. Treated the bundled schema copy as
    stale relative to `csv-to-json.py`'s actual (and previously verified)
    output format, and proceeded without altering the generated JSON.
12. **Taxonomy distribution** — `taxonomy-distribution.py` →
    `taxonomy-distribution.md`. Balance: 4.0%–9.0% per category, well under
    the 30% ceiling.
13. **index.md** — generated from `index-template.md` with `TEXTBOOK_NAME`
    substituted.

## Tool Versions

- `analyze-graph.py`: no `--version` flag; header comment only, no version string
- `csv-to-json.py`: v0.04 (self-reported in stdout)
- `taxonomy-distribution.py`: no `--version` flag; header comment only
- `validate-learning-graph.py`: no `--version` flag
- Python: 3.14 (project `.venv`)
- `jsonschema`: installed ad hoc into `.venv` to run the (informational,
  non-blocking) schema check

## Files Created

- `course-description-assessment.md` (from the earlier
  `course-description-analyzer` run, not re-created here)
- `concept-list.md`
- `learning-graph.csv`
- `taxonomy-names.json`
- `color-config.json`
- `metadata.json`
- `learning-graph.json`
- `concept-taxonomy.md`
- `quality-metrics.md`
- `taxonomy-distribution.md`
- `index.md`

## Next Steps

- Run `book-installer` → learning-graph-viewer to add an interactive
  MicroSim at `docs/sims/graph-viewer`.
- Run `book-chapter-generator` next, after the user reviews
  `concept-list.md`, `concept-taxonomy.md`, and `learning-graph.json`.
