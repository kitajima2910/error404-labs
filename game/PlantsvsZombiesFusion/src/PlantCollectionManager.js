import { PLANT_TYPES, FUSION_RECIPES } from './constants.js';

const STORAGE_KEY = 'pvz_fusion_collection';
const DECK_KEY = 'pvz_fusion_deck';
const MAX_DECK_SIZE = 8;

const STARTER_PLANTS = ['peashooter', 'sunflower', 'wallnut'];

export class PlantCollectionManager {
  constructor() {
    this._collection = this._loadCollection();
    this._deck = this._loadDeck();
  }

  _loadCollection() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [...STARTER_PLANTS];
  }

  _saveCollection() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this._collection)); } catch {}
  }

  _loadDeck() {
    try {
      const raw = localStorage.getItem(DECK_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [...STARTER_PLANTS];
  }

  _saveDeck() {
    try { localStorage.setItem(DECK_KEY, JSON.stringify(this._deck)); } catch {}
  }

  getAll() {
    return [...this._collection];
  }

  has(id) {
    return this._collection.includes(id);
  }

  add(id) {
    if (!this._collection.includes(id)) {
      this._collection.push(id);
      this._saveCollection();
    }
  }

  addBatch(ids) {
    let changed = false;
    for (const id of ids) {
      if (!this._collection.includes(id)) {
        this._collection.push(id);
        changed = true;
      }
    }
    if (changed) this._saveCollection();
  }

  addFusionResult(resultId) {
    if (!this._collection.includes(resultId)) {
      this._collection.push(resultId);
      this._saveCollection();
      return true;
    }
    return false;
  }

  getDeck() {
    return [...this._deck];
  }

  setDeck(newDeck) {
    if (newDeck.length > MAX_DECK_SIZE) {
      newDeck = newDeck.slice(0, MAX_DECK_SIZE);
    }
    this._deck = newDeck.filter(id => this._collection.includes(id));
    this._saveDeck();
  }

  addToDeck(id) {
    if (this._deck.length >= MAX_DECK_SIZE) return false;
    if (!this._collection.includes(id)) return false;
    if (this._deck.includes(id)) return false;
    this._deck.push(id);
    this._saveDeck();
    return true;
  }

  removeFromDeck(id) {
    const idx = this._deck.indexOf(id);
    if (idx !== -1) {
      this._deck.splice(idx, 1);
      this._saveDeck();
      return true;
    }
    return false;
  }

  isInDeck(id) {
    return this._deck.includes(id);
  }

  getMaxDeckSize() {
    return MAX_DECK_SIZE;
  }

  getCollectedCount() {
    const allPlantIds = Object.keys(PLANT_TYPES);
    const fusionIds = FUSION_RECIPES.map(r => r.result);
    const nonFusionIds = allPlantIds.filter(id => !fusionIds.includes(id));
    return nonFusionIds.filter(id => this._collection.includes(id)).length;
  }

  getTotalCollectibleCount() {
    const allPlantIds = Object.keys(PLANT_TYPES);
    const fusionIds = FUSION_RECIPES.map(r => r.result);
    return allPlantIds.length - fusionIds.length;
  }

  reset() {
    this._collection = [...STARTER_PLANTS];
    this._deck = [...STARTER_PLANTS];
    this._saveCollection();
    this._saveDeck();
  }
}
