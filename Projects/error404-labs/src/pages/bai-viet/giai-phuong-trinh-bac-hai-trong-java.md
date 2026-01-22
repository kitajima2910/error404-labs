---
layout: '../../layouts/BlogPostLayout.astro'
title: '🧮 Giải phương trình bậc hai trong Java'
date: 2026-01-26
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/giai-phuong-trinh-bac-hai-trong-java.avif',
        alt: '🧮 Giải phương trình bậc hai trong Java',
    }
description: 📐 Bài viết hướng dẫn giải phương trình bậc hai trong Java, phân tích công thức delta, xử lý số thực với EPSILON và so sánh hai cách nhập dữ liệu phổ biến - Scanner và BufferedReader + try-with-resources. Phù hợp để xây dựng tư duy code chuẩn và dễ bảo trì.
draft: false
category: Java
---

**So sánh Scanner và BufferedReader + try-with-resources**

---

## 1. Mô tả bài toán

Viết chương trình Java giải phương trình bậc hai:

[
ax^2 + bx + c = 0
]

Trong đó:

- a, b, c được nhập từ bàn phím
- Chương trình phải xử lý đầy đủ các trường hợp:
    - Phương trình vô nghiệm
    - Phương trình có nghiệm kép
    - Phương trình có hai nghiệm phân biệt
    - Trường hợp a = 0 (trở thành phương trình bậc nhất)

---

## 2. Công thức cần sử dụng

Ta sử dụng **biệt thức delta**:

```text
delta = b^2 - 4ac

delta < 0  : Phương trình vô nghiệm
delta = 0  : Phương trình có nghiệm kép
             x1 = x2 = -b / (2a)
delta > 0  : Phương trình có hai nghiệm phân biệt
             x1 = (-b + √delta) / (2a)
             x2 = (-b - √delta) / (2a)
```

---

## 3. So sánh nhanh Scanner và BufferedReader

| Tiêu chí         | Scanner       | BufferedReader                 |
| ---------------- | ------------- | ------------------------------ |
| Cách dùng        | Đơn giản      | Cần parse                      |
| Tốc độ           | Chậm hơn      | Nhanh hơn                      |
| Kiểm soát nhập   | Trung bình    | Cao                            |
| Code ngắn        | Có            | Không                          |
| Ứng dụng thực tế | Bài học, demo | Tool, server, chương trình lớn |

➡️ Tùy mục đích, ta có thể chọn cách nhập phù hợp.

---

## 4. Lưu ý về số thực (`double`) và EPSILON

Khi làm việc với số thực, **không nên so sánh trực tiếp bằng `== 0`** do sai số dấu phẩy động.

Giải pháp là dùng **EPSILON**:

```java
final double EPSILON = 1e-9; // 0.000000001
```

Ý nghĩa:

- Nếu |giá trị| < EPSILON → coi như bằng 0
- Giúp chương trình ổn định và chính xác hơn

### Giải thích kỹ Cách chia vùng giá trị của delta

Ta chia trục số thành 3 vùng bằng EPSILON:

```
--------------------|--------------------|--------------------
                 -EPSILON               0               +EPSILON
```

Ý nghĩa:

- `delta < -EPSILON`
  → delta **âm thật sự**, không phải do sai số

- `|delta| < EPSILON`
  → delta **rất gần 0**, coi như bằng 0

- `delta > EPSILON`
  → delta **dương thật sự**

---

### Áp dụng vào code

```java
if (delta < -EPSILON) {
    // Phuong trinh vo nghiem (delta am that su)
}
else if (Math.abs(delta) < EPSILON) {
    // Phuong trinh co nghiem kep (delta gan bang 0)
}
else {
    // Phuong trinh co hai nghiem phan biet (delta duong that su)
}
```

Cách viết này giúp:

- Tránh kết luận sai do sai số số thực
- Code rõ ràng, có chủ ý
- Phù hợp với các bài toán tính toán thực tế

---

## 5. Code mẫu 1 – Dùng Scanner

### Ưu điểm

- Dễ đọc
- Dễ hiểu
- Phù hợp làm quen với Java

