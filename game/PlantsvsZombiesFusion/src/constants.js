export const GRID_ROWS = 5;
export const GRID_COLS = 9;
export const CELL_SIZE = 1.6;
const halfW = (GRID_COLS - 1) * CELL_SIZE * 0.5;
const halfH = (GRID_ROWS - 1) * CELL_SIZE * 0.5;
export const GRID_OFFSET_X = -halfW;
export const GRID_OFFSET_Z = -halfH;

export const LANE_Z = Array.from({ length: GRID_ROWS }, (_, i) => GRID_OFFSET_Z + i * CELL_SIZE);
export const COL_X = Array.from({ length: GRID_COLS }, (_, i) => GRID_OFFSET_X + i * CELL_SIZE);

export const PLANT_TYPES = {
  peashooter: {
    id: 'peashooter', name: 'Đậu Bắn', cost: 100, hp: 100,
    damage: 20, fireRate: 1.8, range: 12,
    color: 0x44aa44, emoji: '🌱', desc: 'Bắn đậu cơ bản',
    fuseable: true
  },
  sunflower: {
    id: 'sunflower', name: 'Hướng Dương', cost: 50, hp: 80,
    sunInterval: 6, sunAmount: 25,
    color: 0xffdd44, emoji: '🌻', desc: 'Sản xuất mặt trời',
    fuseable: true
  },
  snowpea: {
    id: 'snowpea', name: 'Đậu Tuyết', cost: 175, hp: 100,
    damage: 15, fireRate: 2.2, range: 12, slowFactor: 0.5, slowDuration: 3,
    color: 0x66ccff, emoji: '❄️', desc: 'Làm chậm zombie',
    fuseable: true
  },
  wallnut: {
    id: 'wallnut', name: 'Tường Hạt', cost: 50, hp: 400,
    color: 0xcc8844, emoji: '🥜', desc: 'Chặn zombie',
    fuseable: true
  },
  cherrybomb: {
    id: 'cherrybomb', name: 'Anh Đào Nổ', cost: 150, hp: 50,
    explodeDamage: 200, explodeRadius: 2,
    color: 0xff3333, emoji: '🍒', desc: 'Nổ tung!',
    fuseable: false, oneShot: true
  },
  repeater: {
    id: 'repeater', name: 'Đậu Liên Thanh', cost: 200, hp: 100,
    damage: 20, fireRate: 1.4, range: 12, shotsPerFire: 2,
    color: 0x55bb55, emoji: '🔁', desc: 'Bắn 2 phát',
    fuseable: false
  },
  chomper: {
    id: 'chomper', name: 'Cây Nhái', cost: 150, hp: 80,
    chompDamage: 60, chompInterval: 2.5, range: 1.5,
    color: 0x9933cc, emoji: '🦷', desc: 'Ăn zombie',
    fuseable: false
  },
  torchwood: {
    id: 'torchwood', name: 'Gỗ Đuốc', cost: 175, hp: 80,
    color: 0xff6600, emoji: '🔥', desc: 'Tăng sức đậu',
    fuseable: false
  },
  iceberg: {
    id: 'iceberg', name: 'Xà Lách Băng', cost: 0, hp: 40,
    freezeDuration: 5, oneShot: true,
    color: 0x88ddff, emoji: '🧊', desc: 'Đóng băng 1 zombie',
    fuseable: false
  },
  potato: {
    id: 'potato', name: 'Khoai Tây Mìn', cost: 25, hp: 40,
    explodeDamage: 150, explodeRadius: 1.5, armTime: 5,
    color: 0xbb8844, emoji: '🥔', desc: 'Bẫy nổ',
    fuseable: false, oneShot: true
  },
  // === 31 cây mới (tổng 50 gồm cả fusion) ===
  gatlingpea: {
    id: 'gatlingpea', name: 'Gatling Đậu', cost: 325, hp: 100,
    damage: 20, range: 12,
    maxSpinSpeed: 12, spinAccel: 5, spinDecel: 3,
    color: 0xcc4444, emoji: '🔫', desc: 'Nòng xoay tăng tốc, bắn liên thanh', fuseable: false
  },
  triplepea: {
    id: 'triplepea', name: 'Đậu Ba', cost: 300, hp: 100,
    damage: 20, fireRate: 1.6, range: 12, shotsPerFire: 3,
    color: 0x4488cc, emoji: '3️⃣', desc: 'Bắn 3 phát', fuseable: false
  },
  laserbean: {
    id: 'laserbean', name: 'Đậu Laser', cost: 250, hp: 80,
    damage: 40, fireRate: 2.0, range: 20,
    color: 0xff2255, emoji: '🔴', desc: 'Bắn tia laser tức thời', fuseable: false,
    _laser: true
  },
  homingpea: {
    id: 'homingpea', name: 'Đậu Tầm Nhiệt', cost: 225, hp: 100,
    damage: 25, fireRate: 2.0, range: 14,
    color: 0xff8800, emoji: '🎯', desc: 'Đạn tự tìm mục tiêu', fuseable: false
  },
  electropea: {
    id: 'electropea', name: 'Đậu Điện', cost: 275, hp: 100,
    damage: 15, fireRate: 2.0, range: 12,
    color: 0x4488ff, emoji: '⚡', desc: 'Điện xích 3 zombie', fuseable: false
  },
  melon: {
    id: 'melon', name: 'Dưa Hấu', cost: 350, hp: 150,
    damage: 40, fireRate: 3.0, range: 10,
    color: 0x44aa44, emoji: '🍉', desc: 'Sát thương vùng', fuseable: false
  },
  cobcannon: {
    id: 'cobcannon', name: 'Ngô Nổ', cost: 500, hp: 100,
    damage: 80, fireRate: 4.0, range: 20,
    color: 0xffdd44, emoji: '🌽', desc: 'Công phá mạnh nhất', fuseable: false
  },
  pumpkin: {
    id: 'pumpkin', name: 'Bí Ngô', cost: 125, hp: 600,
    color: 0xff8833, emoji: '🎃', desc: 'Khiên bảo vệ', fuseable: false
  },
  spikerock: {
    id: 'spikerock', name: 'Đá Gai', cost: 150, hp: 200,
    damage: 10, fireRate: 0.8, range: 0.8,
    color: 0x888888, emoji: '🪨', desc: 'Gai làm đau zombie', fuseable: false
  },
  steelwall: {
    id: 'steelwall', name: 'Tường Thép', cost: 175, hp: 1200,
    color: 0x8888cc, emoji: '🛡️', desc: 'Tường trâu nhất', fuseable: false
  },
  bamboo: {
    id: 'bamboo', name: 'Tre Chắn', cost: 75, hp: 250,
    color: 0x55aa55, emoji: '🎋', desc: 'Tường nhẹ', fuseable: false
  },
  sunshroom: {
    id: 'sunshroom', name: 'Nấm Mặt Trời', cost: 25, hp: 40,
    sunInterval: 5, sunAmount: 15,
    color: 0xffdd66, emoji: '🍄', desc: 'Nấm sinh nắng rẻ', fuseable: false
  },
  sunlight: {
    id: 'sunlight', name: 'Cây Ánh Sáng', cost: 75, hp: 80,
    sunInterval: 5, sunAmount: 25,
    color: 0xffff88, emoji: '💡', desc: 'Sinh nắng ổn định', fuseable: false
  },
  solarpanel: {
    id: 'solarpanel', name: 'Pin Mặt Trời', cost: 200, hp: 100,
    sunInterval: 4, sunAmount: 50,
    color: 0x4488ff, emoji: '☀️', desc: 'Sinh nắng nhiều nhất', fuseable: false
  },
  goldmushroom: {
    id: 'goldmushroom', name: 'Nấm Vàng', cost: 100, hp: 60,
    sunInterval: 8, sunAmount: 30,
    color: 0xffcc00, emoji: '🪙', desc: 'Sinh vàng', fuseable: false
  },
  moonflower: {
    id: 'moonflower', name: 'Hoa Mặt Trăng', cost: 100, hp: 80,
    color: 0x9933ff, emoji: '🌙', desc: 'Buff cây lân cận', fuseable: false
  },
  squash: {
    id: 'squash', name: 'Bí Đè', cost: 125, hp: 80,
    explodeDamage: 150, explodeRadius: 1.0, oneShot: true,
    color: 0xff8844, emoji: '🫃', desc: 'Đè zombie tại chỗ', fuseable: false
  },
  jalapeno: {
    id: 'jalapeno', name: 'Ớt Đỏ', cost: 175, hp: 50,
    explodeDamage: 500, explodeRadius: 10, oneShot: true,
    color: 0xff2222, emoji: '🌶️', desc: 'Đốt cháy cả lane', fuseable: false
  },
  garlic: {
    id: 'garlic', name: 'Tỏi', cost: 50, hp: 80,
    color: 0xeeeedd, emoji: '🧄', desc: 'Xua đuổi zombie', fuseable: false
  },
  gravebuster: {
    id: 'gravebuster', name: 'Dương Tiêu', cost: 75, hp: 60,
    color: 0xddaaff, emoji: '🧹', desc: 'Phá vật cản', fuseable: false
  },
  hypnoshroom: {
    id: 'hypnoshroom', name: 'Nấm Thôi Miên', cost: 125, hp: 40,
    freezeDuration: 6, oneShot: true,
    color: 0xff44ff, emoji: '🌀', desc: 'Thôi miên zombie', fuseable: false
  },
  carrot: {
    id: 'carrot', name: 'Cà Rốt', cost: 100, hp: 80,
    color: 0xff8822, emoji: '🥕', desc: 'Hồi sinh cây chết', fuseable: false
  },
  coffee: {
    id: 'coffee', name: 'Cà Phê', cost: 75, hp: 60,
    color: 0x664422, emoji: '☕', desc: 'Tăng tốc bắn', fuseable: false
  },
  marigold: {
    id: 'marigold', name: 'Cúc Vạn Thọ', cost: 50, hp: 60,
    sunInterval: 7, sunAmount: 15,
    color: 0xffee44, emoji: '🌼', desc: 'Phần thưởng ngẫu nhiên', fuseable: false
  },
  umbrella: {
    id: 'umbrella', name: 'Ô Chắn', cost: 100, hp: 150,
    color: 0x4488ff, emoji: '☂️', desc: 'Chắn đạn', fuseable: false
  },
  madweed: {
    id: 'madweed', name: 'Cỏ Điên', cost: 200, hp: 80,
    damage: 15, fireRate: 1.5, range: 10,
    color: 0xff44ff, emoji: '🤪', desc: 'Bắn mọi hướng', fuseable: false
  },
  lotus: {
    id: 'lotus', name: 'Sen Hồng', cost: 125, hp: 100,
    color: 0xff88aa, emoji: '🌸', desc: 'Hồi máu cây lân cận', fuseable: false
  },
  frost: {
    id: 'frost', name: 'Cây Tuyết', cost: 200, hp: 80,
    freezeDuration: 3, oneShot: true,
    color: 0xaaddff, emoji: '❄️', desc: 'Đóng băng vùng', fuseable: false
  },
  landmine: {
    id: 'landmine', name: 'Địa Lôi', cost: 50, hp: 40,
    explodeDamage: 200, explodeRadius: 1.5, armTime: 4, oneShot: true,
    color: 0x554433, emoji: '💣', desc: 'Bẫy ẩn dưới đất', fuseable: false
  },
  cactus: {
    id: 'cactus', name: 'Xương Rồng', cost: 125, hp: 120,
    damage: 25, fireRate: 2.0, range: 14,
    color: 0x44aa55, emoji: '🌵', desc: 'Bắn xuyên 2 zombie', fuseable: false
  },
  thunder: {
    id: 'thunder', name: 'Cây Sấm Sét', cost: 300, hp: 80,
    explodeDamage: 100, explodeRadius: 2.0, oneShot: true,
    color: 0x4422ff, emoji: '🌩️', desc: 'Sét đánh vùng lớn', fuseable: false
  }
};

