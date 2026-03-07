---
layout: '../../layouts/BlogPostLayout.astro'
title: 'Phân Tích Thừa Số Nguyên Tố Trong Java'
date: 2026-03-07
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/phan-tich-thua-so-nguyen-to-trong-java.avif',
        alt: 'Phân Tích Thừa Số Nguyên Tố Trong Java',
    }
description: Hướng dẫn lập trình phân tích thừa số nguyên tố bằng Java từ cơ bản đến tối ưu. Bài viết giải thích ý tưởng thuật toán, cách triển khai code, và cách sử dụng vòng lặp để phân tích một số nguyên thành tích các số nguyên tố một cách hiệu quả.
draft: false
category: Java
---

**Phân tích thừa số nguyên tố** là việc biểu diễn một số nguyên dương thành tích của các **số nguyên tố**.

Ví dụ:

```
28 = 2 x 2 x 7
45 = 3 x 3 x 5
100 = 2 x 2 x 5 x 5
```

Các số **2, 3, 5, 7...** được gọi là **số nguyên tố**, vì chúng chỉ chia hết cho **1 và chính nó**.

---

# Ý tưởng

Giả sử ta có số:

```
n = 28
```

Ta thử chia `n` cho các số bắt đầu từ **2**.

- Nếu `n` chia hết cho `i` → in `i`
- Chia `n` cho `i`
- Tiếp tục chia cho `i` cho đến khi không chia được nữa
- Sau đó thử với số tiếp theo

Ví dụ:

```
28
→ chia cho 2 → 14
→ chia cho 2 → 7
→ 7 là số nguyên tố
```

Kết quả:

```
28 = 2 x 2 x 7
```

---

# Code Java

```java
package vn.info.error404labs.Bai6;

public class Example {

	public static void main(String[] args) {

		int n = 28;

		for (int i = 2; i <= n / i; i++) {
			while (n % i == 0) {
				System.out.print(i);
				n /= i;

				if (n > 1) {
					System.out.print(" x ");
				}
			}
		}

		if (n > 1) {
			System.out.print(n);
		}
	}

}
```

---

# Giải thích code

### 1. Vòng lặp `for`

```java
for (int i = 2; i <= n / i; i++)
```

Vòng lặp này thử các số từ **2 trở lên** để tìm thừa số của `n`.

Điều kiện:

```
i <= n / i
```

tương đương với:

```
i ≤ √n
```

Điều này giúp chương trình **không cần kiểm tra đến n**, làm thuật toán chạy nhanh hơn.

---

### 2. Vòng lặp `while`

```java
while (n % i == 0)
```

Nếu `n` chia hết cho `i` thì:

- in ra `i`
- chia `n` cho `i`

Điều này giúp xử lý trường hợp một thừa số xuất hiện nhiều lần.

Ví dụ:

```
100 = 2 x 2 x 5 x 5
```

---

### 3. Chia nhỏ giá trị của `n`

```java
n /= i;
```

Sau mỗi lần tìm được thừa số `i`, ta chia `n` cho `i` để tiếp tục phân tích phần còn lại.

---

### 4. In dấu nhân

```java
if (n > 1)
    System.out.print(" x ");
```

Điều kiện này giúp tránh in dấu `x` ở cuối kết quả.

---

### 5. Kiểm tra thừa số cuối cùng

```java
if (n > 1)
    System.out.print(n);
```

Sau khi vòng lặp kết thúc, nếu `n` vẫn lớn hơn **1**, thì `n` chính là **thừa số nguyên tố cuối cùng**.

---

# Ví dụ chạy

```
Input: 28
Output: 2 x 2 x 7
```

```
Input: 45
Output: 3 x 3 x 5
```

```
Input: 97
Output: 97
```

---

# Kết luận

Bài toán phân tích thừa số nguyên tố giúp luyện tập nhiều kiến thức lập trình cơ bản:

- vòng lặp `for`
- vòng lặp `while`
- phép chia dư `%`
- tư duy chia nhỏ bài toán
- tối ưu thuật toán bằng **√n**

Đây là một bài tập rất phổ biến trong các môn **Cấu trúc dữ liệu và giải thuật**.

---

✦ Error404 Labs
[https://error404-labs.info.vn](https://error404-labs.info.vn)
