"use strict";

import { VIEW_W, VIEW_H, FIXED_DT, containsPoint } from './constants.js';
import { state, input, updateInput } from './state.js';
import { Renderer } from './renderer.js';
import { AudioSystem } from './audio.js';
import { startGame, step } from './physics.js';
import { render, render_game_to_text } from './draw.js';

const canvas = document.getElementById("game");
const audioToggleButton = document.getElementById("audio-toggle");
const gl = canvas.getContext("webgl2", {
  alpha: false,
  antialias: true,
  depth: false,
  stencil: false,
  premultipliedAlpha: false,
});
if (!gl) {
  throw new Error("WebGL2 is not supported in this browser.");
}

const uiCanvas = document.createElement("canvas");
uiCanvas.width = VIEW_W;
uiCanvas.height = VIEW_H;
const uiCtx = uiCanvas.getContext("2d");
const renderer = new Renderer(gl, canvas);
const audio = new AudioSystem();

function syncAudioButton() {
  if (!audioToggleButton) {
    return;
  }
  audioToggleButton.textContent = state.audioMuted ? "NH\u1ea0C: T\u1eaeT" : "NH\u1ea0C: B\u1eacT";
  audioToggleButton.classList.toggle("is-muted", state.audioMuted);
}

let lastTime = 0;
let frameId = null;

function gameLoop(timestamp) {
  if (!lastTime) {
    lastTime = timestamp;
  }
  const dt = Math.min((timestamp - lastTime) * 0.001, 0.1);
  lastTime = timestamp;

  if (state.triggerStart) {
    state.triggerStart = false;
    startGame(audio);
  }

  step(dt, audio);

  render(renderer, uiCtx, uiCanvas, 1);

  frameId = requestAnimationFrame(gameLoop);
}

// Input Handlers
function handlePointer(e) {
  if (e.type === "pointerdown") {
    audio.resume();
  }
  const rect = canvas.getBoundingClientRect();
  const scaleX = VIEW_W / rect.width;
  const scaleY = VIEW_H / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const uiY = (e.clientY - rect.top) * scaleY;
  const y = VIEW_H - uiY;

  if (
    e.type === "pointerdown" &&
    state.mode !== "playing" &&
    (containsPoint(state.ui.startButton, x, uiY) || containsPoint(state.ui.restartButton, x, uiY))
  ) {
    state.triggerStart = true;
  }
  
  const isDown = e.type === "pointerdown" || e.type === "pointermove" && e.buttons > 0;
  updateInput(x, y, isDown);
}

function handleKeyDown(e) {
  audio.resume();
  if (e.code === "Space" || e.code === "KeyR" || e.code === "Enter") {
    if (state.mode !== "playing") {
      state.triggerStart = true;
    }
  }
  if (e.code === "ArrowLeft" || e.code === "KeyA") {
    input.leftKey = true;
  }
  if (e.code === "ArrowRight" || e.code === "KeyD") {
    input.rightKey = true;
  }
  if (e.code === "KeyF") {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  }
  if (e.code === "KeyM") {
    state.audioMuted = audio.toggleMute();
    syncAudioButton();
  }
}

function handleKeyUp(e) {
  if (e.code === "ArrowLeft" || e.code === "KeyA") {
    input.leftKey = false;
  }
  if (e.code === "ArrowRight" || e.code === "KeyD") {
    input.rightKey = false;
  }
}

// Global Testing Hooks
window.advanceTime = (dt) => {
  const seconds = Math.max(0, dt) / 1000;
  let remaining = seconds;
  while (remaining > 0) {
    const slice = Math.min(FIXED_DT, remaining);
    step(slice, audio);
    remaining -= slice;
  }
  render(renderer, uiCtx, uiCanvas, 1);
};
window.render_game_to_text = () => render_game_to_text();

// Initialization
async function init() {
  renderer.resize();
  syncAudioButton();
  if (audioToggleButton) {
    audioToggleButton.addEventListener("click", () => {
      audio.resume();
      state.audioMuted = audio.toggleMute();
      syncAudioButton();
    });
  }
  window.addEventListener("pointerdown", handlePointer);
  window.addEventListener("pointermove", handlePointer);
  window.addEventListener("pointerup", handlePointer);
  window.addEventListener("touchstart", () => audio.resume(), { passive: true });
  window.addEventListener("resize", () => renderer.resize());
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  requestAnimationFrame(gameLoop);
}

init().catch(err => console.error("Game initialization failed:", err));
