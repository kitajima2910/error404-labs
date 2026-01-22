---
layout: '../../layouts/BlogPostLayout.astro'
title: '🧮 Tính tổng các số chẵn và số lẻ nhỏ hơn n'
date: 2026-01-24
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/tinh-tong-cac-so-chan-va-so-le-nho-hon-n-java-cho-nguoi-moi.avif',
        alt: '🧮 Tính tổng các số chẵn và số lẻ nhỏ hơn n',
    }
description: 📌 Phù hợp cho người mới bắt đầu học lập trình, code rõ ràng – dễ hiểu – dễ áp dụng. 📘 Hướng dẫn chi tiết cách viết chương trình Java tính tổng số chẵn và số lẻ nhỏ hơn n. 👶 Dành cho người mới học, có kiểm tra lỗi nhập, giải thích từng bước và ví dụ minh họa rõ ràng.
draft: false
category: Java
---

## 🎯 Mục tiêu bài học

Sau khi học xong bài này, bạn sẽ:

- Biết cách **nhập dữ liệu từ bàn phím**
- Biết cách **kiểm tra dữ liệu hợp lệ**
- Biết cách sử dụng **vòng lặp for**
- Phân biệt và xử lý **số chẵn – số lẻ**
- Viết chương trình Java **đúng chuẩn và an toàn**

---

## 📌 Đề bài

> Viết chương trình tính:

- Tổng các **số chẵn < n**
- Tổng các **số lẻ < n**

👉 Với `n` được **nhập từ bàn phím**, yêu cầu `n > 0`.

---

## 🧠 Phân tích bài toán

Ví dụ:
Nếu nhập `n = 10`

- Các số **< 10** là: `1 2 3 4 5 6 7 8 9`
- Số chẵn: `2 4 6 8` → tổng = `20`
- Số lẻ: `1 3 5 7 9` → tổng = `25`

👉 Ta cần:

1. Nhập `n`
2. Kiểm tra `n` phải **lớn hơn 0**
3. Duyệt các số từ `1` đến `n - 1`
4. Phân loại **chẵn / lẻ**
5. Cộng dồn và in kết quả

---

## 🏗️ Cấu trúc chương trình

Chương trình gồm **3 phần chính**:

1. `main()` – chương trình chính
2. `nhapInt()` – nhập số nguyên an toàn
3. `tinhTong()` – tính tổng chẵn & lẻ

---

## 🧾 Code hoàn chỉnh

```java
package vn.info.error404labs.bai10;

import java.util.Scanner;

public class Example {

    // Scanner dùng để nhập dữ liệu từ bàn phím
	private Scanner sc = new Scanner(System.in);

	public static void main(String[] args) {

		// Tạo đối tượng Example
		Example ex = new Example();

		// Nhập số n từ bàn phím
		int n = ex.nhapInt("Nhap n: ");

		// Gọi hàm tính tổng
		ex.tinhTong(n);

	}

	// Hàm nhập số nguyên, đảm bảo n > 0
	public int nhapInt(String label) {
		while(true) {
			try {
				System.out.print(label);
				int n = Integer.valueOf(sc.nextLine());

				// Kiểm tra n phải lớn hơn 0
				if(n <= 0) {
					System.out.println("\nVui long nhap so lon hon 0!");
					continue;
				}

				return n;

			} catch (Exception e) {
				// Bắt lỗi nhập sai định dạng
				System.out.println("\nVui long nhap dung dinh dang!");
			}
		}
	}

	// Hàm tính tổng số chẵn và số lẻ nhỏ hơn n
	public void tinhTong(int n) {

		int tongChan = 0; // Tổng số chẵn
		int tongLe = 0;   // Tổng số lẻ

		// Duyệt các số từ 1 đến n - 1
		for(int i = 1; i < n; i++) {
			if(i % 2 == 0) {
				// Nếu i là số chẵn
				tongChan += i;
			} else {
				// Nếu i là số lẻ
				tongLe += i;
			}
		}

		// In kết quả
		System.out.println("\nTong cac so chan < n: " + tongChan);
		System.out.println("Tong cac so le < n: " + tongLe);
	}

}
```

---

## 🔍 Giải thích chi tiết từng phần

### 1️⃣ Nhập dữ liệu an toàn với `try-catch`

```java
try {
    int n = Integer.valueOf(sc.nextLine());
} catch (Exception e) {
    System.out.println("Vui long nhap dung dinh dang!");
}
```

👉 Tránh chương trình **bị crash** khi người dùng nhập chữ.

---

### 2️⃣ Kiểm tra điều kiện `n > 0`

```java
if(n <= 0) {
    System.out.println("Vui long nhap so lon hon 0!");
    continue;
}
```

👉 Đảm bảo bài toán **đúng yêu cầu đề bài**.

---

### 3️⃣ Kiểm tra số chẵn – số lẻ

```java
if(i % 2 == 0)
```

| Điều kiện    | Ý nghĩa |
| ------------ | ------- |
| `i % 2 == 0` | Số chẵn |
| `i % 2 != 0` | Số lẻ   |

---

## 🧪 Ví dụ chạy chương trình

```
Nhap n: 10

Tong cac so chan < n: 20
Tong cac so le < n: 25
```

---

## ❌ Lỗi hay gặp

- Quên kiểm tra `n > 0`
- Duyệt tới `i <= n` (sai đề)
- Không xử lý nhập sai định dạng
- Nhét hết code vào `main()`

👉 Code **đã tránh được toàn bộ lỗi trên**
