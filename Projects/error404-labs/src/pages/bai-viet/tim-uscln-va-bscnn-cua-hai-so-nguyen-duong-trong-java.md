---
layout: '../../layouts/BlogPostLayout.astro'
title: '📘 Tìm USCLN và BSCNN của hai số trong Java'
date: 2026-01-22
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/tim-uscln-va-bscnn-cua-hai-so-nguyen-duong-trong-java.avif',
        alt: '📘 Tìm USCLN và BSCNN của hai số trong Java',
    }
description: 🧠 Áp dụng thuật toán Euclid, code rõ ràng – dễ học 👨‍💻 Phù hợp cho sinh viên và người mới bắt đầu lập trình Java 🧩 Có kiểm tra dữ liệu đầu vào, tránh lỗi thường gặp khi lập trình 🔥 Ví dụ thực tế, code chuẩn để học và giảng dạy
draft: false
category: Java
---

## 🌟 Giới thiệu

Trong giai đoạn nhập môn lập trình Java, thường được làm quen với các bài toán **số học cơ bản**. Một trong những bài toán quan trọng và xuất hiện rất nhiều trong học tập cũng như thực tế là:

> 👉 **Tìm Ước số chung lớn nhất (USCLN)**

> 👉 **Tìm Bội số chung nhỏ nhất (BSCNN)**

Bài toán này giúp:

- Hiểu rõ **thuật toán Euclid**
- Làm quen với **vòng lặp while**
- Biết cách **viết và sử dụng hàm**
- Rèn tư duy giải quyết vấn đề

---

## 🎯 Mục tiêu bài học

Sau bài học này, có thể:

✅ Hiểu khái niệm USCLN và BSCNN

✅ Áp dụng đúng thuật toán Euclid

✅ Viết chương trình Java có tách hàm rõ ràng

✅ Xử lý được cả **số dương và số âm**

✅ Tránh các lỗi thường gặp khi mới học lập trình

---

## 1️⃣ USCLN (Ước số chung lớn nhất) là gì?

**USCLN của hai số nguyên** là **số lớn nhất chia hết cho cả hai số đó**.

### 📌 Ví dụ

Xét hai số `12` và `18`:

- Ước của 12: `1, 2, 3, 4, 6, 12`
- Ước của 18: `1, 2, 3, 6, 9, 18`

👉 Ước chung lớn nhất là **6**

👉 **USCLN(12, 18) = 6**

📌 Lưu ý quan trọng:

> USCLN **luôn là số không âm**, dù đầu vào có thể là số âm.

---

## 2️⃣ BSCNN (Bội số chung nhỏ nhất) là gì?

**BSCNN của hai số** là **số nhỏ nhất mà cả hai số đều chia hết**.

### 📌 Ví dụ

- BSCNN(12, 18) = `36`
- Vì:
    - 36 chia hết cho 12
    - 36 chia hết cho 18

---

## 3️⃣ Mối quan hệ giữa USCLN và BSCNN

Trong lập trình, thay vì tìm BSCNN bằng cách liệt kê bội số (rất chậm), ta dùng công thức:

```
BSCNN(a, b) = |a × b| / USCLN(a, b)
```

### ❓ Vì sao có trị tuyệt đối?

- Toán học cho phép `a`, `b` là **số âm**
- BSCNN **luôn không âm**
- Dấu `| |` giúp công thức đúng trong mọi trường hợp

📌 Nếu bài toán **chỉ cho số nguyên dương** → có thể **không cần trị tuyệt đối**

📌 Nếu viết hàm **tổng quát** → **nên dùng trị tuyệt đối**

---

## 4️⃣ Thuật toán Euclid – Cách tìm USCLN hiệu quả

Thuật toán Euclid dựa trên nguyên lý:

```
USCLN(a, b) = USCLN(b, a % b)
```

Ta lặp lại phép chia này cho đến khi **số dư bằng 0**.

---

### 📊 Ví dụ minh họa từng bước

Tìm USCLN của `48` và `18`:

| a   | b   | a % b |
| --- | --- | ----- |
| 48  | 18  | 12    |
| 18  | 12  | 6     |
| 12  | 6   | 0     |

👉 Khi dư = 0

👉 **USCLN = 6**

---

## 5️⃣ Phân tích yêu cầu bài toán

### 🧩 Đề bài

- Nhập 2 số nguyên `a`, `b` (có thể âm)
- Tìm:
    - USCLN
    - BSCNN

- In kết quả ra màn hình

---

### 🧠 Hướng tiếp cận

1. Viết hàm nhập số nguyên an toàn
2. Đưa số âm về trị tuyệt đối khi tìm USCLN
3. Áp dụng thuật toán Euclid
4. Tính BSCNN dựa trên USCLN

---

## 6️⃣ Code Java hoàn chỉnh (XỬ LÝ CẢ SỐ ÂM)

### 💻 Chương trình đầy đủ

```java
package vn.info.error404labs.bai8;

import java.util.Scanner;

public class Example {

	// Scanner dùng chung cho toàn bộ chương trình
	private Scanner sc = new Scanner(System.in);

	// Hàm nhập số nguyên (cho phép số âm)
	public int nhapInt(String label) {
		while (true) {
			try {
				System.out.print(label);
				return Integer.parseInt(sc.nextLine());
			} catch (Exception e) {
				System.out.println("\nVui long nhap dung dinh dang so nguyen!");
			}
		}
	}

	// Hàm tìm USCLN (xử lý cả số âm)
	public int USCLN(int a, int b) {
		a = Math.abs(a);
		b = Math.abs(b);

		// Trường hợp đặc biệt: cả hai đều bằng 0
		if (a == 0 && b == 0) {
			return 0; // quy ước
		}

		while (b != 0) {
			int r = a % b;
			a = b;
			b = r;
		}
		return a; // luôn >= 0
	}

	// Hàm tìm BSCNN
	public long BSCNN(int a, int b) {
		if (a == 0 || b == 0) {
			return 0;
		}
		return Math.abs((long) a * b) / USCLN(a, b);
	}

	public static void main(String[] args) {
		Example ex = new Example();

		int a = ex.nhapInt("Nhap a: ");
		int b = ex.nhapInt("Nhap b: ");

		int uscln = ex.USCLN(a, b);
		long bscnn = ex.BSCNN(a, b);

		System.out.println();
		System.out.println("USCLN: " + uscln);
		System.out.println("BSCNN: " + bscnn);
	}
}
```

---

## 7️⃣ Ví dụ chạy chương trình

```
Nhap a: -12
Nhap b: 18

USCLN: 6
BSCNN: 36
```

```
Nhap a: 0
Nhap b: 15

USCLN: 15
BSCNN: 0
```

---

## 8️⃣ Những lỗi hay gặp ❌

❌ Không xử lý số âm

❌ Không kiểm tra trường hợp `a = 0` hoặc `b = 0`

❌ Nhân `a * b` bằng `int` gây tràn số

❌ Viết toàn bộ code trong `main`

👉 Bài này giúp **tránh những lỗi trên**

---

## 9️⃣ Tổng kết

🌱 USCLN & BSCNN là **bài toán nền tảng** trong Java

🧠 Giúp rèn:

- Tư duy thuật toán
- Cách dùng vòng lặp
- Kỹ năng viết hàm tổng quát

📚 Nắm chắc bài này sẽ giúp học tốt:

- Java OOP
- Cấu trúc dữ liệu
- Giải thuật

---

✨ **Lời khuyên:**

👉 Hãy **tự tay gõ lại code**, đừng chỉ copy

👉 Hiểu bản chất trước khi học nâng cao
