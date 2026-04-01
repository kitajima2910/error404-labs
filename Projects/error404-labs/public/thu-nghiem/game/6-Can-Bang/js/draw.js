"use strict";

import { VIEW_W, VIEW_H, MAX_WIND_FORCE, GROUND_Y, clamp, lerp, mix } from './constants.js';
import { state } from './state.js';

export function drawBackground(renderer) {
  renderer.rectGradient(0, 0, VIEW_W, VIEW_H, [0.2, 0.33, 0.47, 1], [0.03, 0.06, 0.1, 1]);
  renderer.rectGradient(0, 0, VIEW_W, 260, [0.18, 0.14, 0.09, 1], [0.06, 0.05, 0.03, 1]);

  const haze = [
    [120, 170, 240, 0.08],
    [100, 145, 195, 0.06],
    [80, 118, 160, 0.05],
  ];
  for (let i = 0; i < haze.length; i += 1) {
    const height = 170 - i * 26;
    const alpha = haze[i][3];
    renderer.rectGradient(
      0,
      300 + i * 40,
      VIEW_W,
      height,
      [haze[i][0] / 255, haze[i][1] / 255, haze[i][2] / 255, alpha],
      [haze[i][0] / 255, haze[i][1] / 255, haze[i][2] / 255, 0]
    );
  }

  renderer.rectGradient(0, 0, VIEW_W, GROUND_Y + 32, [0.18, 0.17, 0.12, 1], [0.06, 0.05, 0.03, 1]);
  renderer.rectGradient(0, GROUND_Y - 16, VIEW_W, 60, [0.08, 0.1, 0.09, 0.35], [0.16, 0.17, 0.12, 0]);
}

export function drawAmbientFx(renderer) {
  const aurora = 0.12 + Math.sin(state.time * 0.65) * 0.05;
  const auroraShift = Math.sin(state.time * 0.42) * 220;
  renderer.rectGradient(
    180 + auroraShift,
    VIEW_H - 360,
    520,
    260,
    [0.2, 0.5, 0.75, aurora],
    [0.2, 0.5, 0.75, 0]
  );
  renderer.rectGradient(
    900 - auroraShift * 0.55,
    VIEW_H - 320,
    460,
    230,
    [0.12, 0.36, 0.6, aurora * 0.8],
    [0.12, 0.36, 0.6, 0]
  );

  const beat = 0.55 + Math.sin(state.time * 2.4) * 0.45;
  const ringAlpha = (state.mode === "playing" ? 0.08 : 0.05) * beat;
  renderer.ring(
    VIEW_W * 0.5,
    170,
    120 + beat * 22,
    110 + beat * 22,
    [0.56, 0.82, 1, ringAlpha],
    42
  );
}

export function drawParticles(renderer, offsetX, offsetY) {
  for (let i = 0; i < state.particles.length; i += 1) {
    const particle = state.particles[i];
    if (!particle.active) {
      continue;
    }
    const lifeT = 1 - particle.life / particle.maxLife;
    const color = [0.8, 0.92, 1, particle.alpha * lifeT];
    const dx = particle.len * Math.sign(particle.vx);
    renderer.line(
      particle.x + offsetX,
      particle.y + offsetY,
      particle.x - dx + offsetX,
      particle.y + offsetY,
      particle.width,
      color
    );
  }
}

export function drawBoard(renderer, interpolatedAngle, offsetX, offsetY) {
  const visualAngle = interpolatedAngle + Math.sin(state.time * 40) * state.ball.danger * 0.006;
  renderer.rect(state.board.x + offsetX, state.board.y - 7 + offsetY, state.board.length + 36, 22, visualAngle, [0, 0, 0, 0.18]);

  renderer.rect(state.board.x + offsetX, state.board.y + offsetY, state.board.length, state.board.height, visualAngle, [0.42, 0.24, 0.08, 1]);
  renderer.rect(state.board.x + offsetX, state.board.y + offsetY, state.board.length - 8, state.board.height - 6, visualAngle, [0.58, 0.35, 0.12, 1]);

  const stripeColor = [0.33, 0.18, 0.06, 0.72];
  for (let i = -1; i <= 1; i += 1) {
    const offset = (state.board.length * 0.19) * i;
    const cx = state.board.x + Math.cos(visualAngle) * offset + offsetX;
    const cy = state.board.y + Math.sin(visualAngle) * offset + offsetY;
    renderer.rect(cx, cy, state.board.length * 0.11, state.board.height - 4, visualAngle, stripeColor);
  }

  renderer.rect(state.board.x + offsetX, state.board.y - 55 + offsetY, 34, 150, 0, [0.2, 0.22, 0.24, 0.55]);
  renderer.triangle(
    { x: state.board.x - 44 + offsetX, y: state.board.y - 34 + offsetY },
    { x: state.board.x + 44 + offsetX, y: state.board.y - 34 + offsetY },
    { x: state.board.x + offsetX, y: state.board.y + 18 + offsetY },
    [0.15, 0.16, 0.18, 0.85]
  );
  renderer.circle(state.board.x + offsetX, state.board.y + offsetY, 18, [0.14, 0.16, 0.2, 0.92], 24);
  renderer.circle(state.board.x + offsetX, state.board.y + offsetY, 7, [0.65, 0.75, 0.83, 0.72], 18);
}

