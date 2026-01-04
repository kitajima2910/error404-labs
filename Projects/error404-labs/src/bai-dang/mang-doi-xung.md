---
title: Mảng Đối Xứng – Hướng Dẫn Cơ Bản Lập Trình C Cho Người Mới
description: Tìm hiểu khái niệm mảng đối xứng và cách cài đặt chương trình kiểm tra mảng đối xứng trong C, giải thích từng dòng code cho người mới bắt đầu.
date: 2026-01-04
categories:
  - lap-trinh-c
  - thuat-toan-co-ban
published: true
---

## Table of Contents

## 🧩 Mảng Đối Xứng trong C

_Giải thích từng bước cho người mới bắt đầu_

---

### 1. Mảng đối xứng là gì?

**Mảng đối xứng** là mảng mà khi đọc:

- từ **trái sang phải**
- hoặc từ **phải sang trái**

đều cho cùng một dãy giá trị.

#### Ví dụ mảng đối xứng

```
1 4 4 1
1 4 5 4 1
```

#### Ví dụ mảng không đối xứng

```
1 2 3
1 5 5 5 3
```

---

### 2. Mục tiêu của bài viết

Bài viết này dành cho:

- Người **chưa học lập trình C**
- Người mới làm quen với **mảng**
- Học sinh, sinh viên học **thuật toán cơ bản**

Sau khi đọc xong, bạn sẽ:

- Hiểu mảng là gì
- Biết cách nhập mảng trong C
- Biết cách kiểm tra mảng đối xứng
- Hiểu rõ tư duy so sánh phần tử
- Tự viết được chương trình hoàn chỉnh

---

### 3. Ý tưởng giải bài toán

Giả sử ta có mảng:

```
n = 4
a = {1, 4, 4, 1}
```

Ta sẽ so sánh:

- Phần tử đầu với phần tử cuối
- Phần tử thứ hai với phần tử áp chót

| Chỉ số | So sánh |
| ------ | ------- |
| a[0]   | a[3]    |
| a[1]   | a[2]    |

👉 **Chỉ cần kiểm tra n / 2 phần tử đầu tiên**
Vì nếu một bên giống nhau, bên còn lại cũng giống theo.

---

### 4. Tổng quan chương trình

Chương trình gồm 3 phần chính:

1. `main()` – điều khiển chương trình
2. `nhapMang()` – nhập dữ liệu cho mảng
3. `kiemTraDoiXung()` – kiểm tra mảng đối xứng

---

### 5. Phân tích từng phần code

---

#### 5.1. Thư viện và khai báo hàm

```c
#include <stdio.h>

void nhapMang(int n, int a[n]);
int kiemTraDoiXung(int n, int a[n]);
```

- `stdio.h`: dùng để nhập (`scanf`) và xuất (`printf`)
- Khai báo hàm trước `main()` để trình biên dịch biết hàm tồn tại

---

### 6. Hàm `main()` – Chương trình chính

```c
int main() {
	int T;
	scanf("%d", &T);
```

- `T`: số bộ test
- Cho phép kiểm tra nhiều mảng trong một lần chạy

---

```c
	while(T--) {
```

- Vòng lặp chạy `T` lần
- Mỗi lần xử lý một mảng

---

```c
		int n;
		scanf("%d", &n);
```

- `n`: số phần tử của mảng

---

```c
		int a[n];
		nhapMang(n, a);
```

- Khai báo mảng `a` gồm `n` phần tử
- Gọi hàm nhập mảng

---

```c
		int result = kiemTraDoiXung(n, a);
```

- Gọi hàm kiểm tra mảng đối xứng
- Nhận kết quả:
  - `1`: đối xứng
  - `0`: không đối xứng

---

```c
		if(result == 1) {
			printf("YES");
		} else {
			printf("NO");
		}
		printf("\n");
```

- In kết quả theo yêu cầu đề bài

---

```c
	return 0;
}
```

- Kết thúc chương trình

---

### 7. Hàm nhập mảng `nhapMang`

```c
void nhapMang(int n, int a[n]) {
	for(int i = 0; i < n; i++) {
		scanf("%d", &a[i]);
	}
}
```

#### Giải thích:

- Vòng lặp `for` nhập từng phần tử
- `a[i]` là phần tử thứ `i` trong mảng

Ví dụ nhập:

```
1 4 4 1
```

---

### 8. Hàm kiểm tra mảng đối xứng (quan trọng nhất)

```c
int kiemTraDoiXung(int n, int a[n]) {
	for(int i = 0; i < n/2; i++) {
		if(!(a[i] == a[n - (i +  1)])) {
			return 0;
		}
	}
	return 1;
}
```

---

#### 8.1. Vòng lặp kiểm tra

```c
for(int i = 0; i < n/2; i++)
```

- Chỉ chạy đến `n / 2`
- Giúp tiết kiệm thời gian
- Phần tử giữa (n lẻ) không cần kiểm tra

---

#### 8.2. Công thức so sánh đối xứng

```c
a[i] == a[n - (i + 1)]
```

| i   | So sánh        |
| --- | -------------- |
| 0   | a[0] ↔ a[n-1] |
| 1   | a[1] ↔ a[n-2] |

👉 Đây là công thức **đúng và an toàn**
👉 Tránh dùng `++i` trong biểu thức vì sẽ **bị skip phần tử**

---

#### 8.3. Kết luận sớm

```c
return 0;
```

- Chỉ cần 1 cặp khác nhau
- Kết luận ngay: **không đối xứng**

---

#### 8.4. Hoàn thành kiểm tra

```c
return 1;
```

- Tất cả các cặp đều giống nhau
- Mảng **đối xứng**

---

### 9. Ví dụ minh họa

#### Ví dụ 1

```
n = 4
a = {1, 4, 4, 1}
```

→ YES

---

#### Ví dụ 2

```
n = 5
a = {1, 5, 5, 5, 3}
```

→ NO

---

### 10. Độ phức tạp thuật toán

- ⏱ Thời gian: **O(n)**
- 💾 Bộ nhớ: **O(1)**
- 🚀 Thuật toán tối ưu cho bài toán này

---

### 11. Kết luận

- Mảng đối xứng là bài toán **rất quan trọng cho người mới**
- Giúp rèn tư duy:
  - mảng
  - vòng lặp
  - điều kiện
  - tách hàm
