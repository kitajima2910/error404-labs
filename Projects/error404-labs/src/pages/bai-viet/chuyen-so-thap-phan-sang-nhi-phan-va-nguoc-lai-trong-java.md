---
layout: '../../layouts/BlogPostLayout.astro'
title: 'Chuyển số thập phân sang nhị phân và ngược lại trong Java'
date: 2026-03-08
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/chuyen-so-thap-phan-sang-nhi-phan-va-nguoc-lai-trong-java.avif',
        alt: 'Chuyển số thập phân sang nhị phân và ngược lại trong Java',
    }
description: Hướng dẫn chuyển số nguyên từ hệ thập phân sang hệ nhị phân và ngược lại bằng Java. Bài viết giải thích thuật toán chia 2 lấy dư, cách lưu các bit vào mảng và cách tính lại giá trị thập phân từ số nhị phân. Phù hợp cho người mới học lập trình.
draft: false
category: Java
---

## 📖 Tài liệu

<div class="mb-3 flex gap-3">
  <a 
    href="/images/java/chuyen-so-thap-phan-sang-nhi-phan-va-nguoc-lai-trong-java.pdf" 
    target="_blank" 
    rel="noopener noreferrer"
    class="py-2 text-white">
    🔎 Mở tab mới xem tài liệu (PDF)
  </a>
</div>

---

Trong lập trình, đôi khi chúng ta cần chuyển đổi giữa **hệ thập phân (Decimal)** và **hệ nhị phân (Binary)**.

Ví dụ:

```
30 (hệ 10) = 11110 (hệ 2)
```

Trong bài viết này chúng ta sẽ thực hiện:

- Chuyển **hệ 10 → hệ 2**
- Chuyển **hệ 2 → hệ 10**

bằng Java.

---

# Ý tưởng thuật toán

## 1. Chuyển hệ 10 → hệ 2

Nguyên tắc:

```
Chia số cho 2 liên tục
Lấy phần dư mỗi lần chia
Đảo ngược các phần dư lại
```

Ví dụ chuyển số **30** sang hệ nhị phân:

```
30 / 2 = 15 dư 0
15 / 2 = 7  dư 1
7  / 2 = 3  dư 1
3  / 2 = 1  dư 1
1  / 2 = 0  dư 1
```

Ta thu được các số dư:

```
0 1 1 1 1
```

Đảo ngược lại:

```
11110
```

---

## 2. Chuyển hệ 2 → hệ 10

Công thức:

```
n = b0*2^0 + b1*2^1 + b2*2^2 + ...
```

Ví dụ:

```
11110 (2)

= 0×2^0
+ 1×2^1
+ 1×2^2
+ 1×2^3
+ 1×2^4
```

```
= 0 + 2 + 4 + 8 + 16
= 30
```

---

# Code Java

```java
package vn.info.error404labs.Bai7;

public class Example {

	public static void main(String[] args) {

		// Chuyển hệ 10 -> hệ 2
		// 30(10) -> 11110

		int n = 30;

		int[] save01 = new int[1000];
		int count = 0;

		while(n > 0) {
			int r = n % 2;
			save01[count++] = r;

			n /= 2;
		}

		System.out.print("Hệ 2: ");
		for (int i = count - 1; i >= 0; i--) {
			System.out.print(save01[i]);
		}

		// Chuyển hệ 2 -> hệ 10
		// 11110(2) -> 30

		int sum = 0;
		for(int i = 0; i < count; i++) {
			sum += save01[i] * (int)Math.pow(2, i);
		}

		System.out.println("\nHệ 10: " + sum);

	}

}
```

---

# Giải thích code

### Khai báo biến

```java
int n = 30;
```

Số cần chuyển sang hệ nhị phân.

---

### Mảng lưu các bit

```java
int[] save01 = new int[1000];
```

Mảng này dùng để lưu các **bit 0 và 1** khi chia cho 2.

---

### Chia 2 liên tục

```java
while(n > 0) {
	int r = n % 2;
	save01[count++] = r;
	n /= 2;
}
```

Ý nghĩa:

```
n % 2  → lấy phần dư (0 hoặc 1)
lưu vào mảng
n /= 2 → tiếp tục chia
```

---

### In số nhị phân

```java
for (int i = count - 1; i >= 0; i--) {
	System.out.print(save01[i]);
}
```

Vì các phần dư được lưu **ngược thứ tự**, nên ta cần **in từ cuối mảng về đầu**.

---

### Chuyển lại sang hệ 10

```java
for(int i = 0; i < count; i++) {
	sum += save01[i] * (int)Math.pow(2, i);
}
```

Áp dụng công thức:

```
bit × 2^vị_trí
```

Sau đó cộng tất cả lại để ra số thập phân ban đầu.

---

# Kết quả chương trình

```
Hệ 2: 11110
Hệ 10: 30
```

---

# Kết luận

Qua bài này chúng ta học được:

- Cách chuyển **hệ thập phân sang hệ nhị phân**
- Cách chuyển **hệ nhị phân sang hệ thập phân**
- Hiểu rõ hơn về **vòng lặp và mảng trong Java**

Đây là một bài tập rất tốt cho người mới bắt đầu học lập trình.
