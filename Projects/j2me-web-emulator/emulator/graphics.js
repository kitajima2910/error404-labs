export class Graphics {
  constructor(ctx) {
    this.ctx = ctx;
    this.color = "#ffffff";
    this.translateX = 0;
    this.translateY = 0;
    this.clipX = 0;
    this.clipY = 0;
    this.clipW = ctx.canvas.width;
    this.clipH = ctx.canvas.height;
    this.fontSize = 12;
    this.fontFace = "monospace";
    this.strokeStyle = 0; // SOLID
  }

  setColor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  fillRect(x, y, w, h) {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x + this.translateX, y + this.translateY, w, h);
  }

  drawRect(x, y, w, h) {
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(
      x + this.translateX + 0.5,
      y + this.translateY + 0.5,
      w,
      h,
    );
  }

  drawLine(x1, y1, x2, y2) {
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(x1 + this.translateX + 0.5, y1 + this.translateY + 0.5);
    this.ctx.lineTo(x2 + this.translateX + 0.5, y2 + this.translateY + 0.5);
    this.ctx.stroke();
  }

  drawString(str, x, y, anchor) {
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${this.fontSize}px ${this.fontFace}`;

    const ax = x + this.translateX;
    const ay = y + this.translateY;

    // MIDP anchors: TOP=0, BASELINE=64, BOTTOM=32, LEFT=0, HCENTER=1, RIGHT=8
    const a = anchor | 0;
    let textX = ax;
    let textY = ay;

    this.ctx.textBaseline = "top";
    if (a & 64) this.ctx.textBaseline = "alphabetic";
    if (a & 32) this.ctx.textBaseline = "bottom";

    if (a & 1) {
      // HCENTER
      this.ctx.textAlign = "center";
    } else if (a & 8) {
      // RIGHT
      this.ctx.textAlign = "right";
    } else {
      this.ctx.textAlign = "left";
    }

    this.ctx.fillText(str, textX, textY);
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
  }

  drawSubstring(str, offset, len, x, y, anchor) {
    this.drawString(str.substring(offset, offset + len), x, y, anchor);
  }

  drawChar(ch, x, y, anchor) {
    this.drawString(String.fromCharCode(ch), x, y, anchor);
  }

  drawImage(imageData, x, y, anchor) {
    if (!imageData) return;
    const ax = x + this.translateX;
    const ay = y + this.translateY;
    const a = anchor | 0;
    let dx = ax;
    let dy = ay;

    const w = imageData.width || 0;
    const h = imageData.height || 0;

    if (a & 1) dx -= w / 2; // HCENTER
    if (a & 8) dx -= w; // RIGHT
    if (a & 32) dy -= h; // BOTTOM
    if (a & 2) dy -= h / 2; // VCENTER

    if (
      imageData instanceof ImageBitmap ||
      imageData instanceof HTMLImageElement ||
      imageData instanceof HTMLCanvasElement ||
      imageData instanceof OffscreenCanvas
    ) {
      this.ctx.drawImage(imageData, dx, dy);
    } else if (imageData.__canvas) {
      this.ctx.drawImage(imageData.__canvas, dx, dy);
    }
  }

  drawRegion(
    imageData,
    srcX,
    srcY,
    srcW,
    srcH,
    transform,
    destX,
    destY,
    anchor,
  ) {
    if (!imageData) return;
    const src = imageData.__canvas || imageData;
    const dx = destX + this.translateX;
    const dy = destY + this.translateY;
    // Simplified: no transform support for now
    try {
      this.ctx.drawImage(src, srcX, srcY, srcW, srcH, dx, dy, srcW, srcH);
    } catch (e) {
      // Ignore draw errors
    }
  }

  drawArc(x, y, w, h, startAngle, arcAngle) {
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    const cx = x + this.translateX + w / 2;
    const cy = y + this.translateY + h / 2;
    const rx = w / 2,
      ry = h / 2;
    const start = (-startAngle * Math.PI) / 180;
    const end = (-(startAngle + arcAngle) * Math.PI) / 180;
    this.ctx.ellipse(cx, cy, rx, ry, 0, start, end, arcAngle > 0);
    this.ctx.stroke();
  }

  fillArc(x, y, w, h, startAngle, arcAngle) {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    const cx = x + this.translateX + w / 2;
    const cy = y + this.translateY + h / 2;
    const rx = w / 2,
      ry = h / 2;
    const start = (-startAngle * Math.PI) / 180;
    const end = (-(startAngle + arcAngle) * Math.PI) / 180;
    this.ctx.ellipse(cx, cy, rx, ry, 0, start, end, arcAngle > 0);
    this.ctx.fill();
  }

  fillTriangle(x1, y1, x2, y2, x3, y3) {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.moveTo(x1 + this.translateX, y1 + this.translateY);
    this.ctx.lineTo(x2 + this.translateX, y2 + this.translateY);
    this.ctx.lineTo(x3 + this.translateX, y3 + this.translateY);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawRoundRect(x, y, w, h, arcW, arcH) {
    const r = Math.min(arcW, arcH) / 2;
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.roundRect(
      x + this.translateX + 0.5,
      y + this.translateY + 0.5,
      w,
      h,
      r,
    );
    this.ctx.stroke();
  }

  fillRoundRect(x, y, w, h, arcW, arcH) {
    const r = Math.min(arcW, arcH) / 2;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.roundRect(x + this.translateX, y + this.translateY, w, h, r);
    this.ctx.fill();
  }

  setClip(x, y, w, h) {
    this.clipX = x;
    this.clipY = y;
    this.clipW = w;
    this.clipH = h;
    // Apply clip
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(x + this.translateX, y + this.translateY, w, h);
    this.ctx.clip();
  }

  clipRect(x, y, w, h) {
    this.setClip(x, y, w, h);
  }

  getClipX() {
    return this.clipX;
  }
  getClipY() {
    return this.clipY;
  }
  getClipWidth() {
    return this.clipW;
  }
  getClipHeight() {
    return this.clipH;
  }

  translate(x, y) {
    this.translateX += x;
    this.translateY += y;
  }

  getTranslateX() {
    return this.translateX;
  }
  getTranslateY() {
    return this.translateY;
  }

  setFont(font) {
    if (font) {
      this.fontSize = font.size || 12;
      this.fontFace = font.face || "monospace";
    }
  }

  getFont() {
    return { size: this.fontSize, face: this.fontFace };
  }

  setStrokeStyle(style) {
    this.strokeStyle = style;
  }

  getStrokeStyle() {
    return this.strokeStyle;
  }

  stringWidth(str) {
    this.ctx.font = `${this.fontSize}px ${this.fontFace}`;
    return Math.ceil(this.ctx.measureText(str).width);
  }

  getRedComponent() {
    return 0;
  }

  getGreenComponent() {
    return 0;
  }

  getBlueComponent() {
    return 0;
  }
}
