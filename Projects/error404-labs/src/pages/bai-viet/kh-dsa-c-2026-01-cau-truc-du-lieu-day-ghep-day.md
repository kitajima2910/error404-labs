---
layout: '../../layouts/BlogPostLayout.astro'
title: '🌈 Cấu trúc dữ liệu dãy – Ghép dãy 🔗📊'
date: 2026-01-24
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_dsa_c_2026_01/kh-dsa-c-2026-01-cau-truc-du-lieu-day-ghep-day.avif',
        alt: '🌈 Cấu trúc dữ liệu dãy – Ghép dãy 🔗📊',
    }
description: 🧩 Gộp hai dãy số nguyên đã được sắp xếp không giảm thành một dãy mới cũng không giảm. 🌱 Bài viết trình bày theo tư duy người mới học, sử dụng Two Pointers có mảng kết quả, kèm bảng minh họa từng bước, giúp hiểu bản chất thay vì học thuộc code.
draft: false
category: KH_DSA_C_2026_01
---

## 🎯 Bài toán

Cho:

- Dãy **a** gồm `n` số nguyên, đã sắp xếp không giảm
- Dãy **b** gồm `m` số nguyên, đã sắp xếp không giảm

👉 Hãy gộp hai dãy thành dãy **c**, sao cho dãy **c cũng không giảm**
👉 In dãy **c**, sau mỗi phần tử có **đúng một dấu cách**

---

## 🧠 Ý tưởng cốt lõi (Two Pointers)

> 📌 _Mỗi lần chỉ lấy **số nhỏ nhất đang đứng đầu** của hai dãy._

Ta dùng **3 con trỏ**:

- `i` : duyệt dãy `a`
- `j` : duyệt dãy `b`
- `k` : ghi vào dãy kết quả `c`

📌 **Điều kiện bắt buộc**

> Two pointers **CHỈ dùng khi các dãy đã được sắp xếp tăng**.
> Nếu dữ liệu lộn xộn → **KHÔNG được dùng trực tiếp**.

---

# ✅ CODE MẪU CHÍNH

## Two Pointers (CÓ MẢNG `c` – chuẩn bài thi & thực tế)

```c
#include <stdio.h>

#define MAX 100000

int main() {
    int n, m;
    int a[MAX], b[MAX], c[MAX];

    // Nhập dãy a
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }

    // Nhập dãy b
    scanf("%d", &m);
    for (int i = 0; i < m; i++) {
        scanf("%d", &b[i]);
    }

    int i = 0; // con trỏ duyệt dãy a
    int j = 0; // con trỏ duyệt dãy b
    int k = 0; // con trỏ ghi dãy c

    // Ghép hai dãy khi cả hai còn phần tử
    while (i < n && j < m) {

        // Lấy phần tử nhỏ hơn đưa vào mảng c
        if (a[i] <= b[j]) {
            c[k++] = a[i];
            i++;
        } else {
            c[k++] = b[j];
            j++;
        }
    }

    // Nếu dãy a còn phần tử
    while (i < n) {
        c[k++] = a[i];
        i++;
    }

    // Nếu dãy b còn phần tử
    while (j < m) {
        c[k++] = b[j];
        j++;
    }

    // In dãy c
    for (int i = 0; i < k; i++) {
        printf("%d ", c[i]);
    }

    return 0;
}
```

---

## 📊 Minh họa từng bước bằng bảng

### Ví dụ

```
a = [1, 3, 4]
b = [1, 2, 5]
```

| Bước | i   | j   | k   | a[i] | b[j] | Ghi vào c[k] | c hiện tại  |
| ---- | --- | --- | --- | ---- | ---- | ------------ | ----------- |
| 1    | 0   | 0   | 0   | 1    | 1    | 1            | 1           |
| 2    | 1   | 0   | 1   | 3    | 1    | 1            | 1 1         |
| 3    | 1   | 1   | 2   | 3    | 2    | 2            | 1 1 2       |
| 4    | 1   | 2   | 3   | 3    | 5    | 3            | 1 1 2 3     |
| 5    | 2   | 2   | 4   | 4    | 5    | 4            | 1 1 2 3 4   |
| 6    | 3   | 2   | 5   | —    | 5    | 5            | 1 1 2 3 4 5 |

