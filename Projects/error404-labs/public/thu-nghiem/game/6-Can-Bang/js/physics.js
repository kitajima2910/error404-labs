"use strict";

import { 
  VIEW_W, VIEW_H, BALL_RADIUS, BALL_BASE_MASS, 
  MAX_WIND_FORCE, BOARD_LENGTH, BOARD_HEIGHT, 
  BOARD_MAX_ANGLE, BOARD_SAFE_ANGLE, GRAVITY, GROUND_Y,
  clamp, randRange 
} from './constants.js';
import { state, input } from './state.js';

export function rand() {
  return state.rng();
}

export function updateAttachedBallPosition() {
  const tangentX = Math.cos(state.board.angle);
  const tangentY = Math.sin(state.board.angle);
  const normalX = -Math.sin(state.board.angle);
  const normalY = Math.cos(state.board.angle);
  const offset = state.board.height * 0.5 + state.ball.radius + 4;
  const radialX = tangentX * state.ball.s + normalX * offset;
  const radialY = tangentY * state.ball.s + normalY * offset;
  state.ball.x = state.board.x + radialX;
  state.ball.y = state.board.y + radialY;
  state.ball.vx = tangentX * state.ball.sVel - state.board.angularVelocity * radialY;
  state.ball.vy = tangentY * state.ball.sVel + state.board.angularVelocity * radialX;
}

export function chooseWind(forceFull) {
  const power = Math.pow(rand(), 0.78);
  const intensity = (forceFull ? 0.18 : 0.22) + power * (forceFull ? 0.36 : 0.68);
  state.wind.direction = rand() > 0.5 ? 1 : -1;
  state.wind.target = state.wind.direction * intensity * MAX_WIND_FORCE;
  state.wind.timer = randRange(forceFull ? 1.7 : 1.1, forceFull ? 3.4 : 3.1);
}

export function resetGame(mode = "title", audio) {
  state.mode = mode;
  state.time = 0;
  state.score = 0;
  state.flash = 0;
  state.pulse = 0;
  state.lastActionLabel = mode === "playing" ? "balance" : "tap-start";

  state.board.angle = 0;
  state.board.prevAngle = 0;
  state.board.angularVelocity = 0;
  state.board.control = 0;

  state.ball.s = randRange(-16, 16);
  state.ball.prevS = state.ball.s;
  state.ball.sVel = 0;
  state.ball.spin = 0;
  state.ball.prevSpin = 0;
  state.ball.massNorm = 1;
  state.ball.mass = BALL_BASE_MASS;
  state.ball.weightNoise = 0;
  state.ball.weightTarget = 0;
  state.ball.weightTimer = randRange(0.4, 0.9);
  state.ball.danger = 0;
  state.ball.onBoard = true;
  state.ball.prevOnBoard = true;
  updateAttachedBallPosition();
  state.ball.prevX = state.ball.x;
  state.ball.prevY = state.ball.y;

  state.wind.current = 0;
  state.wind.prevCurrent = 0;
  state.wind.target = 0;
  state.wind.strength = 0;
  state.wind.spawnCarry = 0;
  chooseWind(true);

  state.camera.x = 0;
  state.camera.y = 0;

  for (let i = 0; i < state.particles.length; i += 1) {
    state.particles[i].active = false;
  }
}

export function startGame(audio) {
  audio.resume();
  resetGame("playing", audio);
}

export function triggerGameOver(audio) {
  if (state.mode !== "playing") {
    return;
  }
  state.mode = "gameover";
  state.bestScore = Math.max(state.bestScore, state.score);
  state.flash = 0.9;
  state.lastActionLabel = "restart-available";
  audio.playGameOver();
}

export function updateInput(dt) {
  const leftActive = input.leftKey || input.leftTouch;
  const rightActive = input.rightKey || input.rightTouch;
  const rawAxis = (rightActive ? 1 : 0) - (leftActive ? 1 : 0);
  if (rawAxis !== 0) {
    input.boost = clamp(input.boost + dt * 1.65, 0, 1);
  } else {
    input.boost = clamp(input.boost - dt * 2.3, 0, 1);
  }
  input.axis = rawAxis * (0.68 + input.boost * 0.42);
  input.smoothAxis += (input.axis - input.smoothAxis) * Math.min(1, dt * 8.5);
}

