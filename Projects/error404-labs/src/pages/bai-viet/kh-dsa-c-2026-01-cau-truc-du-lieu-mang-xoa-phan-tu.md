---
layout: '../../layouts/BlogPostLayout.astro'
title: '🧩 Cấu Trúc Dữ Liệu Mảng (Array) – ❌ Xóa Phần Tử Theo Chỉ Số'
date: 2026-01-20
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_dsa_c_2026_01/kh-dsa-c-2026-01-cau-truc-du-lieu-mang-xoa-phan-tu.avif',
        alt: '🧩 Cấu Trúc Dữ Liệu Mảng (Array) – ❌ Xóa Phần Tử Theo Chỉ Số',
    }
description: 📌 Bài tập thực hành về mảng 1 chiều. Cho một số nguyên dương n, và n số nguyên lần lượt là các phần tử của mảng a. Tiếp theo, nhập vào một số nguyên k (0 ≤ k < n).
draft: false
category: KH_DSA_C_2026_01
---

### ✨ Mô tả bài toán

📌 **Bài tập thực hành về mảng 1 chiều**

Cho một số nguyên dương **n**, và **n số nguyên** lần lượt là các phần tử của mảng **a**.
Tiếp theo, nhập vào một số nguyên **k** _(0 ≤ k < n)_.

👉 **Nhiệm vụ của bạn:**

- Xóa **phần tử có chỉ số k** trong mảng
- In ra **mảng sau khi đã xóa**, mỗi phần tử cách nhau **đúng một khoảng trắng**

---

### 🧠 Phân tích nhanh

- Mảng **không tự động co giãn**, nên khi xóa phần tử tại vị trí `k`
- Ta cần **dịch các phần tử phía sau sang trái**
- Giảm kích thước mảng đi **1 đơn vị**

---

### 📥📤 Ví dụ minh họa

#### 🔹 Test mẫu 1

**Input**

```
4
1 2 3 4
1
```

**Output**

```
1 3 4
```

📝 Giải thích:
Với `n = 4`, `a = [1, 2, 3, 4]`, `k = 1` → xóa phần tử `2`

---

#### 🔹 Test mẫu 2

**Input**

```
3
1 2 3
2
```

**Output**

```
1 2
```

📝 Giải thích:
Với `n = 3`, `a = [1, 2, 3]`, `k = 2` → xóa phần tử `3`

---

## 🧩 Code C – Xóa phần tử mảng (viết trong `main`)

```c
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int a[n];

    // Nhập mảng
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }

    int k;
    scanf("%d", &k);

    // Xóa phần tử tại vị trí k
    for (int i = k; i < n - 1; i++) {
        a[i] = a[i + 1];
    }

    // Giảm kích thước mảng
    n--;

    // In mảng sau khi xóa
    for (int i = 0; i < n; i++) {
        printf("%d ", a[i]);
    }

    return 0;
}
```

---

## 🧠 Tư duy nhanh (ghi nhớ khi đi thi)

- ❌ Mảng **không xóa trực tiếp được**
- 👉 Phải **dịch trái** từ vị trí `k`
- 📉 Giảm `n` đi `1`
- 🖨️ In mảng mới

---

## ⚠️ Lỗi hay gặp

- Dịch từ `i = 0` ❌ (phải từ `k`)
- Duyệt tới `i < n` ❌ (phải là `n - 1`)
- Quên giảm `n--` ❌

---

### 🎯 Mục tiêu bài học

✅ Hiểu cách **xóa phần tử trong mảng**

✅ Nắm rõ **chỉ số (index)** trong mảng

✅ Luyện tư duy **dịch phần tử & quản lý kích thước mảng**

---

## 🌟 Kỹ Thuật Lập Trình

<details>
<summary>Xem code</summary>

```c
#include <stdio.h>

#define MAX 2910 // Cung cấp bộ nhớ cho mảng

int n; // Chiều dài mảng

// Khai báo các hàm
void nhapMang(int a[]);
void xuatMang(int a[]);
void xoaPhanTuTrongMang(int a[], int k);

int main() {

    scanf("%d", &n);

    int a[MAX];

    nhapMang(a);

    int k;
    scanf("%d", &k);

    xoaPhanTuTrongMang(a, k);
    xuatMang(a);

    return 0;
}

// Nhập mảng
void nhapMang(int a[]) {
    for(int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
}

// Xuất mảng
void xuatMang(int a[]) {
    for(int i = 0; i < n; i++) {
        printf("%d ", a[i]);
    }
}

// Xóa phần tử
void xoaPhanTuTrongMang(int a[], int k) {
    int tmp[MAX];

    int indexTmp = 0;

    for(int i = 0; i < n; i++) {
        if(i != k) {
            tmp[indexTmp++] = a[i];
        }
    }

    n = indexTmp;

    for(int i = 0; i < n; i++) {
        a[i] = tmp[i];
    }
}
```

</details>
