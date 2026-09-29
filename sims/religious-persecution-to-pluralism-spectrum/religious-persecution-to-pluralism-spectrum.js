// Religious Persecution to Pluralism Spectrum
// CANVAS_HEIGHT: 500
// Bloom Level: Evaluate — assess where a case study falls on a persecution-to-pluralism spectrum.
// Instructional Design Check: Evaluate-level -> placement plus a required criterion selection per
// card, applying specific named criteria rather than a vague overall impression.

let canvasWidth = 800;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let defaultTextSize = 15;

let compareButton, resetButton;
let showReference = false;

const criteria = ['(select criterion)', 'Right to worship', 'Legal antidiscrimination protection', 'Access to public office', 'Freedom from forced conversion'];

const cards = [
  { text: 'A minority religious group is legally banned from public worship in a historical empire.', ref: 0.04, criterion: 1 },
  { text: 'A government today monitors and restricts a religious minority\'s gatherings unevenly under public-safety laws.', ref: 0.15, criterion: 1 },
  { text: 'A religious minority may practice openly but pays a special tax and faces social restriction.', ref: 0.38, criterion: 2 },
  { text: 'A nation grants minority worship rights but bars members of that religion from holding public office.', ref: 0.48, criterion: 3 },
  { text: 'A country\'s constitution disestablishes a state religion and legally protects minority worship.', ref: 0.75, criterion: 2 },
  { text: 'A modern nation extends full antidiscrimination protection and public-office eligibility regardless of religion.', ref: 0.95, criterion: 3 }
];

let cardX = [];
let cardCriterion = [];
let dragIdx = null;
let cardBoxes = [];
let barX0, barX1, barY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  cards.forEach(() => { cardX.push(null); cardCriterion.push(0); });

  compareButton = createButton('Compare to Documented Assessment');
  compareButton.position(10, drawHeight + 10);
  compareButton.mousePressed(() => { showReference = !showReference; });

  resetButton = createButton('Reset');
  resetButton.position(260, drawHeight + 10);
  resetButton.mousePressed(resetAll);

  describe('A horizontal spectrum from Active Persecution to Full Legal Pluralism with a midpoint labeled Toleration Without Full Legal Protection. Six draggable case-study cards can be placed on the spectrum and assigned a justifying criterion; a button reveals a reference placement.', LABEL);
}

function updateLayout() {
  barX0 = 40;
  barX1 = canvasWidth - 40;
  barY = 55;
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
  textSize(17);
  noStroke();
  text('Religious Persecution to Pluralism Spectrum', canvasWidth / 2, 6);

  stroke(100);
  strokeWeight(4);
  line(barX0, barY, barX1, barY);
  noStroke();
  fill(30);
  textAlign(LEFT, TOP);
  textSize(12);
  text('Active Persecution', barX0, barY + 8);
  textAlign(CENTER, TOP);
  text('Toleration Without\nFull Legal Protection', (barX0 + barX1) / 2, barY + 8);
  textAlign(RIGHT, TOP);
  text('Full Legal Pluralism', barX1, barY + 8);

  if (showReference) {
    cards.forEach((c) => {
      const x = barX0 + c.ref * (barX1 - barX0);
      fill(34, 197, 94);
      noStroke();
      triangle(x - 6, barY - 14, x + 6, barY - 14, x, barY - 4);
    });
  }

  const cardW = 160, cardH = 58;
  cardBoxes = [];
  let stackCol = 0;
  const stackTop = barY + 44;
  const cols = Math.max(2, Math.floor(canvasWidth / (cardW + 15)));

  cards.forEach((c, i) => {
    let x, y;
    if (cardX[i] === null) {
      x = 20 + (stackCol % cols) * (cardW + 15);
      y = stackTop + Math.floor(stackCol / cols) * (cardH + 12);
      stackCol++;
    } else {
      x = constrain(barX0 + cardX[i] * (barX1 - barX0) - cardW / 2, barX0 - cardW / 2, barX1 - cardW / 2);
      const row = i % 3;
      y = barY + 20 + row * (cardH + 6);
    }
    cardBoxes.push({ x, y, w: cardW, h: cardH, i });

    let gapNote = '';
    if (showReference && cardX[i] !== null) {
      const gap = Math.abs(cardX[i] - c.ref);
      gapNote = gap > 0.15 ? ' [far from reference]' : ' [close to reference]';
    }

    fill(dragIdx === i ? color(255, 249, 196) : color(255));
    stroke(dragIdx === i ? color(202, 138, 4) : color(150));
    strokeWeight(dragIdx === i ? 2.5 : 1.2);
    rect(x, y, cardW, cardH, 5);
    noStroke();
    fill(20);
    textAlign(LEFT, TOP);
    textSize(9.5);
    text(c.text, x + 5, y + 3, cardW - 10);
    fill(30, 64, 175);
    textSize(9);
    text('Criterion: ' + criteria[cardCriterion[i]] + gapNote, x + 5, y + cardH - 14, cardW - 10);
  });

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Drag cards to place them; click a placed card again to cycle its criterion.', 380, drawHeight + 25);
}

function mousePressed() {
  if (mouseY >= drawHeight) return;
  for (let k = cardBoxes.length - 1; k >= 0; k--) {
    const b = cardBoxes[k];
    if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      if (cardX[b.i] !== null) {
        // already placed: clicking near bottom (criterion label) cycles criterion, else starts drag
        if (mouseY > b.y + b.h - 16) {
          cardCriterion[b.i] = (cardCriterion[b.i] + 1) % criteria.length;
          return;
        }
      }
      dragIdx = b.i;
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

function resetAll() {
  for (let i = 0; i < cards.length; i++) { cardX[i] = null; cardCriterion[i] = 0; }
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
