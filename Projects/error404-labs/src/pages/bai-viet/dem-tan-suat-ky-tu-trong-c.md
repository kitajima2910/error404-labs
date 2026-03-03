---
layout: '../../layouts/BlogPostLayout.astro'
title: '🐤 Hello ASCII! - Đếm tần số ký tự trong C 😄'
date: 2026-03-03
author: Phạm Xuân Hoài
image:
    {
        src: '/images/c/dem-tan-suat-ky-tu-trong-c.avif',
        alt: '🐤 Hello ASCII! - Đếm tần số ký tự trong C 😄',
    }
description: 🐣 Chương trình đếm ký tự siêu chăm chỉ. Đây là một chương trình C nhỏ xinh dùng để ✨ Nhập một chuỗi ký tự từ bàn phím ✨ Đếm xem mỗi ký tự xuất hiện bao nhiêu lần ✨ In ra bảng thống kê tần số của từng ký tự
draft: false
category: C
---

## 📖 Tài liệu

<div class="mb-3 flex gap-3">
  <a 
    href="/images/c/dem-tan-suat-ky-tu-trong-c.pdf" 
    target="_blank" 
    rel="noopener noreferrer"
    class="py-2 text-white">
    🔎 Mở tab mới xem tài liệu
  </a>
</div>

<iframe
  src="/images/c/dem-tan-suat-ky-tu-trong-c.pdf"
  width="100%"
  height="1000px"
  style="border: none;"
  loading="lazy"
  title="Tài liệu đếm tần số ký tự trong C"
  aria-label="Tài liệu đếm tần số ký tự trong C"
></iframe>

---

## 💻 Tham khảo code

<details>
    <summary>Xem code</summary>

```c
#include <stdio.h>
#include <string.h>

int main() {

	int ascii[256] = {0};
	char text[1000];

	printf("\nInput: ");
	fgets(text, sizeof(text), stdin);
	text[strcspn(text, "\n")] = '\0';

	printf("\nOutput: %s", text);

	for(int i = 0; text[i] != '\0'; i++) {
		// printf("\n%c - %d", text[i], text[i]);
		ascii[text[i]]++;
	}

	printf("\nResult: ");
	for(int i = 0; i < 256; i++) {
		if(ascii[i] > 0) {
			printf("\n%c - %d", i, ascii[i]);
		}
	}

	return 0;
}
```

</details>
