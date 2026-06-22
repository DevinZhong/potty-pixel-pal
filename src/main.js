const toy = document.querySelector(".toy");
const handle = document.querySelector(".handle-grip");
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
let dragStartY = 0;

function setFace(face) {
  toy.dataset.face = face;
  faceIndex = Math.max(0, faces.indexOf(face));
}

function setHandleAngle(angle) {
  handleAngle = Math.max(0, Math.min(90, angle));
  const progress = handleAngle / 90;
  const frameY = progress * 149;
  const sideHeight = 195 - progress * 154;
  const sideTilt = progress * 24;
  const sideOpacity = 1;
  toy.style.setProperty("--handle-angle", handleAngle + "deg");
  toy.style.setProperty("--handle-bar-y", frameY + "px");
  toy.style.setProperty("--handle-side-height", sideHeight + "px");
  toy.style.setProperty("--handle-side-tilt", sideTilt + "deg");
  toy.style.setProperty("--handle-side-opacity", String(sideOpacity));
}

function resetHandle() {
  handle.classList.remove("is-dragging");
  toy.classList.remove("is-pulling");
  setHandleAngle(0);
}

function say(text, face = "focus", hold = 950) {
  statusText.textContent = text;
  toy.dataset.message = text === "SMARTY PANTS" ? "brand" : "short";
  setFace(face);
  window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => {
    if (mode === "train") {
      statusText.textContent = "SMARTY PANTS";
      toy.dataset.message = "brand";
      setFace("idle");
    }
  }, hold);
}

function buzz(text = "NOPE") {
  statusText.textContent = text;
  toy.dataset.message = "short";
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
  pullWindow = window.setTimeout(() => {
    pullCount = 0;
  }, 1500);

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
  const distance = Math.max(0, event.clientY - dragStartY);
  setHandleAngle(distance / 104 * 90);
}

handle.addEventListener("pointerdown", (event) => {
  isDraggingHandle = true;
  dragStartY = event.clientY;
  handle.setPointerCapture(event.pointerId);
  handle.classList.add("is-dragging");
  toy.classList.add("is-pulling");
  setHandleAngle(0);
});

handle.addEventListener("pointermove", (event) => {
  if (!isDraggingHandle) return;
  updateHandleFromPointer(event);
});

function finishHandleDrag(event) {
  if (!isDraggingHandle) return;
  isDraggingHandle = false;
  const completed = handleAngle >= 86;
  if (handle.hasPointerCapture(event.pointerId)) {
    handle.releasePointerCapture(event.pointerId);
  }
  resetHandle();
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
  toy.dataset.message = "short";
  setFace("focus");
  window.clearTimeout(gameTimer);
  gameTimer = window.setTimeout(spawnPoop, 760);
}

function stopGame(text = "SMARTY PANTS") {
  mode = "train";
  toy.dataset.mode = "train";
  clearPoop();
  window.clearTimeout(gameTimer);
  statusText.textContent = text;
  toy.dataset.message = text === "SMARTY PANTS" ? "brand" : "short";
  setFace("idle");
  window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => {
    statusText.textContent = "SMARTY PANTS";
    toy.dataset.message = "brand";
  }, 900);
}

function spawnPoop() {
  clearPoop();
  activeLane = Math.floor(Math.random() * 3);
  toy.dataset.poop = String(activeLane);
  statusText.textContent = combo > 2 ? "X" + combo : "POP";
  toy.dataset.message = "short";
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
    toy.dataset.message = "short";
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
    if (mode === "game") stopGame("SMARTY PANTS");
    else startGame();
  }
});

window.setInterval(() => {
  if (mode !== "train" || isDraggingHandle) return;
  if (Math.random() > 0.32) return;
  setFace("sleep");
  window.setTimeout(() => setFace("idle"), 180);
}, 3200);

say("SMARTY PANTS", "happy", 1000);






