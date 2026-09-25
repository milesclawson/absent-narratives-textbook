// Intersectionality Layer Explorer
// CANVAS_HEIGHT: 545
// Bloom Level: Analyze — examine how overlapping categories interact to produce distinct outcomes.
// Instructional Design Check: Analyze-level -> comparison tool (combined view vs. single-category
// view) that lets the student directly see which documented outcomes disappear when only one
// category is considered — no animation; the comparison itself is the mechanism.

let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 145;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let raceSelect, genderSelect, nationalitySelect, classSelect, abilitySelect;
let viewToggleButton;
let singleView = false;

const options = {
  race: ['Any', 'Black', 'White', 'Asian', 'Latino'],
  gender: ['Any', 'Woman', 'Man', 'Nonbinary'],
  nationality: ['Any', 'U.S. Citizen', 'Immigrant'],
  class: ['Any', 'Low-Income', 'Middle-Income', 'Wealthy'],
  ability: ['Any', 'Disabled', 'Non-Disabled']
};

// Illustrative scenario dataset. combinedOnly cards require 2+ non-Any category matches.
// singleCategory cards represent a documented pattern tied to exactly one category.
const scenarios = [
  { race: 'Black', gender: 'Woman', combinedOnly: true,
    text: 'DeGraffenreid v. General Motors (1976): Black women workers were denied recognition as a legally protected combined class — courts initially evaluated race discrimination and sex discrimination as separate claims, missing harm visible only at the intersection.' },
  { gender: 'Woman', singleCategory: 'gender',
    text: 'General gender pay gap studies document that women, considered as a single category, earn less than men in comparable roles nationally.' },
  { race: 'Black', singleCategory: 'race',
    text: 'General racial pay gap studies document employment and wage disparities for Black workers, considered as a single category, relative to white workers.' },
  { race: 'Latino', nationality: 'Immigrant', combinedOnly: true,
    text: 'Documented immigration enforcement patterns have disproportionately targeted Latino immigrant communities specifically — a pattern not predicted by immigration policy data or racial-profiling data analyzed separately.' },
  { class: 'Low-Income', ability: 'Disabled', combinedOnly: true,
    text: 'Disabled people living in poverty face compounding healthcare-access barriers documented in disability-and-poverty studies — barriers not captured by disability policy or poverty policy analyzed on their own.' },
  { gender: 'Nonbinary', ability: 'Disabled', combinedOnly: true,
    text: 'Nonbinary disabled patients report healthcare barriers, documented in LGBTQ+ health surveys, distinct from those reported by disabled patients or nonbinary patients considered separately.' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  raceSelect = createSelect();
  options.race.forEach((o) => raceSelect.option(o));
  raceSelect.position(10, drawHeight + 8);

  genderSelect = createSelect();
  options.gender.forEach((o) => genderSelect.option(o));
  genderSelect.position(150, drawHeight + 8);

  nationalitySelect = createSelect();
  options.nationality.forEach((o) => nationalitySelect.option(o));
  nationalitySelect.position(290, drawHeight + 8);

  classSelect = createSelect();
  options.class.forEach((o) => classSelect.option(o));
  classSelect.position(10, drawHeight + 45);

  abilitySelect = createSelect();
  options.ability.forEach((o) => abilitySelect.option(o));
  abilitySelect.position(150, drawHeight + 45);

  viewToggleButton = createButton('Show Single-Category View');
  viewToggleButton.position(10, drawHeight + 90);
  viewToggleButton.mousePressed(toggleView);

  describe('Five dropdown selectors for race, gender, nationality, class, and ability. Selecting values filters a set of scenario cards showing documented outcomes. A toggle switches between a combined view and a single-category view to show that some outcomes only appear when categories combine.', LABEL);
}

function currentSelection() {
  return {
    race: raceSelect.value(),
    gender: genderSelect.value(),
    nationality: nationalitySelect.value(),
    class: classSelect.value(),
    ability: abilitySelect.value()
  };
}

function matchesCombined(sc, sel) {
  const keys = ['race', 'gender', 'nationality', 'class', 'ability'];
  for (const k of keys) {
    if (sel[k] !== 'Any' && sc[k] && sc[k] !== sel[k]) return false;
  }
  // require at least one field of the scenario to be actively matched by a non-Any selection
  const activeMatch = keys.some((k) => sel[k] !== 'Any' && sc[k] === sel[k]);
  return activeMatch;
}

function matchesSingle(sc, sel) {
  if (!sc.singleCategory) return false;
  const k = sc.singleCategory;
  return sel[k] !== 'Any' && sc[k] === sel[k];
}

function draw() {
  updateCanvasSize();
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();

  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  noStroke();
  text('Intersectionality Layer Explorer', canvasWidth / 2, 10);

  const sel = currentSelection();
  const anySelected = Object.values(sel).some((v) => v !== 'Any');

  let matches;
  if (!anySelected) {
    matches = [];
  } else if (singleView) {
    matches = scenarios.filter((s) => matchesSingle(s, sel));
  } else {
    matches = scenarios.filter((s) => matchesCombined(s, sel));
  }

  textAlign(LEFT, TOP);
  textSize(13);
  fill(40);
  const modeLabel = singleView ? 'Single-Category View (matches ONE selected category at a time)' : 'Combined View (matches your full combination)';
  text(modeLabel, 20, 40);

  if (!anySelected) {
    fill(100);
    textAlign(CENTER, CENTER);
    textSize(15);
    text('Choose one or more categories below to see matching documented scenarios.', canvasWidth / 2, drawHeight / 2, canvasWidth - 80);
  } else if (matches.length === 0) {
    fill(100);
    textAlign(CENTER, CENTER);
    textSize(15);
    text('No scenario in this dataset matches that exact combination in ' + (singleView ? 'single-category' : 'combined') + ' view.\nTry Combined View, or a different single category.', canvasWidth / 2, drawHeight / 2, canvasWidth - 80);
  } else {
    let y = 65;
    const cardW = canvasWidth - 40;
    matches.forEach((s) => {
      const lines = Math.ceil(s.text.length / 90);
      const cardH = 30 + lines * 16;
      fill(255);
      stroke(200);
      strokeWeight(1);
      rect(20, y, cardW, cardH, 6);
      noStroke();
      fill(30);
      textSize(13);
      const tag = s.combinedOnly ? '[Combined-only pattern]' : '[Single-category pattern]';
      fill(s.combinedOnly ? color(180, 40, 40) : color(30, 90, 160));
      textStyle(BOLD);
      text(tag, 30, y + 6);
      textStyle(NORMAL);
      fill(30);
      text(s.text, 30, y + 22, cardW - 20);
      y += cardH + 12;
    });
  }

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Race', 10, drawHeight + 32);
  text('Gender', 150, drawHeight + 32);
  text('Nationality', 290, drawHeight + 32);
  text('Class', 10, drawHeight + 69);
  text('Ability', 150, drawHeight + 69);
}

function toggleView() {
  singleView = !singleView;
  viewToggleButton.html(singleView ? 'Show Combined View' : 'Show Single-Category View');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