export const FUSION_RECIPES = [
  { a: 'peashooter', b: 'sunflower', result: 'sunpea', name: 'Đậu Mặt Trời', emoji: '🌞🌱', desc: 'Bắn đậu sinh mặt trời', color: 0xffdd44, cost: 200, damage: 18, fireRate: 1.6, hp: 120, sunPerHit: 10 },
  { a: 'peashooter', b: 'snowpea', result: 'icepea', name: 'Đậu Băng', emoji: '🧊🌱', desc: 'Chậm + sát thương', color: 0x77ddff, cost: 250, damage: 22, fireRate: 1.8, hp: 120, slowFactor: 0.4, slowDuration: 4 },
  { a: 'peashooter', b: 'wallnut', result: 'nutshooter', name: 'Hạt Bắn', emoji: '🥜🌱', desc: 'Bắn trâu bò', color: 0x88aa44, cost: 200, damage: 15, fireRate: 2.0, hp: 300 },
  { a: 'sunflower', b: 'wallnut', result: 'sunnut', name: 'Hạt Mặt Trời', emoji: '🌻🥜', desc: 'Mặt trời + khiên', color: 0xddcc44, cost: 150, hp: 350, sunInterval: 5, sunAmount: 25 },
  { a: 'snowpea', b: 'wallnut', result: 'icenut', name: 'Hạt Băng', emoji: '🧊🥜', desc: 'Tường băng', color: 0x88ccff, cost: 250, hp: 350, freezeAura: 1.5 },
  { a: 'peashooter', b: 'peashooter', result: 'doublepea', name: 'Đậu Kép', emoji: '🌱🌱', desc: 'Bắn 2 phát', color: 0x55cc55, cost: 200, damage: 20, fireRate: 1.4, hp: 120, shotsPerFire: 2 },
  { a: 'sunflower', b: 'sunflower', result: 'twinflower', name: 'Hoa Đôi', emoji: '🌻🌻', desc: 'Mặt trời đôi', color: 0xffdd44, cost: 150, hp: 100, sunInterval: 4, sunAmount: 25 },
  { a: 'snowpea', b: 'snowpea', result: 'wintermelon', name: 'Dưa Mùa Đông', emoji: '❄️🍈', desc: 'Chậm diện rộng', color: 0x88ddff, cost: 300, damage: 30, fireRate: 2.5, hp: 150, slowFactor: 0.3, slowDuration: 4, aoeRadius: 1.5 },
  { a: 'wallnut', b: 'wallnut', result: 'tallnut', name: 'Hạt Cao', emoji: '🥜🥜', desc: 'Tường siêu cấp', color: 0xcc9955, cost: 150, hp: 800 }
];

