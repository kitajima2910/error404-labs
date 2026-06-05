import { PLANT_TYPES, LEVELS, LEVEL_THEMES, FUSION_RECIPES, ZOMBIE_TYPES } from './constants.js';
import { Game } from './Game.js';

export class UIManager {
  constructor(game) {
    this.game = game;
    this.selectedPlant = null;
    this.selectedDeck = [];

    this.plantBar = document.getElementById('plant-bar');
    this.fusionPanel = document.getElementById('fusion-panel');
    this.messageToast = document.getElementById('message-toast');
    this.gameOverScreen = document.getElementById('game-over');
    this.victoryScreen = document.getElementById('victory-screen');
    this.startScreen = document.getElementById('start-screen');
    this.levelSelect = document.getElementById('level-select');
    this.deckSelect = document.getElementById('deck-select');
    this.deckSlots = document.getElementById('deck-slots');
    this.deckCount = document.getElementById('deck-count');

    this.cooldowns = {};
    this.plantCards = [];
    this._pendingLevelIdx = 0;
    this._buildPlantBar([]);
    this._bindEvents();
  }

  _buildPlantBar(deck) {
    this.plantBar.innerHTML = '';
    this.plantCards = [];

    for (const id of deck) {
      const config = PLANT_TYPES[id];
      if (!config) continue;

      const card = document.createElement('div');
      card.className = 'plant-card';
      card.dataset.plantId = id;
      card.innerHTML = `
        <div class="emoji">${config.emoji}</div>
        <div class="cost">☀${config.cost}</div>
        <div class="name-label">${config.name}</div>
        <div class="cooldown-overlay"></div>
      `;

      card.addEventListener('click', () => this._selectPlant(id, card));
      this.plantBar.appendChild(card);
      this.plantCards.push({ id, element: card, cooldownTimer: 0, cooldownDuration: 5 });
    }
  }

  rebuildPlantBar(deck) {
    this.clearSelection();
    this._buildPlantBar(deck);
  }

  _selectPlant(id, card) {
    if (card.classList.contains('disabled')) return;

    if (this.selectedPlant === id) {
      this.selectedPlant = null;
      this.plantCards.forEach(c => c.element.classList.remove('active'));
      return;
    }

    const config = PLANT_TYPES[id];
    if (!this.game.sunManager.canAfford(config.cost)) return;

    this.selectedPlant = id;
    this.plantCards.forEach(c => c.element.classList.remove('active'));
    card.classList.add('active');
    this.game.sceneManager.clearHighlights();
  }

  getSelectedPlant() {
    return this.selectedPlant;
  }

  clearSelection() {
    this.selectedPlant = null;
    this.plantCards.forEach(c => c.element.classList.remove('active'));
  }

  startCooldown(plantId) {
    const card = this.plantCards.find(c => c.id === plantId);
    if (!card) return;
    if (this.game.noCooldown) {
      card.cooldownTimer = 0;
      card.element.classList.remove('disabled');
      return;
    }
    card.cooldownTimer = card.cooldownDuration;
    card.element.classList.add('disabled');
  }

  showFusionPanel(x, y, options, onSelect) {
    if (options.length === 0) {
      this.hideFusionPanel();
      return;
    }

    this.fusionPanel.style.display = 'block';
    this.fusionPanel.style.left = Math.min(x, window.innerWidth - 260) + 'px';
    this.fusionPanel.style.top = Math.min(y, window.innerHeight - 200) + 'px';

    const optionsEl = this.fusionPanel.querySelector('.options');
    optionsEl.innerHTML = '';

    for (const opt of options) {
      const div = document.createElement('div');
      div.className = 'fusion-option';
      div.innerHTML = `
        <span class="result-em">${opt.recipe.emoji}</span>
        <div class="info">
          <strong>${opt.recipe.name}</strong>
          <span class="desc">${opt.recipe.desc}</span>
        </div>
      `;
      div.addEventListener('click', () => {
        onSelect(opt);
        this.hideFusionPanel();
      });
      optionsEl.appendChild(div);
    }
  }

  hideFusionPanel() {
    this.fusionPanel.style.display = 'none';
  }

  showMessage(text, duration = 1.5, color = '#ffd700') {
    this.messageToast.innerHTML = text;
    this.messageToast.style.color = color;
    this.messageToast.classList.add('show');
    setTimeout(() => this.messageToast.classList.remove('show'), duration * 1000);
  }

