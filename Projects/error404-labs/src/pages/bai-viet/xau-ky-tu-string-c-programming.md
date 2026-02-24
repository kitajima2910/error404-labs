---
layout: '../../layouts/BlogPostLayout.astro'
title: '🧵 Xâu Ký Tự (String) - C Programming'
date: 2026-02-24
author: Phạm Xuân Hoài
image:
    {
        src: '/images/c/xau-ky-tu-string-c-programming.avif',
        alt: '🧵 Xâu Ký Tự (String) - C Programming',
    }
description: Chúng ta sẽ cùng nhau giải mã những lỗi "ký tự lạ" đáng ghét và học cách điều khiển bộ nhớ tinh tế như một nghệ sĩ. Sẵn sàng để "String" len lỏi vào từng dòng code của bạn chưa? 🧵
draft: false
category: C
---

## 1. Bản chất: "Đoàn tàu và Toa rỗng" 🚂

Trong C, xâu là một mảng các ký tự (`char`) và luôn kết thúc bằng ký tự đặc biệt **`\0`** (Null terminator).

* **Khai báo:** `char name[10];` (Chứa tối đa 9 ký tự + 1 ký tự `\0`).
* **Khởi tạo:**
```c
char s1[] = "Hello";       // Tự động thêm \0
char s2[6] = {'H', 'i', '\0'}; // Khai báo thủ công

```



---

## 2. Nhập/Xuất: Cảnh giác với Khoảng trắng ⚠️

* **`scanf("%s", s);`**: Chỉ lấy được 1 từ (dừng khi gặp dấu cách).
* **`fgets(s, sizeof(s), stdin);`**: Lấy cả dòng (có dấu cách). **Ưu tiên dùng cách này.**

```c
// Cách xóa dấu Enter thừa sau khi dùng fgets
s[strcspn(s, "\n")] = '\0';

```

---

## 3. "Bộ công cụ" xử lý xâu (`<string.h>`) ✨

| Hàm | Chức năng | Lưu ý |
| --- | --- | --- |
| **`strlen(s)`** | Trả về độ dài xâu | Không đếm ký tự `\0` |
| **`strcmp(s1, s2)`** | So sánh 2 xâu | Trả về `0` nếu giống nhau hoàn toàn |
| **`strcpy(dest, src)`** | Copy xâu `src` sang `dest` | `dest` phải đủ rộng |
| **`strcat(dest, src)`** | Nối xâu `src` vào cuối `dest` |  |

---

## 4. Code Thực Hành 🛠️: Đếm & Biến đổi

Chương trình nhập một xâu, đếm số ký tự hoa và chuyển toàn bộ thành chữ thường.

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h> // Thư viện để dùng tolower, isupper

int main() {
    char text[100];
    int upper_count = 0;

    printf("Input: ");
    fgets(text, sizeof(text), stdin);
    text[strcspn(text, "\n")] = '\0';

    for (int i = 0; i < strlen(text); i++) {
        // Kiểm tra chữ hoa
        if (isupper(text[i])) {
            upper_count++;
        }
        // Chuyển thành chữ thường
        text[i] = tolower(text[i]);
    }

    printf("Số chữ hoa: %d\n", upper_count);
    printf("Xâu sau biến đổi: %s\n", text);

    return 0;
}

```

---

## 5. Thử thách Coding 🏆

Giải quyết để nắm vững logic:

1. **Palindrome:** Nhập xâu "LEVEL", kiểm tra xem đọc ngược lại có giống đọc xuôi không (kiểm tra xâu đối xứng).
<details>
    <summary>Xem code</summary>

```c
#include <stdio.h>
#include <string.h>

int main() {
	
	char text[100];
	
	printf("\nNhap text: ");
	fgets(text, sizeof(text), stdin);
	text[strcspn(text, "\n")] = '\0';
	
	char textDaoNguoc[100];
	int j = 0;
	
	int len = strlen(text);
	
	for(int i = len - 1; i >= 0; i--) {
		// printf("%c", text[i]);
		textDaoNguoc[j++] = text[i];
	}
	
	textDaoNguoc[j] = '\0';
	
	printf("\ntextDaoNguoc: %s - %d", textDaoNguoc, strlen(textDaoNguoc));
	if(!strcmp(text, textDaoNguoc)){
		printf("\nDay la chuoi doi xung");
	} else {
		printf("\nDay la chuoi khong doi xung");
	}
	
	return 0;
}
```
</details>

<br/>

2. **Mật mã Caesar:** Nhập xâu, thay thế mỗi ký tự bằng ký tự đứng sau nó trong bảng chữ cái.

- Ví dụ: 'A' -> 'B', 'a' -> 'b'
- Chú ý: 
   - 'Z' -> 'A', 'z' -> 'a'
   - Nếu gặp ký tự không phải chữ cái, giữ nguyên

<details>
    <summary>Xem code</summary>

```c
#include <stdio.h>
#include <string.h>

int main() {
	
	char text[100];
	
	printf("\nNhap text: ");
	fgets(text, sizeof(text), stdin);
	text[strcspn(text, "\n")] = '\0';
	
	int len = strlen(text);
	
	for(int i = 0; i < len; i++) {
		
		if(text[i] == 'Z') {
			printf("A");
		} else if (text[i] == 'z') {
			printf("a");
		} else if((text[i] >= 'a' && text[i] < 'z') || (text[i] >= 'A' && text[i] < 'Z')) {
			printf("%c", text[i] + 1);
		} else {
			printf("%c", text[i]);
		}
	}
	
	return 0;
}
```
</details>

<br/>

3. **Xóa khoảng trắng:** Viết chương trình loại bỏ toàn bộ khoảng trắng trong một câu.
<details>
    <summary>Xem code</summary>

```c
#include <stdio.h>
#include <string.h>

int main() {
	
	char text[100];
	char textLoaiSpace[100];
	int j = 0;
	
	printf("\nNhap text: ");
	fgets(text, sizeof(text), stdin);
	text[strcspn(text, "\n")] = '\0';
	
	int len = strlen(text);
	
	for(int i = 0; i < len; i++) {
		
		if(text[i] != ' ') {
			// printf("%c", text[i]);
			textLoaiSpace[j++] = text[i];
		}
	}
	
	textLoaiSpace[j] = '\0';
	
	printf("\ntextLoaiSpace: %s", textLoaiSpace);
	
	return 0;
}
```
</details>