export const ZOMBIE_TYPES = {
  basic: {
    id: 'basic', name: 'Zombie Cơ Bản', hp: 100, speed: 0.25, damage: 10, attackInterval: 1.0,
    color: 0x88aa77, emoji: '🧟', score: 10
  },
  cone: {
    id: 'cone', name: 'Zombie Nón', hp: 200, speed: 0.3, damage: 10, attackInterval: 1.0,
    color: 0xff8833, emoji: '🧟‍♂️', score: 20
  },
  bucket: {
    id: 'bucket', name: 'Zombie Xô', hp: 550, speed: 0.2, damage: 10, attackInterval: 1.0,
    color: 0xcccccc, emoji: '🧟‍♀️', score: 30
  },
  flag: {
    id: 'flag', name: 'Zombie Cờ', hp: 100, speed: 0.5, damage: 10, attackInterval: 1.0,
    color: 0xff4444, emoji: '🚩', score: 15
  },
  football: {
    id: 'football', name: 'Zombie Bóng Bầu', hp: 300, speed: 0.7, damage: 15, attackInterval: 0.8,
    color: 0xcc4444, emoji: '🏈', score: 25
  },
  boss: {
    id: 'boss', name: 'Trùm Zombie', hp: 2000, speed: 0.15, damage: 30, attackInterval: 1.5,
    color: 0xaa00aa, emoji: '👑', score: 200, isBoss: true
  },
  giant: {
    id: 'giant', name: 'Zombie Khổng Lồ', hp: 1500, speed: 0.18, damage: 40, attackInterval: 2.0,
    color: 0x555555, emoji: '🦍', score: 150, isBoss: true
  }
};