```java
import java.util.Scanner;

public class QuadraticScanner {

    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {

        double a = nhapDouble("Nhap a: ");
        double b = nhapDouble("Nhap b: ");
        double c = nhapDouble("Nhap c: ");

        giaiPhuongTrinhBacHai(a, b, c);

        sc.close();
    }

    public static double nhapDouble(String label) {
        while (true) {
            try {
                System.out.print(label);
                return Double.parseDouble(sc.nextLine());
            } catch (Exception e) {
                System.out.println("Vui long nhap so thuc hop le!");
            }
        }
    }

    public static void giaiPhuongTrinhBacHai(double a, double b, double c) {

        final double EPSILON = 1e-9;

        if (Math.abs(a) < EPSILON) {
            if (Math.abs(b) < EPSILON) {
                if (Math.abs(c) < EPSILON) {
                    System.out.println("Phuong trinh vo so nghiem");
                } else {
                    System.out.println("Phuong trinh vo nghiem");
                }
            } else {
                double x = -c / b;
                System.out.printf("Phuong trinh bac nhat, x = %.6f\n", x);
            }
            return;
        }

        double delta = b * b - 4 * a * c;

        if (delta < -EPSILON) {
            System.out.println("Phuong trinh vo nghiem");
        } else if (Math.abs(delta) < EPSILON) {
            double x = -b / (2 * a);
            System.out.printf("Phuong trinh co nghiem kep x1 = x2 = %.6f\n", x);
        } else {
            double x1 = (-b + Math.sqrt(delta)) / (2 * a);
            double x2 = (-b - Math.sqrt(delta)) / (2 * a);
            System.out.printf("x1 = %.6f\n", x1);
            System.out.printf("x2 = %.6f\n", x2);
        }
    }
}
```

---

## 6. Code mẫu 2 – BufferedReader + try-with-resources

### Ưu điểm

- Nhanh
- Code chuẩn hơn cho chương trình lớn
- Tự động đóng tài nguyên

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class QuadraticBufferedReader {

    public static void main(String[] args) {

        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(System.in))) {

            double a = nhapDouble(br, "Nhap a: ");
            double b = nhapDouble(br, "Nhap b: ");
            double c = nhapDouble(br, "Nhap c: ");

            giaiPhuongTrinhBacHai(a, b, c);

        } catch (Exception e) {
            System.out.println("Loi khi nhap du lieu!");
        }
    }

    public static double nhapDouble(BufferedReader br, String label) {
        while (true) {
            try {
                System.out.print(label);
                return Double.parseDouble(br.readLine());
            } catch (Exception e) {
                System.out.println("Vui long nhap so thuc hop le!");
            }
        }
    }

    public static void giaiPhuongTrinhBacHai(double a, double b, double c) {

        final double EPSILON = 1e-9;

        if (Math.abs(a) < EPSILON) {
            if (Math.abs(b) < EPSILON) {
                if (Math.abs(c) < EPSILON) {
                    System.out.println("Phuong trinh vo so nghiem");
                } else {
                    System.out.println("Phuong trinh vo nghiem");
                }
            } else {
                double x = -c / b;
                System.out.printf("Phuong trinh bac nhat, x = %.6f\n", x);
            }
            return;
        }

        double delta = b * b - 4 * a * c;

        if (delta < -EPSILON) {
            System.out.println("Phuong trinh vo nghiem");
        } else if (Math.abs(delta) < EPSILON) {
            double x = -b / (2 * a);
            System.out.printf("Phuong trinh co nghiem kep x1 = x2 = %.6f\n", x);
        } else {
            double x1 = (-b + Math.sqrt(delta)) / (2 * a);
            double x2 = (-b - Math.sqrt(delta)) / (2 * a);
            System.out.printf("x1 = %.6f\n", x1);
            System.out.printf("x2 = %.6f\n", x2);
        }
    }
}
```

---

## 7. Kết luận

- Scanner phù hợp khi cần code nhanh, dễ đọc
- BufferedReader phù hợp khi cần hiệu năng và kiểm soát tốt hơn
- Với số thực, nên sử dụng EPSILON để so sánh
- try-with-resources giúp code gọn và tránh quên đóng tài nguyên
- Cách tổ chức code rõ ràng giúp dễ bảo trì và mở rộng
