---
layout: '../../layouts/BlogPostLayout.astro'
title: '📘 Java Basic – Nhập dữ liệu an toàn & sử dụng Math (Tránh lỗi “trôi lệnh” Scanner)'
date: 2026-01-21
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/java-basic-nhap-du-lieu-an-toan-va-su-dung-math-tranh-loi-troi-lenh-scanner.avif',
        alt: '📘 Java Basic – Nhập dữ liệu an toàn & sử dụng Math (Tránh lỗi “trôi lệnh” Scanner)',
    }
description: Khi học Java Basic, rất nhiều bạn gặp lỗi chương trình chạy sai, nhập đúng mà kết quả không đúng, hoặc bị bỏ qua dữ liệu nhập. Nguyên nhân phổ biến nhất đến từ việc sử dụng Scanner chưa đúng cách.
draft: false
category: Java
---

Khi học Java Basic, rất nhiều bạn gặp lỗi **chương trình chạy sai, nhập đúng mà kết quả không đúng**, hoặc **bị bỏ qua dữ liệu nhập**.
Nguyên nhân phổ biến nhất đến từ việc **sử dụng `Scanner` chưa đúng cách**.

Trong bài này, chúng ta sẽ:

- Xây dựng **rule nhập số an toàn**
- Tránh hoàn toàn lỗi **trôi lệnh**
- Áp dụng các hàm trong lớp `Math`:
    - `Math.sqrt()`
    - `Math.pow()`
    - `Math.max()`
    - `Math.min()`

---

## ❓ Vấn đề thường gặp khi nhập dữ liệu với Scanner

Ví dụ quen thuộc:

```java
Scanner sc = new Scanner(System.in);

int n = sc.nextInt();
String s = sc.nextLine(); // bị trôi
```

### ❌ Lỗi gì đang xảy ra?

- `nextInt()` **không đọc ký tự xuống dòng**
- `nextLine()` đọc luôn `\n` còn sót lại
- Kết quả: `s` là chuỗi rỗng

👉 Đây là lỗi mà **90% sinh viên Java Basic từng gặp**.

---

## ✅ Giải pháp: Luôn dùng `nextLine()` và tự chuyển kiểu

Nguyên tắc đơn giản nhưng rất hiệu quả:

> **Luôn đọc dữ liệu bằng `nextLine()` → sau đó tự parse sang kiểu mong muốn**

Ưu điểm:

- Không trôi lệnh
- Dùng chung cho `int`, `double`, `char`, `String`
- Dễ kiểm soát lỗi nhập sai

---

## 🧠 Xây dựng rule nhập số nguyên an toàn

```java
public int inputInt(String label) {
    while (true) {
        try {
            System.out.print(label);
            return Integer.valueOf(sc.nextLine());
        } catch (Exception e) {
            System.out.println("Vui long nhap so nguyen!");
        }
    }
}
```

### ✔ Vì sao dùng `catch (Exception e)`?

- Java có **rất nhiều Exception**
- Ở tầng **nhập dữ liệu**, mục tiêu là:
    - Không crash chương trình
    - Người dùng nhập lại

- Không cần nhớ chính xác từng loại Exception

👉 Đây là tư duy **thực tế và linh hoạt**, đặc biệt phù hợp cho Java Basic và project nhỏ.

---

## 📝 Yêu cầu bài toán

Viết chương trình:

- Nhập số nguyên `n`, `m`
- Tính:
    - `Math.sqrt(n)`
    - `Math.pow(n, m)`
    - `Math.max(n, m)`
    - `Math.min(n, m)`

- Kiểm tra trường hợp `n < 0` khi dùng `sqrt`

---

## 🧩 Chương trình hoàn chỉnh

```java
package vn.info.error404labs.bai7;

import java.util.Scanner;

public class Example {

    // Scanner dùng chung cho cả class, chỉ tạo 1 lần
    private Scanner sc = new Scanner(System.in);

    /**
     * Hàm nhập số nguyên an toàn
     * - Luôn dùng nextLine() để tránh lỗi trôi lệnh
     * - Nếu nhập sai sẽ yêu cầu nhập lại
     */
    public int inputInt(String label) {
        while (true) { // Lặp cho đến khi người dùng nhập đúng
            try {
                System.out.print(label); // Hiển thị nội dung yêu cầu nhập
                return Integer.valueOf(sc.nextLine()); // Đọc chuỗi và chuyển sang số nguyên
            } catch (Exception e) {
                // Bắt mọi lỗi khi người dùng nhập sai dữ liệu
                System.out.println("Vui lòng nhập số nguyên!");
            }
        }
    }

    public static void main(String[] args) {

        // Tạo đối tượng để gọi các phương thức không static
        Example ex = new Example();

        // Nhập dữ liệu từ bàn phím
        int n = ex.inputInt("Nhập n: ");
        int m = ex.inputInt("Nhập m: ");

        System.out.println("\n======== KẾT QUẢ ========");

        // Tính căn bậc hai của n
        if (n < 0) {
            // Math.sqrt không tính được với số âm
            System.out.printf("Math.sqrt(%d) = Không tính được (số âm)\n", n);
        } else {
            // Nếu n >= 0 thì tính bình thường
            System.out.printf("Math.sqrt(%d) = %.2f\n", n, Math.sqrt(n));
        }

        // Tính lũy thừa n mũ m
        System.out.printf("Math.pow(%d, %d) = %.2f\n", n, m, Math.pow(n, m));

        // Tìm số lớn nhất giữa n và m
        System.out.printf("Math.max(%d, %d) = %d\n", n, m, Math.max(n, m));

        // Tìm số nhỏ nhất giữa n và m
        System.out.printf("Math.min(%d, %d) = %d\n", n, m, Math.min(n, m));
    }
}
```

---

## 🧪 Ví dụ chạy chương trình

```
Nhập n: 9
Nhập m: 2

======== KẾT QUẢ ========
Math.sqrt(9) = 3,00
Math.pow(9, 2) = 81,00
Math.max(9, 2) = 9
Math.min(9, 2) = 2
```

---

## 🎓 Kiến thức sinh viên học được sau bài này

- Tránh lỗi **trôi lệnh Scanner**
- Hiểu cách **xử lý nhập sai**
- Biết dùng `while(true)` + `try/catch`
- Sử dụng lớp `Math`
- Tư duy **code an toàn, không crash**

---

## 📌 Kết luận

- `nextInt()` **không sai**, nhưng **dễ gây lỗi**
- Dùng `nextLine()` + parse giúp chương trình:
    - Ổn định hơn
    - Dễ mở rộng
    - Dùng tốt cho project thật

> ❝ Viết code không chỉ để chạy, mà để **không lỗi khi người dùng nhập sai** ❞
