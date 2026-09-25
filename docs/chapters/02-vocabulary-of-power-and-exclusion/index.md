---
title: The Vocabulary of Power and Exclusion
description: The shared terminology of oppression, privilege, discrimination, and representation used across every unit of the course.
generated_by: claude skill chapter-content-generator
date: 2026-09-24 12:02:13
version: 0.09
---

# The Vocabulary of Power and Exclusion

## Summary

This chapter defines the shared vocabulary — systemic oppression, privilege, power structure, stereotype, prejudice, discrimination, tokenism, erasure, and representation — that later chapters use without re-explaining. Students distinguish related terms that are often conflated (equity versus equality, prejudice versus discrimination) and connect each term back to the marginalization and historical silence introduced in Chapter 1. This is a short, dense chapter meant to be referenced throughout the course.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Systemic Oppression
2. Privilege
3. Power Structure
4. Stereotype
5. Prejudice
6. Discrimination
7. Bias
8. Tokenism
9. Erasure
10. Representation
11. Inclusion
12. Equity Vs Equality

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Historical Inquiry](../01-foundations-of-historical-inquiry/index.md)

---

## From Marginalization to a Working Vocabulary

Chapter 1 introduced marginalization as the process by which a group's experiences get pushed to the edges of a society's attention and historical record. That single word does a lot of work, but it isn't precise enough on its own to analyze government policy, economic exclusion, or media bias — the subjects of the chapters ahead. This chapter builds the more precise vocabulary those chapters need. Treat it like a toolbox: you will reach back into this chapter constantly, so the goal is not to memorize definitions but to understand how the terms relate to one another.

## Systemic Oppression, Privilege, and Power Structure

**Systemic oppression** describes marginalization that has been built into a society's institutions — its laws, its economy, its schools — so that it persists even when no individual person is actively trying to cause harm. This distinction matters: systemic oppression does not require a villain. A lending policy written in the 1930s can still shape who owns a home in 2026, long after everyone who wrote the policy has died.

Systemic oppression produces **privilege**: an unearned advantage that a person receives because of their membership in a particular group, rather than because of anything they individually did. Privilege can be invisible to the person who holds it — not because they are dishonest, but because an advantage you have always had is easy to mistake for "the way things normally work."

Systemic oppression and privilege are two views of the same structure, which this course calls a **power structure**: the arrangement of institutions, resources, and social norms that determines which groups in a society hold authority, wealth, and influence, and which do not. A power structure is not a single building or a single law — it is the pattern that emerges when you look at many laws, institutions, and norms together.

Before we look at how a power structure concentrates advantage, it helps to see it laid out visually.

#### Diagram: The Power Structure Pyramid

<iframe src="../../sims/power-structure-pyramid/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>The Power Structure Pyramid</summary>
Type: diagram

**sim-id:** power-structure-pyramid<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Show how systemic oppression and privilege are two views of the same power structure, using a layered pyramid students can explore.

Bloom Taxonomy: Understand (L2) — explain how privilege and systemic oppression relate to a shared power structure.
Bloom Verb: explain

Learning objective: Students can explain, in their own words, why privilege and systemic oppression are not opposites but two perspectives on the same structure.

Components to show:
- A pyramid divided into four horizontal bands, labeled (top to bottom): "Concentrated Authority," "Institutional Access," "Everyday Advantage/Disadvantage," "Structural Foundation (Laws, Norms, History)"
- Two small figure icons that can be dragged: one labeled "Privileged Position," one labeled "Marginalized Position"

Connections: A dashed vertical line connects each figure to the pyramid band it currently occupies, updating live as the figure is dragged.

Interactive controls:
- Drag either figure to a different vertical position on the pyramid
- Clicking a pyramid band opens an infobox defining that band and giving one example connected to Chapter 1's marginalization concept
- A toggle button switches the whole diagram's label set between "Privilege view" (labels describing advantage) and "Systemic oppression view" (labels describing disadvantage), so students see the same structure described from both directions

Style: Flat-color pyramid, four bands in a gradient from dark (bottom/foundational) to light (top)

Labels: Band names as above; figure labels "Privileged Position" / "Marginalized Position"

Color scheme: Blue gradient for the pyramid bands, gold figure icon for "Privileged Position," gray figure icon for "Marginalized Position"

