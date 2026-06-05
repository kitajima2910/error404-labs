export class InputManager {
  constructor(container) {
    this.container = container;
    this.clickCallbacks = [];
    this.callbacks = { click: [], mousemove: [] };
    this.mouseX = 0;
    this.mouseY = 0;
    this._bindEvents();
  }

  _bindEvents() {
    this.container.addEventListener('click', (e) => {
      this.callbacks.click.forEach(cb => cb(e.clientX, e.clientY));
    });

    this.container.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.callbacks.mousemove.forEach(cb => cb(e.clientX, e.clientY));
    });

    this.container.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const t = e.touches[0];
      this.mouseX = t.clientX;
      this.mouseY = t.clientY;
      this.callbacks.click.forEach(cb => cb(t.clientX, t.clientY));
    }, { passive: false });

    this.container.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const t = e.touches[0];
      this.mouseX = t.clientX;
      this.mouseY = t.clientY;
    }, { passive: false });
  }

  onClick(cb) {
    this.callbacks.click.push(cb);
  }

  onMouseMove(cb) {
    this.callbacks.mousemove.push(cb);
  }
}
