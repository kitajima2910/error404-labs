---
layout: '../../layouts/BlogPostLayout.astro'
title: '📊 Cấu trúc dữ liệu mảng – Giới thiệu mảng hai chiều 🧩'
date: 2026-01-25
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_dsa_c_2026_01/kh-dsa-c-2026-01-cau-truc-du-lieu-mang-gioi-thieu-mang-hai-chieu.avif',
        alt: '📊 Cấu trúc dữ liệu mảng – Giới thiệu mảng hai chiều 🧩',
    }
description: 🧠 Mảng hai chiều là nền tảng quan trọng trong lập trình, giúp biểu diễn bảng, ma trận, bản đồ và nhiều bài toán thực tế. 📐 Bài viết này giúp bạn hiểu rõ cách khai báo, duyệt mảng hai chiều và áp dụng kỹ thuật lập trình chuẩn C để giải quyết bài toán tính tổng phần tử.
draft: false
category: KH_DSA_C_2026_01
---

## 📌 1. Mảng hai chiều là gì?

**Mảng hai chiều** là một cấu trúc dữ liệu dùng để lưu trữ dữ liệu theo **hàng và cột**, có thể hình dung giống như:

- Bảng điểm
- Ma trận toán học
- Lưới trong game
- Bản đồ tile map

Ví dụ mảng hai chiều:

```
a = [
  [1, 2, 3],
  [4, 5, 6]
]
```

Trong đó:

- `m = 2` → số hàng
- `n = 3` → số cột

---

## 🧪 2. Bài toán ví dụ

### 📘 Yêu cầu

Nhập hai số nguyên dương `m` và `n` lần lượt là số hàng và số cột của mảng hai chiều `a`.
Tiếp theo nhập các phần tử của mảng.

👉 **Hãy tính tổng tất cả các phần tử trong mảng `a`.**

---

### 📥 Input

```
2 3
1 2 3
4 5 6
```

### 📤 Output

```
21
```

---

## 🧠 3. Phân tích tư duy

- Mảng có `m × n` phần tử
- Muốn duyệt hết mảng → cần **2 vòng lặp for lồng nhau**
- Mỗi lần duyệt, cộng giá trị phần tử vào biến `tong`

Công thức tổng quát:

```
tong = a[0][0] + a[0][1] + ... + a[m-1][n-1]
```

---

## 🧩 4. Code mẫu (cách làm cơ bản – viết trong `main`)

👉 Cách này phù hợp cho:

- Người mới học
- Hiểu nhanh ý tưởng
- Làm bài tập đơn giản

```c
#include <stdio.h>

int main() {
    int m, n;
    int tong = 0;

    scanf("%d %d", &m, &n);

    int a[m][n];

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &a[i][j]);
            tong += a[i][j];
        }
    }

    printf("%d", tong);
    return 0;
}
```

📌 **Nhận xét**

- Code ngắn gọn
- Dễ hiểu
- Tuy nhiên: logic bị dồn hết trong `main`

---

## 🛠️ 5. Kỹ thuật lập trình (phiên bản chuẩn – tách hàm)

👉 Đây là **phiên bản nâng cao**, đúng tư duy _kỹ thuật lập trình_,
rất phù hợp để:

- Dạy học
- Viết blog
- Code chuyên nghiệp
- Mở rộng bài toán

### 🔧 Ý tưởng kỹ thuật

- `main()` chỉ điều phối chương trình
- Mỗi chức năng được tách thành **hàm riêng**
- Truyền mảng 2 chiều đúng chuẩn C99

---

### ✅ Code kỹ thuật lập trình (CODE PASS)

<details>
<summary>Xem code</summary>

```c
#include <stdio.h>

#define MAX 2910

int m, n;

// Khai báo các hàm
void nhapMang(int r, int c, int a[r][c]);
int tinhTongMang(int r, int c, int a[r][c]);

int main() {

    scanf("%d %d", &m, &n);

    int a[m][n];

    nhapMang(m, n, a);

    int tong = tinhTongMang(m, n, a);
    printf("%d", tong);

    return 0;
}

// Nhập mảng
void nhapMang(int r, int c, int a[r][c]) {
    for(int i = 0; i < r; i++) {
        for(int j = 0; j < c; j++) {
            scanf("%d", &a[i][j]);
        }
    }
}

// Tính tổng
int tinhTongMang(int r, int c, int a[r][c]) {
    int tong = 0;
    for(int i = 0; i < r; i++) {
        for(int j = 0; j < c; j++) {
            tong += a[i][j];
        }
    }
    return tong;
}
```

</details>

---

## ⭐ 6. Vì sao đây là code “chuẩn kỹ thuật”?

✔️ Không phụ thuộc biến toàn cục trong hàm

✔️ Hàm có thể tái sử dụng cho nhiều bài toán khác

✔️ Truyền mảng 2 chiều đúng chuẩn C

✔️ Dễ mở rộng sang:

- Tổng từng hàng
- Tổng từng cột
- Tổng đường chéo
- Ma trận vuông / đối xứng

---

## 🎯 7. Tổng kết

📌 Qua bài này, bạn đã nắm được:

- Khái niệm mảng hai chiều
- Cách khai báo và duyệt mảng
- Kỹ thuật tách hàm trong C
- Tư duy lập trình sạch và mở rộng được

🚀 Đây là nền tảng cực kỳ quan trọng để học tiếp:

- Thuật toán
- Cấu trúc dữ liệu nâng cao
- Game, đồ họa, AI, xử lý ma trận
