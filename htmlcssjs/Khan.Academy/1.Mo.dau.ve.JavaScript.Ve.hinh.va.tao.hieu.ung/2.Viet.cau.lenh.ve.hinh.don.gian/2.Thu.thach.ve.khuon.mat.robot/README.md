<details open>
<summary><b>🟦 p5.js rect() Function</b></summary>

# 🟦 p5.js rect() Function

Vẽ một hình chữ nhật (rectangle) tại vị trí xác định trong canvas.
Có thể tuỳ chỉnh bán kính bo góc hoặc chi tiết lưới khi ở chế độ WebGL.

## 🧩 Syntax

```js
rect(x, y, w, [h], [tl], [tr], [br], [bl]);
rect(x, y, w, h, [detailX], [detailY]);
```

## 🧩 Parameters

| Tham số   | Kiểu dữ liệu | Mô tả                                                                              |
| --------- | ------------ | ---------------------------------------------------------------------------------- |
| `x`       | `Number`     | Tọa độ X của góc trên bên trái hình chữ nhật.                                      |
| `y`       | `Number`     | Tọa độ Y của góc trên bên trái hình chữ nhật.                                      |
| `w`       | `Number`     | Chiều rộng (width) của hình chữ nhật.                                              |
| `h`       | `Number`     | Chiều cao (height) của hình chữ nhật. Nếu không truyền, giá trị mặc định bằng `w`. |
| `tl`      | `Number`     | _(Tùy chọn)_ Bán kính bo góc trên bên trái.                                        |
| `tr`      | `Number`     | _(Tùy chọn)_ Bán kính bo góc trên bên phải.                                        |
| `br`      | `Number`     | _(Tùy chọn)_ Bán kính bo góc dưới bên phải.                                        |
| `bl`      | `Number`     | _(Tùy chọn)_ Bán kính bo góc dưới bên trái.                                        |
| `detailX` | `Integer`    | _(WebGL)_ Số lượng đoạn chia trong trục X để tăng độ chi tiết.                     |
| `detailY` | `Integer`    | _(WebGL)_ Số lượng đoạn chia trong trục Y để tăng độ chi tiết.                     |

## 🧩 Example

### 1️⃣ Hình chữ nhật cơ bản

```js
rect(50, 50, 100, 60);
```

### 2️⃣ Hình vuông (chiều cao = chiều rộng)

```js
rect(200, 50, 80);
```

### 3️⃣ Hình chữ nhật có bo góc

```js
rect(50, 150, 120, 80, 20);
```

### 4️⃣ Bo góc riêng từng cạnh

```js
rect(200, 150, 120, 80, 10, 20, 30, 40);
```

### 5️⃣ Dùng trong WebGL (chi tiết cao hơn)

```js
createCanvas(400, 400, WEBGL);
rect(0, 0, 100, 80, 8, 8);
```

</details>

<details>
<summary><b>📏 p5.js line() Function</b></summary>

# 📏 p5.js line() Function

Vẽ một đoạn thẳng (line) nối giữa hai điểm trong không gian 2D hoặc 3D.
Trong chế độ WebGL, bạn có thể chỉ định thêm tọa độ z để tạo đường trong không gian ba chiều.

## 🧩 Syntax

```js
line(x1, y1, x2, y2);
line(x1, y1, z1, x2, y2, z2);
```

## 🧩 Parameters

| Tham số | Kiểu dữ liệu | Mô tả                                           |
| ------- | ------------ | ----------------------------------------------- |
| `x1`    | `Number`     | Tọa độ X của điểm đầu tiên.                     |
| `y1`    | `Number`     | Tọa độ Y của điểm đầu tiên.                     |
| `x2`    | `Number`     | Tọa độ X của điểm thứ hai.                      |
| `y2`    | `Number`     | Tọa độ Y của điểm thứ hai.                      |
| `z1`    | `Number`     | _(Tùy chọn, WebGL)_ Tọa độ Z của điểm đầu tiên. |
| `z2`    | `Number`     | _(Tùy chọn, WebGL)_ Tọa độ Z của điểm thứ hai.  |

## 🧩 Example

### 1️⃣ Đoạn thẳng cơ bản 2D

```js
line(30, 50, 180, 50);
```

### 2️⃣ Đoạn thẳng chéo

```js
line(50, 100, 200, 200);
```

### 3️⃣ Vẽ hình chữ “X” bằng 2 đoạn thẳng

```js
line(100, 100, 200, 200);
line(200, 100, 100, 200);
```

### 4️⃣ Đoạn thẳng 3D (chế độ WebGL)

```js
createCanvas(400, 400, WEBGL);
line(-50, 0, 0, 50, 0, 0); // Đường nằm dọc theo trục X
```

</details>
