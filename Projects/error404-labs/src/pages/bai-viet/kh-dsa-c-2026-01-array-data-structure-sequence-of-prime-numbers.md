---
layout: '../../layouts/BlogPostLayout.astro'
title: '🧸 Array data structure - Sequence of prime numbers'
date: 2026-01-21
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_dsa_c_2026_01/kh-dsa-c-2026-01-array-data-structure-sequence-of-prime-numbers.avif',
        alt: '🧸 Array data structure - Sequence of prime numbers',
    }
description: 💡 Nhập vào một dãy số nguyên và cùng nhau khám phá xem những số nào là số nguyên tố nhé! Chương trình sẽ duyệt qua từng phần tử trong mảng và in ra các số nguyên tố theo đúng thứ tự xuất hiện, mỗi số cách nhau một khoảng trắng.
draft: false
category: KH_DSA_C_2026_01
---

## 🧠 Phân tích bài toán

- Nhập số nguyên dương `n`
- Nhập `n` số nguyên vào mảng `a`
- Kiểm tra từng phần tử:
    - Nếu là **số nguyên tố** → in ra

- **Sau mỗi số in đúng 1 khoảng trắng**
- Dãy **luôn có ít nhất 1 số nguyên tố**

👉 **Số nguyên tố**:

- Lớn hơn 1
- Chỉ có đúng 2 ước: `1` và chính nó

---

## ✅ Thuật toán

1. Viết hàm `isPrime(x)`:
    - Trả về `1` nếu `x` là số nguyên tố
    - Trả về `0` nếu không phải

2. Duyệt mảng:
    - Nếu `isPrime(a[i]) == 1` → in `a[i]`

---

## 💻 Code C hoàn chỉnh

```c
#include <stdio.h>
#include <math.h>

// Hàm kiểm tra số nguyên tố
int isPrime(int x) {
    if (x < 2) return 0;
    for (int i = 2; i <= sqrt(x); i++) {
        if (x % i == 0)
            return 0;
    }
    return 1;
}

int main() {
    int n;
    scanf("%d", &n);

    int a[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }

    // In các số nguyên tố
    for (int i = 0; i < n; i++) {
        if (isPrime(a[i])) {
            printf("%d ", a[i]);
        }
    }

    return 0;
}
```

---

## 🧪 Ví dụ chạy thử

### Input

```
4
1 2 3 4
```

### Output

```
2 3
```

---

### Input

```
3
7 2 3
```

### Output

```
7 2 3
```

---

## ⭐ Ghi chú quan trọng

- **Có khoảng trắng sau số cuối** → đúng yêu cầu
- Dùng `sqrt(x)` giúp tối ưu kiểm tra số nguyên tố
- Không in dòng mới, chỉ in các số

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
int kiemTraSoNguyenTo(int x);
void inCacSoNguyenToMang(int a[]);

int main() {

    scanf("%d", &n);

    int a[MAX];

    nhapMang(a);
    inCacSoNguyenToMang(a);

    return 0;
}

// Nhập mảng
void nhapMang(int a[]) {
    for(int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
}

// Kiểm tra số nguyên tố
int kiemTraSoNguyenTo(int x) {
    if(x < 2) {
        return 0;
    }

    if(x == 2) {
        return 1;
    }

    if(x % 2 == 0) {
        return 0;
    }

    for(int i = 3; i <= x / i; i += 2) {
        if(x % i == 0) {
            return 0;
        }
    }

    return 1;
}

// In các số nguyên tố trong mảng
void inCacSoNguyenToMang(int a[]) {
    for(int i = 0; i < n; i++) {
        if(kiemTraSoNguyenTo(a[i])) {
            printf("%d ", a[i]);
        }
    }
}
```

</details>
