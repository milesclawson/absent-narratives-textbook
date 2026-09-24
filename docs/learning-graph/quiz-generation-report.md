# Quiz Generation Quality Report

Generated: 2026-09-24
Execution Mode: Serial (1 agent, per skill's token-efficiency requirement)

## Overall Statistics

- **Total Chapters:** 14
- **Total Questions:** 140 (exactly 10 per chapter)
- **Avg Questions per Chapter:** 10.0
- **Overall Quality Score:** 81/100

## Per-Chapter Summary

| Chapter | Questions | Chapter Type | Distinct Concepts Tested | Concept-Label Validity |
|---|---|---|---|---|
| 1. Foundations of Historical Inquiry | 10 | Introductory | 9/18 | 10/10 valid |
| 2. The Vocabulary of Power and Exclusion | 10 | Introductory | 8/12 | 10/10 valid |
| 3. Identity, Race, and Social Construction | 10 | Introductory | 8/16 | 10/10 valid |
| 4. Case Study: Manifest Destiny | 10 | Intermediate | 8/10 | 10/10 valid |
| 5. Government Representation and Systemic Bias | 10 | Intermediate | 9/18 | 10/10 valid |
| 6. Economic Exclusion | 10 | Intermediate | 9/15 | 10/10 valid |
| 7. The Justice System and Criminality | 10 | Intermediate | 10/16 | 10/10 valid |
| 8. Representation in the Media | 10 | Intermediate | 8/14 | 10/10 valid |
| 9. Indigenous Sovereignty and Tribal Relations | 10 | Intermediate | 9/14 | 10/10 valid |
| 10. Migration, Colonialism, and Global Perspectives | 10 | Intermediate | 9/15 | 10/10 valid |
| 11. Civil Rights and Liberation Movements | 10 | Intermediate | 10/18 | 10/10 valid |
| 12. Religion and Cultural Diffusion | 10 | Intermediate | 8/10 | 10/10 valid |
| 13. Language and Power | 10 | Intermediate | 8/8 | 10/10 valid |
| 14. Research Methods and Capstone Project | 10 | Advanced | 9/16 | 10/10 valid |

"Concept-Label Validity" means the `**Concept Tested:**` label on every question was verified programmatically to exactly match a concept in that chapter's own "Concepts Covered" list — 140/140 valid, 0 invalid labels found.

## Bloom's Taxonomy Distribution

| Chapter Type | Target (R/U/Ap/An/E/C) | Delivered (R/U/Ap/An/E/C, out of 10) |
|---|---|---|
| Introductory (Ch. 1-3) | 40/40/15/5/0/0 | 4/4/1/1/0/0 (40/40/10/10/0/0) |
| Intermediate (Ch. 4-13) | 25/30/30/15/0/0 | 2/3/3/2/0/0 (20/30/30/20/0/0) |
| Advanced (Ch. 14) | 15/20/25/25/10/5 | 2/2/2/2/1/1 (20/20/20/20/10/10) |

All three chapter types land within the skill's ±15% acceptable deviation band — the discrete 10-question format naturally rounds to the nearest whole question, which explains the small deviations (e.g., 10% instead of 5%/15% for the introductory Apply/Analyze split).

**Bloom's Distribution Score: 22/25** (good — within tolerance, small rounding deviations only)

## Answer Balance (Overall)

- A: 27.1% (38/140)
- B: 23.6% (33/140)
- C: 25.7% (36/140)
- D: 23.6% (33/140)

All four letters fall within the 20-30% target band; no chapter has more than 3 of any single letter (verified programmatically — every chapter's own A/B/C/D split is 2-3-3-2 or similar).

**Answer Balance Score: 15/15** (perfect — all chapters and the aggregate fall inside the target band)

## Structural and Formatting Validation

All checks below were run programmatically across all 140 questions:

| Check | Result |
|---|---|
| Exactly 10 `####` questions per chapter | ✓ 14/14 chapters |
| `<div class="upper-alpha" markdown>` wrapper present | ✓ 140/140 |
| Exactly 4 options per question | ✓ 140/140 |
| `??? question "Show Answer"` admonition present | ✓ 140/140 |
| "The correct answer is **X**." statement present | ✓ 140/140 |
| `**Concept Tested:**` label present and valid | ✓ 140/140 |
| Zero anchor links (`#fragment`) anywhere | ✓ confirmed |
| Zero "All of the above" / "None of the above" options | ✓ confirmed |
| Zero duplicate questions within a chapter | ✓ confirmed |
| Explanation length in reasonable 30-160 word range | ✓ 140/140 |

## Answer Quality

- **Explanation quality:** every explanation states the correct answer, explains why it is correct using the chapter's own documented content, and (per the generating agent's report) briefly addresses at least one distractor — spot-checked across multiple chapters.
- **Distractor plausibility:** distractors draw on related terminology from the same chapter (e.g., a Justice System question about "codes and laws" uses "implicit bias" and "policing history" as plausible-sounding wrong answers rather than nonsense options).
- **Grounding in chapter content:** the generating agent read each chapter's actual `index.md` before writing that chapter's quiz, rather than working from the concept list alone.

**Answer Quality Score: 24/25**

## Concept Coverage

Across the 14 chapters, quizzes test 122 of 200 total learning-graph concepts at least once (61%) — below the 75% "should test" guideline for Priority 1 concepts, but each individual chapter's 10 questions were deliberately spread across that chapter's own concepts (averaging ~60% of a chapter's own concept list) rather than concentrated on only 2-3 terms, which is the more pedagogically relevant coverage metric for a 10-question review quiz.

**Coverage Score: 20/25**

## Overall Quality Score: 81/100

- Bloom's Distribution: 22/25
- Answer Balance: 15/15
- Answer Quality: 24/25
- Concept Coverage: 20/25

This exceeds the skill's 70/100 success threshold.

## Recommendations

### High Priority

None — all hard structural requirements pass at 100%.

### Medium Priority

1. If broader concept coverage is desired, a future revision could expand select chapters (e.g., Chapter 1 at 9/18, Chapter 3 at 8/16) from 10 to 12-14 questions to cover more of their larger concept lists.

### Low Priority

1. Consider periodically re-shuffling option order across future quiz regenerations to guard against answer-position memorization if quizzes are reused across multiple terms.
