// The Power Structure Pyramid
// CANVAS_HEIGHT: 460
// Bloom Level: Understand — explain how privilege and systemic oppression relate to one structure.
// Instructional Design Check: Understand-level -> concrete, labeled, explorable diagram with
// two label-set views rather than animation; drag interaction lets students place a figure and
// see which band it currently occupies (data visibility), not a passive illustration.

let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let defaultTextSize = 16;

let viewToggleButton;
let privilegeView = true; // true = "Privilege view", false = "Systemic Oppression view"
let selectedBand = null;

const bandNamesPrivilege = [
  'Concentrated Authority',
  'Institutional Access',
  'Everyday Advantage',
  'Structural Foundation (Laws, Norms, History)'
];
const bandNamesOppression = [
  'Concentrated Authority Denied',
  'Institutional Access Blocked',
  'Everyday Disadvantage',
  'Structural Foundation (Laws, Norms, History)'
];
const bandDefs = [
  'The narrowest band at the top: the small number of positions that hold decision-making authority over institutions and resources.',
  'Access to the institutions (schools, courts, banks) that connect everyday life to concentrated authority — easier for some groups to reach than others.',
  'The lived, day-to-day experience of advantage or disadvantage that results from a person\'s position in the structure below.',
  'The base of the pyramid: the laws, norms, and history (see Chapter 1\'s marginalization) that the entire structure rests on and reproduces.'
];

// figures: y is a 0..1 fraction of drawing height (top=0)
let privilegedFigure = { x: 0, yFrac: 0.35, color: [212, 175, 55], label: 'Privileged Position', dragging: false };
let marginalizedFigure = { x: 0, yFrac: 0.65, color: [120, 120, 120], label: 'Marginalized Position', dragging: false };

let pyramidLeft, pyramidRight, pyramidTop, pyramidBottom;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  viewToggleButton = createButton('Switch to Systemic Oppression View');
  viewToggleButton.position(10, drawHeight + 15);
  viewToggleButton.mousePressed(toggleView);

  updateLayout();
  describe('A four-band pyramid diagram with two draggable figures showing where a Privileged Position and a Marginalized Position sit within the same power structure. A toggle switches the labels between a privilege framing and a systemic-oppression framing.', LABEL);
}

function updateLayout() {
  pyramidLeft = canvasWidth * 0.08;
  pyramidRight = canvasWidth * 0.56;
  pyramidTop = 50;
  pyramidBottom = drawHeight - 20;
  privilegedFigure.x = pyramidRight + 40;
  marginalizedFigure.x = pyramidRight + 110;
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
  textSize(22);
  noStroke();
  text('The Power Structure Pyramid', canvasWidth * 0.32, 12);

  const names = privilegeView ? bandNamesPrivilege : bandNamesOppression;
  const bandH = (pyramidBottom - pyramidTop) / 4;
  const shades = [230, 190, 150, 110]; // dark bottom (index 3) to light top (index 0) — reversed below

  for (let i = 0; i < 4; i++) {
    const y0 = pyramidTop + i * bandH;
    const y1 = y0 + bandH;
    const topFrac = i / 4;
    const botFrac = (i + 1) / 4;
    const wTop = lerp(0.15, 1, topFrac) * (pyramidRight - pyramidLeft);
    const wBot = lerp(0.15, 1, botFrac) * (pyramidRight - pyramidLeft);
    const cx = (pyramidLeft + pyramidRight) / 2;
    const blue = 235 - i * 35;
    fill(30, 80, blue);
    stroke(20, 50, 100);
    strokeWeight(selectedBand === i ? 3 : 1);
    quad(cx - wTop / 2, y0, cx + wTop / 2, y0, cx + wBot / 2, y1, cx - wBot / 2, y1);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(names[i], cx, (y0 + y1) / 2, wBot - 10);
  }

  // dashed connector lines from figures to their current band
  drawConnector(privilegedFigure);
  drawConnector(marginalizedFigure);

  // draw figures
  drawFigure(privilegedFigure);
  drawFigure(marginalizedFigure);

  // info panel
  const panelX = pyramidRight + 170;
  const panelW = canvasWidth - panelX - 15;
  if (panelW > 80) {
    fill(255, 255, 255, 235);
    stroke(200);
    rect(panelX, 45, panelW, drawHeight - 65, 8);
    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    textSize(14);
    if (selectedBand !== null) {
      text(names[selectedBand], panelX + 10, 58, panelW - 20);
      text(bandDefs[selectedBand], panelX + 10, 84, panelW - 20);
    } else {
      text('Click a pyramid band to see its definition. Drag the gold and gray figures to different bands.', panelX + 10, 58, panelW - 20);
    }
  }

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Current view: ' + (privilegeView ? 'Privilege' : 'Systemic Oppression'), 270, drawHeight + 30);
}

function drawConnector(fig) {
  const bandH = (pyramidBottom - pyramidTop) / 4;
  const y = pyramidTop + fig.yFrac * (pyramidBottom - pyramidTop);
  const cx = (pyramidLeft + pyramidRight) / 2;
  stroke(fig.color[0], fig.color[1], fig.color[2]);
  strokeWeight(2);
  drawingContext.setLineDash([4, 4]);
  line(cx + 60, y, fig.x, y);
  drawingContext.setLineDash([]);
}

function drawFigure(fig) {
  const y = pyramidTop + fig.yFrac * (pyramidBottom - pyramidTop);
  fig.currentY = y;
  stroke(30);
  strokeWeight(1.5);
  fill(fig.color[0], fig.color[1], fig.color[2]);
  ellipse(fig.x, y - 14, 20, 20); // head
  rect(fig.x - 12, y - 4, 24, 30, 6); // body
  noStroke();
  fill(20);
  textAlign(CENTER, TOP);
  textSize(11);
  text(fig.label, fig.x, y + 30, 90);
}

function bandIndexFromY(yFrac) {
  return constrain(floor(yFrac * 4), 0, 3);
}

function toggleView() {
  privilegeView = !privilegeView;
  viewToggleButton.html(privilegeView ? 'Switch to Systemic Oppression View' : 'Switch to Privilege View');
}

function mousePressed() {
  if (mouseY < drawHeight) {
    if (dist(mouseX, mouseY, privilegedFigure.x, privilegedFigure.currentY) < 25) {
      privilegedFigure.dragging = true;
      return;
    }
    if (dist(mouseX, mouseY, marginalizedFigure.x, marginalizedFigure.currentY) < 25) {
      marginalizedFigure.dragging = true;
      return;
    }
    // click on pyramid band
    if (mouseX > pyramidLeft - 20 && mouseX < pyramidRight + 20 && mouseY > pyramidTop && mouseY < pyramidBottom) {
      const frac = (mouseY - pyramidTop) / (pyramidBottom - pyramidTop);
      selectedBand = bandIndexFromY(frac);
    }
  }
}

function mouseDragged() {
  if (privilegedFigure.dragging) {
    privilegedFigure.yFrac = constrain((mouseY - pyramidTop) / (pyramidBottom - pyramidTop), 0.05, 0.95);
  }
  if (marginalizedFigure.dragging) {
    marginalizedFigure.yFrac = constrain((mouseY - pyramidTop) / (pyramidBottom - pyramidTop), 0.05, 0.95);
  }
}

function mouseReleased() {
  privilegedFigure.dragging = false;
  marginalizedFigure.dragging = false;
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
