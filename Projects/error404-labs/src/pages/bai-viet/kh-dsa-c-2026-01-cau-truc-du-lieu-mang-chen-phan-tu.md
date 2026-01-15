---
layout: '../../layouts/BlogPostLayout.astro'
title: '📦 Cấu trúc dữ liệu mảng – Chèn phần tử'
date: 2026-01-19
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_dsa_c_2026_01/kh-dsa-c-2026-01-cau-truc-du-lieu-mang-chen-phan-tu.avif',
        alt: '📦 Cấu trúc dữ liệu mảng – Chèn phần tử',
    }
description: 🧩 Bài học giúp bạn hiểu rõ cách chèn một phần tử vào mảng tại vị trí bất kỳ trong ngôn ngữ C. Thông qua ví dụ trực quan và thuật toán đơn giản, bạn sẽ nắm được cách xử lý chỉ số mảng, quản lý kích thước và tránh các lỗi thường gặp khi thao tác với mảng.
draft: false
category: KH_DSA_C_2026_01
---

## 🧠 Phân tích bài toán

- Nhập số nguyên dương `n`
- Nhập mảng `a` gồm `n` số nguyên
- Nhập hai số nguyên `k` và `x` với `0 ≤ k ≤ n`
- **Chèn giá trị `x` vào vị trí `k`**
    - Nghĩa là:
        - `x` đứng **trước phần tử có chỉ số `k`**
        - và **sau phần tử có chỉ số `k-1`**

- In mảng sau khi chèn, mỗi số cách nhau **1 dấu cách**

👉 Trong C, mảng đánh chỉ số từ **0**, nên:

- `k = 0` → chèn vào **đầu mảng**
- `k = n` → chèn vào **cuối mảng**

---

## ✨ Ý tưởng đơn giản

1. Tạo mảng có kích thước **n + 1**
2. Duyệt từ **cuối mảng về vị trí k**, dịch các phần tử sang phải
3. Gán `a[k] = x`
4. In mảng mới

---

## 📌 Ví dụ minh họa

### Ví dụ 1

```
n = 4
a = [1, 2, 3, 4]
k = 1, x = 10
```

Sau khi chèn:

```
[1, 10, 2, 3, 4]
```

---

### Ví dụ 2

```
n = 3
a = [1, 2, 3]
k = 3, x = 123
```

Sau khi chèn:

```
[1, 2, 3, 123]
```

---

## 💻 Code C hoàn chỉnh

```c
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int a[1005];

    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }

    int k, x;
    scanf("%d %d", &k, &x);

    // Dịch các phần tử sang phải
    for (int i = n; i > k; i--) {
        a[i] = a[i - 1];
    }

    // Chèn x vào vị trí k
    a[k] = x;

    // In mảng kết quả
    for (int i = 0; i <= n; i++) {
        printf("%d ", a[i]);
    }

    return 0;
}
```

---

## ⚠️ Lưu ý quan trọng

- Vòng lặp dịch mảng **phải chạy từ cuối về đầu**
- Không được dịch từ trái sang phải (sẽ bị ghi đè dữ liệu)
- Luôn đảm bảo mảng đủ lớn (`n + 1`)

---

## 🌟 Kỹ Thuật Lập Trình

<details>
<summary>Xem code</summary>

```c
#include <stdio.h>

#define MAX 2910

int n;

// Khai báo các hàm
void nhapMang(int a[]);
void chenGiaTriTheoViTriMang(int a[], int k, int x);
void inMang(int a[]);

int main() {

    scanf("%d", &n);

    int a[MAX];

    nhapMang(a);

    int k, x;
    scanf("%d %d", &k, &x);

    chenGiaTriTheoViTriMang(a, k, x);
    inMang(a);

    return 0;
}

// Nhập mảng
void nhapMang(int a[]) {
    for(int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
}

// Chèn giá trị theo vị trí trong mảng
void chenGiaTriTheoViTriMang(int a[], int k, int x) {
    n++; // Tăng n lên 1 vì chèn giá trị vào

    int tmp[MAX];

    int indexA = 0;

    for(int i = 0; i < n; i++) {
        if(i == k) {
            tmp[i] = x;
            continue;
        }
        tmp[i] = a[indexA++];
    }

    // Copy ngược lại vào mảng a
    for(int i = 0; i < n; i++) {
        a[i] = tmp[i];
    }
}

// In mảng
void inMang(int a[]) {
    for(int i = 0; i < n; i++) {
        printf("%d ", a[i]);
    }
}

```

</details>
