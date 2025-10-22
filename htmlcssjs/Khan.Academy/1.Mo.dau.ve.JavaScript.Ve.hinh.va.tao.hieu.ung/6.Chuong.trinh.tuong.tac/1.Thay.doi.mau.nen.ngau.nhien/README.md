## 📌 MouseX và MouseY

-   mouseX và mouseY là biến có sẵn (built-in variables) trong p5.js, dùng để lấy tọa độ hiện tại của con trỏ chuột trong vùng canvas.

## 📍 Cách hoạt động

| Biến     | Ý nghĩa                          | Giá trị                  |
| -------- | -------------------------------- | ------------------------ |
| `mouseX` | Vị trí chuột theo trục ngang (X) | Từ 0 → chiều rộng canvas |
| `mouseY` | Vị trí chuột theo trục dọc (Y)   | Từ 0 → chiều cao canvas  |

Ví dụ: Canvas 400×400

-   Chuột ở góc trên bên trái → mouseX = 0, mouseY = 0
-   Chuột ở giữa canvas → mouseX ≈ 200, mouseY ≈ 200
-   Chuột ở góc dưới bên phải → mouseX ≈ 400, mouseY ≈ 400

## 📊 Hình minh họa trục tọa độ (Canvas 2D)

```
(0,0) --------------------> X (mouseX)
  |
  |
  |
  v
Y (mouseY)
```

-   Góc trái trên là (0, 0)
-   Trục X tăng từ trái sang phải
-   Trục Y tăng từ trên xuống dưới (khác với toán học truyền thống)

## ✅ Ví dụ sử dụng

```js
function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);

    // Vẽ hình tròn tại vị trí chuột
    fill(255, 0, 0);
    ellipse(mouseX, mouseY, 50, 50);
}
```
👉 Hình tròn sẽ di chuyển theo chuột.
