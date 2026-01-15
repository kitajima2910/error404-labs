---
layout: '../../layouts/BlogPostLayout.astro'
title: '📦 Cấu trúc dữ liệu mảng – Array'
date: 2026-01-17
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_dsa_c_2026_01/kh-dsa-c-2026-01-cau-truc-du-lieu-mang-array.avif',
        alt: '📦 Cấu trúc dữ liệu mảng – Array',
    }
description: Mảng là một cấu trúc dữ liệu dùng để lưu trữ nhiều giá trị cùng kiểu dữ liệu trong cùng một biến. Các phần tử trong mảng được truy cập thông qua chỉ số (index), bắt đầu từ 0.
draft: false
category: KH_DSA_C_2026_01
---

### 🔹 Mảng (Array) là gì?

Mảng là một cấu trúc dữ liệu dùng để **lưu trữ nhiều giá trị cùng kiểu dữ liệu** trong cùng một biến.
Các phần tử trong mảng được truy cập thông qua **chỉ số (index)**, bắt đầu từ `0`.

Ví dụ:

```
a = [1, 3, 5, -3, 0]
```

- `a[0] = 1`
- `a[1] = 3`
- `a[2] = 5`
- ...

---

## 📝 Bài toán

### Yêu cầu

- Nhập vào:
    - Một số nguyên dương `n`
    - `n` số nguyên là các phần tử của mảng `a`

- In ra:
    - **Tổng tất cả các phần tử trong mảng**

---

## 🔍 Phân tích bài toán

### Đầu vào

- `n` – số lượng phần tử
- Dãy `a` gồm `n` số nguyên

### Đầu ra

- Một số nguyên là **tổng của các phần tử trong mảng**

---

## 💡 Ý tưởng giải đơn giản

1. Khai báo biến `sum = 0`
2. Duyệt từng phần tử trong mảng
3. Cộng từng phần tử vào `sum`
4. In ra `sum`

---

## 📊 Minh họa bằng bảng (Test mẫu 1)

Với:

```
n = 5
a = [1, 3, 5, -3, 0]
```

| Chỉ số | Giá trị | Tổng hiện tại |
| ------ | ------- | ------------- |
| 0      | 1       | 1             |
| 1      | 3       | 4             |
| 2      | 5       | 9             |
| 3      | -3      | 6             |
| 4      | 0       | 6             |

➡️ **Kết quả: 6**

---

## ✅ Cài đặt chương trình (C/C++ – cơ bản)

### 🔹 C (chuẩn cho người mới học)

```c
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int a[n];
    int sum = 0;

    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
        sum += a[i];
    }

    printf("%d", sum);
    return 0;
}
```

---

### 🔹 C++ (ngắn gọn hơn)

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, sum = 0;
    cin >> n;

    int a[n];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        sum += a[i];
    }

    cout << sum;
    return 0;
}
```

---

## ⚠️ Lưu ý quan trọng

- Đừng quên khởi tạo `sum = 0`
- Mảng bắt đầu từ chỉ số `0`, không phải `1`
- Đọc đủ `n` phần tử, không dư không thiếu

---

## 🎯 Kết luận

- Đây là bài toán **cơ bản nhưng rất quan trọng**
- Giúp bạn:
    - Làm quen với mảng
    - Vòng lặp `for`
    - Tư duy duyệt và xử lý dữ liệu

👉 Thành thạo bài này sẽ giúp bạn dễ dàng học tiếp:

- Tìm max/min trong mảng
- Đếm số phần tử thỏa điều kiện
- Xử lý mảng nâng cao hơn 🚀

---

## 🌟 Kỹ Thuật Lập Trình

<details>
<summary>Xem code</summary>

```c
#include <stdio.h>

// Khai báo các hàm
void nhapMang(int n, int a[1000]);
int tongCacSoMang(int n, int a[1000]);

int main() {

    int n;
    scanf("%d", &n);

    int a[n];

    nhapMang(n, a);
    int tong = tongCacSoMang(n, a);
    printf("%d", tong);

    return 0;
}

// Nhập mảng
void nhapMang(int n, int a[1000]) {
    for(int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
}

// Tính tổng các số trong mảng
int tongCacSoMang(int n, int a[1000]) {
    int sum = 0;
    for(int i = 0; i < n; i++) {
        sum += a[i];
    }
    return sum;
}
```

</details>