Implementation: p5.js canvas with draggable icons snapping to the nearest band; toggle button re-labels bands via a stored label-set object.
</details>

A power structure does not just distribute resources unevenly — it also shapes how members of different groups are perceived. That perception has its own vocabulary.

## Stereotype, Prejudice, and Discrimination

A **stereotype** is an oversimplified, widely shared belief about the characteristics of a group, applied to every individual member of that group regardless of their actual traits. Stereotypes can sound positive on the surface ("that group is naturally good at math") and still cause harm, because they deny individuals the right to be seen as individuals.

When a stereotype hardens into a negative attitude toward a group — before any interaction with a specific member of that group — it becomes **prejudice**: a preformed judgment, usually unfavorable, based on group membership rather than on anything the individual has done. Prejudice lives in attitude and belief.

**Discrimination** is what happens when prejudice moves from belief into action: unfair treatment of a person or group based on a protected characteristic such as race, gender, or nationality, resulting in a real-world difference in outcome — being denied a job, an apartment, or a loan. The distinction matters because policy can only address discrimination directly; prejudice, as a private belief, is harder to legislate against, which is part of why systemic oppression can outlast the individual prejudices that first produced it.

Before you see this chain summarized, look at one more term that cuts across all three: **bias**, a tendency to favor or disfavor a person, group, or idea, which can be conscious or unconscious and can influence perception even without the holder intending harm. Chapter 1 introduced bias in the context of historical sources; here, the same word describes bias in living people's judgments, decisions, and institutions.

Here is how the four terms build on one another:

| Term | What it is | Where it lives |
|---|---|---|
| Stereotype | An oversimplified belief about a group | A shared cultural idea |
| Prejudice | A preformed negative judgment about a group | An individual's attitude |
| Bias | A tendency to favor or disfavor, conscious or unconscious | An individual's or institution's judgment |
| Discrimination | Unfair treatment based on group membership | An action or outcome |

#### Diagram: From Stereotype to Discrimination — A Clickable Causal Chain

<iframe src="../../sims/stereotype-to-discrimination-chain/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>From Stereotype to Discrimination — A Clickable Causal Chain</summary>
Type: workflow

**sim-id:** stereotype-to-discrimination-chain<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Let students trace, and see broken, the chain from a shared belief to a real-world outcome.

Bloom Taxonomy: Analyze (L4) — differentiate between belief, attitude, and action.
Bloom Verb: differentiate

Learning objective: Students can place a short scenario correctly on the stereotype-to-discrimination chain and identify at which link intervention (such as anti-discrimination law) can and cannot act.

Visual style: Mermaid left-to-right flowchart with four clickable nodes and one branch showing where policy intervention is possible.