export function capturePreviousState() {
  state.board.prevAngle = state.board.angle;
  state.ball.prevOnBoard = state.ball.onBoard;
  state.ball.prevS = state.ball.s;
  state.ball.prevX = state.ball.x;
  state.ball.prevY = state.ball.y;
  state.ball.prevSpin = state.ball.spin;
  state.wind.prevCurrent = state.wind.current;
}

export function updateWeight(dt) {
  state.ball.weightTimer -= dt;
  if (state.ball.weightTimer <= 0) {
    state.ball.weightTimer = randRange(0.35, 0.95);
    state.ball.weightTarget = randRange(-0.12, 0.2);
  }
  state.ball.weightNoise += (state.ball.weightTarget - state.ball.weightNoise) * Math.min(1, dt * 3.5);
  const oscillation = Math.sin(state.time * 1.85) * 0.22;
  const ripple = Math.sin(state.time * 5.6 + 0.8) * 0.03;
  state.ball.massNorm = clamp(1 + oscillation + ripple + state.ball.weightNoise, 0.68, 1.55);
  state.ball.mass = BALL_BASE_MASS * state.ball.massNorm;
}

export function updateWind(dt) {
  state.wind.timer -= dt;
  if (state.wind.timer <= 0) {
    chooseWind(false);
  }
  state.wind.current += (state.wind.target - state.wind.current) * Math.min(1, dt * 2.2);
  state.wind.strength = clamp(Math.abs(state.wind.current) / MAX_WIND_FORCE, 0, 1);
}

export function updateBoard(dt) {
  const edgeRatio = clamp(Math.abs(state.ball.s) / (state.board.length * 0.5), 0, 1);
  const loadTorque = state.ball.onBoard ? -(state.ball.s / (state.board.length * 0.5)) * (10 + state.ball.massNorm * 10.5) : 0;
  const controlTorque = -input.smoothAxis * 24.5;
  const restoreTorque = -Math.sin(state.board.angle) * 8.8;
  const windTorque = -state.wind.current * 0.0011 * (state.ball.onBoard ? 1 : 0.25);
  const wobbleTorque = Math.sin(state.time * 28 + state.ball.massNorm * 3.6) * edgeRatio * 1.1;
  state.board.angularVelocity += (controlTorque + loadTorque + restoreTorque + windTorque + wobbleTorque - state.board.angularVelocity * 6.25) * dt;
  state.board.angle += state.board.angularVelocity * dt;
  if (state.board.angle > BOARD_MAX_ANGLE) {
    state.board.angle = BOARD_MAX_ANGLE;
    state.board.angularVelocity *= 0.3;
  } else if (state.board.angle < -BOARD_MAX_ANGLE) {
    state.board.angle = -BOARD_MAX_ANGLE;
    state.board.angularVelocity *= 0.3;
  }
}

export function detachBall() {
  if (!state.ball.onBoard) {
    return;
  }
  state.ball.onBoard = false;
  const tangentX = Math.cos(state.board.angle);
  const tangentY = Math.sin(state.board.angle);
  const releaseBoost = 120 + clamp(Math.abs(state.board.angle) / BOARD_MAX_ANGLE, 0, 1) * 160;
  const pushSign = state.ball.sVel !== 0 ? Math.sign(state.ball.sVel) : Math.sign(state.ball.s || state.board.angle || 1);
  state.ball.vx += tangentX * releaseBoost * pushSign;
  state.ball.vy += tangentY * releaseBoost * pushSign;
}

