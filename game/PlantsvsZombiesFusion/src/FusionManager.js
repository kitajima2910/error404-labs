import { FUSION_RECIPES, PLANT_TYPES } from './constants.js';

export class FusionManager {
  constructor(game) {
    this.game = game;
    this.recipes = FUSION_RECIPES;
    this.pendingFusion = null;
  }

  canFuse(typeA, typeB) {
    if (!typeA || !typeB) return null;
    for (const recipe of this.recipes) {
      if (
        (recipe.a === typeA && recipe.b === typeB) ||
        (recipe.a === typeB && recipe.b === typeA)
      ) {
        return recipe;
      }
    }
    return null;
  }

  getFusionOptions(row, col) {
    const plant = this.game.plantManager.getPlantAt(row, col);
    if (!plant || plant.isFusion || !plant.config.fuseable) return [];

    const neighbors = this.game.plantManager.findFusionTargets(row, col);
    const options = [];

    for (const neighbor of neighbors) {
      if (!neighbor.plant.alive || neighbor.plant.isFusion || !neighbor.plant.config.fuseable) continue;
      const recipe = this.canFuse(plant.type, neighbor.plant.type);
      if (recipe) {
        options.push({
          recipe,
          neighborRow: neighbor.row,
          neighborCol: neighbor.col,
          neighborPlant: neighbor.plant
        });
      }
    }

    return options;
  }

  performFusion(row, col, targetRow, targetCol, recipe) {
    const plant1 = this.game.plantManager.getPlantAt(row, col);
    const plant2 = this.game.plantManager.getPlantAt(targetRow, targetCol);
    if (!plant1 || !plant2 || !plant1.alive || !plant2.alive) return false;

    const midPos = plant1.model.position.clone().add(plant2.model.position).multiplyScalar(0.5);

    this.game.plantManager.removePlant(plant1);
    this.game.plantManager.removePlant(plant2);

    const fusionConfig = {
      ...recipe,
      isFusion: true,
      id: recipe.result
    };

    const fused = this.game.plantManager.placePlant(recipe.result, row, col, fusionConfig);
    if (fused) {
      this.game.audio.playFusion();
      this.game.particleManager.fusionBurst(midPos);
      this.game.particleManager.starBurst(0xffd700, midPos, 20, 5, 0.8);
      this.game.particleManager.ringBurst(0xffd700, midPos, 5, 4, 0.6);
      this.game.sceneManager.shake(0.2, 0.25);
      this.game.sceneManager.flash(0xffd700, 0.15);
      this.game.hitStop(0.08);
      this.game.addScore(50);
      this.game.collectionManager.addFusionResult(recipe.result);
      return true;
    }
    return false;
  }
}
