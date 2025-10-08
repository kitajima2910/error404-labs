# 🎨 Ôn Tập p5.js — `line()`, `rect()`, `ellipse()`

p5.js là thư viện JavaScript giúp bạn **vẽ hình học, tạo hiệu ứng và lập trình sáng tạo** một cách trực quan.  
Dưới đây là 3 hàm cơ bản nhất dùng để vẽ trong canvas: `line()`, `rect()`, `ellipse()`.

## ✏️ 1. `line()`

Vẽ **đoạn thẳng** nối hai điểm trong canvas.

### 🔹 Cú pháp

```js
line(x1, y1, x2, y2);
```

### 🔸 Tham số

| Tham số    | Kiểu   | Mô tả                |
| ---------- | ------ | -------------------- |
| `x1`, `y1` | Number | Tọa độ điểm bắt đầu  |
| `x2`, `y2` | Number | Tọa độ điểm kết thúc |

### 💡 Ví dụ

```js
function setup() {
    createCanvas(400, 200);
    line(50, 100, 350, 100);
}
```

➡️ Vẽ một đoạn thẳng ngang giữa canvas.

## ✏️ 2. `rect()`

Vẽ hình chữ nhật hoặc hình vuông tại vị trí xác định.

### 🔹 Cú pháp

```js
rect(x, y, w, h);
```

### 🔸 Tham số

| Tham số  | Kiểu   | Mô tả                             |
| -------- | ------ | --------------------------------- |
| `x`, `y` | Number | Tọa độ góc trên bên trái của hình |
| `w`      | Number | Chiều rộng                        |
| `h`      | Number | Chiều cao                         |

### 💡 Ví dụ

```js
function setup() {
    createCanvas(400, 200);
    rect(150, 50, 100, 100);
}
```

➡️ Vẽ hình vuông 100×100 tại vị trí (150, 50).

## ✏️ 3. `ellipse()`

Vẽ hình ellipse (tròn hoặc bầu dục).

### 🔹 Cú pháp

```js
ellipse(x, y, w, [h]);
```

### 🔸 Tham số

| Tham số          | Kiểu   | Mô tả                              |
| ---------------- | ------ | ---------------------------------- |
| `x`, `y`         | Number | Tọa độ tâm ellipse                 |
| `w`              | Number | Chiều rộng                         |
| `h` _(tuỳ chọn)_ | Number | Chiều cao, nếu bỏ qua thì bằng `w` |

### 💡 Ví dụ

```js
function setup() {
    createCanvas(400, 200);
    ellipse(200, 100, 100, 50);
}
```

➡️ Vẽ hình ellipse nằm ngang tại tâm (200, 100).

---

### 🧠 Tổng kết nhanh

| Hàm         | Ý nghĩa                | Tham số chính             | Ghi nhớ                   |
| ----------- | ---------------------- | ------------------------- | ------------------------- |
| `line()`    | Vẽ đoạn thẳng          | 4 tọa độ (x1, y1, x2, y2) | Không có màu tô           |
| `rect()`    | Vẽ hình chữ nhật       | x, y, w, h                | Có thể đổi mode: `CENTER` |
| `ellipse()` | Vẽ hình tròn / bầu dục | x, y, w, (h)              | Nếu bỏ `h` → hình tròn    |

✍️ Tác giả: Phạm Xuân Hoài\
📚 Ôn tập p5.js cơ bản cho người mới bắt đầu.
