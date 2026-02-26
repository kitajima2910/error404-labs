---
layout: '../../layouts/BlogPostLayout.astro'
title: '✨ Tối Giản Phân Số Bằng UCLN – Java Cơ Bản Nhưng Rất Chắc'
date: 2026-02-28
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/toi-gian-phan-so-bang-ucln-java-co-ban-nhung-rat-chac.avif',
        alt: '✨ Tối Giản Phân Số Bằng UCLN – Java Cơ Bản Nhưng Rất Chắc',
    }
description: Rút gọn phân số bằng UCLN – một bài toán nhỏ nhưng đủ để luyện tư duy sạch và code gọn ✨ Nhập tử, nhập mẫu, chạy thuật toán Euclid một vòng là phân số “auto đẹp” ngay 😌 Java cơ bản thôi, nhưng làm chắc từng dòng thì nền tảng sẽ cực vững. Nhẹ nhàng mà chất.
draft: false
category: Java
---

Bài toán đơn giản:
Nhập **tử số (n)** và **mẫu số (m)** từ bàn phím → rút gọn phân số về dạng tối giản.

Cách làm gọn nhất:

Dùng **Ước Chung Lớn Nhất (UCLN)** theo thuật toán Euclid.

---

## 🔎 Nguyên tắc toán học

Muốn tối giản phân số:

<div class="math-scroll-wrapper">

$$
\frac{n}{m} = \frac{n / UCLN(n,m)}{m / UCLN(n,m)}
$$

</div>

Chỉ cần tìm UCLN của tử và mẫu, rồi chia cả hai cho giá trị đó.

---

## 🧠 Thuật toán tìm UCLN

Dùng thuật toán Euclid:

- Lặp khi `b ≠ 0`
- Lấy `r = a % b`
- Gán `a = b`
- Gán `b = r`
- Khi `b = 0` → `a` chính là UCLN

Thuật toán này chạy rất nhanh và tối ưu.

---

## 💻 Code hoàn chỉnh

```java
package vn.info.error404labs.bai10;

import java.util.Scanner;

public class Example {

	static Scanner sc = new Scanner(System.in);

	static int nhap(String label, int mau) {
		while(true) {
			try {
				System.out.print(label);
				int n = Integer.parseInt(sc.nextLine());

				if(n == 0 && mau == 1) {
					System.out.println("\nMẫu số không thể bằng 0. Vui lòng nhập lại!");
					continue;
				}

				return n;
			} catch (Exception e) {
				System.out.println("\nVui lòng nhập đúng định dạng!");
			}
		}
	}

	static int UCLN(int a, int b) {

		a = a < 0 ? a * -1 : a;
		b = b < 0 ? b * -1 : b;

		while(b != 0) {
			int r = a % b;
			a = b;
			b = r;
		}

		return a;

	}

	public static void main(String[] args) {
		int n = nhap("Nhập tử số: ", 0);
		int m = nhap("Nhập mẫu số: ", 1);

		int ucln = UCLN(n, m);

		n = n / ucln;
		m = m / ucln;

		if(m < 0) {
			n = -n;
			m = -m;
		}

		System.out.printf("\n%d \\ %d", n, m);
	}

}
```

---

## 📌 Ví dụ

| Nhập    | Kết quả |
| ------- | ------- |
| 6 / 8   | 3 \ 4   |
| -6 / 8  | -3 \ 4  |
| 6 / -8  | -3 \ 4  |
| -6 / -8 | 3 \ 4   |

---

## 🎯 Tổng kết

Bài này giúp luyện:

- Xử lý nhập dữ liệu an toàn
- Thuật toán Euclid
- Chuẩn hóa dấu của phân số
- Chia để tối giản đúng bản chất toán học

Cơ bản nhưng rất quan trọng.

Nắm chắc những bài như thế này thì nền tảng thuật toán sẽ vững.

#Java #LapTrinhCoBan #UCLN #ToiGianPhanSo
