---
layout: '../../layouts/BlogPostLayout.astro'
title: '🔢 Kiểm Tra Dãy Số Đơn Điệu'
date: 2026-01-23
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_dsa_c_2026_01/kh-dsa-c-2026-01-cau-truc-du-lieu-day-day-so-don-dieu.avif',
        alt: '🔢 Kiểm Tra Dãy Số Đơn Điệu',
    }
description: 📊 Bài viết hướng dẫn kiểm tra dãy số đơn điệu bằng ngôn ngữ C, kèm theo phân tích tư duy, lời giải mẫu và kỹ thuật lập trình tách hàm rõ ràng. 🛠️ Phù hợp cho người mới học lập trình, sinh viên CNTT và những ai muốn rèn luyện tư duy xử lý mảng hiệu quả.
draft: false
category: KH_DSA_C_2026_01
---

## 📘 Mô tả bài toán

Nhập vào một số nguyên dương **n**, tiếp theo là **n số nguyên** lần lượt là các phần tử của một dãy số **a**.
Hãy kiểm tra xem dãy số **a** có phải là **dãy đơn điệu** hay không.

- In ra **`YES`** nếu dãy là dãy đơn điệu
- In ra **`NO`** nếu dãy không phải là dãy đơn điệu

Một dãy số được gọi là **đơn điệu** nếu thỏa **một trong hai điều kiện** sau:

- **Đơn điệu tăng**:
  `a[i] > a[i - 1]` với mọi `i` từ `1` đến `n - 1`

- **Đơn điệu giảm**:
  `a[i] < a[i - 1]` với mọi `i` từ `1` đến `n - 1`

---

## 📌 Ví dụ

**Ví dụ 1**

```
Input:
5
1 2 3 4 5

Output:
YES
```

**Ví dụ 2**

```
Input:
4
5 3 1 -4

Output:
YES
```

**Ví dụ 3**

```
Input:
5
1 2 4 3 -2

Output:
NO
```

---

## 🧠 Phân tích bài toán

Bài toán yêu cầu kiểm tra tính **đồng nhất xu hướng** của dãy số.
Chỉ cần tồn tại **một cặp phần tử liên tiếp vi phạm quy luật tăng hoặc giảm**, dãy sẽ **không còn đơn điệu**.

Do đó, ta có thể:

- Duyệt dãy đúng **một lần**
- Kiểm tra đồng thời khả năng **tăng** và **giảm**
- Kết luận dựa trên kết quả cuối cùng

---

## 💡 Lời giải mẫu (Code trong `main`)

Đây là cách cài đặt **ngắn gọn, trực tiếp**, phù hợp cho người mới học hoặc làm bài thi nhanh.

```c
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int a[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }

    int isIncreasing = 1;
    int isDecreasing = 1;

    for (int i = 1; i < n; i++) {
        if (a[i] <= a[i - 1]) {
            isIncreasing = 0;
        }
        if (a[i] >= a[i - 1]) {
            isDecreasing = 0;
        }
    }

    if (isIncreasing || isDecreasing) {
        printf("YES");
    } else {
        printf("NO");
    }

    return 0;
}
```

---

## 🛠️ Kỹ thuật lập trình

Thay vì xử lý toàn bộ logic trong hàm `main`, ta có thể **tách chương trình thành các hàm nhỏ**, mỗi hàm đảm nhiệm một nhiệm vụ cụ thể.
Cách tiếp cận này giúp chương trình:

- Rõ ràng hơn
- Dễ đọc, dễ debug
- Dễ mở rộng và tái sử dụng

### 🔧 Ý tưởng kỹ thuật

- Viết một hàm nhập mảng riêng
- Viết **một hàm kiểm tra** nhưng dùng biến điều khiển để:
    - Kiểm tra dãy tăng
    - Hoặc kiểm tra dãy giảm

- Kết hợp kết quả để đưa ra kết luận cuối cùng

---

### 💻 Code áp dụng kỹ thuật lập trình

<details>
<summary>Xem code</summary>

```c
#include <stdio.h>

#define MAX 291095

int n;

// Khai báo các hàm
void nhapMang(int a[]);
int kiemTraDayDonDieu(int a[], int tang);

int main() {

    scanf("%d", &n);

    int a[MAX];
    nhapMang(a);

    int tang = kiemTraDayDonDieu(a, 1);
    int giam = kiemTraDayDonDieu(a, 0);

    if (tang || giam) {
        printf("YES");
    } else {
        printf("NO");
    }

    return 0;
}

// Nhập mảng
void nhapMang(int a[]) {
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
}

// Kiểm tra dãy đơn điệu
int kiemTraDayDonDieu(int a[], int tang) {

    if (tang) {
        // Kiểm tra tăng nghiêm ngặt
        for (int i = 0; i < n - 1; i++) {
            if (!(a[i] < a[i + 1])) {
                return 0;
            }
        }
        return 1;
    }

    // Kiểm tra giảm nghiêm ngặt
    for (int i = 0; i < n - 1; i++) {
        if (!(a[i] > a[i + 1])) {
            return 0;
        }
    }
    return 1;
}
```

</details>

---

## 📈 Độ phức tạp

- **Thời gian:** `O(n)`
- **Bộ nhớ:** `O(1)` (ngoài mảng lưu dữ liệu)

---

## ✅ Kết luận

Bài toán kiểm tra dãy đơn điệu là một ví dụ điển hình cho việc:

- Duyệt mảng
- So sánh các phần tử liên tiếp
- Áp dụng kỹ thuật tách hàm để nâng cao chất lượng code

Tùy mục đích sử dụng, ta có thể chọn:

- **Code mẫu ngắn gọn** cho thi cử
- **Code theo kỹ thuật lập trình** cho học tập và phát triển lâu dài
