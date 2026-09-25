// Triangulating Three Source Types
// CANVAS_HEIGHT: 560
// Bloom Level: Apply — apply source triangulation to a worked example.
// Instructional Design Check: Apply-level -> students physically sort claim tags themselves
// before checking, applying the triangulation technique rather than reading about it.

let canvasWidth = 800;
let drawHeight = 470;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let defaultTextSize = 15;

let checkButton, resetButton;
let checked = false;

const panelNames = ['Government Record', 'Newspaper Account', 'Oral History Excerpt'];
const panelColors = [[59, 130, 246], [249, 115, 22], [168, 85, 247]];

const claims = [
  { text: 'Meeting occurred at City Hall, March 3', sources: [0, 1, 2], home: 0 },
  { text: 'Attendance: approximately 40 people', sources: [0, 1, 2], home: 1 },
  { text: 'No injuries reported', sources: [0], home: 0 },
  { text: 'One attendee raised concerns about noise', sources: [1], home: 1 },
  { text: 'Several attendees felt unheard by officials', sources: [2], home: 2 }
];

let inCenter = []; // bool per claim
let claimPos = []; // {x,y}
let dragIdx = null;
let panelCenters = [];
let convergenceZone;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  claims.forEach(() => inCenter.push(false));
  updateLayout();
  claims.forEach((c, i) => {
    claimPos.push({ x: panelCenters[c.home].x, y: panelCenters[c.home].y + 50 + (i % 3) * 5 });
  });

  checkButton = createButton('Check Triangulation');
  checkButton.position(10, drawHeight + 10);
  checkButton.mousePressed(() => { checked = true; });

  resetButton = createButton('Reset');
  resetButton.position(170, drawHeight + 10);
  resetButton.mousePressed(resetAll);

  describe('A triangular layout with three source panels — Government Record, Newspaper Account, and Oral History Excerpt — around a center Convergence Zone. Draggable claim tags can be moved into the center if the student believes multiple sources support them.', LABEL);
}

function updateLayout() {
  const cx = canvasWidth / 2, cy = drawHeight / 2 + 10;
  const r = min(canvasWidth * 0.32, drawHeight * 0.36);
  panelCenters = [
    { x: cx, y: 60 },
    { x: cx - r, y: cy + r * 0.7 },
    { x: cx + r, y: cy + r * 0.7 }
  ];
  convergenceZone = { x: cx - 110, y: cy - 55, w: 220, h: 110 };
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
  text('Triangulating Three Source Types', canvasWidth / 2, 4);

  // panel labels
  panelNames.forEach((name, i) => {
    const p = panelCenters[i];
    fill(panelColors[i][0], panelColors[i][1], panelColors[i][2]);
    stroke(30);
    strokeWeight(1.5);
    rectMode(CENTER);
    rect(p.x, p.y, 170, 34, 6);
    rectMode(CORNER);
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(13);
    text(name, p.x, p.y, 160);
  });

  // convergence zone
  fill(240, 240, 240);
  stroke(120);
  strokeWeight(1.5);
  drawingContext.setLineDash([6, 4]);
  rect(convergenceZone.x, convergenceZone.y, convergenceZone.w, convergenceZone.h, 8);
  drawingContext.setLineDash([]);
  noStroke();
  fill(80);
  textAlign(CENTER, TOP);
  textSize(12);
  text('Convergence Zone\n(drag claims here if corroborated)', convergenceZone.x + convergenceZone.w / 2, convergenceZone.y + 6);

  // claim tags
  const tagW = 190, tagH = 32;
  claims.forEach((c, i) => {
    const pos = claimPos[i];
    let boxColor = color(255), borderColor = color(120);
    if (checked) {
      const corroborated = c.sources.length > 1;
      const placedCorrectly = corroborated === inCenter[i];
      boxColor = placedCorrectly ? color(220, 252, 231) : color(254, 226, 226);
      borderColor = placedCorrectly ? color(22, 163, 74) : color(220, 38, 38);
    } else if (dragIdx === i) {
      borderColor = color(202, 138, 4);
    }
    fill(boxColor);
    stroke(borderColor);
    strokeWeight(dragIdx === i ? 2.5 : 1.3);
    rect(pos.x - tagW / 2, pos.y - tagH / 2, tagW, tagH, 5);
    noStroke();
    fill(20);
    textAlign(CENTER, CENTER);
    textSize(10.5);
    text(c.text, pos.x, pos.y, tagW - 10);
  });

  if (checked) {
    fill(255, 255, 255, 235);
    stroke(200);
    rect(15, drawHeight - 90, canvasWidth - 30, 80, 6);
    noStroke();
    fill(30);
    textAlign(LEFT, TOP);
    textSize(12);
    text('The two dates/attendance claims are corroborated across all three source types — they belong in the Convergence Zone. The other three claims are unique to one source type. The oral history\'s unique claim ("felt unheard") is exactly the kind of detail official records and news coverage often omit — precisely the gap triangulation is designed to surface.', 25, drawHeight - 82, canvasWidth - 60);
  }

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Drag each claim tag; leave it at its source if you believe it is unique to that source.', 330, drawHeight + 30);
}

function mousePressed() {
  if (mouseY >= drawHeight) return;
  const tagW = 190, tagH = 32;
  for (let i = claims.length - 1; i >= 0; i--) {
    const pos = claimPos[i];
    if (mouseX > pos.x - tagW / 2 && mouseX < pos.x + tagW / 2 && mouseY > pos.y - tagH / 2 && mouseY < pos.y + tagH / 2) {
      dragIdx = i;
      return;
    }
  }
}

function mouseDragged() {
  if (dragIdx === null) return;
  claimPos[dragIdx].x = mouseX;
  claimPos[dragIdx].y = mouseY;
}

function mouseReleased() {
  if (dragIdx === null) return;
  const cz = convergenceZone;
  const x = claimPos[dragIdx].x, y = claimPos[dragIdx].y;
  inCenter[dragIdx] = x > cz.x && x < cz.x + cz.w && y > cz.y && y < cz.y + cz.h;
  checked = false;
  dragIdx = null;
}

function resetAll() {
  claims.forEach((c, i) => {
    claimPos[i] = { x: panelCenters[c.home].x, y: panelCenters[c.home].y + 50 + (i % 3) * 5 };
    inCenter[i] = false;
  });
  checked = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayout();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