export function drawBall(renderer, alpha, offsetX, offsetY) {
  const ix = lerp(state.ball.prevX, state.ball.x, alpha);
  const iy = lerp(state.ball.prevY, state.ball.y, alpha);
  const spin = lerp(state.ball.prevSpin, state.ball.spin, alpha);
  const pulse = 1 + Math.sin(state.pulse) * 0.085 * state.ball.danger + (state.ball.massNorm - 1) * 0.04;
  const radius = state.ball.radius * pulse;
  const baseColor = state.ball.onBoard ? [0.92, 0.89, 0.83, 1] : [0.95, 0.84, 0.78, 1];
  const ringColor = mix([0.12, 0.16, 0.21, 1], [0.95, 0.24, 0.19, 1], state.ball.danger);
  const coreColor = mix([0.14, 0.57, 0.78, 0.95], [0.97, 0.61, 0.24, 0.98], clamp(Math.abs(state.wind.current) / MAX_WIND_FORCE, 0, 1));

  renderer.circle(ix + offsetX, iy - radius * 0.08 + offsetY, radius + 4, [0, 0, 0, 0.12], 28);
  renderer.circle(ix + offsetX, iy + offsetY, radius + 6, [ringColor[0], ringColor[1], ringColor[2], 0.28 + state.ball.danger * 0.18], 32);
  renderer.circle(ix + offsetX, iy + offsetY, radius, baseColor, 32);
  renderer.ring(ix + offsetX, iy + offsetY, radius + 2, radius - 4, [ringColor[0], ringColor[1], ringColor[2], 0.92], 32);

  const coreOffset = radius * 0.34;
  renderer.circle(
    ix + Math.cos(spin) * coreOffset + offsetX,
    iy + Math.sin(spin) * coreOffset + offsetY,
    radius * 0.28,
    coreColor,
    24
  );
  renderer.circle(
    ix + Math.cos(spin) * coreOffset + offsetX,
    iy + Math.sin(spin) * coreOffset + offsetY,
    radius * 0.12,
    [0.97, 0.96, 0.92, 0.8],
    18
  );
}

export function drawDangerGlow(renderer) {
  if (state.ball.danger <= 0.02 && state.flash <= 0.03) {
    return;
  }
  const strength = Math.max(state.ball.danger * 0.18, state.flash * 0.15);
  renderer.rect(VIEW_W * 0.5, VIEW_H * 0.5, VIEW_W, VIEW_H, 0, [0.55, 0.03, 0.03, strength]);
}

