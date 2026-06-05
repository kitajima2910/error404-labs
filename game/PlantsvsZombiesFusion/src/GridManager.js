import { GRID_ROWS, GRID_COLS, CELL_SIZE, GRID_OFFSET_X, GRID_OFFSET_Z, COL_X, LANE_Z } from './constants.js';

export class GridManager {
  constructor() {
    this.cells = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      this.cells[r] = [];
      for (let c = 0; c < GRID_COLS; c++) {
        this.cells[r][c] = { row: r, col: c, plant: null, occupied: false };
      }
    }
  }

  worldToGrid(x, z) {
    const col = Math.round((x - GRID_OFFSET_X) / CELL_SIZE);
    const row = Math.round((z - GRID_OFFSET_Z) / CELL_SIZE);
    if (row < 0 || row >= GRID_ROWS || col < 0 || col >= GRID_COLS) return null;
    return { row, col };
  }

  gridToWorld(row, col) {
    return { x: COL_X[col], z: LANE_Z[row] };
  }

  isOccupied(row, col) {
    if (row < 0 || row >= GRID_ROWS || col < 0 || col >= GRID_COLS) return true;
    return this.cells[row][col].occupied;
  }

  getPlantAt(row, col) {
    if (row < 0 || row >= GRID_ROWS || col < 0 || col >= GRID_COLS) return null;
    return this.cells[row][col].plant;
  }

  placePlant(row, col, plant) {
    if (this.isOccupied(row, col)) return false;
    this.cells[row][col].plant = plant;
    this.cells[row][col].occupied = true;
    return true;
  }

  removePlant(row, col) {
    const plant = this.cells[row][col].plant;
    this.cells[row][col].plant = null;
    this.cells[row][col].occupied = false;
    return plant;
  }

  getNeighbor(row, col, direction) {
    switch (direction) {
      case 'up': return { row: row - 1, col };
      case 'down': return { row: row + 1, col };
      case 'left': return { row, col: col - 1 };
      case 'right': return { row, col: col + 1 };
      default: return null;
    }
  }

  findAdjacentPlants(row, col) {
    const result = [];
    for (const dir of ['up', 'down', 'left', 'right']) {
      const n = this.getNeighbor(row, col, dir);
      if (n && this.isInBounds(n.row, n.col) && this.cells[n.row][n.col].occupied) {
        result.push({ ...n, plant: this.cells[n.row][n.col].plant });
      }
    }
    return result;
  }

  isInBounds(row, col) {
    return row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS;
  }
}