📌 Khi một dãy hết phần tử → **in (ghi) nốt dãy còn lại**

---

## ❓ Vì sao cần 2 vòng `while` cuối?

Vì chỉ có **2 khả năng**:

- Dãy `a` hết trước → ghi nốt `b`
- Dãy `b` hết trước → ghi nốt `a`

👉 Không thể thiếu, cũng không dư.

---

## ⚠️ Khi KHÔNG dùng Two Pointers

| Trạng thái dữ liệu            | Dùng được không |
| ----------------------------- | --------------- |
| Hai dãy đã tăng               | ✅              |
| Một dãy tăng, một dãy lộn xộn | ❌              |
| Hai dãy lộn xộn               | ❌              |

📌 Nếu dữ liệu chưa tăng → **phải sắp xếp trước**, hoặc dùng cách an toàn bên dưới.

---

# ⚙️ KỸ THUẬT LẬP TRÌNH

## (Ghép rồi sắp xếp lại)

> 📌 Cách này **không tối ưu**, nhưng:
>
> - Luôn đúng
> - Dễ hiểu
> - Phù hợp học C căn bản
> - Dùng khi **dữ liệu không đảm bảo đã tăng**

---

## 🧠 Tư duy kỹ thuật

1. Nhập dãy `a`, `b`
2. Ghép toàn bộ phần tử của `a` và `b` vào `c`
3. Sắp xếp lại dãy `c`
4. In kết quả

---

## 📌 Code kỹ thuật lập trình (ĐẦY ĐỦ)

```c
#include <stdio.h>

#define MAX 291095

int n, m, k;

// Nhập mảng
void nhapMang(int len, int arr[]);

// Ghép hai mảng a và b vào mảng c
void ghepMang(int arr1[], int arr2[], int arr3[]);

// Sắp xếp mảng tăng dần
void tangMang(int arr[]);

// Xuất mảng
void xuatMang(int len, int arr[]);

int main() {

    // Nhập dãy a
    scanf("%d", &n);
    int a[MAX];
    nhapMang(n, a);

    // Nhập dãy b
    scanf("%d", &m);
    int b[MAX];
    nhapMang(m, b);

    int c[MAX];

    // Ghép hai dãy
    ghepMang(a, b, c);

    // Sắp xếp lại dãy c
    tangMang(c);

    // In kết quả
    xuatMang(k, c);

    return 0;
}

// Hàm nhập mảng
void nhapMang(int len, int arr[]) {
    for (int i = 0; i < len; i++) {
        scanf("%d", &arr[i]);
    }
}

// Hàm ghép hai mảng
void ghepMang(int arr1[], int arr2[], int arr3[]) {
    k = 0;

    for (int i = 0; i < n; i++) {
        arr3[k++] = arr1[i];
    }

    for (int i = 0; i < m; i++) {
        arr3[k++] = arr2[i];
    }
}

// Hàm sắp xếp tăng dần (O(k²))
void tangMang(int arr[]) {
    for (int i = 0; i < k - 1; i++) {
        for (int j = i + 1; j < k; j++) {
            if (arr[i] > arr[j]) {
                int tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
}

// Hàm xuất mảng
void xuatMang(int len, int arr[]) {
    for (int i = 0; i < len; i++) {
        printf("%d ", arr[i]);
    }
}
```

---

## 🧩 Tổng kết

- ✅ **Two Pointers**: nhanh, chuẩn, cần dữ liệu đã tăng
- ⚙️ **Kỹ thuật lập trình**: an toàn, dễ hiểu, luôn đúng
- 🧠 Hiểu điều kiện dùng thuật toán quan trọng hơn học thuộc code