  showGameOver() {
    this.gameOverScreen.style.display = 'flex';
    const container = document.getElementById('gameover-btns');
    container.innerHTML = '';

    const retryBtn = document.createElement('button');
    retryBtn.className = 'btn';
    retryBtn.textContent = '🔁 Thử Lại';
    retryBtn.onclick = () => {
      this.gameOverScreen.style.display = 'none';
      this._showDeckForLevel(this.game.currentLevelIndex);
    };
    container.appendChild(retryBtn);

    const selectBtn = document.createElement('button');
    selectBtn.className = 'btn';
    selectBtn.textContent = '🏰 Chọn Màn';
    selectBtn.onclick = () => {
      this.gameOverScreen.style.display = 'none';
      this.showLevelSelect();
    };
    container.appendChild(selectBtn);

    const homeBtn = document.createElement('button');
    homeBtn.className = 'btn';
    homeBtn.textContent = '🏠 Màn Chính';
    homeBtn.onclick = () => {
      this.gameOverScreen.style.display = 'none';
      this._goToMainMenu();
    };
    container.appendChild(homeBtn);
  }

  _goToMainMenu() {
    const game = this.game;
    game.audio.stopBgm();
    game.destroy();
    game.waveManager.reset();
    this.startScreen.style.display = 'flex';
  }

  showVictory(levelIdx) {
    this.victoryScreen.style.display = 'flex';
    const p = this.victoryScreen.querySelector('p');
    p.textContent = levelIdx === 9 ? '🎉 Bạn đã phá đảo tất cả 10 màn!' : `✅ Màn ${levelIdx + 1} hoàn thành!`;

    const container = document.getElementById('victory-btns');
    container.innerHTML = '';

    if (levelIdx < 9) {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn';
      nextBtn.textContent = '▶  Màn Tiếp';
      nextBtn.onclick = () => {
        this.victoryScreen.style.display = 'none';
        this._showDeckForLevel(levelIdx + 1);
      };
      container.appendChild(nextBtn);
    }

    if (levelIdx === 9) {
      const endlessBtn = document.createElement('button');
      endlessBtn.id = 'endless-btn';
      endlessBtn.textContent = '♾️ Bất Tận';
      endlessBtn.onclick = () => {
        this.victoryScreen.style.display = 'none';
        this.game.startEndless();
      };
      container.appendChild(endlessBtn);

      const replayBtn = document.createElement('button');
      replayBtn.className = 'btn';
      replayBtn.textContent = '🔁 Chơi Lại';
      replayBtn.onclick = () => {
        this.victoryScreen.style.display = 'none';
        this._showDeckForLevel(0);
      };
      container.appendChild(replayBtn);
    }

    const selectBtn = document.createElement('button');
    selectBtn.className = 'btn';
    selectBtn.textContent = '🏰 Chọn Màn';
    selectBtn.onclick = () => {
      this.victoryScreen.style.display = 'none';
      this.showLevelSelect();
    };
    container.appendChild(selectBtn);

    const homeBtn = document.createElement('button');
    homeBtn.className = 'btn';
    homeBtn.textContent = '🏠 Màn Chính';
    homeBtn.onclick = () => {
      this.victoryScreen.style.display = 'none';
      this._goToMainMenu();
    };
    container.appendChild(homeBtn);
  }

  showLevelSelect() {
    this.levelSelect.style.display = 'flex';
    this._renderLevelGrid();
  }

  hideLevelSelect() {
    this.levelSelect.style.display = 'none';
  }

  _renderLevelGrid() {
    const progress = Game.getProgress();
    const grid = document.getElementById('level-grid');
    grid.innerHTML = '';

    for (let i = 0; i < 10; i++) {
      const card = document.createElement('div');
      card.className = 'level-card';
      const unlocked = i <= progress.highestUnlocked;
      const completed = progress.completed.includes(i);
      const theme = LEVEL_THEMES[LEVELS[i].theme];
      const rewards = LEVELS[i].rewards || [];

      if (!unlocked) card.classList.add('locked');
      if (completed) card.classList.add('completed');

      card.innerHTML = `
        <div class="level-num">${i + 1}</div>
        <div class="level-icon">${unlocked ? (completed ? '✅' : '🏰') : '🔒'}</div>
        <div class="level-label">${theme.label}</div>
        <div class="level-plants">🌱+${rewards.length}</div>
        <div class="boss-badge">👑</div>
      `;

      if (unlocked) {
        card.addEventListener('click', () => {
          this.hideLevelSelect();
          this._showDeckForLevel(i);
        });
      }
      grid.appendChild(card);
    }
  }

  _showDeckForLevel(levelIdx) {
    this._pendingLevelIdx = levelIdx;
    const levelConfig = LEVELS[levelIdx];
    const theme = LEVEL_THEMES[levelConfig.theme];
    document.getElementById('deck-level-name').textContent = `Màn ${levelIdx + 1} - ${theme.label}`;

    const collection = this.game.collectionManager.getAll();
    const currentDeck = this.game.collectionManager.getDeck();

    this.selectedDeck = currentDeck.filter(id => PLANT_TYPES[id]);
    this._renderDeckSelection();
    this.deckSelect.style.display = 'flex';
  }

