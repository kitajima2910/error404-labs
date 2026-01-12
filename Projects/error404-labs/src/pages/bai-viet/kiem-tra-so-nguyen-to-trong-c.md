---
layout: '../../layouts/BlogPostLayout.astro'
title: '🔍 Kiểm Tra Số Nguyên Tố Trong C'
date: 2026-01-12
author: Phạm Xuân Hoài
image:
    {
        src: '/images/c/kiem-tra-so-nguyen-to-trong-c.avif',
        alt: '🔍 Kiểm Tra Số Nguyên Tố Trong C',
    }
description: 😺 Học C mà chưa gặp số nguyên tố thì chưa trọn vẹn! Bài viết này sẽ giúp bạn kiểm tra số nguyên tố đúng – nhanh – không TLE ⚡ Phù hợp học tập & thi đấu 👨‍💻👩‍💻
draft: false
category: C
---

## 📘 1. Đọc đề – hiểu đúng yêu cầu

**Đề bài:**
Cho một số nguyên `n`. Hãy kiểm tra xem `n` có phải là **số nguyên tố** hay không.

📌 **Định nghĩa cần nhớ:**
Số nguyên tố là số **lớn hơn 1** và **chỉ chia hết cho 1 và chính nó**.

---

## 💡 2. Lên ý tưởng đơn giản

### ❌ Cách nghĩ ban đầu (đúng nhưng chậm)

- Thử chia `n` cho tất cả các số từ `2` đến `n - 1`
- Nếu có số nào chia hết → không phải số nguyên tố

👉 Cách này **không phù hợp** khi `n` lớn.

---

### ✅ Ý tưởng đúng & dễ nhớ

Dựa vào 3 nhận xét sau:

### 🔹 Nhận xét 1

Nếu `n < 2` → **không phải số nguyên tố**

### 🔹 Nhận xét 2

`2` là **số nguyên tố chẵn duy nhất**

### 🔹 Nhận xét 3 (quan trọng nhất)

Nếu `n` **không phải số nguyên tố**, thì `n` **luôn có ít nhất một ước số ≤ √n**

👉 Vì vậy:

- Chỉ cần kiểm tra các ước từ `2` đến `√n`
- Sau khi loại số chẵn, chỉ cần kiểm tra **số lẻ**

---

## 🧪 Ví dụ minh họa bằng bảng

| n   | Các số cần kiểm tra | Kết luận            |
| --- | ------------------- | ------------------- |
| 1   | —                   | ❌ Không phải SNT   |
| 2   | —                   | ✅ SNT              |
| 9   | 3                   | ❌ 9 chia hết cho 3 |
| 17  | 3                   | ✅ SNT              |
| 36  | 3, 5                | ❌ chia hết cho 3   |

📌 Ví dụ `n = 36`
√36 = 6 → chỉ cần kiểm tra từ `2` đến `6`, **không cần kiểm tra đến 35**

---

## 🧠 3. Cài đặt code rõ ràng

Dưới đây là hàm kiểm tra số nguyên tố trong C:

```c
long long kiemTraSoNT(long long n) {
    if(n < 2) {
        return 0;
    }

    if(n == 2) {
        return 1;
    }

    if(n % 2 == 0) {
        return 0;
    }

    for(long long i = 3; i <= n / i; i += 2) {
        if(n % i == 0) {
            return 0;
        }
    }

    return 1;
}
```

---

## 🔎 Giải thích nhanh vòng lặp

```c
for(long long i = 3; i <= n / i; i += 2)
```

- `i += 2` → chỉ kiểm tra **số lẻ**
- `i <= n / i` → tương đương `i * i <= n`
    - An toàn
    - Không cần dùng `sqrt()`

---

## ⏱️ Độ phức tạp

- **Thời gian:** `O(√n)`
- **Bộ nhớ:** `O(1)`

👉 Chạy tốt với số rất lớn và các bài thi online.

---

## 🎯 Tổng kết

- Đọc kỹ đề, hiểu đúng định nghĩa
- Loại các trường hợp đặc biệt sớm
- Chỉ kiểm tra đến √n để tối ưu

💡 Một bài toán nhỏ nhưng là **nền tảng cho rất nhiều bài số học & thuật toán** sau này.

---

📌 **Thử thách**: <a href="https://www.hackerrank.com/contests/error404-labs-hoc-lap-trinh/challenges" target="_blank">Error404-Labs - Học Lập Trình</a> - C04005 - SỐ LỚN NHẤT - Mảng một chiều
