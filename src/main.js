const toy = document.querySelector(".toy");
const handle = document.querySelector(".handle");
const buttons = Array.from(document.querySelectorAll(".toy-button"));
const statusText = document.querySelector("#statusText");

const faces = ["idle", "happy", "focus", "wink", "panic", "sleep"];
const trainingLines = {
  sit: ["NO. 1", "TRY 1", "SIT?", "WAIT"],
  flush: ["SWIRL", "FLUSH", "CLEAN", "WHOOSH"],
  done: ["NO. 2", "TRY 2", "DONE?", "GOOD JOB"]
};

let mode = "train";
let faceIndex = 0;
let activeLane = -1;
let score = 0;
let combo = 0;
let roundMs = 1320;
let gameTimer = 0;
let idleTimer = 0;
let pullCount = 0;
let pullWindow = 0;
let isDraggingHandle = false;
let handleAngle = 0;

function setFace(face) {
  toy.dataset.face = face;
  faceIndex = Math.max(0, faces.indexOf(face));
}

function setHandleAngle(angle) {
  handleAngle = Math.max(0, Math.min(90, angle));
  toy.style.setProperty("--handle-angle", `${handleAngle}deg`);
}

function resetHandle(fromAngle = handleAngle) {
  handle.style.setProperty("--release-angle", `${fromAngle}deg`);
  handle.classList.remove("is-dragging");
  handle.classList.add("is-snapback");
  setHandleAngle(0);
  window.setTimeout(() => handle.classList.remove("is-snapback"), 540);
}

function say(text, face = "focus", hold = 950) {
  statusText.textContent = text;
  setFace(face);
  window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => {
    if (mode === "train") {
      statusText.textContent = "PIP PANTS";
      setFace("idle");
    }
  }, hold);
}

function buzz(text = "NOPE") {
  statusText.textContent = text;
  setFace("panic");
  toy.classList.add("is-buzzing");
  window.setTimeout(() => toy.classList.remove("is-buzzing"), 160);
}

function pressButton(button) {
  button.classList.add("is-pressed");
  window.setTimeout(() => button.classList.remove("is-pressed"), 130);
}

function triggerHandle() {
  pullCount += 1;
  window.clearTimeout(pullWindow);
  pullWindow = window.setTimeout(() => { pullCount = 0; }, 1500);

  if (mode === "game") {
    stopGame("QUIT");
    return;
  }

  if (pullCount >= 3) {
    startGame();
    pullCount = 0;
    return;
  }

  faceIndex = (faceIndex + 1) % faces.length;
  const nextFace = faces[faceIndex];
  const line = nextFace === "sleep" ? "SLEEPY" : nextFace === "panic" ? "UH OH" : "HELLO";
  say(line, nextFace, 900);
}

function updateHandleFromPointer(event) {
  const rect = handle.getBoundingClientRect();
  const axisX = rect.left + rect.width / 2;
  const axisY = rect.top + rect.height * 0.82;
  const dx = event.clientX - axisX;
  const dy = event.clientY - axisY;
  const raw = Math.atan2(dy, Math.abs(dx) + 1) * 180 / Math.PI;
  setHandleAngle(Math.max(0, raw));
}

handle.addEventListener("pointerdown", (event) => {
  isDraggingHandle = true;
  handle.setPointerCapture(event.pointerId);
  handle.classList.remove("is-snapback");
  handle.classList.add("is-dragging");
  updateHandleFromPointer(event);
});

handle.addEventListener("pointermove", (event) => {
  if (!isDraggingHandle) return;
  updateHandleFromPointer(event);
});

function finishHandleDrag(event) {
  if (!isDraggingHandle) return;
  isDraggingHandle = false;
  const completed = handleAngle >= 84;
  const releaseAngle = handleAngle;
  if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
  resetHandle(releaseAngle);
  if (completed) {
    window.setTimeout(triggerHandle, 180);
  }
}

handle.addEventListener("pointerup", finishHandleDrag);
handle.addEventListener("pointercancel", finishHandleDrag);
handle.addEventListener("click", (event) => event.preventDefault());

function train(action) {
  const list = trainingLines[action];
  const text = list[Math.floor(Math.random() * list.length)];
  const face = action === "done" ? "happy" : action === "flush" ? "wink" : "focus";
  say(text, face, 1050);
}

function clearPoop() {
  delete toy.dataset.poop;
  activeLane = -1;
}

function startGame() {
  mode = "game";
  toy.dataset.mode = "game";
  score = 0;
  combo = 0;
  roundMs = 1320;
  statusText.textContent = "POTTY POP";
  setFace("focus");
  window.clearTimeout(gameTimer);
  gameTimer = window.setTimeout(spawnPoop, 760);
}

function stopGame(text = "PIP PANTS") {
  mode = "train";
  toy.dataset.mode = "train";
  clearPoop();
  window.clearTimeout(gameTimer);
  statusText.textContent = text;
  setFace("idle");
  window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => {
    statusText.textContent = "PIP PANTS";
  }, 900);
}

function spawnPoop() {
  clearPoop();
  activeLane = Math.floor(Math.random() * 3);
  toy.dataset.poop = String(activeLane);
  statusText.textContent = combo > 2 ? `X${combo}` : "POP";
  gameTimer = window.setTimeout(() => {
    combo = 0;
    buzz("MISS");
    gameTimer = window.setTimeout(spawnPoop, 620);
  }, roundMs);
}

function playLane(lane) {
  if (lane === activeLane) {
    window.clearTimeout(gameTimer);
    combo += 1;
    score += 1;
    clearPoop();
    roundMs = Math.max(780, roundMs - 30);
    statusText.textContent = score >= 10 ? "GOOD JOB" : "CLEAN";
    setFace(score >= 10 ? "happy" : "wink");
    if (score >= 10) {
      gameTimer = window.setTimeout(() => stopGame("GOOD JOB"), 950);
      return;
    }
    gameTimer = window.setTimeout(spawnPoop, 460);
    return;
  }
  combo = 0;
  buzz("WRONG");
}

function handleAction(action, lane, button) {
  pressButton(button);
  if (mode === "game") {
    playLane(lane);
    return;
  }
  train(action);
}

buttons.forEach((button, index) => {
  button.addEventListener("pointerdown", () => pressButton(button));
  button.addEventListener("click", () => handleAction(button.dataset.action, index, button));
});

window.addEventListener("keydown", (event) => {
  if (["1", "2", "3"].includes(event.key)) {
    const index = Number(event.key) - 1;
    handleAction(buttons[index].dataset.action, index, buttons[index]);
  }
  if (event.code === "Space") {
    if (mode === "game") stopGame("PIP PANTS");
    else startGame();
  }
});

window.setInterval(() => {
  if (mode !== "train" || isDraggingHandle) return;
  if (Math.random() > 0.32) return;
  setFace("sleep");
  window.setTimeout(() => setFace("idle"), 180);
}, 3200);

say("PIP PANTS", "happy", 1000);