export const LEVEL_THEMES = {
  meadow: {
    label: 'Bãi Cỏ', sky: 0x87ceeb, fog: 0x87ceeb, fogNear: 25, fogFar: 40,
    ground: 0x4a8c3f, groundStrip: 0x3d7a33, grid: 0x5a9e4a, gridEdge: 0x3a7a2a,
    ambient: 0x8899bb, sunColor: 0xffeedd, sunIntensity: 1.8,
  },
  bamboo: {
    label: 'Rừng Tre', sky: 0x5a8a5a, fog: 0x4a7a4a, fogNear: 18, fogFar: 32,
    ground: 0x3d6b2e, groundStrip: 0x2e5a22, grid: 0x4a7a3a, gridEdge: 0x2e5a22,
    ambient: 0x668866, sunColor: 0xccdd88, sunIntensity: 1.4,
  },
  desert: {
    label: 'Sa Mạc', sky: 0xf0c87a, fog: 0xe8b86a, fogNear: 22, fogFar: 38,
    ground: 0xccaa55, groundStrip: 0xbb9944, grid: 0xd4b060, gridEdge: 0xaa8833,
    ambient: 0xccbb88, sunColor: 0xffcc44, sunIntensity: 2.2,
  },
  swamp: {
    label: 'Đầm Lầy', sky: 0x3a5a3a, fog: 0x2a4a2a, fogNear: 14, fogFar: 28,
    ground: 0x2a5a2a, groundStrip: 0x1a4a1a, grid: 0x3a6a3a, gridEdge: 0x1a3a1a,
    ambient: 0x445544, sunColor: 0x99aa66, sunIntensity: 1.0,
  },
  snow: {
    label: 'Tuyết', sky: 0xccddff, fog: 0xddeeff, fogNear: 20, fogFar: 35,
    ground: 0xddeeff, groundStrip: 0xcceeff, grid: 0xccddff, gridEdge: 0xaaccee,
    ambient: 0xaabbee, sunColor: 0xffffff, sunIntensity: 1.6,
  },
  sunset: {
    label: 'Hoàng Hôn', sky: 0xdd7744, fog: 0xcc6633, fogNear: 20, fogFar: 35,
    ground: 0x885533, groundStrip: 0x774422, grid: 0x996644, gridEdge: 0x663322,
    ambient: 0xcc8866, sunColor: 0xff8844, sunIntensity: 1.5,
  },
  night: {
    label: 'Biển Đêm', sky: 0x0a0a2e, fog: 0x0a0a2e, fogNear: 16, fogFar: 30,
    ground: 0x1a1a3a, groundStrip: 0x0f0f2e, grid: 0x2a2a4a, gridEdge: 0x1a1a3a,
    ambient: 0x223355, sunColor: 0x4466aa, sunIntensity: 0.6,
  },
  volcano: {
    label: 'Núi Lửa', sky: 0x662222, fog: 0x551111, fogNear: 14, fogFar: 28,
    ground: 0x553322, groundStrip: 0x442211, grid: 0x664433, gridEdge: 0x442211,
    ambient: 0x553333, sunColor: 0xff4422, sunIntensity: 2.0,
  },
  haunted: {
    label: 'Rừng Ma', sky: 0x1a0a2e, fog: 0x1a0a2e, fogNear: 14, fogFar: 28,
    ground: 0x2a1a3a, groundStrip: 0x1f0f2e, grid: 0x3a2a4a, gridEdge: 0x1f0f2e,
    ambient: 0x332244, sunColor: 0x8844aa, sunIntensity: 0.7,
  },
  space: {
    label: 'Không Gian', sky: 0x000011, fog: 0x000011, fogNear: 18, fogFar: 32,
    ground: 0x111122, groundStrip: 0x0a0a1a, grid: 0x222233, gridEdge: 0x111122,
    ambient: 0x111133, sunColor: 0x4488ff, sunIntensity: 0.8,
  }
};

