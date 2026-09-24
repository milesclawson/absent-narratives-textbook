---
title: Economic Exclusion
description: Embargoes, redlining, college admissions bias, and their compounding economic consequences.
generated_by: claude skill chapter-content-generator
date: 2026-09-24 12:02:13
version: 0.09
---

# Economic Exclusion

## Summary

This chapter traces economic exclusion from policy to outcome: embargoes and trade restrictions, redlining and housing discrimination, and bias in college admissions including legacy admissions. Students connect these mechanisms to the wealth gap, community disinvestment, gentrification, and unequal access to credit, and evaluate reparations as one proposed response to racial capitalism's compounding effects.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Economic Exclusion
2. Embargo
3. Trade Restriction
4. Redlining
5. Housing Discrimination
6. Wealth Gap
7. College Admissions Bias
8. Legacy Admissions
9. Economic Mobility
10. Racial Capitalism
11. Labor Exploitation
12. Reparations
13. Community Disinvestment
14. Gentrification
15. Access To Credit

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Government Representation and Systemic Bias](../05-government-representation-and-systemic-bias/index.md)

---

## Economic Exclusion as a Category

Chapter 2 defined systemic oppression in general terms. This chapter examines its economic form directly: **economic exclusion**, the systematic denial of a group's access to wealth-building opportunities — property ownership, credit, employment, education — through policy, institutional practice, or market discrimination. Economic exclusion rarely announces its target by name. Like the poll tax and literacy test from Chapter 5, it usually operates through policies that read as neutral, applied in ways that are not.

This chapter examines economic exclusion at two scales: between nations, and within them.

## Economic Exclusion Between Nations

At the international scale, governments can restrict economic exchange as a matter of foreign policy. An **embargo** is a government-imposed ban on trade or other economic activity with a specific country or group, typically used as a political or economic sanction. An embargo is one specific type of the broader category **trade restriction**: any government policy — tariffs, quotas, embargoes, licensing requirements — that limits the free exchange of goods or services across borders. Trade restrictions can be a legitimate policy tool, but they can also function as a form of economic exclusion when applied selectively to isolate or weaken a specific nation, population, or group's access to global markets. Chapter 10 will return to this international scale when it examines U.S. foreign policy's effect on migration.

## Economic Exclusion Within a Nation: Housing

The domestic story of economic exclusion in the United States begins with housing policy. **Redlining** was a discriminatory practice, formalized by federal housing agencies beginning in the 1930s, of denying mortgages or insurance to residents of neighborhoods — color-coded red on official maps — based on the racial or ethnic composition of the neighborhood, regardless of an individual applicant's creditworthiness. Redlining is the clearest documented example in this course of systemic racism translated directly into government-created maps.

Redlining is one specific, historically dated instance of a broader pattern: **housing discrimination**, the unfair treatment of individuals seeking to buy, rent, or finance housing, based on race, ethnicity, gender, or other protected characteristics. Housing discrimination continued in various forms after redlining was formally outlawed by the Fair Housing Act of 1968 — through practices such as steering (guiding buyers toward or away from certain neighborhoods) and discriminatory appraisal.

Before we see the concrete financial effect of these maps, it helps to name the underlying access problem they created: **access to credit**, the degree to which individuals or communities can obtain loans, mortgages, and other financial instruments needed to build wealth. Redlining did not just deny individual mortgage applications — it denied entire neighborhoods, for generations, the access to credit that homeownership in a growing economy depends on.

#### Diagram: A Redlined Map, Then and Now

<iframe src="../../sims/redlined-map-then-and-now/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>A Redlined Map, Then and Now</summary>
Type: map

**sim-id:** redlined-map-then-and-now<br/>
**Library:** Leaflet<br/>
**Status:** Specified

Purpose: Let students overlay a historical Home Owners' Loan Corporation redlining map with present-day data (e.g., median home value or tree canopy coverage) for the same city, to see redlining's decades-long effect made visible.