  _renderDeckSelection() {
    this._renderDeckSlots();
    this._renderCollectionGrid();
  }

  _renderDeckSlots() {
    const slots = this.deckSlots.querySelectorAll('.deck-slot');
    const max = this.game.collectionManager.getMaxDeckSize();

    for (let i = 0; i < max; i++) {
      const slot = slots[i];
      if (i < this.selectedDeck.length) {
        const id = this.selectedDeck[i];
        const config = PLANT_TYPES[id];
        slot.className = 'deck-slot filled';
        slot.innerHTML = `
          <span style="font-size:20px">${config.emoji}</span>
          <span class="slot-cost">☀${config.cost}</span>
          <button class="slot-remove" data-idx="${i}">✕</button>
        `;
        slot.querySelector('.slot-remove').addEventListener('click', (e) => {
          e.stopPropagation();
          this.selectedDeck.splice(i, 1);
          this._renderDeckSelection();
        });
      } else {
        slot.className = 'deck-slot empty';
        slot.innerHTML = '+';
      }
    }
    this.deckCount.textContent = `Đã chọn: ${this.selectedDeck.length}/${max}`;
  }

  _renderCollectionGrid() {
    const grid = document.getElementById('collection-grid');
    grid.innerHTML = '';

    const allIds = Object.keys(PLANT_TYPES);
    const fusionRecipes = this.game.fusionManager.recipes;
    const fusionIds = fusionRecipes.map(r => r.result);
    const collection = this.game.collectionManager.getAll();

    for (const id of allIds) {
      if (fusionIds.includes(id)) continue;

      const config = PLANT_TYPES[id];
      const owned = collection.includes(id);
      const inDeck = this.selectedDeck.includes(id);

      const card = document.createElement('div');
      card.className = 'collect-card' + (inDeck ? ' selected' : '') + (!owned ? ' locked-card' : '');
      card.innerHTML = `
        <span>${config.emoji}</span>
        <span class="cc-cost">☀${config.cost}</span>
        <span class="cc-name">${config.name}</span>
      `;

      if (owned) {
        card.addEventListener('click', () => {
          if (inDeck) {
            this.selectedDeck = this.selectedDeck.filter(x => x !== id);
          } else {
            const max = this.game.collectionManager.getMaxDeckSize();
            if (this.selectedDeck.length >= max) {
              this.showMessage('⛔ Tối đa 8 cây!', 0.8, '#ff6666');
              return;
            }
            this.selectedDeck.push(id);
          }
          this._renderDeckSelection();
        });
      }
      grid.appendChild(card);
    }
  }

  hideDeckSelection() {
    this.deckSelect.style.display = 'none';
  }

  _confirmDeck() {
    if (this.selectedDeck.length === 0) {
      this.showMessage('⛔ Chọn ít nhất 1 cây!', 0.8, '#ff6666');
      return;
    }
    this.game.collectionManager.setDeck(this.selectedDeck);
    this.hideDeckSelection();
    this.game.start(this._pendingLevelIdx, this.selectedDeck);
  }

  hideGameOver() {
    this.gameOverScreen.style.display = 'none';
  }

  hideVictoryScreen() {
    this.victoryScreen.style.display = 'none';
  }

  hideStartScreen() {
    this.startScreen.style.display = 'none';
  }

  update(dt) {
    for (const card of this.plantCards) {
      if (card.cooldownTimer > 0) {
        card.cooldownTimer -= dt;
        const pct = (card.cooldownTimer / card.cooldownDuration) * 100;
        card.element.querySelector('.cooldown-overlay').style.height = pct + '%';
        if (card.cooldownTimer <= 0) {
          card.element.classList.remove('disabled');
          card.element.querySelector('.cooldown-overlay').style.height = '0%';
        }
      }

      const config = PLANT_TYPES[card.id];
      if (config && !this.game.sunManager.canAfford(config.cost) && !card.element.classList.contains('disabled')) {
        card.element.style.opacity = '0.5';
      } else if (config) {
        card.element.style.opacity = '';
      }
    }
  }