export function updateBall(dt, audio) {
  if (state.ball.onBoard) {
    const tiltDanger = clamp((Math.abs(state.board.angle) - BOARD_SAFE_ANGLE) / (BOARD_MAX_ANGLE - BOARD_SAFE_ANGLE), 0, 1);
    const slopeAccel = -GRAVITY * Math.sin(state.board.angle);
    const windAccel = state.wind.current / state.ball.massNorm;
    const angularInfluence = -state.board.angularVelocity * 320;
    const jitter = (rand() - 0.5) * (18 + tiltDanger * 110);
    let accel = slopeAccel + windAccel * 0.3 + angularInfluence + jitter;
    const friction = 610 * (1.08 - tiltDanger * 0.45);
    if (Math.abs(state.ball.sVel) > 5) {
      accel += -Math.sign(state.ball.sVel) * friction;
    } else {
      accel += -Math.sign(accel || 1) * Math.min(Math.abs(accel), friction * 0.6);
    }
    if (Math.abs(state.board.angle) > BOARD_SAFE_ANGLE) {
      accel += -Math.sign(state.board.angle) * tiltDanger * 320;
    }

    state.ball.sVel += accel * dt;
    state.ball.s += state.ball.sVel * dt;
    state.ball.spin -= (state.ball.sVel / state.ball.radius) * dt;
    updateAttachedBallPosition();

    const halfLength = state.board.length * 0.5 - state.ball.radius * 0.18;
    if (Math.abs(state.ball.s) >= halfLength || (tiltDanger > 0.9 && Math.abs(state.ball.s) > halfLength * 0.78)) {
      detachBall();
    }
  }

  if (!state.ball.onBoard) {
    state.ball.vx += (state.wind.current / state.ball.massNorm) * 0.26 * dt;
    state.ball.vy -= GRAVITY * dt;
    state.ball.x += state.ball.vx * dt;
    state.ball.y += state.ball.vy * dt;
    state.ball.spin -= (state.ball.vx / state.ball.radius) * dt * 0.4;

    if (state.ball.y <= GROUND_Y + state.ball.radius * 0.28 || state.ball.x < -120 || state.ball.x > VIEW_W + 120) {
      triggerGameOver(audio);
    }
  }

  const edgeDanger = state.ball.onBoard
    ? clamp((Math.abs(state.ball.s) - (state.board.length * 0.5 - state.ball.radius * 1.7)) / (state.ball.radius * 1.5), 0, 1)
    : 1;
  const tiltDanger = clamp((Math.abs(state.board.angle) - BOARD_SAFE_ANGLE) / (BOARD_MAX_ANGLE - BOARD_SAFE_ANGLE), 0, 1);
  const targetDanger = Math.max(edgeDanger, tiltDanger);
  state.ball.danger += (targetDanger - state.ball.danger) * Math.min(1, dt * 5.4);
}

export function spawnWindParticle() {
  const particle = state.particles[state.particleCursor];
  state.particleCursor = (state.particleCursor + 1) % state.particles.length;
  particle.active = true;
  particle.life = 0;
  particle.maxLife = randRange(0.55, 1.3);
  particle.len = randRange(22, 70);
  particle.width = randRange(1.2, 3.5);
  particle.alpha = randRange(0.08, 0.22);
  particle.x = state.wind.direction > 0 ? -80 : VIEW_W + 80;
  particle.y = randRange(180, VIEW_H - 170);
  particle.vx = state.wind.direction * randRange(260, 620) * (0.45 + state.wind.strength * 0.9);
  particle.vy = randRange(-18, 18);
}

export function updateParticles(dt) {
  state.wind.spawnCarry += state.wind.strength * 42 * dt;
  while (state.wind.spawnCarry >= 1) {
    spawnWindParticle();
    state.wind.spawnCarry -= 1;
  }

  for (let i = 0; i < state.particles.length; i += 1) {
    const particle = state.particles[i];
    if (!particle.active) {
      continue;
    }
    particle.life += dt;
    if (particle.life >= particle.maxLife) {
      particle.active = false;
      continue;
    }
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    if (particle.x < -140 || particle.x > VIEW_W + 140) {
      particle.active = false;
    }
  }
}

export function updatePlaying(dt, audio) {
  updateInput(dt);
  updateWeight(dt);
  updateWind(dt);
  updateBoard(dt);
  updateBall(dt, audio);
  updateParticles(dt);

  state.score += dt;
  state.flash = Math.max(state.flash * (1 - dt * 3.6), state.ball.danger * 0.35);
  state.pulse += dt * (4.5 + state.ball.danger * 6.5);
  state.camera.x = Math.sin(state.time * 36) * (state.wind.strength * 7 + state.ball.danger * 3.4);
  state.camera.y = Math.cos(state.time * 29) * (state.wind.strength * 3.8);
}

export function updateAmbient(dt) {
  updateWind(dt);
  updateParticles(dt);
  state.flash = Math.max(0, state.flash - dt * 1.6);
  state.camera.x = Math.sin(state.time * 18) * state.wind.strength * 2.5;
  state.camera.y = Math.cos(state.time * 13) * state.wind.strength * 1.4;
}

export function step(dt, audio) {
  state.time += dt;
  capturePreviousState();
  if (state.mode === "playing") {
    updatePlaying(dt, audio);
  } else {
    updateInput(dt);
    updateAmbient(dt);
  }
  audio.update(state);
}