Bloom Taxonomy: Analyze (L4) — examine the relationship between a historical policy map and present-day outcomes.
Bloom Verb: examine

Learning objective: Given a historical redlining map and a present-day data layer for the same city, students can identify the correlation between historical grade and current outcome, and explain at least one mechanism (access to credit) connecting the two.

Geographic scope: A single representative U.S. city (implementation note: use a city with well-documented, publicly available HOLC map data, such as Minneapolis or St. Paul, Minnesota, to connect directly to the course's Minnesota standards)

Locations: Neighborhood polygons color-coded by original 1930s HOLC grade (A=green, B=blue, C=yellow, D=red, matching the original historical color scheme)

Data flows: N/A (this is a layered map, not a flow map)

Interactive controls:
- Opacity slider to blend the historical grade layer with a present-day data layer
- Toggle to switch the present-day layer between two datasets (e.g., median home value, tree canopy percentage)
- Click any neighborhood polygon to open an infobox showing its 1930s grade, the original HOLC surveyor's stated rationale (drawn from the historical record), and its current value for the selected present-day dataset

Labels: HOLC grade legend (A/B/C/D), present-day dataset legend

Color scheme: Original HOLC four-color scale for the historical layer; a separate sequential color scale (e.g., light-to-dark blue) for whichever present-day dataset is selected

Interactive features: hover for a quick tooltip (grade + current value), click for the full infobox with historical rationale text

Implementation: Leaflet.js with two GeoJSON layers (historical HOLC polygons, present-day data polygons) and a blend/opacity control.
</details>

## From Housing to the Wealth Gap

Homeownership has historically been the primary way American families build intergenerational wealth. Because redlining and housing discrimination denied that path to specific communities for decades, their effects compound over time into a measurable **wealth gap**: the persistent difference in accumulated assets — savings, home equity, investments — between demographic groups, which is significantly larger than the income gap between the same groups because wealth compounds across generations while income resets each year. This distinction between income and wealth matters: two families with identical current incomes can have dramatically different wealth if one family's grandparents were able to buy a home in the 1950s and one family's were not.

Redlining also produced **community disinvestment**: the systematic withdrawal or withholding of public and private investment — infrastructure, business lending, school funding — from a neighborhood, often as a direct consequence of that neighborhood's redlined status. Community disinvestment is why redlining's effects extend beyond individual mortgage denials into decades of underfunded schools, fewer businesses, and deferred infrastructure maintenance in the same neighborhoods.

Decades of disinvestment can eventually make a neighborhood's low property values attractive to outside investment, producing **gentrification**: the process by which rising property values and new investment in a historically disinvested neighborhood displace long-term, often lower-income residents who can no longer afford to live there. Gentrification presents a genuine analytical puzzle worth sitting with: the same underlying force — capital flowing into a neighborhood — can look like investment from one vantage point and displacement from another, and both descriptions can be accurate for different residents of the same block.

## Economic Exclusion in Education and Work

Economic exclusion extends beyond housing into the institutions meant to provide upward mobility. **College admissions bias** describes practices in college and university admissions that systematically disadvantage applicants from marginalized or lower-income backgrounds, even when those practices are not explicitly based on race. The most extensively documented example is **legacy admissions**: the practice of giving preferential admissions consideration to applicants whose relatives attended the same institution, which disproportionately benefits historically advantaged groups because those groups had greater historical access to elite institutions in the first place.

Notice the mechanism in that last sentence: legacy admissions is race-neutral in its stated criterion (the applicant's own family history), exactly like the poll tax and literacy test from Chapter 5 — and produces a racially disparate outcome because it uses a past era's unequal access as its current baseline.

Economic exclusion in the workplace takes the form of **labor exploitation**: the practice of extracting excessive value from workers' labor through inadequate wages, unsafe conditions, or denial of workplace protections, disproportionately affecting marginalized workers with less bargaining power. Together, biased admissions and labor exploitation shape a population's **economic mobility**: the ability of an individual or family to improve their economic position — income, wealth, occupation — relative to the position of their parents or their own starting point. Economic mobility is the outcome all of this chapter's mechanisms ultimately act on; each barrier examined so far narrows it for a specific group.

## Naming the System and a Proposed Response

This chapter's authors use a specific term for the way these mechanisms interact rather than operate independently: **racial capitalism**, the analysis that capitalism as an economic system has historically developed by extracting extra value specifically from racialized and marginalized groups — through slavery, colonization, labor exploitation, and exclusion from credit and property — rather than treating racial exclusion as incidental to economic development. Racial capitalism is a framework, not a simple claim of intent; it argues that economic exclusion and profit have been structurally linked throughout American economic history, not merely coincidentally related.

Given that framework, one proposed remedy deserves direct evaluation: **reparations**, proposed compensation — financial, programmatic, or symbolic — intended to redress the cumulative economic harm caused by historical injustices such as slavery, redlining, and other government-sanctioned exclusion. Reparations proposals vary widely in form and scope, and reasonable people evaluate them differently — this course's goal is not to settle the debate, but to ensure you can evaluate reparations proposals with the specific mechanisms (redlining, wealth gap, community disinvestment) this chapter has documented in hand, rather than in the abstract.

Before you evaluate a reparations proposal yourself, trace the full chain this chapter has built.

#### Diagram: The Compounding Chain of Economic Exclusion

<iframe src="../../sims/compounding-chain-of-economic-exclusion/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>The Compounding Chain of Economic Exclusion</summary>
Type: workflow

**sim-id:** compounding-chain-of-economic-exclusion<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Let students trace the full documented chain from a single 1930s policy (redlining) through to a present-day wealth gap, and evaluate where a reparations proposal could intervene.

Bloom Taxonomy: Evaluate (L5) — judge the effectiveness of proposed interventions at different points in a documented causal chain.
Bloom Verb: justify

Learning objective: Given the compounding chain from redlining to wealth gap, students can identify at least two points where policy intervention (including reparations) could act, and justify which point would have the largest measurable effect.

Visual style: Mermaid top-to-bottom flowchart with clickable nodes and one branch showing possible intervention points.

Nodes (each clickable with a `click` directive opening an infobox):
1. "Redlining (1930s)" — infobox: definition and historical dates
2. "Housing Discrimination" — infobox: definition, notes continuation after 1968
3. "Reduced Access to Credit" — infobox: definition and mechanism
4. "Community Disinvestment" — infobox: definition
5. "Wealth Gap (Present Day)" — infobox: definition, notes wealth vs. income distinction
6. Branch node: "Possible Interventions" connected to nodes 2, 3, and 5 with dashed arrows, each labeled with a real policy category (fair housing enforcement, credit access programs, reparations) — infobox on each dashed arrow explains what that intervention targets and at which point in the chain

Interactivity requirement: every node and every labeled intervention arrow has a `click` directive opening an infobox; hovering any node shows a preview tooltip.

Color coding: red for the originating policy node, orange for the mechanism nodes, dark red for the present-day outcome node, green for the intervention branch.

Implementation: Mermaid flowchart with click handlers on nodes and edges, rendered in an iframe with a JS shim for the infobox panel.
</details>

## Key Takeaways

- **Economic exclusion** operates internationally through **embargoes** and **trade restrictions**, and domestically through **redlining** and broader **housing discrimination**.
- Housing exclusion compounds over generations into a **wealth gap**, driven by reduced **access to credit** and **community disinvestment** — which can later produce **gentrification** as investment returns unevenly.
- **College admissions bias**, including **legacy admissions**, and **labor exploitation** narrow **economic mobility** in parallel with housing exclusion.
- **Racial capitalism** names the claim that these mechanisms are structurally linked, not coincidental; **reparations** is one proposed response, evaluable using the specific chain this chapter documented.

Chapter 7 turns to a third domain shaped by the same systemic pattern: how criminality itself is defined and enforced.