export const LEVELS = [
  {
    number: 1, theme: 'meadow',
    availablePlants: ['peashooter', 'sunflower', 'wallnut'],
    rewards: ['peashooter', 'sunflower', 'wallnut'],
    waves: [
      { zombies: [{ type: 'basic', count: 3 }], spawnInterval: 4, prepTime: 8 },
      { zombies: [{ type: 'basic', count: 4 }], spawnInterval: 3.5, prepTime: 5 },
      { zombies: [{ type: 'basic', count: 2 }, { type: 'cone', count: 1 }, { type: 'boss', count: 1 }], spawnInterval: 3, prepTime: 5 },
    ]
  },
  {
    number: 2, theme: 'bamboo',
    availablePlants: ['peashooter', 'sunflower', 'snowpea', 'wallnut', 'potato'],
    rewards: ['snowpea', 'potato', 'bamboo'],
    waves: [
      { zombies: [{ type: 'basic', count: 4 }, { type: 'cone', count: 1 }], spawnInterval: 3.5, prepTime: 6 },
      { zombies: [{ type: 'basic', count: 2 }, { type: 'cone', count: 3 }], spawnInterval: 3, prepTime: 5 },
      { zombies: [{ type: 'basic', count: 3 }, { type: 'cone', count: 2 }, { type: 'boss', count: 1 }], spawnInterval: 3, prepTime: 5 },
    ]
  },
  {
    number: 3, theme: 'desert',
    availablePlants: ['peashooter', 'sunflower', 'snowpea', 'wallnut', 'cherrybomb'],
    rewards: ['cherrybomb', 'cactus', 'sunlight'],
    waves: [
      { zombies: [{ type: 'basic', count: 3 }, { type: 'cone', count: 2 }], spawnInterval: 3, prepTime: 5 },
      { zombies: [{ type: 'cone', count: 4 }, { type: 'flag', count: 1 }], spawnInterval: 2.8, prepTime: 5 },
      { zombies: [{ type: 'cone', count: 3 }, { type: 'flag', count: 1 }, { type: 'boss', count: 1 }], spawnInterval: 2.8, prepTime: 5 },
    ]
  },
  {
    number: 4, theme: 'swamp',
    availablePlants: ['peashooter', 'sunflower', 'wallnut', 'repeater', 'potato', 'torchwood'],
    rewards: ['repeater', 'torchwood', 'lotus', 'spikerock'],
    waves: [
      { zombies: [{ type: 'cone', count: 4 }, { type: 'basic', count: 2 }], spawnInterval: 2.8, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 2 }, { type: 'cone', count: 2 }], spawnInterval: 2.5, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 2 }, { type: 'cone', count: 2 }, { type: 'boss', count: 1 }], spawnInterval: 2.5, prepTime: 5 },
    ]
  },
  {
    number: 5, theme: 'snow',
    availablePlants: ['peashooter', 'sunflower', 'snowpea', 'wallnut', 'cherrybomb', 'repeater', 'chomper'],
    rewards: ['chomper', 'frost', 'umbrella', 'iceberg'],
    waves: [
      { zombies: [{ type: 'bucket', count: 3 }, { type: 'cone', count: 2 }], spawnInterval: 2.5, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 2 }, { type: 'cone', count: 2 }, { type: 'football', count: 1 }], spawnInterval: 2.5, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 2 }, { type: 'cone', count: 2 }, { type: 'football', count: 1 }, { type: 'giant', count: 1 }], spawnInterval: 2.5, prepTime: 6 },
    ]
  },
  {
    number: 6, theme: 'sunset',
    availablePlants: ['peashooter', 'sunflower', 'snowpea', 'wallnut', 'repeater', 'torchwood', 'chomper', 'potato'],
    rewards: ['pumpkin', 'garlic', 'marigold', 'coffee', 'goldmushroom'],
    waves: [
      { zombies: [{ type: 'bucket', count: 4 }, { type: 'cone', count: 2 }], spawnInterval: 2.5, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 3 }, { type: 'football', count: 2 }], spawnInterval: 2.5, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 3 }, { type: 'football', count: 2 }, { type: 'boss', count: 1 }], spawnInterval: 2.5, prepTime: 5 },
    ]
  },
  {
    number: 7, theme: 'night',
    availablePlants: ['peashooter', 'sunflower', 'snowpea', 'wallnut', 'cherrybomb', 'repeater', 'chomper', 'torchwood', 'potato'],
    rewards: ['sunshroom', 'moonflower', 'electropea', 'carrot'],
    waves: [
      { zombies: [{ type: 'bucket', count: 5 }, { type: 'football', count: 2 }], spawnInterval: 2.2, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 3 }, { type: 'football', count: 3 }, { type: 'flag', count: 1 }], spawnInterval: 2.2, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 3 }, { type: 'football', count: 2 }, { type: 'giant', count: 1 }], spawnInterval: 2.2, prepTime: 5 },
    ]
  },
  {
    number: 8, theme: 'volcano',
    availablePlants: ['peashooter', 'sunflower', 'snowpea', 'wallnut', 'cherrybomb', 'repeater', 'chomper', 'torchwood', 'potato'],
    rewards: ['squash', 'jalapeno', 'landmine', 'thunder', 'triplepea'],
    waves: [
      { zombies: [{ type: 'bucket', count: 4 }, { type: 'football', count: 3 }, { type: 'basic', count: 2 }], spawnInterval: 2, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 3 }, { type: 'football', count: 3 }, { type: 'cone', count: 1 }], spawnInterval: 2, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 3 }, { type: 'football', count: 3 }, { type: 'boss', count: 1 }], spawnInterval: 2, prepTime: 6 },
    ]
  },
  {
    number: 9, theme: 'haunted',
    availablePlants: ['peashooter', 'sunflower', 'snowpea', 'wallnut', 'cherrybomb', 'repeater', 'chomper', 'torchwood', 'potato'],
    rewards: ['hypnoshroom', 'gravebuster', 'madweed', 'cobcannon', 'gatlingpea'],
    waves: [
      { zombies: [{ type: 'bucket', count: 5 }, { type: 'football', count: 3 }], spawnInterval: 2, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 4 }, { type: 'football', count: 4 }], spawnInterval: 1.8, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 4 }, { type: 'football', count: 3 }, { type: 'giant', count: 1 }, { type: 'boss', count: 1 }], spawnInterval: 1.8, prepTime: 6 },
    ]
  },
  {
    number: 10, theme: 'space',
    availablePlants: ['peashooter', 'sunflower', 'snowpea', 'wallnut', 'cherrybomb', 'repeater', 'chomper', 'torchwood', 'potato'],
    rewards: ['laserbean', 'homingpea', 'melon', 'solarpanel', 'steelwall'],
    waves: [
      { zombies: [{ type: 'bucket', count: 6 }, { type: 'football', count: 3 }, { type: 'cone', count: 2 }], spawnInterval: 1.8, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 5 }, { type: 'football', count: 4 }, { type: 'cone', count: 2 }], spawnInterval: 1.5, prepTime: 5 },
      { zombies: [{ type: 'bucket', count: 4 }, { type: 'football', count: 4 }, { type: 'giant', count: 2 }, { type: 'boss', count: 1 }], spawnInterval: 1.5, prepTime: 6 },
    ]
  }
];

