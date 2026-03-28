---
layout: '../../layouts/BlogPostLayout.astro'
title: 'Xử lý mảng trong Java: Từ ý tưởng đến hoàn chỉnh'
date: 2026-03-29
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/xu-ly-mang-trong-java-tu-y-tuong-den-hoan-chinh.avif',
        alt: 'Xử lý mảng trong Java: Từ ý tưởng đến hoàn chỉnh',
    }
description: Bài viết hướng dẫn xây dựng chương trình Java xử lý mảng số nguyên từ cơ bản đến hoàn chỉnh. Người học sẽ từng bước thực hiện - nhập dữ liệu an toàn, thao tác với mảng, sắp xếp tăng dần, và tìm giá trị lớn nhất – nhỏ nhất. Nội dung được trình bày theo hướng dễ hiểu, tập trung vào tư duy và cách triển khai, phù hợp cho người mới bắt đầu làm quen với lập trình Java.
draft: false
category: Java
---

## 📖 Tài liệu

<div class="mb-3 flex gap-3">
  <a 
    href="/images/java/xu-ly-mang-trong-java-tu-y-tuong-den-hoan-chinh.pdf" 
    target="_blank" 
    rel="noopener noreferrer"
    class="py-2 text-white">
    🔎 Mở tab mới xem tài liệu (PDF)
  </a>
</div>

---

## 1. Ý tưởng bài toán

Mục tiêu:

- Nhập một số nguyên `n` (số lượng phần tử)
- Nhập `n` số nguyên vào mảng
- In mảng ra màn hình
- Sắp xếp mảng tăng dần
- Tìm giá trị lớn nhất và nhỏ nhất

👉 Đây là bài nền tảng giúp hiểu:

- Mảng (Array)
- Vòng lặp
- Tách hàm

---

## 2. Bước 1 – Nhập số nguyên an toàn

### Code

```java
static int nhapSoNguyen(String label, String condition, int mode) {
    while(true) {
        try {
            System.out.print(label);
            int n = Integer.parseInt(sc.nextLine());

            if(n < 1 && mode == 0) {
                System.out.println("\n" + condition);
                continue;
            }

            return n;

        } catch (Exception e) {
            System.out.println("\nVui lòng nhập đúng định dạng!");
        }
    }
}
```

### Giải thích

- Dùng `try-catch` để tránh crash khi nhập sai
- Nếu cần điều kiện (`mode == 0`) thì kiểm tra `n > 0`
- Nếu sai → nhập lại

👉 Mục tiêu: luôn đảm bảo dữ liệu đầu vào hợp lệ

---

## 3. Bước 2 – Nhập mảng

### Code

```java
static void nhapMang(int a[]) {
    for(int i = 0; i < a.length; i++) {
        a[i] = nhapSoNguyen("a[" + i + "] = ", "", 1);
    }
}
```

### Giải thích

- Duyệt từ `0 → n-1`
- Nhập từng phần tử

👉 Tận dụng lại hàm nhập → không lặp code

---

## 4. Bước 3 – Xuất mảng

### Code

```java
static void xuatMang(int a[], String label) {
    System.out.println("\n" + label);
    for(int i = 0; i < a.length; i++) {
        System.out.print(a[i] + " ");
    }
}
```

### Giải thích

- In tiêu đề
- In từng phần tử

👉 Giúp kiểm tra dữ liệu dễ dàng

---

## 5. Bước 4 – Sắp xếp mảng tăng dần

### Code

```java
static void sapXepTang(int a[]) {
    for(int i = 0; i < a.length - 1; i++) {
        for(int j = i + 1; j < a.length; j++) {
            if(a[i] > a[j]) {
                int temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
        }
    }
}
```

### Giải thích

- So sánh từng phần tử với các phần tử phía sau
- Nếu sai thứ tự → đổi chỗ

👉 Cách này đơn giản, dễ hiểu cho người mới

👉 Độ phức tạp: O(n²)

---

## 6. Bước 5 – Tìm giá trị lớn nhất

### Code

```java
static int timMax(int a[]) {
    int max = a[0];
    for(int i = 1; i < a.length; i++) {
        if(a[i] > max) {
            max = a[i];
        }
    }
    return max;
}
```

### Giải thích

- Giả sử phần tử đầu là lớn nhất
- Duyệt mảng và cập nhật nếu tìm thấy số lớn hơn

---

## 7. Bước 6 – Tìm giá trị nhỏ nhất

### Code

```java
static int timMin(int a[]) {
    int min = a[0];
    for(int i = 1; i < a.length; i++) {
        if(a[i] < min) {
            min = a[i];
        }
    }
    return min;
}
```

### Giải thích

- Tương tự tìm max, nhưng ngược điều kiện

---

## 8. Bước 7 – Chạy chương trình

### Code

```java
public static void main(String[] args) {
    int n = nhapSoNguyen("Nhập số nguyên: ", "Vui lòng nhập n > 0!", 0);

    int a[] = new int[n];

    nhapMang(a);
    xuatMang(a, "Mảng đã nhập:");

    sapXepTang(a);
    xuatMang(a, "Mảng đã sắp xếp tăng:");

    System.out.println("\nMax = " + timMax(a));
    System.out.println("Min = " + timMin(a));
}
```

### Giải thích luồng chạy

1. Nhập `n`
2. Tạo mảng
3. Nhập dữ liệu
4. In mảng ban đầu
5. Sắp xếp
6. In lại
7. In Max và Min

---

## 9. Tổng kết

Sau bài này, bạn nắm được:

- Cách làm việc với mảng
- Cách tách chương trình thành nhiều hàm
- Cách xử lý input an toàn
- Các thuật toán cơ bản (sort, max, min)

👉 Đây là nền tảng quan trọng trước khi học:

- Tìm kiếm nhị phân
- Sắp xếp nâng cao
- Cấu trúc dữ liệu

---
