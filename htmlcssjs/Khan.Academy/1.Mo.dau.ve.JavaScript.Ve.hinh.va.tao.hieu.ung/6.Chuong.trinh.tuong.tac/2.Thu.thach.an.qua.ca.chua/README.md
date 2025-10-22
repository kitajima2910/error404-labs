## 🍅 Thử thách: Ăn quả cà chua bằng chuột

### 🎯 Mục tiêu bài học

-   Hiểu cách vẽ hình cơ bản: ellipse(), rect(), fill(), noStroke().
-   Biết cách xử lý sự kiện chuột với mouseIsPressed, mouseX, mouseY.
-   Tạo hiệu ứng “ăn cà chua” khi người dùng nhấn chuột vào đối tượng trên canvas.

### 🖼️ Kết quả đạt được

-   Một quả cà chua đỏ xuất hiện giữa màn hình.
-   Khi bạn nhấn chuột, tại vị trí chuột sẽ xuất hiện một hình tròn màu đen, giống như đang "cắn" hoặc "ăn" dần quả cà chua.

### 💻 Mã nguồn

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thử thách: Ăn quả cà chua</title>
    </head>
    <body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/2.0.5/p5.min.js"></script>
        <script>
            function setup() {
                createCanvas(400, 400);
                background(0);

                noStroke();

                // Vẽ quả cà chua
                fill(224, 90, 90);
                ellipse(180, 200, 150, 150);
                ellipse(230, 200, 150, 150);

                // Vẽ cuống cà chua
                fill(48, 130, 31);
                rect(200, 90, 15, 40);
            }

            function draw() {
                // Vẽ miệng khi nhấn chuột
                if (mouseIsPressed) {
                    fill(0);
                    ellipse(mouseX, mouseY, 50, 50);
                }
            }
        </script>
    </body>
</html>
```

### 📌 Giải thích từng phần

| Lệnh                              | Chức năng                                       |
| --------------------------------- | ----------------------------------------------- |
| `createCanvas(400, 400)`          | Tạo vùng vẽ 400×400 pixel                       |
| `background(0)`                   | Tô nền màu đen                                  |
| `ellipse(x, y, w, h)`             | Vẽ hình tròn/hình elip (dùng để vẽ quả cà chua) |
| `rect(x, y, w, h)`                | Vẽ hình chữ nhật (dùng làm cuống)               |
| `mouseIsPressed`                  | Kiểm tra chuột đang được nhấn hay không         |
| `ellipse(mouseX, mouseY, 50, 50)` | Vẽ “vết cắn” theo vị trí chuột                  |
