// Media Literacy Checklist Sorter
// CANVAS_HEIGHT: 560
// Bloom Level: Evaluate — classify a media excerpt's features against defined criteria.
// Instructional Design Check: Evaluate-level -> drag-and-drop sorting with a delayed "check" step
// (not instant per-card feedback), forcing students to apply the full chapter vocabulary before
// receiving correctness signals.

let canvasWidth = 800;
let drawHeight = 460;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let defaultTextSize = 15;

let checkButton, resetButton;
let checked = false;

const zoneNames = ['Ordinary Framing', 'Named Bias Pattern', 'Likely Propaganda'];
const patternOptions = ['Headline Bias', 'Stereotype In Media', 'Algorithmic Bias', 'Colorism In Media', 'Whitewashing'];

const cards = [
  { text: 'Two headlines about the same protest: "Neighbors Rally for Safer Streets" vs. "Agitators Block Traffic Again."', zone: 'Named Bias Pattern', pattern: 'Headline Bias' },
  { text: 'A sitcom repeatedly casts characters from one ethnic group only as tech-support workers, never as leads, across a decade of episodes.', zone: 'Named Bias Pattern', pattern: 'Stereotype In Media' },
  { text: 'A hiring algorithm trained on ten years of past hires ranks resumes with historically male names higher, even with identical qualifications.', zone: 'Named Bias Pattern', pattern: 'Algorithmic Bias' },
  { text: 'A political ad splices a speaker\'s sentence out of order, adds ominous music, and flashes a fabricated statistic for two seconds.', zone: 'Likely Propaganda' },
  { text: 'A newspaper publishes a city government press release and a community group\'s rebuttal side by side, labeled as competing claims.', zone: 'Ordinary Framing' },
  { text: 'A documentary cites its sources in on-screen footnotes and links a full transcript of every interview used.', zone: 'Ordinary Framing' }
];

let placement = []; // {zoneIndex: -1|0|1|2, patternIndex: 0..4 or -1}
let dragIdx = null;
let dragOffsetX = 0, dragOffsetY = 0;
let cardPos = []; // current x,y of each card (top-left)

const cardW = 220, cardH = 90;
let zoneRects = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  cards.forEach((c, i) => {
    placement.push({ zoneIndex: -1, patternIndex: 0 });
  });
  layoutCards();

  checkButton = createButton('Check My Sorting');
  checkButton.position(10, drawHeight + 10);
  checkButton.mousePressed(() => { checked = true; });

  resetButton = createButton('Reset Cards');
  resetButton.position(150, drawHeight + 10);
  resetButton.mousePressed(resetCards);

  describe('Six media excerpt cards that can be dragged into three drop zones: Ordinary Framing, Named Bias Pattern, and Likely Propaganda. A Check My Sorting button reveals correct placements with a justification for each.', LABEL);
}