Nodes (each clickable with a `click` directive opening an infobox with the term's definition and a short example):
1. "Stereotype" — infobox: definition plus example ("that group is naturally good at X")
2. "Prejudice" — infobox: definition plus example (an unfavorable attitude formed before interaction)
3. "Bias" — infobox: definition, noting it can be conscious or unconscious
4. "Discrimination" — infobox: definition plus example (denial of a loan, job, or housing)

Branch: a labeled arrow from "Discrimination" down to a fifth node, "Where Law Can Intervene," with an infobox explaining that anti-discrimination law targets actions and outcomes, not private beliefs — connecting back to why systemic oppression can outlast individual prejudice.

Interactivity requirement: every node has a `click NodeId call showInfo("term")` directive; hovering any node shows a one-line preview tooltip before the click reveals the full infobox.

Color coding: light gray for belief-stage nodes (Stereotype, Prejudice), yellow for Bias (spanning belief and institution), red for Discrimination (action/outcome), green for the "Where Law Can Intervene" node.

Implementation: Mermaid flowchart with click handlers, rendered in an iframe with a JS shim providing the infobox panel.
</details>

## Tokenism, Erasure, and Representation

Two opposite-seeming responses to a power structure's imbalance are worth understanding together: doing too little, and doing nothing at all.

**Tokenism** is the practice of making a superficial or symbolic effort to include members of a marginalized group — for example, featuring one person from an underrepresented group prominently, without addressing the underlying power structure that limited broader inclusion in the first place. Tokenism can look like progress while changing very little.

**Erasure**, which Chapter 1 previewed through the concept of historical silence, is the more complete failure: the removal, exclusion, or omission of a group's presence, contributions, or experiences from a narrative, record, or cultural space altogether. Where tokenism includes a single, symbolic member of a group, erasure excludes the group entirely.

Both tokenism and erasure are failures of **representation**: the presence and portrayal of a group's members, perspectives, and experiences within a narrative, institution, or cultural space, in a way that reflects their actual role and diversity. Genuine representation is neither a single token presence nor a complete absence — it is proportionate, accurate presence.

Representation, in turn, is one input into a broader goal: **inclusion**, the practice of actively involving members of marginalized groups in decision-making, opportunity, and belonging, rather than merely permitting their presence. A room can be diverse — many different people physically present — without being inclusive, if only some of those people's input actually shapes what the room decides.

## Equity Versus Equality

This chapter closes with a distinction that gets flattened in everyday conversation but is precise and important here: **equity versus equality**. Equality means providing every person or group with the same resources or treatment, regardless of their starting position. Equity means providing resources or treatment calibrated to each person's or group's specific starting position and needs, with the goal of reaching a comparable outcome.

The two are not opposites, and neither is automatically correct — the right choice depends on the goal. When Chapter 5 examines voting rights, you will see equality (one person, one vote) treated as a bedrock principle precisely because unequal voting power was historically used as a tool of systemic oppression. When Chapter 6 examines economic exclusion, you will see equity-based policies proposed precisely because decades of unequal starting positions — produced by exactly the power structure diagrammed earlier in this chapter — mean identical treatment today would preserve, not close, an existing gap.

#### Diagram: Equity vs. Equality Resource Allocator

<iframe src="../../sims/equity-vs-equality-allocator/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Equity vs. Equality Resource Allocator</summary>
Type: microsim

**sim-id:** equity-vs-equality-allocator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let students allocate a limited resource under both an equality rule and an equity rule, and compare the resulting outcomes.

Bloom Taxonomy: Evaluate (L5) — judge which allocation approach best achieves a stated goal.
Bloom Verb: justify

Learning objective: Given a scenario with three groups at different starting positions, students can allocate resources under both rules, observe the different outcomes, and justify which rule better serves a stated goal (equal treatment vs. equal outcome).

Canvas layout:
- Left (300px): three simple figures of different heights, labeled "Group A (starting resources: low)," "Group B (starting resources: medium)," "Group C (starting resources: high)," each standing on a platform of a different height representing their starting position
- Right (300px): control panel and results readout

Interactive controls:
- Toggle: "Equality Mode" vs. "Equity Mode"
- Slider: total resource units available to distribute (10-30)
- Button: "Distribute"

Data Visibility Requirements:
  Stage 1 (Equality Mode): Show each of the three groups receiving an identical number of resource units, and show the resulting platform heights — still uneven, because starting positions were uneven
  Stage 2 (Equity Mode): Show resource units allocated in inverse proportion to starting platform height, and show the resulting platform heights converging toward the same level
  Stage 3: A results readout stating the numeric gap between the tallest and shortest platform under each mode, updated live

Instructional Rationale: An Evaluate-level objective requires learners to judge outcomes against a criterion, not just recall a definition. Letting students toggle between the two rules and see the resulting gap number, rather than just reading a static illustration, lets them evaluate for themselves which rule closes the gap under which goal — the classic "equal boxes vs. equal view over the fence" illustration turned into a measurable simulation.

Default parameters: Equality Mode selected; total resource units = 20

Implementation: p5.js canvas with three rectangle "platforms" of fixed differing starting heights, animated to grow when resources are distributed; live-updating text readout of the gap.
</details>

## Key Takeaways

- **Systemic oppression** and **privilege** describe the same **power structure** from two different vantage points.
- **Stereotype**, **prejudice**, **bias**, and **discrimination** form a chain from shared belief to individual attitude to unfair action — and policy can only reach the later links.
- **Tokenism** and **erasure** are two different failures of **representation**; genuine representation feeds **inclusion**.
- **Equity** and **equality** are both legitimate goals, but they are not the same goal, and choosing between them depends on what a policy is trying to achieve.

Chapter 3 puts this vocabulary to work on the categories of identity — race, ethnicity, nationality, gender, and sexuality — that the rest of the course analyzes through this lens.

[See Annotated References](./references.md)