export const ENDLESS_WAVES = [
  { number: 11, zombies: [{ type: 'basic', count: 6 }, { type: 'cone', count: 4 }, { type: 'bucket', count: 3 }, { type: 'football', count: 2 }], spawnInterval: 2, prepTime: 4 },
  { number: 12, zombies: [{ type: 'cone', count: 5 }, { type: 'bucket', count: 4 }, { type: 'football', count: 3 }], spawnInterval: 2, prepTime: 4 },
  { number: 13, zombies: [{ type: 'basic', count: 8 }, { type: 'bucket', count: 4 }, { type: 'football', count: 3 }, { type: 'giant', count: 1 }], spawnInterval: 1.8, prepTime: 5 },
  { number: 14, zombies: [{ type: 'basic', count: 10 }, { type: 'cone', count: 6 }, { type: 'bucket', count: 4 }, { type: 'football', count: 3 }, { type: 'boss', count: 1 }], spawnInterval: 1.5, prepTime: 5 },
];

// === Zombie Mutations ===
export const MUTATIONS = {
  fast: { name: 'Nhanh', speedMul: 1.5, hpMul: 0.9, color: 0x44ff44, desc: 'Di chuyển nhanh hơn' },
  armored: { name: 'Giáp', hpMul: 2.5, speedMul: 0.8, color: 0x888888, desc: 'Máu gấp đôi rưỡi' },
  fire: { name: 'Lửa', speedMul: 1.1, damageMul: 1.3, color: 0xff4400, desc: 'Tấn công mạnh, để lại lửa' },
  icy: { name: 'Băng', hpMul: 1.4, color: 0x66ccff, desc: 'Làm chậm cây khi cắn' },
  regenerating: { name: 'Hồi Phục', hpMul: 0.8, regenPerSec: 8, color: 0x88ff88, desc: 'Hồi máu theo thời gian' },
  explosive: { name: 'Phát Nổ', color: 0xff6600, explodeDmg: 60, desc: 'Nổ khi chết' },
};

