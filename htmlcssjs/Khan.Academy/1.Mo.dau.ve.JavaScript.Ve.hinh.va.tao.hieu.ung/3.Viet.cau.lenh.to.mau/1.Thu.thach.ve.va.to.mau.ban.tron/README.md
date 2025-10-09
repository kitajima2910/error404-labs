# 🎨 Bài Học: Màu Sắc & Nét Vẽ Trong p5.js

## 🧠 Mục tiêu

-   Hiểu cách sử dụng màu **RGB** trong p5.js.
-   Biết dùng **fill()**, **stroke()**, **strokeWeight()**, và **noStroke()** để tô và vẽ nét cho hình.
-   Biết cách dùng **công cụ chọn màu** (_JCPicker_) để lấy mã màu chính xác.

---

## 🌈 Màu RGB

Trong p5.js, màu thường được biểu diễn bằng **RGB (Red, Green, Blue)**.  
Mỗi giá trị nằm trong khoảng **0 → 255**.

| Màu        | RGB             |
| ---------- | --------------- |
| Đỏ         | (255, 0, 0)     |
| Xanh lá    | (0, 255, 0)     |
| Xanh dương | (0, 0, 255)     |
| Trắng      | (255, 255, 255) |
| Đen        | (0, 0, 0)       |

---

## 🎨 Công cụ lấy màu: **JCPicker**

Dùng phần mềm **[JCPicker](https://download.com.vn/just-color-picker-2-1-14037)** để chọn màu và copy nhanh mã RGB hoặc Hex.

> 💡 Bạn có thể dùng JCPicker để lấy màu nền, màu nhân vật hoặc chi tiết nhỏ trong tranh.

---

## 🟡 Lệnh `fill()`

Dùng để **tô màu bên trong hình**.

### 🧩 Cú pháp:

```js
fill(v1, v2, v3, [alpha]);
fill(value);
fill(gray, [alpha]);
fill(values);
fill(color);
```

### 🧠 Tham số:

-   v1, v2, v3: giá trị đỏ, xanh lá, xanh dương (0–255).

-   alpha: độ trong suốt (0 = trong suốt, 255 = đậm đặc).

-   gray: giá trị xám (0–255).

-   value: chuỗi màu (vd: "red", "#00FF00").

-   values: mảng [r, g, b, a].

### 💡 Ví dụ:

```js
fill(255, 0, 0); // màu đỏ
rect(50, 50, 100, 100);

fill(0, 255, 0, 150); // xanh lá, trong suốt một chút
circle(200, 100, 100);
```

---

## 🖌️ Lệnh `stroke()`

Dùng để tô màu viền của hình.

### 🧩 Cú pháp:

```js
stroke(v1, v2, v3, [alpha]);
stroke(value);
stroke(gray, [alpha]);
stroke(values);
stroke(color);
```

### 💡 Ví dụ:

```js
stroke(0); // viền đen
fill(255, 255, 0); // tô vàng
rect(50, 200, 100, 100);
```

---

## 📏 Lệnh `strokeWeight()`

Dùng để điều chỉnh độ dày của viền (nét vẽ).

### 🧩 Cú pháp:

```js
strokeWeight(weight);
```

### 💡 Ví dụ:

```js
strokeWeight(5);
stroke(0, 0, 255);
noFill();
ellipse(300, 100, 100, 100);
```

---

## 🚫 Lệnh `noStroke()`

Dùng để bỏ viền — hình sẽ chỉ còn màu fill().

### 💡 Ví dụ:

```js
noStroke();
fill(255, 100, 0);
circle(450, 100, 80);
```

---

## 🧩 Tổng hợp ví dụ

```js
function setup() {
    createCanvas(600, 300);
    background(240);

    // Hình 1 - có viền đen
    stroke(0);
    strokeWeight(2);
    fill(255, 0, 0);
    rect(50, 100, 100, 100);

    // Hình 2 - viền xanh dày
    stroke(0, 0, 255);
    strokeWeight(5);
    fill(0, 255, 0);
    circle(250, 150, 100);

    // Hình 3 - không viền
    noStroke();
    fill(255, 200, 0);
    ellipse(450, 150, 120, 80);
}
```

---

## 🏁 Kết luận

-   fill(): tô màu bên trong

-   stroke(): tô màu viền

-   strokeWeight(): độ dày viền

-   noStroke(): bỏ viền

-   RGB: mô hình màu cơ bản của p5.js
