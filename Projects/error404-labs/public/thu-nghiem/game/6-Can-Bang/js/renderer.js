"use strict";

import { VIEW_W, VIEW_H, createOrthoMatrix, createProgram } from './constants.js';

export class Renderer {
  constructor(gl, canvas) {
    this.gl = gl;
    this.canvas = canvas;
    this.maxVertices = 32768;
    this.colorStride = 6;
    this.colorData = new Float32Array(this.maxVertices * this.colorStride);
    this.colorCount = 0;
    
    // Shader sources
    const vsColor = `#version 300 es
      precision mediump float;
      layout(location = 0) in vec2 a_position;
      layout(location = 1) in vec4 a_color;
      uniform mat4 u_matrix;
      out vec4 v_color;
      void main() {
        gl_Position = u_matrix * vec4(a_position, 0.0, 1.0);
        v_color = a_color;
      }`;
    const fsColor = `#version 300 es
      precision mediump float;
      in vec4 v_color;
      out vec4 outColor;
      void main() {
        outColor = v_color;
      }`;
      
    const vsText = `#version 300 es
      precision mediump float;
      layout(location = 0) in vec2 a_position;
      layout(location = 1) in vec2 a_uv;
      uniform mat4 u_matrix;
      out vec2 v_uv;
      void main() {
        gl_Position = u_matrix * vec4(a_position, 0.0, 1.0);
        v_uv = a_uv;
      }`;
    const fsText = `#version 300 es
      precision mediump float;
      in vec2 v_uv;
      uniform sampler2D u_texture;
      uniform float u_alpha;
      out vec4 outColor;
      void main() {
        vec4 sampleColor = texture(u_texture, v_uv);
        outColor = vec4(sampleColor.rgb, sampleColor.a * u_alpha);
      }`;

    this.colorProgram = createProgram(gl, vsColor, fsColor);
    this.uColorMatrix = gl.getUniformLocation(this.colorProgram, "u_matrix");
    this.colorBuffer = gl.createBuffer();
    this.colorVao = gl.createVertexArray();
    gl.bindVertexArray(this.colorVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.colorData.byteLength, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, this.colorStride * 4, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, this.colorStride * 4, 2 * 4);
    gl.bindVertexArray(null);

    this.textureProgram = createProgram(gl, vsText, fsText);
    this.uTexMatrix = gl.getUniformLocation(this.textureProgram, "u_matrix");
    this.uTexAlpha = gl.getUniformLocation(this.textureProgram, "u_alpha");
    this.uTexture = gl.getUniformLocation(this.textureProgram, "u_texture");
    this.textureBuffer = gl.createBuffer();
    this.textureVao = gl.createVertexArray();
    gl.bindVertexArray(this.textureVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
    const quad = new Float32Array([
      0, 0, 0, 1,
      VIEW_W, 0, 1, 1,
      VIEW_W, VIEW_H, 1, 0,
      0, 0, 0, 1,
      VIEW_W, VIEW_H, 1, 0,
      0, VIEW_H, 0, 0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 4 * 4, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 4 * 4, 2 * 4);
    gl.bindVertexArray(null);

    this.uiTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.uiTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, VIEW_W, VIEW_H, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    this.matrix = createOrthoMatrix(0, VIEW_W, 0, VIEW_H);
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const scale = Math.min(window.innerWidth / VIEW_W, window.innerHeight / VIEW_H);
    this.canvas.width = Math.round(VIEW_W * dpr);
    this.canvas.height = Math.round(VIEW_H * dpr);
    this.canvas.style.width = `${Math.round(VIEW_W * scale)}px`;
    this.canvas.style.height = `${Math.round(VIEW_H * scale)}px`;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  begin() {
    this.colorCount = 0;
    this.gl.disable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.clearColor(0.02, 0.04, 0.08, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  ensure(neededVertices) {
    if (this.colorCount + neededVertices >= this.maxVertices) {
      this.flush();
    }
  }

  pushVertex(x, y, color) {
    const offset = this.colorCount * this.colorStride;
    this.colorData[offset] = x;
    this.colorData[offset + 1] = y;
    this.colorData[offset + 2] = color[0];
    this.colorData[offset + 3] = color[1];
    this.colorData[offset + 4] = color[2];
    this.colorData[offset + 5] = color[3];
    this.colorCount += 1;
  }

  triangle(a, b, c, ca, cb = ca, cc = ca) {
    this.ensure(3);
    this.pushVertex(a.x, a.y, ca);
    this.pushVertex(b.x, b.y, cb);
    this.pushVertex(c.x, c.y, cc);
  }

  quad(a, b, c, d, ca, cb = ca, cc = ca, cd = ca) {
    this.ensure(6);
    this.pushVertex(a.x, a.y, ca);
    this.pushVertex(b.x, b.y, cb);
    this.pushVertex(c.x, c.y, cc);
    this.pushVertex(a.x, a.y, ca);
    this.pushVertex(c.x, c.y, cc);
    this.pushVertex(d.x, d.y, cd);
  }

  rect(cx, cy, width, height, rotation, color) {
    const hw = width * 0.5;
    const hh = height * 0.5;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const p1 = { x: cx - hw * cos + hh * sin, y: cy - hw * sin - hh * cos };
    const p2 = { x: cx + hw * cos + hh * sin, y: cy + hw * sin - hh * cos };
    const p3 = { x: cx + hw * cos - hh * sin, y: cy + hw * sin + hh * cos };
    const p4 = { x: cx - hw * cos - hh * sin, y: cy - hw * sin + hh * cos };
    this.quad(p1, p2, p3, p4, color);
  }

  rectGradient(x, y, width, height, topColor, bottomColor) {
    this.quad(
      { x, y: y + height },
      { x: x + width, y: y + height },
      { x: x + width, y },
      { x, y },
      bottomColor,
      bottomColor,
      topColor,
      topColor
    );
  }

  circle(cx, cy, radius, color, segments = 28) {
    const center = { x: cx, y: cy };
    for (let i = 0; i < segments; i += 1) {
      const a0 = (i / segments) * Math.PI * 2;
      const a1 = ((i + 1) / segments) * Math.PI * 2;
      this.triangle(
        center,
        { x: cx + Math.cos(a0) * radius, y: cy + Math.sin(a0) * radius },
        { x: cx + Math.cos(a1) * radius, y: cy + Math.sin(a1) * radius },
        color
      );
    }
  }

  ring(cx, cy, outerRadius, innerRadius, color, segments = 32) {
    for (let i = 0; i < segments; i += 1) {
      const a0 = (i / segments) * Math.PI * 2;
      const a1 = ((i + 1) / segments) * Math.PI * 2;
      const o0 = { x: cx + Math.cos(a0) * outerRadius, y: cy + Math.sin(a0) * outerRadius };
      const o1 = { x: cx + Math.cos(a1) * outerRadius, y: cy + Math.sin(a1) * outerRadius };
      const i0 = { x: cx + Math.cos(a0) * innerRadius, y: cy + Math.sin(a0) * innerRadius };
      const i1 = { x: cx + Math.cos(a1) * innerRadius, y: cy + Math.sin(a1) * innerRadius };
      this.quad(i0, i1, o1, o0, color);
    }
  }

  line(x1, y1, x2, y2, thickness, color) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const half = thickness * 0.5;
    const a = { x: x1 + nx * half, y: y1 + ny * half };
    const b = { x: x2 + nx * half, y: y2 + ny * half };
    const c = { x: x2 - nx * half, y: y2 - ny * half };
    const d = { x: x1 - nx * half, y: y1 - ny * half };
    this.quad(a, b, c, d, color);
  }

  flush() {
    if (!this.colorCount) {
      return;
    }
    this.gl.useProgram(this.colorProgram);
    this.gl.uniformMatrix4fv(this.uColorMatrix, false, this.matrix);
    this.gl.bindVertexArray(this.colorVao);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.colorData.subarray(0, this.colorCount * this.colorStride));
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.colorCount);
    this.gl.bindVertexArray(null);
    this.colorCount = 0;
  }

  uploadUi(uiCanvas) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.uiTexture);
    this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, uiCanvas);
  }

  drawUi(alpha = 1) {
    this.gl.useProgram(this.textureProgram);
    this.gl.uniformMatrix4fv(this.uTexMatrix, false, this.matrix);
    this.gl.uniform1f(this.uTexAlpha, alpha);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.uiTexture);
    this.gl.uniform1i(this.uTexture, 0);
    this.gl.bindVertexArray(this.textureVao);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    this.gl.bindVertexArray(null);
  }
}