export function drawUi(uiCtx) {
  uiCtx.clearRect(0, 0, VIEW_W, VIEW_H);
  uiCtx.save();
  const fontStack = '"Montserrat", system-ui, sans-serif';
  const leftPanelX = 40;
  const panelY = 28;
  const sidePanelW = 304;
  const centerPanelX = VIEW_W * 0.5 - 228;
  const centerPanelW = 456;
  const rightPanelX = VIEW_W - 344;
  
  const drawWrappedText = (text, x, y, maxWidth, lineHeight) => {
    const words = text.split(" ");
    let line = "";
    let cursorY = y;
    for (let i = 0; i < words.length; i += 1) {
      const testLine = line ? `${line} ${words[i]}` : words[i];
      if (uiCtx.measureText(testLine).width > maxWidth && line) {
        uiCtx.fillText(line, x, cursorY);
        line = words[i];
        cursorY += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (line) {
      uiCtx.fillText(line, x, cursorY);
    }
    return cursorY;
  };

  uiCtx.fillStyle = "rgba(5, 12, 20, 0.18)";
  uiCtx.fillRect(0, 0, VIEW_W, VIEW_H);

  uiCtx.fillStyle = "rgba(8, 16, 24, 0.6)";
  uiCtx.strokeStyle = "rgba(180, 223, 255, 0.14)";
  uiCtx.lineWidth = 1.5;
  
  // Custom roundRect polyfill for older browsers if needed, but we used it in index.html
  uiCtx.beginPath();
  uiCtx.roundRect(leftPanelX, panelY, sidePanelW, 106, 24);
  uiCtx.fill();
  uiCtx.stroke();

  uiCtx.beginPath();
  uiCtx.roundRect(centerPanelX, panelY, centerPanelW, 106, 24);
  uiCtx.fill();
  uiCtx.stroke();

  uiCtx.beginPath();
  uiCtx.roundRect(rightPanelX, panelY, sidePanelW, 106, 24);
  uiCtx.fill();
  uiCtx.stroke();

  uiCtx.fillStyle = "#b8d8ec";
  uiCtx.font = `700 20px ${fontStack}`;
  uiCtx.fillText("THỜI GIAN", 56, 56);
  uiCtx.fillText("GIÓ", VIEW_W * 0.5 - 188, 56);
  uiCtx.fillText("TRỌNG LƯỢNG", VIEW_W - 308, 56);

  uiCtx.fillStyle = "#eff8ff";
  uiCtx.font = `700 44px ${fontStack}`;
  uiCtx.fillText(`${state.score.toFixed(1)}s`, 56, 96);

  const windBaseX = centerPanelX + 18;
  const windBaseY = panelY + 42;
  const windWidth = centerPanelW - 36;
  const windStrength = clamp(Math.abs(state.wind.current) / MAX_WIND_FORCE, 0, 1);
  uiCtx.fillStyle = "rgba(255,255,255,0.08)";
  uiCtx.beginPath();
  uiCtx.roundRect(windBaseX, windBaseY, windWidth, 20, 10);
  uiCtx.fill();

  const windFill = windWidth * windStrength;
  uiCtx.fillStyle = state.wind.current >= 0 ? "rgba(123, 221, 255, 0.85)" : "rgba(255, 178, 110, 0.88)";
  if (state.wind.current >= 0) {
    uiCtx.beginPath();
    uiCtx.roundRect(windBaseX + windWidth * 0.5, windBaseY, windFill * 0.5, 20, 10);
    uiCtx.fill();
  } else {
    uiCtx.beginPath();
    uiCtx.roundRect(windBaseX + windWidth * 0.5 - windFill * 0.5, windBaseY, windFill * 0.5, 20, 10);
    uiCtx.fill();
  }

  uiCtx.strokeStyle = "rgba(255,255,255,0.22)";
  uiCtx.lineWidth = 2;
  uiCtx.beginPath();
  uiCtx.moveTo(windBaseX + windWidth * 0.5, windBaseY - 8);
  uiCtx.lineTo(windBaseX + windWidth * 0.5, windBaseY + 28);
  uiCtx.stroke();

  const arrowDir = state.wind.current >= 0 ? 1 : -1;
  const arrowCenterX = windBaseX + windWidth * 0.5 + arrowDir * (30 + windStrength * 92);
  uiCtx.strokeStyle = uiCtx.fillStyle;
  uiCtx.lineWidth = 4;
  uiCtx.beginPath();
  uiCtx.moveTo(arrowCenterX - arrowDir * 42, windBaseY + 44);
  uiCtx.lineTo(arrowCenterX, windBaseY + 44);
  uiCtx.stroke();
  uiCtx.beginPath();
  uiCtx.moveTo(arrowCenterX, windBaseY + 44);
  uiCtx.lineTo(arrowCenterX - arrowDir * 14, windBaseY + 34);
  uiCtx.lineTo(arrowCenterX - arrowDir * 14, windBaseY + 54);
  uiCtx.closePath();
  uiCtx.fill();

  uiCtx.fillStyle = "#f4fbff";
  uiCtx.font = `600 18px ${fontStack}`;
  uiCtx.fillText(state.wind.current >= 0 ? "gió phải" : "gió trái", VIEW_W * 0.5 - 188, 115);
  uiCtx.fillText(`${Math.round(windStrength * 100)}%`, VIEW_W * 0.5 + 138, 115);

  const weightBaseX = rightPanelX + 20;
  const weightBaseY = panelY + 42;
  const weightWidth = sidePanelW - 40;
  const weightRatio = (state.ball.massNorm - 0.68) / (1.55 - 0.68);
  uiCtx.fillStyle = "rgba(255,255,255,0.08)";
  uiCtx.beginPath();
  uiCtx.roundRect(weightBaseX, weightBaseY, weightWidth, 20, 10);
  uiCtx.fill();
  const weightGradient = uiCtx.createLinearGradient(weightBaseX, weightBaseY, weightBaseX + weightWidth, weightBaseY);
  weightGradient.addColorStop(0, "rgba(114, 193, 249, 0.9)");
  weightGradient.addColorStop(1, "rgba(255, 120, 76, 0.92)");
  uiCtx.fillStyle = weightGradient;
  uiCtx.beginPath();
  uiCtx.roundRect(weightBaseX, weightBaseY, weightWidth * clamp(weightRatio, 0, 1), 20, 10);
  uiCtx.fill();
  uiCtx.fillStyle = "#f4fbff";
  uiCtx.fillText(`${state.ball.massNorm.toFixed(2)}x`, weightBaseX, 115);
  uiCtx.fillText(state.ball.massNorm >= 1 ? "nặng hơn" : "nhẹ hơn", VIEW_W - 148, 115);

  if (state.flash > 0.02) {
    uiCtx.strokeStyle = `rgba(255, 70, 48, ${0.2 + state.flash * 0.5})`;
    uiCtx.lineWidth = 16;
    uiCtx.strokeRect(8, 8, VIEW_W - 16, VIEW_H - 16);
  }

  uiCtx.fillStyle = "rgba(236, 245, 252, 0.72)";
  uiCtx.font = `600 18px ${fontStack}`;
  uiCtx.fillText("← / A nghiêng trái   |   → / D nghiêng phải   |   chạm nửa trái/phải   |   F toàn màn hình", 44, VIEW_H - 34);

  if (state.mode === "title") {
    uiCtx.fillStyle = "rgba(1, 6, 12, 0.58)";
    uiCtx.fillRect(0, 0, VIEW_W, VIEW_H);
    uiCtx.fillStyle = "rgba(10, 18, 28, 0.84)";
    uiCtx.strokeStyle = "rgba(168, 226, 255, 0.18)";
    uiCtx.lineWidth = 2;
    uiCtx.beginPath();
    uiCtx.roundRect(VIEW_W * 0.5 - 360, 136, 720, 526, 34);
    uiCtx.fill();
    uiCtx.stroke();

    uiCtx.textAlign = "center";
    uiCtx.fillStyle = "#f1fbff";
    uiCtx.font = `800 68px ${fontStack}`;
    uiCtx.fillText("CÂN BẰNG+", VIEW_W * 0.5, 240);
    uiCtx.fillStyle = "#96d8ff";
    uiCtx.font = `600 20px ${fontStack}`;
    drawWrappedText("Giữ vật thể sống sót giữa gió đổi chiều và trọng lượng biến thiên.", VIEW_W * 0.5, 286, 540, 26);
    uiCtx.textAlign = "left";

    uiCtx.fillStyle = "#d7edf8";
    uiCtx.font = `600 18px ${fontStack}`;
    drawWrappedText("1. Điều chỉnh góc khối gỗ với độ trễ nhẹ.", VIEW_W * 0.5 - 252, 348, 520, 25);
    drawWrappedText("2. Gió đổi hướng sau mỗi 1–3 giây, càng mạnh càng rung camera.", VIEW_W * 0.5 - 252, 386, 520, 25);
    drawWrappedText("3. Trọng lượng quả cầu dao động liên tục, khiến mô-men xoắn thay đổi.", VIEW_W * 0.5 - 252, 446, 520, 25);
    drawWrappedText("4. Mép đỏ + nhịp phồng báo hiệu sắp rơi. Giữ càng lâu điểm càng cao.", VIEW_W * 0.5 - 252, 508, 520, 25);

    state.ui.startButton.x = VIEW_W * 0.5 - 170;
    state.ui.startButton.y = 556;
    state.ui.startButton.w = 340;
    state.ui.startButton.h = 80;

    uiCtx.fillStyle = "rgba(86, 197, 255, 0.15)";
    uiCtx.beginPath();
    uiCtx.roundRect(state.ui.startButton.x, state.ui.startButton.y, state.ui.startButton.w, state.ui.startButton.h, 24);
    uiCtx.fill();
    uiCtx.strokeStyle = "rgba(114, 214, 255, 0.65)";
    uiCtx.lineWidth = 2;
    uiCtx.stroke();

    uiCtx.textAlign = "center";
    uiCtx.fillStyle = "#f5fdff";
    uiCtx.font = `700 38px ${fontStack}`;
    uiCtx.fillText("BẮT ĐẦU", VIEW_W * 0.5, state.ui.startButton.y + 54);

    uiCtx.fillStyle = "#92d8ff";
    uiCtx.font = `600 20px ${fontStack}`;
    uiCtx.fillText("Enter / Space / chạm nút", VIEW_W * 0.5, state.ui.startButton.y + 170);
    uiCtx.textAlign = "left";
  } else if (state.mode === "gameover") {
    uiCtx.textAlign = "center";
    uiCtx.fillStyle = "rgba(1, 6, 12, 0.54)";
    uiCtx.fillRect(0, 0, VIEW_W, VIEW_H);
    uiCtx.fillStyle = "rgba(12, 18, 28, 0.88)";
    uiCtx.strokeStyle = "rgba(255, 109, 92, 0.28)";
    uiCtx.lineWidth = 2;
    uiCtx.beginPath();
    uiCtx.roundRect(VIEW_W * 0.5 - 300, 184, 600, 420, 32);
    uiCtx.fill();
    uiCtx.stroke();

    uiCtx.fillStyle = "#ffddd7";
    uiCtx.font = `800 72px ${fontStack}`;
    uiCtx.fillText("RƠI MẤT RỒI", VIEW_W * 0.5, 312);
    uiCtx.fillStyle = "#f1fbff";
    uiCtx.font = `700 54px ${fontStack}`;
    uiCtx.fillText(`${state.score.toFixed(1)}s`, VIEW_W * 0.5, 378);

    uiCtx.fillStyle = "#9fdfff";
    uiCtx.font = `600 24px ${fontStack}`;
    uiCtx.fillText(`Kỷ lục: ${state.bestScore.toFixed(1)}s`, VIEW_W * 0.5, 430);

    uiCtx.fillStyle = "rgba(255, 128, 98, 0.16)";
    uiCtx.beginPath();
    uiCtx.roundRect(state.ui.restartButton.x, state.ui.restartButton.y, state.ui.restartButton.w, state.ui.restartButton.h, 24);
    uiCtx.fill();
    uiCtx.strokeStyle = "rgba(255, 140, 116, 0.72)";
    uiCtx.lineWidth = 2;
    uiCtx.stroke();

    uiCtx.fillStyle = "#fff8f5";
    uiCtx.font = `700 32px ${fontStack}`;
    uiCtx.fillText("CHƠI LẠI", VIEW_W * 0.5, state.ui.restartButton.y + 48);

    uiCtx.fillStyle = "#ffd4ca";
    uiCtx.font = `600 20px ${fontStack}`;
    uiCtx.fillText("Enter / Space / chạm nút", VIEW_W * 0.5, state.ui.restartButton.y + 198);
    uiCtx.textAlign = "left";
  }

  uiCtx.restore();
}

export function render(renderer, uiCtx, uiCanvas, alpha) {
  renderer.begin();
  drawBackground(renderer);
  drawAmbientFx(renderer);

  const offsetX = state.camera.x;
  const offsetY = state.camera.y;

  drawParticles(renderer, offsetX * 0.35, offsetY * 0.35);
  const interpolatedAngle = lerp(state.board.prevAngle, state.board.angle, alpha);
  drawBoard(renderer, interpolatedAngle, offsetX, offsetY);
  drawBall(renderer, alpha, offsetX, offsetY);
  drawDangerGlow(renderer);
  renderer.flush();
  drawUi(uiCtx);
  renderer.uploadUi(uiCanvas);
  renderer.drawUi();
}

export function draw_game(renderer, uiCtx, uiCanvas, alpha = 1) {
  render(renderer, uiCtx, uiCanvas, alpha);
}

export function render_game_to_text() {
  return JSON.stringify({
    coordinateSystem: "origin bottom-left, +x right, +y up",
    mode: state.mode,
    score: Number(state.score.toFixed(2)),
    board: {
      x: Number(state.board.x.toFixed(1)),
      y: Number(state.board.y.toFixed(1)),
      angleDeg: Number((state.board.angle * 180 / Math.PI).toFixed(1)),
      angularVelocity: Number(state.board.angularVelocity.toFixed(3)),
    },
    ball: {
      x: Number(state.ball.x.toFixed(1)),
      y: Number(state.ball.y.toFixed(1)),
      vx: Number(state.ball.vx.toFixed(1)),
      vy: Number(state.ball.vy.toFixed(1)),
      onBoard: state.ball.onBoard,
      offsetOnBoard: Number(state.ball.s.toFixed(1)),
      mass: Number(state.ball.massNorm.toFixed(2)),
      danger: Number(state.ball.danger.toFixed(2)),
    },
    wind: {
      direction: state.wind.current >= 0 ? "right" : "left",
      force: Number(state.wind.current.toFixed(1)),
      strength: Number(state.wind.strength.toFixed(2)),
      timer: Number(state.wind.timer.toFixed(2)),
    },
    prompt: state.lastActionLabel,
  });
}
