"use strict";

import { 
  VIEW_W, VIEW_H, BOARD_LENGTH, BOARD_HEIGHT, 
  BALL_RADIUS, BALL_BASE_MASS, PARTICLE_COUNT, mulberry32 
} from './constants.js';

export const state = {
  rng: mulberry32(0x4046cb),
  mode: "title",
  time: 0,
  score: 0,
  bestScore: 0,
  accumulator: 0,
  board: {
    x: VIEW_W * 0.5,
    y: 406,
    length: BOARD_LENGTH,
    height: BOARD_HEIGHT,
    angle: 0,
    prevAngle: 0,
    angularVelocity: 0,
    control: 0,
  },
  ball: {
    radius: BALL_RADIUS,
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    vx: 0,
    vy: 0,
    s: 0,
    prevS: 0,
    sVel: 0,
    spin: 0,
    prevSpin: 0,
    mass: BALL_BASE_MASS,
    massNorm: 1,
    weightNoise: 0,
    weightTarget: 0,
    weightTimer: 0,
    danger: 0,
    onBoard: true,
    prevOnBoard: true,
  },
  wind: {
    current: 0,
    prevCurrent: 0,
    target: 0,
    strength: 0,
    timer: 0,
    direction: 1,
    spawnCarry: 0,
  },
  camera: {
    x: 0,
    y: 0,
  },
  flash: 0,
  pulse: 0,
  lastActionLabel: "tap-start",
  ui: {
    startButton: { x: VIEW_W * 0.5 - 164, y: 504, w: 328, h: 76 },
    restartButton: { x: VIEW_W * 0.5 - 164, y: 470, w: 328, h: 76 },
  },
  particles: new Array(PARTICLE_COUNT).fill(0).map(() => ({
    active: false,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    life: 0,
    maxLife: 1,
    len: 0,
    width: 0,
    alpha: 0,
  })),
  particleCursor: 0,
};

export const input = {
  leftKey: false,
  rightKey: false,
  leftTouch: false,
  rightTouch: false,
  axis: 0,
  smoothAxis: 0,
  boost: 0,
  activePointers: new Map(),
};

export function updateInput(x, y, isDown) {
  if (isDown) {
    if (x < VIEW_W * 0.5) {
      input.leftTouch = true;
      input.rightTouch = false;
    } else {
      input.leftTouch = false;
      input.rightTouch = true;
    }
  } else {
    input.leftTouch = false;
    input.rightTouch = false;
  }
}

export function resetGameState() {
  state.mode = "playing";
  state.time = 0;
  state.score = 0;
  state.accumulator = 0;
  state.board.angle = 0;
  state.board.prevAngle = 0;
  state.board.angularVelocity = 0;
  state.board.control = 0;
  state.ball.x = 0;
  state.ball.y = 0;
  state.ball.prevX = 0;
  state.ball.prevY = 0;
  state.ball.vx = 0;
  state.ball.vy = 0;
  state.ball.s = 0;
  state.ball.prevS = 0;
  state.ball.sVel = 0;
  state.ball.spin = 0;
  state.ball.prevSpin = 0;
  state.ball.mass = BALL_BASE_MASS;
  state.ball.massNorm = 1;
  state.ball.onBoard = true;
  state.ball.prevOnBoard = true;
  state.wind.current = 0;
  state.wind.prevCurrent = 0;
  state.wind.target = 0;
  state.wind.strength = 0;
  state.wind.timer = 0;
  state.wind.direction = 1;
  state.wind.spawnCarry = 0;
  state.camera.x = 0;
  state.camera.y = 0;
  state.flash = 0.5;
  state.pulse = 0;
}
