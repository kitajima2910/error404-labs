---
layout: '../../layouts/BlogPostLayout.astro'
title: 'Tìm số lớn nhất trong dãy số'
date: 2026-01-11
author: Phạm Xuân Hoài
image:
    {
        src: '/images/c/tim-so-lon-nhat-trong-day-so.avif',
        alt: 'Tìm số lớn nhất trong dãy số',
    }
description: 🐣 Bài tập nhập môn C giúp bạn làm quen với mảng, vòng lặp và hàm. 🔍 Từng bước tìm giá trị lớn nhất trong dãy số và 🧭 xác định vị trí xuất hiện của nó. 💡 Ý tưởng đơn giản – code rõ ràng – rất phù hợp cho người mới bắt đầu luyện contest! 🚀
draft: false
category: C
---

## 1️⃣ Đọc đề và phân tích yêu cầu

Bài toán yêu cầu:

- Nhập **T bộ test**
- Với mỗi test:
    - Nhập số phần tử **N**
    - Nhập **N số nguyên dương**

- Cần in ra:
    - **Giá trị lớn nhất** trong dãy
    - **Các vị trí (index từ 0)** có giá trị bằng số lớn nhất

📌 **Lưu ý quan trọng**:

- Một dãy có thể có **nhiều số lớn nhất**
- Chỉ số tính **từ 0**, không phải từ 1

---

## 2️⃣ Lên ý tưởng đơn giản

Thay vì viết tất cả trong `main`, ta chia bài toán thành các bước rõ ràng:

### 🔹 Bước 1: Nhập mảng

→ Viết hàm riêng để nhập dữ liệu cho gọn và dễ đọc

### 🔹 Bước 2: Tìm giá trị lớn nhất

→ Duyệt mảng, so sánh từng phần tử để tìm `max`

### 🔹 Bước 3: In các vị trí có giá trị lớn nhất

→ Duyệt lại mảng, phần tử nào bằng `max` thì in ra vị trí

👉 Mỗi hàm **chỉ làm đúng một nhiệm vụ**, giúp code:

- Dễ hiểu
- Dễ sửa
- Dễ mở rộng

---

## 3️⃣ Cài đặt chương trình

### 📌 Khai báo các hàm

```c
void nhapMang(int n, int a[n]);
int timMaxMang(int n, int a[n]);
void inViTriMaxMang(int n, int a[n], int max);
```

---

### 📌 Hàm `main`

```c
int main() {
    int T;
    scanf("%d", &T);

    while(T--) {
        int n;
        scanf("%d", &n);

        int a[n];
        nhapMang(n, a);

        int max = timMaxMang(n, a);
        printf("%d\n", max);

        inViTriMaxMang(n, a, max);
        printf("\n");
    }

    return 0;
}
```

🔎 **Giải thích nhanh**:

- `while(T--)`: xử lý lần lượt từng test
- Mỗi test có mảng riêng
- Tìm `max` trước, sau đó mới in vị trí

---

### 📌 Hàm nhập mảng

```c
void nhapMang(int n, int a[n]) {
    for(int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
}
```

👉 Tách riêng hàm giúp `main()` gọn và dễ đọc hơn.

---

### 📌 Hàm tìm giá trị lớn nhất

```c
int timMaxMang(int n, int a[n]) {
    int max = a[0];
    for(int i = 1; i < n; i++) {
        max = a[i] > max ? a[i] : max;
    }
    return max;
}
```

🧠 Ý tưởng:

- Giả sử phần tử đầu tiên là lớn nhất
- So sánh lần lượt các phần tử còn lại
- Cập nhật `max` khi gặp giá trị lớn hơn

---

### 📌 Hàm in vị trí các phần tử lớn nhất

```c
void inViTriMaxMang(int n, int a[n], int max) {
    for(int i = 0; i < n; i++) {
        if(a[i] != max) {
            continue;
        }
        printf("%d ", i);
    }
}
```

👉 Chỉ cần kiểm tra:

- Nếu `a[i] == max` → in ra vị trí `i`

---

## 4️⃣ Tổng kết

✔️ Bài toán được giải bằng:

- Mảng 1 chiều
- Vòng lặp `for`
- Hàm trong C

✔️ Cách chia hàm giúp:

- Code rõ ràng
- Dễ học cho người mới
- Phù hợp thi contest & học thuật

📌 Đây là **bài nền tảng rất quan trọng**, có thể mở rộng sang:

- Đếm số lần xuất hiện
- Tìm số lớn thứ 2
- Xử lý mảng nâng cao hơn

---

💬 _Nếu bạn mới học C, hãy thử viết lại bài này mà không nhìn code — đó là cách học nhanh nhất!_ 🚀

---

📌 **Thử thách**: <a href="https://www.hackerrank.com/contests/error404-labs-hoc-lap-trinh/challenges" target="_blank">Error404-Labs - Học Lập Trình</a> - C04005 - SỐ LỚN NHẤT - Mảng một chiều
