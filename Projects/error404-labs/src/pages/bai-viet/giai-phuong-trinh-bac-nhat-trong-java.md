---
layout: '../../layouts/BlogPostLayout.astro'
title: '🧮 Giải phương trình bậc nhất trong Java với đầy đủ các trường hợp ax + b = 0'
date: 2026-01-25
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/giai-phuong-trinh-bac-nhat-trong-java.avif',
        alt: '🧮 Giải phương trình bậc nhất trong Java với đầy đủ các trường hợp ax + b = 0',
    }
description: 📥 Nhập dữ liệu từ bàn phím, 🛡️ kiểm tra lỗi nhập, 📊 tính và hiển thị nghiệm rõ ràng, dễ theo dõi. 🔹 Phân tích logic xử lý 🔹 Nhập dữ liệu an toàn với Scanner 🔹 Áp dụng điều kiện & ép kiểu số thực 🔹 Code rõ ràng, dễ mở rộng
draft: false
category: Java
---

## 🎯 Mục tiêu bài viết

Bài viết này trình bày cách xây dựng một chương trình Java để giải **phương trình bậc nhất dạng `ax + b = 0`**, bao gồm:

- Nhập dữ liệu từ bàn phím
- Kiểm tra và xử lý các trường hợp của phương trình
- Tính và hiển thị nghiệm

---

## 📌 Phương trình bậc nhất

Phương trình bậc nhất có dạng:

```
ax + b = 0
```

Trong đó:

- `a`, `b` là các số nguyên
- `x` là nghiệm cần tìm

### Các trường hợp của phương trình:

| Điều kiện      | Kết luận                   |
| -------------- | -------------------------- |
| a = 0 và b = 0 | Phương trình vô số nghiệm  |
| a = 0 và b ≠ 0 | Phương trình vô nghiệm     |
| a ≠ 0          | Phương trình có một nghiệm |

---

## 🛠️ Ý tưởng chương trình

Chương trình được xây dựng theo các bước:

1. Nhập hai số nguyên `a` và `b` từ bàn phím
2. Kiểm tra các điều kiện của phương trình
3. Tính nghiệm nếu tồn tại
4. In kết quả ra màn hình

---

## 💻 Code Java hoàn chỉnh

> 🔹 **Giữ nguyên code gốc, không chỉnh sửa**

```java
package vn.info.error404labs.bai11;

import java.util.Scanner;

public class Example {

	private Scanner sc = new Scanner(System.in);

	public static void main(String[] args) {

		Example ex = new Example();

		int a = ex.nhapInt("Nhap a: ");
		int b = ex.nhapInt("Nhap b: ");

		ex.tinhPhuongTrinhBacNhat(a, b);

	}

	public int nhapInt(String label) {
		while(true) {
			try {
				System.out.print(label);
				return Integer.valueOf(sc.nextLine());
			} catch (Exception e) {
				System.out.println("\nVui long nhap dung dinh dang!");
			}
		}
	}

	// ax + b = 0
	public void tinhPhuongTrinhBacNhat(int a, int b) {
		if(a == 0) {
			if(b == 0) {
				System.out.println("Phuong trinh vo so nghiem");
			} else {
				System.out.println("Phuong trinh vo nghiem");
			}
		} else {
			float x = -b / (a * 1.0f);
			System.out.printf("x = %.2f", x);
		}
	}

}
```

---

## 🔍 Phân tích chương trình

---

### 1️⃣ Sử dụng `Scanner` để nhập dữ liệu

```java
import java.util.Scanner;
```

Thư viện `Scanner` được dùng để đọc dữ liệu từ bàn phím thông qua `System.in`.

---

### 2️⃣ Hàm `main()` – điểm khởi đầu chương trình

```java
public static void main(String[] args)
```

- Chương trình Java luôn bắt đầu từ hàm `main`
- Tạo đối tượng `Example` để gọi các phương thức trong class

---

### 3️⃣ Nhập dữ liệu từ bàn phím

```java
int a = ex.nhapInt("Nhap a: ");
int b = ex.nhapInt("Nhap b: ");
```

Hai hệ số `a` và `b` được nhập thông qua hàm `nhapInt()`.

---

### 4️⃣ Hàm nhập số nguyên có kiểm tra lỗi

```java
public int nhapInt(String label)
```

Chức năng của hàm:

- Hiển thị nhãn nhập dữ liệu
- Kiểm tra định dạng dữ liệu nhập vào
- Yêu cầu nhập lại nếu xảy ra lỗi

Việc sử dụng `try - catch` giúp chương trình tránh bị dừng đột ngột khi nhập sai.

---

### 5️⃣ Giải phương trình bậc nhất

```java
public void tinhPhuongTrinhBacNhat(int a, int b)
```

Hàm này xử lý ba trường hợp:

- `a == 0 && b == 0` → vô số nghiệm
- `a == 0 && b != 0` → vô nghiệm
- `a != 0` → tính nghiệm theo công thức:

```
x = -b / a
```

Việc nhân `a * 1.0f` giúp ép kiểu sang số thực, tránh phép chia số nguyên.

---

### 6️⃣ Hiển thị kết quả

```java
System.out.printf("x = %.2f", x);
```

- Kết quả được hiển thị với **2 chữ số thập phân**
- Định dạng rõ ràng, dễ quan sát

---

## ▶️ Ví dụ minh họa

```
Nhap a: 2
Nhap b: -4
x = 2.00
```

---

## ✅ Tổng kết

- Chương trình xử lý đầy đủ các trường hợp của phương trình bậc nhất
- Có kiểm tra lỗi khi nhập dữ liệu
- Cấu trúc rõ ràng, dễ mở rộng
