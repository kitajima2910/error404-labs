---
layout: '../../layouts/BlogPostLayout.astro'
title: '🧮 Liệt kê các số nguyên tố nhỏ hơn n trong Java (Có kiểm tra dữ liệu nhập)'
date: 2026-01-23
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/liet-ke-cac-so-nguyen-to-nho-hon-n-trong-java-co-kiem-tra-du-lieu-nhap.avif',
        alt: '🧮 Liệt kê các số nguyên tố nhỏ hơn n trong Java (Có kiểm tra dữ liệu nhập)',
    }
description: Nhập số nguyên dương n, kiểm tra dữ liệu an toàn và liệt kê các số nguyên tố nhỏ hơn n bằng phương thức. Phù hợp cho người mới học Java và sinh viên CNTT 🚀
draft: false
category: Java
---

## 🎯 Mục tiêu bài viết

Trong bài viết này, chúng ta sẽ xây dựng một chương trình Java **sử dụng phương thức** để:

- Nhập vào **số nguyên dương n**
- Kiểm tra **tính hợp lệ của dữ liệu nhập**
- Liệt kê **các số nguyên tố nhỏ hơn n**
- Tối ưu thuật toán kiểm tra số nguyên tố

Bài này rất phù hợp cho:

- Người mới học Java
- Sinh viên học Java cơ bản
- Ôn tập phương thức, vòng lặp và xử lý ngoại lệ

---

## 📌 Số nguyên tố là gì?

Một **số nguyên tố** là số:

- Lớn hơn 1
- Chỉ chia hết cho **1 và chính nó**

Ví dụ:

- ✅ Số nguyên tố: `2, 3, 5, 7, 11`
- ❌ Không phải số nguyên tố: `1, 4, 6, 8, 9`

---

## 🧠 Ý tưởng chương trình

Chương trình được chia thành các phương thức riêng biệt:

| Phương thức                | Chức năng                          |
| -------------------------- | ---------------------------------- |
| `nhapInt()`                | Nhập số nguyên dương, kiểm tra lỗi |
| `kiemTraSoNguyenTo()`      | Kiểm tra một số có phải nguyên tố  |
| `lietKeSoNguyenToBeHonN()` | Liệt kê các số nguyên tố nhỏ hơn n |
| `main()`                   | Điều phối chương trình             |

Cách làm này giúp:

- Code **rõ ràng**
- Dễ **bảo trì**
- Đúng tư duy **lập trình hướng đối tượng**

---

## 💻 Code chương trình hoàn chỉnh

```java
package vn.info.error404labs.bai9;

import java.util.Scanner;

public class Example {

    // Scanner dùng chung cho toàn bộ class
    private Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {

        Example ex = new Example();

        // Nhập số nguyên dương n
        int n = ex.nhapInt("Nhap n: ");

        // Liệt kê các số nguyên tố nhỏ hơn n
        ex.lietKeSoNguyenToBeHonN(n);

    }

    // Phương thức nhập số nguyên dương
    public int nhapInt(String label) {
        while(true) {
            try {
                System.out.print(label);
                int n = Integer.valueOf(sc.nextLine());

                if(n <= 0) {
                    System.out.println("\nVui long nhap so nguyen duong (> 0)!");
                } else {
                    return n;
                }
            } catch (Exception e) {
                System.out.println("\nVui long nhap dung dinh dang so nguyen duong!");
            }
        }
    }

    // Phương thức kiểm tra số nguyên tố
    public boolean kiemTraSoNguyenTo(int n) {
        if(n < 2) {
            return false;
        }

        if(n == 2) {
            return true;
        }

        if(n % 2 == 0) {
            return false;
        }

        // Chỉ kiểm tra các số lẻ
        for(int i = 3; i <= n / i; i += 2) {
            if(n % i == 0) {
                return false;
            }
        }

        return true;
    }

    // Phương thức liệt kê số nguyên tố nhỏ hơn n
    public void lietKeSoNguyenToBeHonN(int n) {
        System.out.println("\nCac so nguyen to nho hon " + n + ":");
        for(int i = 2; i < n; i++) {
            if(kiemTraSoNguyenTo(i)) {
                System.out.print(i + " ");
            }
        }
    }

}
```

---

## 🔍 Giải thích chi tiết từng phần

### 1️⃣ Phương thức `nhapInt()`

- Dùng vòng lặp `while(true)` để buộc nhập đúng
- Sử dụng `try-catch` để tránh chương trình bị lỗi khi nhập sai
- Chỉ chấp nhận **số nguyên dương (> 0)**

👉 Đây là cách nhập dữ liệu **an toàn và chuyên nghiệp**

---

### 2️⃣ Phương thức `kiemTraSoNguyenTo()`

Thuật toán được tối ưu như sau:

- Loại bỏ các số `< 2`
- Xử lý riêng số `2`
- Loại bỏ số chẵn
- Chỉ kiểm tra các ước **lẻ** từ `3` đến `√n` (dùng `n / i`)

👉 Cách này nhanh hơn rất nhiều so với việc kiểm tra từ `1 → n`

---

### 3️⃣ Phương thức `lietKeSoNguyenToBeHonN()`

- Duyệt từ `2` đến `n - 1`
- Mỗi số đều được kiểm tra bằng hàm `kiemTraSoNguyenTo()`
- In ra kết quả rõ ràng

---

## 📈 Độ phức tạp

- Kiểm tra một số: **O(√n)**
- Liệt kê: **O(n√n)**
  → Phù hợp với bài học cơ bản

---

## ✅ Kết luận

✔ Bài toán được giải đúng yêu cầu

✔ Code rõ ràng, chia phương thức hợp lý

✔ Có kiểm tra lỗi khi nhập dữ liệu

✔ Thuật toán kiểm tra số nguyên tố được tối ưu

👉 Đây là **bài mẫu rất tốt** cho:

- Sinh viên mới học Java
- Giảng dạy lập trình cơ bản
- Ôn tập phương thức & vòng lặp
