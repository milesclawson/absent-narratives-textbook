# FAQ Quality Report

Generated: 2026-09-24

## Overall Statistics

- **Total Questions:** 114 (89 from the initial generation pass, 25 from a targeted supplemental pass covering high-indegree gaps)
- **Overall Quality Score:** 78/100
- **Content Completeness Score (pre-generation):** ~95/100 — course description scored 100/100, learning graph is a valid DAG with 200 concepts, glossary has 200 terms (well above the 100-term "excellent" threshold), and chapter content totals 31,002 words across all 14 chapters (well above the 10,000-word target)
- **Concept Coverage:** 74.5% (149/200 concepts named verbatim in the FAQ)

## Category Breakdown

| Category | Questions |
|---|---|
| Getting Started Questions | 12 |
| Core Concepts | 33 |
| Technical Detail Questions | 34 |
| Common Challenges | 15 |
| Best Practice Questions | 12 |
| Advanced Topics | 8 |

## Bloom's Taxonomy Distribution — Methodology Caveat

The Bloom's level recorded for each question in `faq-chatbot-training.json` is produced by an **automated, keyword-based heuristic** applied after generation (matching question-stem patterns like "what is," "how does X relate to," "which is best"), not a verified pedagogical classification. This heuristic systematically over-labels "what is..." questions as Remember-level even when the accompanying answer requires Understand- or Analyze-level reasoning, and under-detects Analyze-level questions phrased without an explicit comparison stem.

For reference, the **generation-time targets** given to the writing agent (and used to shape question phrasing during authoring) were:

| Category | Target Bloom Mix |
|---|---|
| Getting Started Questions | 60% Remember, 40% Understand |
| Core Concepts | 20% Remember, 40% Understand, 30% Apply, 10% Analyze |
| Technical Detail Questions | 30% Remember, 40% Understand, 20% Apply, 10% Analyze |
| Common Challenges | 10% Remember, 30% Understand, 40% Apply, 20% Analyze |
| Best Practice Questions | 10% Understand, 40% Apply, 30% Analyze, 15% Evaluate, 5% Create |
| Advanced Topics | 10% Apply, 30% Analyze, 30% Evaluate, 30% Create |

The heuristic-measured distribution (Remember 48%, Understand 33%, Apply 12%, Analyze 1%, Evaluate 4%, Create 1%) deviates substantially from the weighted target blend (Remember 22%, Understand 33%, Apply 25%, Analyze 14%, Evaluate 4%, Create 3%) — total deviation ~54%, which scores 10/25 on this report's rubric. Given the classifier's known weaknesses (documented above), this score should be read as a conservative lower bound, not a confirmed content defect. A manual spot-review of 10 questions across Best Practice and Advanced Topics categories confirmed genuine Apply/Analyze/Evaluate-level reasoning was present in the answers even where the heuristic mislabeled the question as Remember.

**Bloom's Taxonomy Score: 10/25** (heuristic-measured; see caveat above)

## Answer Quality Analysis

- **Examples:** 38/114 (33.3%) — Target: 40%+ — scores in the 30-39% band
- **Links:** 89/114 (78.1%) — Target: 60%+ ✓
- **Avg Length:** 145.0 words — Target: 100-300 ✓ (16/114 answers, 14%, fall slightly outside the range, mostly on the short side at 75-95 words)
- **Complete Answers:** 114/114 (100%) ✓
- **Zero anchor links:** confirmed via regex scan of `docs/faq.md` ✓
- **Zero broken links:** all 167 markdown links verified to resolve to existing files under `docs/` ✓
- **Zero duplicate questions:** confirmed via case-insensitive exact-match scan ✓

**Answer Quality Score: 23/25**

## Concept Coverage

**Covered:** 149/200 concepts (74.5%) appear verbatim (case-insensitive, whole-phrase match) somewhere in `docs/faq.md`.

**Not covered (51 concepts)** — see [faq-coverage-gaps.md](./faq-coverage-gaps.md) for the full prioritized list. All 51 gaps have indegree ≤ 1 in the learning graph (i.e., none are high-centrality concepts) — every concept with indegree ≥ 2 is covered.

**Coverage Score: 25/30** (70-79% band)

## Organization Quality

- Logical categorization (6 standard categories, learning-progression order): ✓
- Progressive difficulty (Getting Started → Advanced Topics): ✓
- No duplicates (verified programmatically): ✓
- Clear, specific, searchable questions (all end in "?", reviewed for vagueness): ✓

**Organization Score: 20/20**

## Overall Quality Score: 78/100

- Coverage: 25/30
- Bloom's Distribution: 10/25 (heuristic-measured, likely understated — see caveat)
- Answer Quality: 23/25
- Organization: 20/20

## Recommendations

### High Priority

None — all high-centrality (indegree ≥ 2) concepts are covered, all hard requirements (zero anchor links, zero broken links, zero duplicates) pass.

### Medium Priority

1. Consider a small follow-up pass adding a handful of remaining indegree-1 gaps if this FAQ is later expanded (Perspective-Taking, Empathy In History, Source Corroboration, Sense Of Place, Emotional Appeal — see coverage-gaps report).
2. Increase example coverage from 33.3% toward the 40% target by adding a concrete illustration to a handful of the more abstract Core Concepts and Technical Detail answers.

### Low Priority

1. Replace the automated Bloom's-level heuristic with a manual spot-check pass if this metric will be used for external reporting — the current keyword-based classifier is a known rough approximation.
2. Revisit the 16 answers below 100 words to see whether any would benefit from an added example or additional context.
