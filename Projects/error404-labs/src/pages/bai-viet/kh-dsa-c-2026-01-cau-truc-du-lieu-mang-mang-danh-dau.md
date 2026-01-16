---
layout: '../../layouts/BlogPostLayout.astro'
title: '📦 Cấu trúc dữ liệu mảng – Mảng đánh dấu 🔖'
date: 2026-01-22
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_dsa_c_2026_01/kh-dsa-c-2026-01-cau-truc-du-lieu-mang-mang-danh-dau.avif',
        alt: '📦 Cấu trúc dữ liệu mảng – Mảng đánh dấu 🔖',
    }
description: ✨ Mảng đánh dấu giúp đếm, kiểm tra và quản lý dữ liệu hiệu quả. 🎯 Phù hợp cho học sinh luyện tư duy thuật toán và lập trình C cơ bản.
draft: false
category: KH_DSA_C_2026_01
---

## 🔎 Phân tích bài toán

### **Bài tập**

Nhập vào một số nguyên dương **n**, tiếp theo là **n số nguyên dương** lần lượt là các phần tử của một dãy số.

Hãy **đếm tần số (số lần xuất hiện)** của mỗi số trong dãy và **in ra màn hình** theo định dạng:

```
a1 - t1; a2 - t2; ... ak - tk;
```

Trong đó:

- `ai` là các **giá trị khác nhau** xuất hiện trong dãy
- `ti` là **số lần xuất hiện** của giá trị `ai`
- Các giá trị `ai` **không trùng nhau** và được **sắp xếp theo thứ tự tăng dần**

---

### **Ví dụ 1**

**Input**

```
6
4 2 2 5 6 5
```

**Output**

```
2 - 2; 4 - 1; 5 - 2; 6 - 1;
```

---

### **Ví dụ 2**

**Input**

```
5
2 2 2 1 2
```

**Output**

```
1 - 1; 2 - 4;
```

---

## 💡 Ý tưởng cực đơn giản

1. Dùng mảng `dem[]` để **đếm số lần xuất hiện**
2. Mỗi khi gặp số `x` → `dem[x]++`
3. Duyệt `dem[]` từ nhỏ → lớn để in ra kết quả

📌 Ưu điểm:

- Không cần sắp xếp
- Code ngắn
- Dễ hiểu
- Đúng thứ tự tăng dần

---

## ✅ Code C dễ hiểu nhất

```c
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int dem[1001] = {0};  // mảng đếm (giả sử số <= 1000)

    for (int i = 0; i < n; i++) {
        int x;
        scanf("%d", &x);
        dem[x]++;         // tăng số lần xuất hiện
    }

    // In kết quả theo thứ tự tăng dần
    for (int i = 0; i <= 1000; i++) {
        if (dem[i] > 0) {
            printf("%d - %d; ", i, dem[i]);
        }
    }

    return 0;
}
```

---

## 🧠 Giải thích ngắn gọn từng phần

```c
int dem[1001] = {0};
```

➡️ Tạo mảng để đếm, ban đầu tất cả = 0

```c
dem[x]++;
```

➡️ Gặp số `x` thì tăng số lần xuất hiện của nó

```c
for (int i = 0; i <= 1000; i++)
```

➡️ Duyệt từ nhỏ đến lớn → tự động sắp xếp

---

## ⚠️ Lưu ý quan trọng

- Cách này **chỉ dùng được khi giá trị số không quá lớn**

---

## 🌟 Kỹ Thuật Lập Trình

<details>
<summary>Xem code</summary>

```c
#include <stdio.h>

#define MAX 291095

int n;

// Khai báo các hàm
void nhapMang(int a[]);
void sapXepTangDanMang(int a[]);
void xuatMang(int a[]);
void demTanSoMang(int a[]);

int main() {

    scanf("%d", &n);

    int a[MAX];

    nhapMang(a);
    sapXepTangDanMang(a);
    // xuatMang(a);
    demTanSoMang(a);

    return 0;
}

// Nhập mảng
void nhapMang(int a[]) {
    for(int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
}

// Sắp xếp các số tăng dần trong mảng
void sapXepTangDanMang(int a[]) {
    for(int i = 0; i < n - 1; i++) {
        for(int j = i + 1; j < n; j++) {
            if(a[i] > a[j]) {
                int tmp = a[i];
                a[i] = a[j];
                a[j] = tmp;
            }
        }
    }
}

// Xuất mảng
void xuatMang(int a[]) {
    for(int i = 0; i < n; i++) {
        printf("%d ", a[i]);
    }
}

// Đếm tần số các số trong mảng
void demTanSoMang(int a[]) {
    int demTanSo[MAX] = {0};
    int count = 0;

    for(int i = 0; i < n; i++) {
        if(demTanSo[i] == -291095) {
            continue;
        }
        demTanSo[i] = 1;
        for(int j = i + 1; j < n; j++) {
            if(a[i] == a[j]) {
                demTanSo[i]++;
                demTanSo[j] = -291095;
            }
        }
    }

    for(int i = 0; i < n; i++) {
        if(demTanSo[i] != -291095) {
            printf("%d - %d; ", a[i], demTanSo[i]);
        }
    }
}
```

</details>
