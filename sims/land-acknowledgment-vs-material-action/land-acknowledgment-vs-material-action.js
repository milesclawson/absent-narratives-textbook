// Land Acknowledgment vs. Material Action Evaluator
// CANVAS_HEIGHT: 480
// Bloom Level: Evaluate — rank institutional actions by material impact on Indigenous sovereignty.
// Instructional Design Check: Evaluate-level -> students commit to a ranking by dragging cards
// onto a spectrum BEFORE any reference answer is shown; comparison only appears on request.

let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let defaultTextSize = 15;

let compareButton, resetButton;
let showReference = false;

const cards = [
  { text: 'Spoken land acknowledgment at an event, no follow-up', ref: 0.04 },
  { text: 'Written land acknowledgment on an institution\'s website', ref: 0.14 },
  { text: 'School removes a Native-themed mascot', ref: 0.32 },
  { text: 'Institution funds Indigenous student scholarships', ref: 0.46 },
  { text: 'University repatriates ancestral remains under NAGPRA', ref: 0.62 },
  { text: 'State agency co-manages natural resources with a tribal government', ref: 0.76 },
  { text: 'Federal policy grants a tribe self-determination over healthcare and education administration', ref: 0.86 },
  { text: 'State agency returns managed land to tribal governance', ref: 0.97 }
];

let cardX = []; // current fraction 0..1, null if unplaced
let cardStackY = []; // for unplaced cards stacked below bar
let dragIdx = null;

let barX0, barX1, barY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  cards.forEach((c, i) => { cardX.push(null); });

  compareButton = createButton('Compare to Reference Ranking');
  compareButton.position(10, drawHeight + 10);
  compareButton.mousePressed(() => { showReference = !showReference; });

  resetButton = createButton('Reset');
  resetButton.position(230, drawHeight + 10);
  resetButton.mousePressed(resetCards);

  describe('A horizontal spectrum from Symbolic to Material/Structural with eight draggable cards describing institutional responses to Indigenous sovereignty issues. A button reveals a reference ranking for comparison.', LABEL);
}

function updateLayout() {
  barX0 = 40;
  barX1 = canvasWidth - 40;
  barY = 60;
}

function draw() {
  updateCanvasSize();
  updateLayout();
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();

  fill('black');
  textAlign(CENTER, TOP);
  textSize(18);
  noStroke();
  text('Land Acknowledgment vs. Material Action', canvasWidth / 2, 8);

  // spectrum bar
  stroke(100);
  strokeWeight(4);
  line(barX0, barY, barX1, barY);
  noStroke();
  fill(30);
  textAlign(LEFT, TOP);
  textSize(13);
  text('Symbolic', barX0, barY + 8);
  textAlign(RIGHT, TOP);
  text('Material / Structural', barX1, barY + 8);

  // reference dots
  if (showReference) {
    cards.forEach((c) => {
      const x = barX0 + c.ref * (barX1 - barX0);
      fill(34, 197, 94);
      noStroke();
      triangle(x - 6, barY - 14, x + 6, barY - 14, x, barY - 4);
    });
    fill(22, 130, 60);
    textAlign(CENTER, TOP);
    textSize(11);
    text('Green triangles = reference position', canvasWidth / 2, barY - 32);
  }

  // place unplaced cards in a stacked area, placed cards along the bar
  const cardW = 150, cardH = 46;
  let stackCol = 0, stackRow = 0;
  const stackTop = barY + 40;

  cards.forEach((c, i) => {
    let x, y;
    if (cardX[i] === null) {
      const cols = Math.max(2, Math.floor(canvasWidth / (cardW + 15)));
      x = 20 + (stackCol % cols) * (cardW + 15);
      y = stackTop + Math.floor(stackCol / cols) * (cardH + 12);
      stackCol++;
    } else {
      x = barX0 + cardX[i] * (barX1 - barX0) - cardW / 2;
      x = constrain(x, barX0 - cardW / 2, barX1 - cardW / 2);
      const row = i % 3;
      y = barY + 20 + row * (cardH + 8);
    }
    cardPositions(i, x, y, cardW, cardH);

    let gapNote = '';
    if (showReference && cardX[i] !== null) {
      const gap = Math.abs(cardX[i] - c.ref);
      gapNote = gap > 0.15 ? ' (far from reference)' : '';
    }

    fill(dragIdx === i ? color(255, 249, 196) : color(255));
    stroke(dragIdx === i ? color(202, 138, 4) : color(150));
    strokeWeight(dragIdx === i ? 2.5 : 1.2);
    rect(x, y, cardW, cardH, 5);
    noStroke();
    fill(20);
    textAlign(LEFT, TOP);
    textSize(10);
    text(c.text + gapNote, x + 5, y + 4, cardW - 10);
  });

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Drag cards onto the spectrum above based on material impact.', 380, drawHeight + 25);
}

let cardBoxes = [];
function cardPositions(i, x, y, w, h) {
  cardBoxes[i] = { x, y, w, h };
}

function mousePressed() {
  if (mouseY >= drawHeight) return;
  for (let i = cards.length - 1; i >= 0; i--) {
    const b = cardBoxes[i];
    if (!b) continue;
    if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      dragIdx = i;
      return;
    }
  }
}

function mouseDragged() {
  if (dragIdx === null) return;
  const frac = constrain((mouseX - barX0) / (barX1 - barX0), 0, 1);
  cardX[dragIdx] = frac;
}

function mouseReleased() {
  dragIdx = null;
}

function resetCards() {
  for (let i = 0; i < cards.length; i++) cardX[i] = null;
  showReference = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
