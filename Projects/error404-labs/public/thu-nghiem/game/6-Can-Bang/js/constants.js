"use strict";

export const VIEW_W = 1600;
export const VIEW_H = 900;
export const FIXED_DT = 1 / 60;
export const MAX_FRAME_DT = 1 / 20;
export const GRAVITY = 1580;
export const BOARD_MAX_ANGLE = Math.PI / 5.8;
export const BOARD_SAFE_ANGLE = Math.PI / 12;
export const MAX_WIND_FORCE = 840;
export const BALL_BASE_MASS = 1;
export const BALL_RADIUS = 34;
export const BOARD_LENGTH = 560;
export const BOARD_HEIGHT = 28;
export const GROUND_Y = 96;
export const PARTICLE_COUNT = 96;

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function mix(a, b, t) {
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t),
    lerp(a[2], b[2], t),
    lerp(a[3], b[3], t),
  ];
}

export function containsPoint(rect, x, y) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

export function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randRange(min, max, rng = Math.random) {
  return min + (max - min) * (typeof rng === 'function' ? rng() : Math.random());
}

export function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
  }
  return shader;
}

export function createProgram(gl, vertexSource, fragmentSource) {
  const program = gl.createProgram();
  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
  }
  return program;
}

export function createOrthoMatrix(left, right, bottom, top) {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  return new Float32Array([
    -2 * lr, 0, 0, 0,
    0, -2 * bt, 0, 0,
    0, 0, 1, 0,
    (left + right) * lr, (top + bottom) * bt, 0, 1,
  ]);
}
