// Spot the Translation Choice
// CANVAS_HEIGHT: 500
// Bloom Level: Analyze — examine differences among multiple valid translations of the same source.
// Instructional Design Check: Analyze-level -> direct side-by-side comparison of three legitimate
// translations with synchronized highlighting; no single "correct" answer is implied.

let canvasWidth = 800;
let drawHeight = 420;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let defaultTextSize = 15;

let noteButton;
let showNotes = false;
let activeSegment = null;

const segments = [
  ['My friends,', 'Dear friends,', 'Friends,'],
  ['we must endure', 'we shall persevere through', 'we have no choice but to endure'],
  ['this hardship', 'this trial', 'these difficult times'],
  ['together.', 'as one.', 'side by side.']
];

const columnTitles = ['Translation A (literal)', 'Translation B (formal)', 'Translation C (plain)'];
const notes = [
  'Prioritizes word-for-word accuracy over natural English rhythm — closest to the original\'s literal structure.',
  'Prioritizes a formal, elevated tone matching the occasion, at some cost to literal word order.',
  'Prioritizes plain, accessible modern English over the original\'s more formal register.'
];

let chipBoxes = []; // {col, seg, x, y, w, h}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  noteButton = createButton('Show Translator\'s Note');
  noteButton.position(10, drawHeight + 10);
  noteButton.mousePressed(toggleNotes);

  describe('Three side-by-side panels showing different English translations of the same short illustrative excerpt, broken into four matched segments. Clicking any segment highlights the corresponding segment across all three panels for comparison. A toggle reveals each translator\'s stated priority.', LABEL);
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
  textSize(17);
  noStroke();
  text('Three Valid Translations of the Same Excerpt', canvasWidth / 2, 6);

  const gap = 15;
  const colW = (canvasWidth - gap * 4) / 3;
  chipBoxes = [];

  for (let col = 0; col < 3; col++) {
    const x0 = gap + col * (colW + gap);
    fill(30);
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text(columnTitles[col], x0, 35, colW);
    textStyle(NORMAL);

    let y = 60;
    segments.forEach((seg, si) => {
      const label = seg[col];
      const h = 34;
      const isActive = activeSegment === si;
      fill(isActive ? color(254, 240, 138) : color(255));
      stroke(isActive ? color(202, 138, 4) : color(190));
      strokeWeight(isActive ? 2.5 : 1);
      rect(x0, y, colW, h, 5);
      noStroke();
      fill(20);
      textAlign(LEFT, CENTER);
      textSize(13);
      text(label, x0 + 8, y + h / 2, colW - 16);
      chipBoxes.push({ col, seg: si, x: x0, y, w: colW, h });
      y += h + 8;
    });

    if (showNotes) {
      fill(255, 255, 255, 235);
      stroke(200);
      rect(x0, y + 6, colW, drawHeight - y - 20, 6);
      noStroke();
      fill(40, 40, 90);
      textAlign(LEFT, TOP);
      textSize(11);
      text(notes[col], x0 + 8, y + 14, colW - 16);
    }
  }

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Click any phrase to compare that segment across all three translations.', 250, drawHeight + 30);
}

function mousePressed() {
  if (mouseY >= drawHeight) return;
  for (const b of chipBoxes) {
    if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      activeSegment = activeSegment === b.seg ? null : b.seg;
      return;
    }
  }
}

function toggleNotes() {
  showNotes = !showNotes;
  noteButton.html(showNotes ? 'Hide Translator\'s Note' : 'Show Translator\'s Note');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
