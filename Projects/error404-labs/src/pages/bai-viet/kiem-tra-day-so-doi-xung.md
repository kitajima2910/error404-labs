---
layout: '../../layouts/BlogPostLayout.astro'
title: 'Kiểm tra dãy số đối xứng'
date: 2026-01-11
author: Phạm Xuân Hoài
image:
    {
        src: '/images/c/kiem-tra-day-so-doi-xung.avif',
        alt: 'Kiểm tra dãy số đối xứng',
    }
description: 🔁 Dãy số đối xứng là gì nhỉ? 🤔 Cùng mình đọc đề → nghĩ ý tưởng đơn giản → viết code C rõ ràng, dễ hiểu cho người mới nhé! ✨💻
draft: false
category: C
---

## 📌 1. Đọc và hiểu đề bài

**Đề bài yêu cầu:**

- Nhập **T bộ test**
- Mỗi bộ test gồm:
    - Số nguyên `n` (số phần tử của dãy, `n ≤ 100`)
    - Một dãy `n` số nguyên

- Kiểm tra xem dãy đó **có đối xứng hay không**
    - Nếu đúng → in `YES`
    - Nếu sai → in `NO`

📖 **Dãy đối xứng là gì?**
Là dãy đọc từ trái sang phải **giống hệt** khi đọc từ phải sang trái.

Ví dụ:

```
1 4 4 1   → đối xứng
1 5 5 5 3 → không đối xứng
```

---

## 💡 2. Lên ý tưởng giải đơn giản

Ta **không cần so sánh toàn bộ dãy**, mà chỉ cần:

- So sánh phần tử đầu với phần tử cuối
- Phần tử thứ hai với phần tử kế cuối
- …
- Chỉ cần so sánh **n/2 cặp phần tử**

👉 Nếu **tồn tại ít nhất một cặp không bằng nhau**
→ dãy **không đối xứng**

👉 Nếu tất cả các cặp đều bằng nhau
→ dãy **đối xứng**

---

## 🧠 3. Ý tưởng bằng lời

Với mảng `a` có `n` phần tử:

- `a[i]` là phần tử thứ `i` tính từ đầu
- `a[n - (i + 1)]` là phần tử thứ `i` tính từ cuối

Ta so sánh hai giá trị này cho mọi `i` từ `0` đến `n/2 - 1`.

Cách viết `n - (i + 1)` giúp ta **hiểu rõ bản chất “lấy phần tử đối xứng phía sau”**, rất phù hợp cho người mới học.

| i   | a[i] (đầu) | a[n - (i+1)] (cuối) |
| --- | ---------- | ------------------- |
| 0   | a[0]       | a[n-1]              |
| 1   | a[1]       | a[n-2]              |
| 2   | a[2]       | a[n-3]              |

#### ⚠️ Sai lầm thường gặp

Sau khi hiểu cách xác định cặp phần tử đối xứng, người mới học C thường hay mắc các lỗi sau:

- ❌ Duyệt hết mảng thay vì chỉ duyệt `n/2`
- ❌ Nhầm chỉ số `n - i` (sai) thay vì `n - i - 1` (đúng)
- ❌ Quên xuống dòng khi in kết quả cho nhiều test

---

## 🧪 4. Cài đặt chương trình C

### ✍️ Code hoàn chỉnh

```c
#include <stdio.h>

void nhapMang(int n, int a[n]);
int kiemTraDoiXung(int n, int a[n]);

int main() {
    int T;
    scanf("%d", &T);

    while (T--) {
        int n;
        scanf("%d", &n);

        int a[n];
        nhapMang(n, a);

        if (kiemTraDoiXung(n, a))
            printf("YES\n");
        else
            printf("NO\n");
    }

    return 0;
}
```

---

### 📥 Hàm nhập mảng

```c
void nhapMang(int n, int a[n]) {
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
}
```

---

### 🔍 Hàm kiểm tra đối xứng

```c
int kiemTraDoiXung(int n, int a[n]) {
    for (int i = 0; i < n / 2; i++) {
        if (a[i] != a[n - (i + 1)]) {
            return 0; // Không đối xứng
        }
    }
    return 1; // Đối xứng
}
```

📌 Chỉ cần **một vòng lặp**
📌 Phát hiện sai → **dừng ngay** (tối ưu)

---

## ✅ 5. Ví dụ chạy thử

**Input**

```
2
4
1 4 4 1
5
1 5 5 5 3
```

**Output**

```
YES
NO
```

---

## 🎯 6. Kết luận

- Bài toán đơn giản nhưng giúp rèn:
    - Tư duy mảng
    - Chỉ số phần tử
    - Tránh lỗi off-by-one

- Cách viết rõ ràng giúp:
    - Dễ đọc
    - Dễ debug
    - Phù hợp cho người mới học C

👉 Đây là **bài mẫu rất tốt** cho sinh viên hoặc người mới bắt đầu học lập trình C.

---

📌 **Thử thách**: <a href="https://www.hackerrank.com/contests/error404-labs-hoc-lap-trinh/challenges" target="_blank">Error404-Labs - Học Lập Trình</a> - C04003 - MẢNG ĐỐI XỨNG - Mảng một chiều