export const ELITE_TYPES = {
  elite_cone: { base: 'cone', name: 'Nón Kim Loại', hpMul: 2.5, speedMul: 1.1, damageMul: 1.5, color: 0xdddd55, scoreMul: 3 },
  elite_bucket: { base: 'bucket', name: 'Xô Vàng', hpMul: 2.0, speedMul: 1.0, damageMul: 1.5, color: 0xffdd00, scoreMul: 3 },
  elite_football: { base: 'football', name: 'Bóng Bầu Dị Chủng', hpMul: 2.0, speedMul: 1.4, damageMul: 1.5, color: 0xdd2222, scoreMul: 3 },
  miniboss: { base: 'giant', name: 'Mini Trùm', hpMul: 3.0, speedMul: 0.6, damageMul: 2.0, color: 0x8844ff, scoreMul: 5 },
};

export const WAVE_MODIFIERS = {
  swarm: { name: 'Bầy Đàn', color: '#44ff44', desc: 'Zombie đông hơn nhưng yếu', hpMul: 0.6, countMul: 2.0, spawnIntervalMul: 0.7 },
  horde: { name: 'Đại Hội', color: '#ff8844', desc: 'Spawn nhanh gấp đôi', spawnIntervalMul: 0.5, countMul: 1.3 },
  rush: { name: 'Xung Kích', color: '#ff4444', desc: 'Zombie lao nhanh', speedMul: 1.6, countMul: 0.8 },
  night: { name: 'Bóng Đêm', color: '#4444ff', desc: 'Zombie mạnh hơn trong bóng tối', hpMul: 1.25, speedMul: 1.15 },
  poison: { name: 'Độc Tố', color: '#88ff44', desc: 'Zombie để lại vũng độc', poisonTrail: true },
  ice_wind: { name: 'Gió Băng', color: '#66ccff', desc: 'Làm chậm toàn bộ', slowFactor: 0.6 },
  armored_wave: { name: 'Thiết Giáp', color: '#aaaaaa', desc: 'Zombie có thêm giáp', bonusHp: 80 },
};

export const HAZARD_TYPES = {
  firePuddle: { name: 'Vũng Lửa', color: 0xff4400, damagePerSec: 20, duration: 8, radius: 0.6 },
  icePatch: { name: 'Băng Trơn', color: 0x88ccff, slowFactor: 0.35, duration: 7, radius: 0.5 },
  toxicCloud: { name: 'Mây Độc', color: 0x88ff44, damagePerSec: 15, duration: 6, radius: 0.7 },
};

export const STARTING_SUN = 150;
export const SUN_DROP_INTERVAL = 8;
export const SPAWN_X = 8;
export const ZOMBIE_KILL_ZONE = -7.5;
