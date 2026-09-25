// Capstone Format Selector
// CANVAS_HEIGHT: 460
// Bloom Level: Create — begin designing an original capstone project.
// Instructional Design Check: Create-level -> a low-stakes branching tool that moves the student
// from "I don't know where to start" to one concrete first decision, without a single "correct"
// answer — multiple valid formats can result from the same answers.

let canvasWidth = 800;
let drawHeight = 380;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let defaultTextSize = 15;

let startOverButton, allFormatsButton;
let showAllFormats = false;

const questions = [
  { text: 'Do you have access to people who could be interviewed about this topic?', options: ['Yes', 'No', 'Not sure'] },
  { text: 'Is there a specific, current policy connected to your topic?', options: ['Yes', 'No'] },
  { text: 'Do you have strong visual or artifact evidence (photos, objects, documents)?', options: ['Yes', 'No'] },
  { text: 'Is there a living community with a present-day stake in this story?', options: ['Yes', 'No'] },
  { text: 'Would you rather present through video/audio, or written and visual analysis?', options: ['Video / Audio', 'Written / Visual'] }
];

let answers = [];
let currentQ = 0;
let optionBoxes = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  startOverButton = createButton('Start Over');
  startOverButton.position(10, drawHeight + 10);
  startOverButton.mousePressed(startOver);

  allFormatsButton = createButton('See All Formats');
  allFormatsButton.position(120, drawHeight + 10);
  allFormatsButton.mousePressed(() => { showAllFormats = !showAllFormats; });

  describe('A branching question sequence of 4 to 5 questions about your research topic, sources, and interests, each with button-choice answers. After the final question, a results panel recommends a capstone format with a rationale tied to your specific answers.', LABEL);
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
  textSize(18);
  noStroke();
  text('Capstone Format Selector', canvasWidth / 2, 8);

  if (showAllFormats) {
    drawAllFormats();
  } else if (currentQ < questions.length) {
    drawTrail();
    drawQuestion();
  } else {
    drawResults();
  }

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Answer each question to get a recommended capstone format.', 250, drawHeight + 25);
}

function drawTrail() {
  fill(80);
  textAlign(LEFT, TOP);
  textSize(11);
  let y = 34;
  for (let i = 0; i < currentQ; i++) {
    text((i + 1) + '. ' + questions[i].text + ' -> ' + answers[i], 20, y, canvasWidth - 40);
    y += 16;
  }
}

function drawQuestion() {
  const q = questions[currentQ];
  const qy = 34 + currentQ * 16 + 20;
  fill(20);
  textAlign(LEFT, TOP);
  textSize(16);
  text('Question ' + (currentQ + 1) + ' of ' + questions.length + ':', 20, qy);
  textSize(15);
  text(q.text, 20, qy + 24, canvasWidth - 40);

  optionBoxes = [];
  let x = 20;
  const y = qy + 70;
  q.options.forEach((opt) => {
    const w = textWidth(opt) + 40;
    fill(219, 234, 254);
    stroke(37, 99, 235);
    strokeWeight(1.5);
    rect(x, y, w, 40, 6);
    noStroke();
    fill(20);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(opt, x + w / 2, y + 20);
    optionBoxes.push({ x, y, w, h: 40, value: opt });
    x += w + 15;
  });
}

function drawResults() {
  drawTrail();
  const rec = computeRecommendation();
  const y = 34 + questions.length * 16 + 20;

  fill(255, 255, 255, 235);
  stroke(200);
  rect(20, y, canvasWidth - 40, drawHeight - y - 15, 8);
  noStroke();
  fill(20);
  textAlign(LEFT, TOP);
  textSize(16);
  textStyle(BOLD);
  text('Recommended format: ' + rec.formats.join(' or '), 32, y + 12, canvasWidth - 64);
  textStyle(NORMAL);
  textSize(13);
  text(rec.rationale, 32, y + 40, canvasWidth - 64);
  fill(80);
  textSize(11);
  text('See the format comparison table in Chapter 14: Research Methods and the Capstone Project for full details on each format.', 32, y + 40 + textHeightEstimate(rec.rationale, canvasWidth - 64), canvasWidth - 64);
}

function textHeightEstimate(txt, w) {
  const charsPerLine = w / 6.5;
  return (Math.ceil(txt.length / charsPerLine) + 1) * 16;
}

function computeRecommendation() {
  const [interview, policy, artifact, community, medium] = answers;
  const formats = [];
  let rationale = '';

  if (policy === 'Yes') {
    formats.push('Policy Proposal');
  }
  if (community === 'Yes' && policy !== 'Yes') {
    formats.push('Community Action');
  }
  if (interview === 'Yes' && medium === 'Video / Audio') {
    formats.push('Historical Documentary');
  }
  if (artifact === 'Yes' && medium === 'Written / Visual') {
    formats.push('Exhibit Design');
  }
  if (formats.length === 0) {
    formats.push(medium === 'Video / Audio' ? 'Historical Documentary' : 'Exhibit Design');
  }

  rationale = 'Based on your answers: ' +
    (policy === 'Yes' ? 'your topic connects to a current policy, which fits a Policy Proposal. ' : '') +
    (community === 'Yes' ? 'a living community has a present-day stake, which fits Community Action. ' : '') +
    (interview === 'Yes' ? 'you have interview access, which supports oral-history-driven formats like a Historical Documentary. ' : '') +
    (artifact === 'Yes' ? 'you have strong visual/artifact evidence, which supports Exhibit Design. ' : '') +
    'Your preferred medium (' + medium + ') also shaped this recommendation.';

  return { formats, rationale };
}

function mousePressed() {
  if (mouseY >= drawHeight || showAllFormats) return;
  if (currentQ >= questions.length) return;
  for (const b of optionBoxes) {
    if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      answers[currentQ] = b.value;
      currentQ++;
      return;
    }
  }
}

function drawAllFormats() {
  const formats = [
    ['Historical Documentary', 'Best for narratives with strong oral history or visual source material.'],
    ['Exhibit Design', 'Best for narratives with strong artifact or image evidence.'],
    ['Policy Proposal', 'Best for narratives connected to an ongoing, addressable policy issue.'],
    ['Community Action', 'Best for narratives with a living, present-day community stake.']
  ];
  let y = 40;
  formats.forEach((f) => {
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(20, y, canvasWidth - 40, 60, 6);
    noStroke();
    fill(20);
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    text(f[0], 32, y + 8);
    textStyle(NORMAL);
    textSize(12);
    text(f[1], 32, y + 28, canvasWidth - 64);
    y += 72;
  });
}

function startOver() {
  answers = [];
  currentQ = 0;
  showAllFormats = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
