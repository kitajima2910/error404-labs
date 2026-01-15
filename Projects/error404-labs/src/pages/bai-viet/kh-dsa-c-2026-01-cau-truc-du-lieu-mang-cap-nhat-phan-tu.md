---
layout: '../../layouts/BlogPostLayout.astro'
title: '📦 Cấu trúc dữ liệu mảng – cập nhật phần tử'
date: 2026-01-18
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_dsa_c_2026_01/kh-dsa-c-2026-01-cau-truc-du-lieu-mang-cap-nhat-phan-tu.avif',
        alt: '📦 Cấu trúc dữ liệu mảng – cập nhật phần tử',
    }
description: Hướng dẫn đầy đủ, dễ hiểu cho bài Cấu trúc dữ liệu mảng – cập nhật phần tử ✨
draft: false
category: KH_DSA_C_2026_01
---

## 📌 Mô tả bài toán

- Nhập vào:
    - Một số nguyên dương **n** (số phần tử của mảng)
    - **n số nguyên** là các phần tử của mảng **a**

- Yêu cầu:
    - Thay đổi **mỗi phần tử** trong mảng thành **bình phương của chính nó**
    - In mảng sau khi cập nhật ra màn hình

- Các phần tử in ra **cách nhau bởi một khoảng trắng**

---

## 🔍 Phân tích ý tưởng

1. Đọc số nguyên **n**
2. Khai báo mảng `a` gồm **n phần tử**
3. Nhập từng phần tử của mảng
4. Duyệt mảng:
    - Với mỗi phần tử `a[i]`
    - Cập nhật:

        ```
        a[i] = a[i] * a[i]
        ```

5. In các phần tử của mảng sau khi đã cập nhật

👉 **Lưu ý:**

- Số âm khi bình phương sẽ trở thành số dương
  (ví dụ: `-3 × -3 = 9`)

---

## 🧪 Ví dụ minh họa

### Test mẫu 1

| i   | a[i] ban đầu | a[i] sau bình phương |
| --- | ------------ | -------------------- |
| 0   | 1            | 1                    |
| 1   | 3            | 9                    |
| 2   | 5            | 25                   |
| 3   | -3           | 9                    |

➡️ Kết quả:

```
1 9 25 9
```

---

### Test mẫu 2

| i   | a[i] ban đầu | a[i] sau bình phương |
| --- | ------------ | -------------------- |
| 0   | 1            | 1                    |
| 1   | 2            | 4                    |
| 2   | 3            | 9                    |
| 3   | 4            | 16                   |

➡️ Kết quả:

```
1 4 9 16
```

---

## 💻 Cài đặt chương trình (C)

```c
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int a[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }

    // Cập nhật mỗi phần tử thành bình phương
    for (int i = 0; i < n; i++) {
        a[i] = a[i] * a[i];
    }

    // In mảng sau khi cập nhật
    for (int i = 0; i < n; i++) {
        printf("%d ", a[i]);
    }

    return 0;
}
```

---

## ⚠️ Sai lầm thường gặp

- ❌ Quên cập nhật trực tiếp vào mảng
- ❌ Dùng `pow(a[i], 2)` gây dư thừa và có thể sai kiểu dữ liệu
- ❌ Quên in dấu cách giữa các phần tử

---

## ✅ Kết luận

- Bài toán giúp làm quen với:
    - Duyệt mảng
    - Cập nhật giá trị phần tử
    - Xử lý số âm

- Đây là nền tảng quan trọng cho các bài toán mảng nâng cao hơn 🚀

---

## 🌟 Kỹ Thuật Lập Trình

<details>
<summary>Xem code</summary>

```c
#include <stdio.h>

// Khai báo các hàm
void nhapMang(int n, int a[]);
void giaTriBinhPhuongMang(int n, int a[]);
void inMang(int n, int a[]);

int main() {

    int n;
    scanf("%d", &n);

    int a[n];

    nhapMang(n, a);
    giaTriBinhPhuongMang(n, a);
    inMang(n, a);

    return 0;
}

// Nhập mảng
void nhapMang(int n, int a[]) {
    for(int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
}

// Tính bình phương các giá trị trong mảng
void giaTriBinhPhuongMang(int n, int a[]) {
    for(int i = 0; i < n; i++) {
        a[i] = a[i] * a[i];
    }
}

// In mảng
void inMang(int n, int a[]) {
    for(int i = 0; i < n; i++) {
        printf("%d ", a[i]);
    }
}

```

</details>