  _bindEvents() {
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
      this.hideStartScreen();
      this.showLevelSelect();
    });

    document.getElementById('level-back-btn').addEventListener('click', () => {
      this.hideLevelSelect();
      this.startScreen.style.display = 'flex';
    });

    document.getElementById('deck-back-btn').addEventListener('click', () => {
      this.hideDeckSelection();
      this.showLevelSelect();
    });

    document.getElementById('deck-confirm-btn').addEventListener('click', () => {
      this._confirmDeck();
    });

    document.getElementById('home-btn').addEventListener('click', () => {
      if (!this.game.running) return;
      this._goToMainMenu();
    });

    document.getElementById('start-guide-btn').addEventListener('click', () => {
      this._buildGuideContent();
      document.getElementById('guide-panel').classList.add('show');
    });
    document.getElementById('guide-btn').addEventListener('click', () => {
      this._buildGuideContent();
      document.getElementById('guide-panel').classList.add('show');
    });
    document.getElementById('guide-close-btn').addEventListener('click', () => {
      document.getElementById('guide-panel').classList.remove('show');
    });
    document.querySelectorAll('.guide-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.guide-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this._buildGuideContent(tab.dataset.tab);
      });
    });

    const cheatToggle = document.getElementById('cheat-toggle');
    const cheatPanel = document.getElementById('cheat-panel');
    cheatToggle.addEventListener('click', () => {
      cheatPanel.classList.toggle('open');
    });

    document.querySelectorAll('#cheat-panel [data-cheat]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.cheat;
        switch (action) {
          case 'sun': this.game.cheatAddSun(); break;
          case 'kill': this.game.cheatKillAll(); break;
          case 'win': this.game.cheatCompleteWave(); break;
          case 'unlock': this.game.cheatUnlockAll(); break;
          case 'warp': {
            const sel = document.getElementById('cheat-level-select');
            const idx = parseInt(sel.value);
            cheatPanel.classList.remove('open');
            this.game.cheatWarpTo(idx);
            break;
          }
          case 'close': {
            cheatPanel.classList.remove('open');
            break;
          }
          case 'reset-factory': {
            cheatPanel.classList.remove('open');
            this.game.cheatResetFactory();
            break;
          }
          case 'nocooldown': {
            this.game.cheatToggleNoCooldown();
            break;
          }

        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        cheatPanel.classList.toggle('open');
      }
    });
  }

  _buildGuideContent(tab) {
    tab = tab || 'plants';
    const container = document.getElementById('guide-content');
    let html = '';
    if (tab === 'plants') {
      html += '<div class="guide-grid">';
      const entries = Object.entries(PLANT_TYPES);
      for (const [, p] of entries) {
        const stats = [];
        if (p.damage) stats.push(`<span class="dmg">🗡️${p.damage}</span>`);
        if (p.fireRate) stats.push(`<span class="spd">⏱️${p.fireRate}s</span>`);
        if (p.hp) stats.push(`<span class="hp">❤️${p.hp}</span>`);
        if (p.cost !== undefined) stats.push(`<span class="cost">☀️${p.cost}</span>`);
        if (p.sunInterval) stats.push(`<span class="cost">☀️${p.sunAmount||'?'}/${p.sunInterval}s</span>`);
        html += `<div class="guide-item">
          <div class="emoji">${p.emoji||'🌱'}</div>
          <div class="info">
            <div class="name">${p.name}</div>
            <div class="desc">${p.desc||''}</div>
            ${stats.length ? '<div class="stats">'+stats.join('')+'</div>' : ''}
          </div>
        </div>`;
      }
      html += '</div>';
    } else if (tab === 'fusion') {
      html += '<div class="guide-grid">';
      for (const r of FUSION_RECIPES) {
        const a = PLANT_TYPES[r.a]||{};
        const b = PLANT_TYPES[r.b]||{};
        const stats = [];
        if (r.damage) stats.push(`<span class="dmg">🗡️${r.damage}</span>`);
        if (r.fireRate) stats.push(`<span class="spd">⏱️${r.fireRate}s</span>`);
        if (r.hp) stats.push(`<span class="hp">❤️${r.hp}</span>`);
        if (r.cost !== undefined) stats.push(`<span class="cost">☀️${r.cost}</span>`);
        if (r.sunInterval) stats.push(`<span class="cost">☀️${r.sunAmount||'?'}/${r.sunInterval}s</span>`);
        html += `<div class="guide-item">
          <div class="emoji">${r.emoji||'⚗️'}</div>
          <div class="info">
            <div class="name">${r.name}</div>
            <div class="desc">${r.desc||''}</div>
            <div class="guide-fusion-row">${a.emoji||''} ${a.name||'?'} + ${b.emoji||''} ${b.name||'?'} <span>→</span> ${r.name}</div>
            ${stats.length ? '<div class="stats">'+stats.join('')+'</div>' : ''}
          </div>
        </div>`;
      }
      html += '</div>';
    } else if (tab === 'zombies') {
      html += '<div class="guide-grid">';
      const entries = Object.entries(ZOMBIE_TYPES);
      for (const [, z] of entries) {
        html += `<div class="guide-item">
          <div class="emoji">${z.emoji||'🧟'}</div>
          <div class="info">
            <div class="name">${z.name}</div>
            <div class="stats">
              <span class="hp">❤️${z.hp}</span>
              <span class="spd">👟${z.speed}</span>
              <span class="dmg">🗡️${z.damage}</span>
            </div>
          </div>
        </div>`;
      }
      html += '</div>';
    }
    container.innerHTML = html;
  }
}
