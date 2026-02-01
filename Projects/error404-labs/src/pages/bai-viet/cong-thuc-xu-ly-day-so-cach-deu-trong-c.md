---
layout: '../../layouts/BlogPostLayout.astro'
title: '📐 Công thức xử lý dãy số cách đều trong C'
date: 2026-02-01
author: Phạm Xuân Hoài
image:
    {
        src: '/images/c/cong-thuc-xu-ly-day-so-cach-deu-trong-c.avif',
        alt: '📐 Công thức xử lý dãy số cách đều trong C',
    }
description: 🧠✨ Lập trình không chỉ là for & while. Hiểu đúng công thức → code ngắn hơn → đỡ đau đầu hơn. Một chút toán, rất nhiều “aha moment” 💚📊
draft: false
category: C
---

_Tối ưu tư duy – giảm vòng lặp – code gọn hơn_

Trong các bài tập lập trình C, dãy số xuất hiện **rất thường xuyên**:

tổng số chẵn, tổng số lẻ, dãy tăng đều, dãy giảm đều,…

Nhiều người quen tay dùng `for`, nhưng thật ra **chỉ cần 2 công thức** là giải gọn gần như toàn bộ dạng bài này.

---

## 🧠 1. Dãy số cách đều là gì?

Dãy số cách đều là dãy mà **hiệu giữa hai phần tử liên tiếp là không đổi**.

Ví dụ:

```
1  3  5  7  9
2  4  6  8  10
10  8  6  4  2
```

📌 Mỗi dãy trên đều có:

- Số đầu
- Số cuối
- Khoảng cách (step)

---

## 🔢 2. Công thức tính số phần tử (n)

```
n = (số_cuối − số_đầu) / khoảng_cách + 1
```

### Điều kiện áp dụng

- Dãy phải **cách đều**
- `số_cuối` nằm đúng trong dãy
- `khoảng_cách ≠ 0`

👉 Công thức này giúp bạn **không cần đếm bằng vòng lặp**

---

## ➕ 3. Công thức tính tổng các phần tử (S)

```
S = (số_đầu + số_cuối) × n / 2
```

✨ Ưu điểm:

- Không dùng `for`
- Thời gian chạy O(1)
- Code ngắn, dễ kiểm soát lỗi

---

## 🧪 4. Ví dụ 1 – Tổng các số lẻ từ 1 đến 99

### Phân tích bài toán

- `số_đầu = 1`
- `số_cuối = 99`
- `khoảng_cách = 2`

### Tính số phần tử

```
n = (99 - 1) / 2 + 1 = 50
```

### Tính tổng

```
S = (1 + 99) × 50 / 2 = 2500
```

### Code C hoàn chỉnh

```c
#include <stdio.h>

int main() {
    int start = 1;
    int end = 99;
    int step = 2;

    int n = (end - start) / step + 1;
    int sum = (start + end) * n / 2;

    printf("Tong = %d\n", sum);
    return 0;
}
```

---

## 🧪 5. Ví dụ 2 – Tổng các số chẵn từ 2 đến 100

### Phân tích

- `số_đầu = 2`
- `số_cuối = 100`
- `khoảng_cách = 2`

```
n = (100 - 2) / 2 + 1 = 50
S = (2 + 100) × 50 / 2 = 2550
```

✔️ Không cần `if (i % 2 == 0)`
✔️ Không cần duyệt từng số

---

## 🧪 6. Ví dụ 3 – Dãy giảm đều từ 10 đến 2

Dãy:

```
10  8  6  4  2
```

### Thông số

- `số_đầu = 10`
- `số_cuối = 2`
- `khoảng_cách = -2`

### Code C

```c
#include <stdio.h>

int main() {
    int start = 10;
    int end = 2;
    int step = -2;

    int n = (end - start) / step + 1;
    int sum = (start + end) * n / 2;

    printf("Tong = %d\n", sum);
    return 0;
}
```

📌 Công thức **vẫn đúng** cho dãy giảm, miễn là `step` hợp lệ.

---

## ⚠️ 7. Những lỗi thường gặp

❌ `khoảng_cách = 0` → chia cho 0

❌ `số_cuối` không thuộc dãy → `n` sai

❌ Dãy không cách đều → công thức **không áp dụng**

👉 Gặp các trường hợp này thì **quay lại dùng vòng lặp**

---

## 🎯 8. Khi nào nên dùng công thức?

✅ NÊN dùng khi:

- Tính tổng dãy số
- Đếm số phần tử
- Dãy tăng/giảm đều
- Cần code gọn, chạy nhanh

❌ KHÔNG nên dùng khi:

- Dãy ngẫu nhiên
- Có nhiều điều kiện lọc phức tạp

---

## ✨ Kết luận

> **Công thức đúng = ít code hơn = ít bug hơn**

> **Biết dùng công thức → tư duy lập trình “lên level”**
