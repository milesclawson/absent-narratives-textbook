// Strategy Toolkit — Choosing a Social Movement Tactic
// CANVAS_HEIGHT: 520
// Bloom Level: Apply — apply social movement strategy concepts to a specific scenario.
// Instructional Design Check: Apply-level -> student commits to a strategic mix before seeing
// the documented historical choice, preserving the cognitive work of application.

let canvasWidth = 800;
let drawHeight = 430;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let defaultTextSize = 15;

let scenarioSelect, compareButton;
let compared = false;

const scenarios = [
  {
    name: 'Voting Rights Campaign (1960s South)',
    desc: 'Goal: secure federal protection of Black citizens\' right to vote in the face of poll taxes, literacy tests, and intimidation. Resources: national civil rights organizations, church networks, national media attention. Political environment: hostile state governments, but growing federal sympathy.',
    used: ['Nonviolent Resistance', 'Civil Disobedience', 'Grassroots Organizing', 'Litigation'],
    explain: 'The Selma-to-Montgomery marches (nonviolent resistance and civil disobedience), local voter registration drives (grassroots organizing), and NAACP Legal Defense Fund cases (litigation) combined to produce the Voting Rights Act of 1965.'
  },
  {
    name: 'Workplace Organizing Campaign',
    desc: 'Goal: unionize a workplace to secure fair wages and safe conditions. Resources: workers themselves, a national union\'s organizing staff. Political environment: employer opposition, labor board oversight.',
    used: ['Grassroots Organizing', 'Nonviolent Resistance', 'Litigation'],
    explain: 'Labor campaigns typically rely on grassroots organizing (worker-to-worker outreach), nonviolent tactics like strikes and pickets, and litigation before labor relations boards to challenge unfair employer practices.'
  },
  {
    name: 'Marriage Equality Legal Campaign',
    desc: 'Goal: secure legal recognition of same-sex marriage nationwide. Resources: national legal advocacy organizations, growing public support, state-level ballot initiatives. Political environment: mixed — some states supportive, others opposed.',
    used: ['Litigation', 'Electoral Organizing', 'Grassroots Organizing'],
    explain: 'The marriage equality movement combined state-level ballot campaigns (electoral organizing), local grassroots outreach changing public opinion, and a sustained litigation strategy that culminated in Obergefell v. Hodges (2015).'
  }
];

const strategies = ['Nonviolent Resistance', 'Civil Disobedience', 'Grassroots Organizing', 'Litigation', 'Electoral Organizing'];
let selected = [false, false, false, false, false];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  scenarioSelect = createSelect();
  scenarios.forEach((s) => scenarioSelect.option(s.name));
  scenarioSelect.position(10, drawHeight + 10);
  scenarioSelect.changed(() => { compared = false; selected = selected.map(() => false); });

  compareButton = createButton('Compare to Historical Record');
  compareButton.position(280, drawHeight + 10);
  compareButton.mousePressed(() => { compared = true; });

  describe('A scenario dropdown describing a movement\'s goal, resources, and political environment, and five clickable strategy cards students can select in combination. A Compare button reveals which strategies the actual historical movement used.', LABEL);
}

function currentScenario() {
  const idx = scenarios.findIndex((s) => s.name === scenarioSelect.value());
  return scenarios[idx >= 0 ? idx : 0];
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

  const sc = currentScenario();
  const leftW = canvasWidth * 0.4;

  fill(30);
  textAlign(LEFT, TOP);
  textSize(15);
  noStroke();
  textStyle(BOLD);
  text(sc.name, 15, 12, leftW - 20);
  textStyle(NORMAL);
  textSize(12);
  text(sc.desc, 15, 40, leftW - 25);

  // strategy cards on the right
  const rightX = leftW + 20;
  const cardW = canvasWidth - rightX - 15;
  const cardH = 46;
  fill(20);
  textSize(13);
  text('Select the strategic mix you would use:', rightX, 12);

  let boxes = [];
  strategies.forEach((s, i) => {
    const y = 36 + i * (cardH + 8);
    boxes.push({ x: rightX, y, w: cardW, h: cardH });
    const isSel = selected[i];
    let isHistorical = false, notHistorical = false;
    if (compared) {
      isHistorical = sc.used.includes(s) && isSel;
      notHistorical = !sc.used.includes(s) && isSel;
    }
    if (compared && sc.used.includes(s)) {
      fill(220, 252, 231);
      stroke(22, 163, 74);
    } else if (notHistorical) {
      fill(254, 226, 226);
      stroke(220, 38, 38);
    } else {
      fill(isSel ? color(219, 234, 254) : color(255));
      stroke(isSel ? color(37, 99, 235) : color(160));
    }
    strokeWeight(1.5);
    rect(rightX, y, cardW, cardH, 5);
    noStroke();
    fill(20);
    textAlign(LEFT, CENTER);
    textSize(13);
    let label = s;
    if (compared && sc.used.includes(s)) label += '  [used historically]';
    else if (compared && !sc.used.includes(s) && isSel) label += '  [not historically used here]';
    text(label, rightX + 10, y + cardH / 2, cardW - 20);
  });
  window._strategyBoxes = boxes;

  if (compared) {
    const infoY = 36 + strategies.length * (cardH + 8) + 8;
    fill(255, 255, 255, 235);
    stroke(200);
    rect(15, infoY, canvasWidth - 30, drawHeight - infoY - 10, 6);
    noStroke();
    fill(30);
    textAlign(LEFT, TOP);
    textSize(12);
    text(sc.explain, 25, infoY + 8, canvasWidth - 50);
  }

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Scenario:', 10, drawHeight + 55);
}

function mousePressed() {
  if (mouseY >= drawHeight) return;
  const boxes = window._strategyBoxes || [];
  boxes.forEach((b, i) => {
    if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      selected[i] = !selected[i];
    }
  });
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
