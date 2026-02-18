/* ============================================================
   FESTIVE 2026 — Fireworks + Running Horse
   ============================================================ */

(function () {
    /* ── 1. CANVAS FIREWORKS ── */
    const canvas = document.createElement('canvas');
    canvas.id = 'fireworks-canvas';
    canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 9999;
  `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    /* Particle class */
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 1.5;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.018 + 0.012;
            this.radius = Math.random() * 3 + 1.5;
            this.gravity = 0.08;
            this.trail = [];
        }

        update() {
            this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
            if (this.trail.length > 6) this.trail.shift();
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.98;
            this.alpha -= this.decay;
        }

        draw() {
            // Trail
            this.trail.forEach((t, i) => {
                ctx.beginPath();
                ctx.arc(t.x, t.y, this.radius * (i / this.trail.length) * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = this.color.replace('1)', `${t.alpha * 0.4})`);
                ctx.fill();
            });
            // Main dot
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color.replace('1)', `${this.alpha})`);
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color.replace('1)', '0.8)');
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    /* Firework burst */
    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.particles = [];
            const hues = [
                [0, 100, 60],    // red
                [45, 100, 60],   // gold
                [120, 100, 50],  // green
                [200, 100, 60],  // cyan
                [280, 100, 65],  // purple
                [330, 100, 60],  // rose
            ];
            const [h, s, l] = hues[Math.floor(Math.random() * hues.length)];
            const count = Math.floor(Math.random() * 40) + 60;
            for (let i = 0; i < count; i++) {
                const lightness = l + Math.random() * 20 - 10;
                this.particles.push(
                    new Particle(x, y, `hsla(${h}, ${s}%, ${lightness}%, 1)`)
                );
            }
        }

        update() {
            this.particles = this.particles.filter(p => p.alpha > 0.01);
            this.particles.forEach(p => p.update());
        }

        draw() {
            this.particles.forEach(p => p.draw());
        }

        isDead() {
            return this.particles.length === 0;
        }
    }

    /* Rocket (rising shell) */
    class Rocket {
        constructor() {
            this.x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.45 + canvas.height * 0.05;
            this.speed = Math.random() * 4 + 5;
            this.trail = [];
            this.exploded = false;
        }

        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 12) this.trail.shift();
            this.y -= this.speed;
        }

        draw() {
            this.trail.forEach((t, i) => {
                ctx.beginPath();
                ctx.arc(t.x, t.y, 2 * (i / this.trail.length), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 220, 100, ${i / this.trail.length * 0.8})`;
                ctx.fill();
            });
        }

        shouldExplode() {
            return this.y <= this.targetY;
        }
    }

    let fireworks = [];
    let rockets = [];

    function launchRocket() {
        rockets.push(new Rocket());
    }

    /* Auto-launch on load */
    function burstOnLoad() {
        const positions = [
            [canvas.width * 0.2, canvas.height * 0.25],
            [canvas.width * 0.5, canvas.height * 0.15],
            [canvas.width * 0.8, canvas.height * 0.3],
            [canvas.width * 0.35, canvas.height * 0.35],
            [canvas.width * 0.65, canvas.height * 0.2],
        ];
        positions.forEach(([x, y], i) => {
            setTimeout(() => fireworks.push(new Firework(x, y)), i * 250);
        });
    }

    /* Periodic rockets */
    function scheduleLaunch() {
        launchRocket();
        setTimeout(scheduleLaunch, Math.random() * 1800 + 800);
    }

    /* Animation loop */
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update rockets
        rockets = rockets.filter(r => {
            r.update();
            r.draw();
            if (r.shouldExplode()) {
                fireworks.push(new Firework(r.x, r.y));
                return false;
            }
            return true;
        });

        // Update fireworks
        fireworks = fireworks.filter(f => {
            f.update();
            f.draw();
            return !f.isDead();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Kick off
    setTimeout(burstOnLoad, 300);
    setTimeout(scheduleLaunch, 1500);

    /* ── 2. RUNNING HORSE ── */
    const horseStyle = document.createElement('style');
    horseStyle.textContent = `
    @keyframes horse-run {
      0%   { transform: translateX(110vw) scaleX(-1); }
      100% { transform: translateX(-20vw) scaleX(-1); }
    }
    @keyframes horse-bob {
      0%, 100% { top: calc(100vh - 90px); }
      50%       { top: calc(100vh - 105px); }
    }
    .horse-runner {
      position: fixed;
      font-size: 3.5rem;
      line-height: 1;
      z-index: 10000;
      pointer-events: none;
      user-select: none;
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
      animation:
        horse-run 7s linear infinite,
        horse-bob 0.35s ease-in-out infinite;
    }
    .horse-label {
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'Montserrat', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #f59e0b;
      text-shadow: 0 0 12px rgba(245, 158, 11, 0.6);
      pointer-events: none;
      z-index: 10000;
      animation: horse-label-fade 7s linear infinite;
    }
    @keyframes horse-label-fade {
      0%, 10%  { opacity: 0; }
      20%, 80% { opacity: 1; }
      90%, 100%{ opacity: 0; }
    }
  `;
    document.head.appendChild(horseStyle);

    const horse = document.createElement('div');
    horse.className = 'horse-runner';
    horse.textContent = '🐎';
    document.body.appendChild(horse);

    const label = document.createElement('div');
    label.className = 'horse-label';
    label.textContent = '🎆 Chúc Mừng Năm Mới 2026 · Bính Ngọ 🎆';
    document.body.appendChild(label);

})();
