(() => {
  const GRID_SIZE = 20;
  const CELL = 24;
  const TICK_MS = 120;

  const Direction = Object.freeze({
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  });

  function samePos(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function isOpposite(a, b) {
    return a.x + b.x === 0 && a.y + b.y === 0;
  }

  function makeInitialState() {
    const center = Math.floor(GRID_SIZE / 2);
    const snake = [
      { x: center, y: center },
      { x: center - 1, y: center },
      { x: center - 2, y: center }
    ];

    return {
      snake,
      direction: Direction.right,
      queuedDirection: Direction.right,
      food: randomFood(snake),
      score: 0,
      gameOver: false,
      paused: false
    };
  }

  function randomFood(snake) {
    const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
    const freeCells = [];

    for (let y = 0; y < GRID_SIZE; y += 1) {
      for (let x = 0; x < GRID_SIZE; x += 1) {
        const key = `${x},${y}`;
        if (!occupied.has(key)) {
          freeCells.push({ x, y });
        }
      }
    }

    if (freeCells.length === 0) {
      return snake[0];
    }

    const index = Math.floor(Math.random() * freeCells.length);
    return freeCells[index];
  }

  function nextState(state) {
    if (state.gameOver || state.paused) {
      return state;
    }

    const direction = state.queuedDirection;
    const nextHead = {
      x: state.snake[0].x + direction.x,
      y: state.snake[0].y + direction.y
    };

    const hitsWall =
      nextHead.x < 0 ||
      nextHead.y < 0 ||
      nextHead.x >= GRID_SIZE ||
      nextHead.y >= GRID_SIZE;

    if (hitsWall || state.snake.some((segment) => samePos(segment, nextHead))) {
      return {
        ...state,
        direction,
        gameOver: true
      };
    }

    const grew = samePos(nextHead, state.food);
    const movedSnake = [nextHead, ...state.snake];

    if (!grew) {
      movedSnake.pop();
    }

    return {
      ...state,
      snake: movedSnake,
      direction,
      food: grew ? randomFood(movedSnake) : state.food,
      score: grew ? state.score + 1 : state.score
    };
  }

  function setDirection(state, nextDirection) {
    if (state.gameOver || state.paused) {
      return state;
    }

    if (isOpposite(state.direction, nextDirection)) {
      return state;
    }

    return {
      ...state,
      queuedDirection: nextDirection
    };
  }

  function draw(ctx, state) {
    ctx.clearRect(0, 0, GRID_SIZE * CELL, GRID_SIZE * CELL);

    ctx.fillStyle = '#161616';
    ctx.fillRect(0, 0, GRID_SIZE * CELL, GRID_SIZE * CELL);

    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i += 1) {
      const p = i * CELL;
      ctx.beginPath();
      ctx.moveTo(p, 0);
      ctx.lineTo(p, GRID_SIZE * CELL);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, p);
      ctx.lineTo(GRID_SIZE * CELL, p);
      ctx.stroke();
    }

    ctx.fillStyle = '#f25f5c';
    ctx.fillRect(state.food.x * CELL, state.food.y * CELL, CELL, CELL);

    ctx.fillStyle = '#52c66f';
    for (const segment of state.snake) {
      ctx.fillRect(segment.x * CELL, segment.y * CELL, CELL, CELL);
    }
  }

  const board = document.getElementById('board');
  const scoreEl = document.getElementById('score');
  const statusEl = document.getElementById('status');
  const pauseButton = document.getElementById('pause');
  const restartButton = document.getElementById('restart');

  const ctx = board.getContext('2d');
  let state = makeInitialState();

  function render() {
    draw(ctx, state);
    scoreEl.textContent = String(state.score);
    statusEl.textContent = state.gameOver ? 'Game Over' : (state.paused ? 'Paused' : 'Running');
    pauseButton.textContent = state.paused ? 'Resume (P)' : 'Pause (P)';
  }

  function reset() {
    state = makeInitialState();
    render();
  }

  function togglePause() {
    if (state.gameOver) {
      return;
    }
    state = { ...state, paused: !state.paused };
    render();
  }

  const keyToDirection = {
    ArrowUp: Direction.up,
    ArrowDown: Direction.down,
    ArrowLeft: Direction.left,
    ArrowRight: Direction.right,
    w: Direction.up,
    a: Direction.left,
    s: Direction.down,
    d: Direction.right,
    W: Direction.up,
    A: Direction.left,
    S: Direction.down,
    D: Direction.right
  };

  window.addEventListener('keydown', (event) => {
    if (event.key === 'p' || event.key === 'P') {
      togglePause();
      return;
    }

    if (event.key === 'r' || event.key === 'R') {
      reset();
      return;
    }

    const nextDirection = keyToDirection[event.key];
    if (!nextDirection) {
      return;
    }

    event.preventDefault();
    state = setDirection(state, nextDirection);
  });

  pauseButton.addEventListener('click', togglePause);
  restartButton.addEventListener('click', reset);

  setInterval(() => {
    state = nextState(state);
    render();
  }, TICK_MS);

  render();

  window.__snake = {
    makeInitialState,
    nextState,
    setDirection,
    randomFood,
    Direction,
    GRID_SIZE
  };
})();
