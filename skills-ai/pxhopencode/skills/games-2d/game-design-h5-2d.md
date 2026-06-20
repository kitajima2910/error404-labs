# 🎨 Game Design 2D H5

## Tổng quan
Skill design cho game 2D HTML5. Cung cấp guideline về gameplay, level design, UI/UX, visual style, và player experience.

## 1. Gameplay Design

### Core Loop
```
Player Action → Feedback → Reward → Progression
```
Mỗi game 2D cần có core loop rõ ràng:
- **Input**: nhấn, chạm, kéo, giữ
- **Feedback**: âm thanh, animation, screen shake, điểm số
- **Reward**: điểm, item mới, mở khóa, hiệu ứng
- **Progression**: level khó hơn, enemy mới, skill mới

### Difficulty Curve
```
Độ khó
  ↑
  │   ╱╲
  │  ╱  ╲╱╲
  │ ╱      ╲
  │╱        ╲
  └─────────────────→ Thời gian
    1   2   3   4   5  (level)
```
- Level 1: Tutorial (dễ, hướng dẫn)
- Level 2-3: Tăng dần (thêm enemy mới)
- Level 4: Peak (boss / thử thách)
- Level 5: Nghỉ (level thưởng, dễ hơn)

### Game Modes phổ biến
| Mode | Mô tả | Ví dụ |
|------|-------|-------|
| Classic | Chơi từ đầu đến cuối | Super Mario |
| Endless | Chơi không giới hạn, điểm tăng dần | Flappy Bird |
| Time Attack | Làm nhanh nhất trong thời gian | Speedrun |
| Puzzle | Giải câu đố qua từng level | Cut the Rope |
| Survival | Sống sót càng lâu càng tốt | Vampire Survivors |

## 2. Level Design

### Grid-based level
```
W W W W W W W W
W . . . . . . W
W . P . E . . W
W . . . . . . W
W . . G . . . W
W W W W W W W W

P = Player, E = Enemy, G = Goal, W = Wall
```

### Platformer level sections
- **Introduction**: Giới thiệu mechanic mới (an toàn)
- **Practice**: Áp dụng mechanic (ít enemy)
- **Challenge**: Kết hợp mechanic + enemy
- **Punishment**: Sai là chết / mất mạng
- **Reward**: Khu vực bí mật, bonus item

### Level pacing
```
Intensity
  ↑
  │   ╱╲    ╱╲
  │  ╱  ╲  ╱  ╲
  │ ╱    ╲╱    ╲
  │╱            ╲
  └─────────────────→
    Intro ↑  Peak  End
        Build-up  Cool-down
```

## 3. Visual Style

### Color Palette (gợi ý)
```typescript
// Vibrant (platformer, action)
const VIBRANT = {
  primary: "#FF6B35",   // Cam
  secondary: "#004E89", // Xanh dương
  accent: "#FFC857",    // Vàng
  bg: "#1A1A2E",        // Tối
  text: "#FFFFFF",
};

// Pastel (puzzle, casual)
const PASTEL = {
  primary: "#B8E6C8",
  secondary: "#FFD6E0",
  accent: "#FFD93D",
  bg: "#F5F5F5",
  text: "#2D2D2D",
};

// Dark (horror, atmospheric)
const DARK = {
  primary: "#8B0000",
  secondary: "#2F2F2F",
  accent: "#FF4500",
  bg: "#0A0A0A",
  text: "#CCCCCC",
};
```

### Resolution guidelines
| Thiết bị | Resolution | Aspect |
|-----------|-----------|--------|
| Desktop | 1280×720 | 16:9 |
| Tablet | 1024×768 | 4:3 |
| Mobile | 414×896 / 390×844 | portrait |
| Universal | 800×600 | 4:3 (an toàn nhất) |

Dùng `Phaser.Scale.FIT` để tự động scale.

## 4. UI/UX cho Game 2D

### HUD Layout
```
┌──────────────────────────┐
│ ❤️❤️❤️      Điểm: 1234  │  ← Trên: máu, điểm
│           Màn 3          │
├──────────────────────────┤
│                          │
│                          │  ← Game area
│                          │
├──────────────────────────┤
│ ← ○ →        🔫          │  ← Bottom: controls
└──────────────────────────┘
```

### Touch Controls (mobile)
```
┌──────────────────────────┐
│                          │
│                          │
│     [Game Area]          │
│                          │
│                          │
│  ←  ↑  →      🔫 🔫     │
│     ↓                    │
│  [D-Pad]        [Shoot]  │
└──────────────────────────┘
```

### Menu Flow
```
Menu chính
├── Chơi → Chọn màn → Game → Tạm dừng
│                              ├── Tiếp tục
│                              ├── Chơi lại
│                              ├── Cài đặt
│                              └── Thoát
├── Cài đặt
│   ├── Âm thanh (SFX / BGM)
│   ├── Đồ hoạ (Chất lượng)
│   └── Điều khiển
├── Cửa hàng (nếu có)
└── Giới thiệu
```

## 5. Feedback Systems

### Visual Feedback
| Hành động | Hiệu ứng |
|-----------|---------|
| Bắn | Muzzle flash, screen shake nhẹ |
| Trúng địch | Hit flash (đỏ), particle, score popup |
| Chết | Màn hình đỏ, slow motion, game over fade |
| Nhặt item | Scale up + glow + particle gold |
| Level up | Màn hình flash, text animation |

### Audio Feedback
| Sự kiện | SFX |
|---------|-----|
| Jump | Woosh ngắn, pitch cao |
| Shoot | Tiếng nổ / laser ngắn |
| Hit | Impact, trầm |
| Collect | Ding, pitch cao dần |
| Death | Explosion, fade out |
| BGM | Loop vui cho menu, căng cho combat |

### Screen Shake
```typescript
function screenShake(scene: Phaser.Scene, intensity = 5, duration = 100) {
  scene.cameras.main.shake(duration, intensity / 1000);
}
```

## 6. Monetization (nếu cần)

- **Ads**: Rewarded video (tiếp tục chơi, nhân đôi điểm)
- **IAP**: Remove ads, skin, power-up
- **Gacha**: Random item (cần cân bằng)
- **Battle Pass**: Phần thưởng theo cấp độ

## 7. Testing Checklist

- [ ] Game loop 60 FPS ổn định
- [ ] Touch controls hoạt động trên mobile
- [ ] Không có bug wall / collision
- [ ] Audio phát đúng, không bị overlap
- [ ] Restart game sạch sẽ (không memory leak)
- [ ] Pause/Resume hoạt động
- [ ] Loading screen hiển thị đúng progress

### Tham khảo
- Implementation: `game-h5-2d.md`
- Main game skill: `games/SKILL.md`