function layoutCards() {
  const cols = Math.max(2, Math.floor(canvasWidth / (cardW + 20)));
  cardPos = cards.map((c, i) => ({
    x: 20 + (i % cols) * (cardW + 20),
    y: 30 + Math.floor(i / cols) * (cardH + 15)
  }));
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

  const zoneY = drawHeight - 150;
  const zoneW = (canvasWidth - 60) / 3;
  zoneRects = [];
  for (let z = 0; z < 3; z++) {
    const zx = 20 + z * (zoneW + 10);
    zoneRects.push({ x: zx, y: zoneY, w: zoneW, h: 130 });
    fill(245);
    stroke(150);
    strokeWeight(1.5);
    rect(zx, zoneY, zoneW, 130, 6);
    noStroke();
    fill(40);
    textAlign(CENTER, TOP);
    textSize(13);
    text(zoneNames[z], zx + zoneW / 2, zoneY + 6, zoneW - 10);
  }

  fill(20);
  textAlign(LEFT, TOP);
  textSize(16);
  noStroke();
  text('Drag each card into the zone where it belongs', 20, 6);

  // draw cards not currently in a zone at their free position; cards in a zone stack inside it
  const zoneStack = [0, 0, 0];
  cards.forEach((c, i) => {
    const p = placement[i];
    let x, y;
    if (p.zoneIndex >= 0) {
      const zr = zoneRects[p.zoneIndex];
      x = zr.x + 8;
      y = zr.y + 22 + zoneStack[p.zoneIndex] * 30;
      zoneStack[p.zoneIndex]++;
      cardPos[i] = { x, y, small: true, zr };
    } else {
      x = cardPos[i].x; y = cardPos[i].y;
      cardPos[i] = { x, y };
    }

    let boxColor = color(255);
    let borderColor = color(120);
    if (checked) {
      const correct = isCorrect(i);
      boxColor = correct ? color(220, 252, 231) : color(254, 226, 226);
      borderColor = correct ? color(22, 163, 74) : color(220, 38, 38);
    }
    fill(boxColor);
    stroke(borderColor);
    strokeWeight(dragIdx === i ? 3 : 1.5);
    if (p.zoneIndex >= 0) {
      rect(x, y, zoneRects[p.zoneIndex].w - 16, 26, 4);
      noStroke();
      fill(30);
      textAlign(LEFT, CENTER);
      textSize(10);
      let label = 'Card ' + (i + 1) + (p.zoneIndex === 1 ? ' (' + patternOptions[p.patternIndex] + ')' : '');
      text(label, x + 4, y + 13, zoneRects[p.zoneIndex].w - 24);
    } else {
      rect(x, y, cardW, cardH, 6);
      noStroke();
      fill(30);
      textAlign(LEFT, TOP);
      textSize(11);
      text(c.text, x + 8, y + 8, cardW - 16);
    }

    if (checked) {
      // show one-line justification beneath the card location (only for zoned cards, near the zone)
    }
  });

  if (checked) {
    // justification panel
    const jy = zoneY - 110;
    fill(255, 255, 255, 235);
    stroke(200);
    rect(20, jy, canvasWidth - 40, 100, 6);
    noStroke();
    fill(20);
    textAlign(LEFT, TOP);
    textSize(12);
    let ty = jy + 8;
    cards.forEach((c, i) => {
      const correct = isCorrect(i);
      fill(correct ? color(22, 130, 60) : color(180, 30, 30));
      const justification = c.zone === 'Named Bias Pattern'
        ? ('Card ' + (i + 1) + ': ' + c.zone + ' — ' + c.pattern)
        : ('Card ' + (i + 1) + ': ' + c.zone);
      text(justification, 30, ty, canvasWidth - 60);
      ty += 15;
    });
  }

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Cards in "Named Bias Pattern": click to cycle the specific pattern name', 300, drawHeight + 22);
}

function isCorrect(i) {
  const c = cards[i], p = placement[i];
  if (p.zoneIndex < 0) return false;
  if (zoneNames[p.zoneIndex] !== c.zone) return false;
  if (c.zone === 'Named Bias Pattern') {
    return patternOptions[p.patternIndex] === c.pattern;
  }
  return true;
}

function mousePressed() {
  if (mouseY >= drawHeight) return;
  // clicking a card already in "Named Bias Pattern" zone cycles its pattern label
  for (let i = 0; i < cards.length; i++) {
    const p = placement[i];
    const pos = cardPos[i];
    if (p.zoneIndex === 1 && pos.zr) {
      const w = pos.zr.w - 16, h = 26;
      if (mouseX > pos.x && mouseX < pos.x + w && mouseY > pos.y && mouseY < pos.y + h) {
        p.patternIndex = (p.patternIndex + 1) % patternOptions.length;
        return;
      }
    }
  }
  // otherwise start dragging a free card
  for (let i = cards.length - 1; i >= 0; i--) {
    const p = placement[i];
    if (p.zoneIndex >= 0) continue;
    const pos = cardPos[i];
    if (mouseX > pos.x && mouseX < pos.x + cardW && mouseY > pos.y && mouseY < pos.y + cardH) {
      dragIdx = i;
      dragOffsetX = mouseX - pos.x;
      dragOffsetY = mouseY - pos.y;
      return;
    }
  }
}

function mouseDragged() {
  if (dragIdx === null) return;
  cardPos[dragIdx].x = mouseX - dragOffsetX;
  cardPos[dragIdx].y = mouseY - dragOffsetY;
}

function mouseReleased() {
  if (dragIdx === null) return;
  const cx = cardPos[dragIdx].x + cardW / 2;
  const cy = cardPos[dragIdx].y + cardH / 2;
  let dropped = -1;
  zoneRects.forEach((zr, z) => {
    if (cx > zr.x && cx < zr.x + zr.w && cy > zr.y && cy < zr.y + zr.h) dropped = z;
  });
  placement[dragIdx].zoneIndex = dropped;
  checked = false;
  dragIdx = null;
}

function resetCards() {
  placement.forEach((p) => { p.zoneIndex = -1; p.patternIndex = 0; });
  layoutCards();
  checked = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
