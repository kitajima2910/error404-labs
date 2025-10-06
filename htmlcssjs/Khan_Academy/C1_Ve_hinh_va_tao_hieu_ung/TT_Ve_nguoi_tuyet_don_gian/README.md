# 🎨 p5.js `ellipse()` Function

Vẽ một hình **ellipse (hình tròn hoặc hình bầu dục)** tại vị trí xác định trong canvas.

## 🧩 Syntax

```js
ellipse(x, y, w, [h])
ellipse(x, y, w, h, [detail])
```

## 🧠 Parameters
| Tham số  | Kiểu dữ liệu             | Mô tả                                                                                                                         |
| -------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `x`      | `Number`                 | Tọa độ **X** của tâm ellipse                                                                                                  |
| `y`      | `Number`                 | Tọa độ **Y** của tâm ellipse                                                                                                  |
| `w`      | `Number`                 | Chiều rộng của ellipse                                                                                                        |
| `h`      | `Number` *(tùy chọn)*    | Chiều cao của ellipse *(mặc định = w nếu bỏ qua)*                                                                             |
| `detail` | `Integer` *(WebGL only)* | Số lượng **điểm (vertices)** dùng để vẽ đường viền ellipse.<br>Giá trị mặc định = `25`.<br>Không vẽ stroke nếu `detail > 50`. |

## 🖼️ Ví dụ cơ bản (Canvas 2D)

```js
function setup() {
    createCanvas(400, 400);
    ellipse(200, 200, 150, 100);
}
```

🟢 Giải thích:

Gốc tọa độ (0, 0) ở góc trên trái.

ellipse(200, 200, 150, 100) vẽ ở giữa canvas.

```
(0,0)--------------------------> +X
 |
 |
 v
 +Y
```

## 🌐 Ví dụ trong WEBGL mode

```js
function setup() {
    createCanvas(400, 400, WEBGL);
    ellipse(200, 200, 150, 100);
}
```

🟢 Giải thích:

Gốc tọa độ (0, 0, 0) ở giữa canvas.

Trục X tăng sang phải, trục Y tăng xuống dưới, trục Z tăng ra phía trước.

```js
          +Y
           |
           |
 -X <----(0,0,0)----> +X
           |
           |
          -Y
      (Z ra ngoài màn hình)
```

---

## ⚙️ Chi tiết trong WebGL

Tham số detail xác định độ mượt của hình ellipse (số điểm bao quanh chu vi):

```js
function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(220);
  noFill();
  stroke(0);

  ellipse(-100, 0, 100, 100, 6);   // Thô (6 điểm)
  ellipse(100, 0, 100, 100, 60);   // Mượt (60 điểm)
}

```

## 📚 Ghi chú

Trong 2D mode, không có tham số detail.

Trong WEBGL, ellipse() là đối tượng 3D phẳng nằm trên mặt phẳng XY.

Nếu detail > 50, p5.js sẽ không vẽ stroke để tối ưu hiệu suất.

## 🔍 Tóm tắt sự khác biệt giữa 2 chế độ

| Đặc điểm         | Canvas 2D          | WEBGL                             |
| ---------------- | ------------------ | --------------------------------- |
| Gốc tọa độ       | Góc trên trái      | Giữa canvas                       |
| Trục Z           | ❌ Không có         | ✅ Có                              |
| Tham số `detail` | ❌ Không dùng       | ✅ Có                              |
| Ứng dụng         | Vẽ 2D thông thường | Vẽ 3D hoặc 2D trong không gian 3D |

### ✏️ Tác giả: p5.js Team
### 📖 Tài liệu gốc: https://p5js.org/reference/p5/ellipse/