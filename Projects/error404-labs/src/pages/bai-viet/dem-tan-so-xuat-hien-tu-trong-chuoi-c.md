---
layout: '../../layouts/BlogPostLayout.astro'
title: 'Bắt Từng Con Chữ 🐣 – Xây Dựng Bộ Đếm Từ Với C'
date: 2026-03-03
author: Phạm Xuân Hoài
image:
    {
        src: '/images/c/dem-tan-so-xuat-hien-tu-trong-chuoi-c.avif',
        alt: 'Bắt Từng Con Chữ 🐣 – Xây Dựng Bộ Đếm Từ Với C',
    }
description: Bài viết này hướng dẫn xây dựng một chương trình C đơn giản nhưng cực kỳ thực tế, nhập một chuỗi văn bản, tách từng từ và đếm số lần xuất hiện của mỗi từ. fgets() để nhập chuỗi an toàn, strtok() để tách từ theo dấu cách, strcmp() để so sánh chuỗi, strcpy() để lưu từng từ vào mảng 2 chiều, memset() để khởi tạo mảng tần suất
draft: false
category: C
---

## 📖 Tài liệu

<div class="mb-3 flex gap-3">
  <a 
    href="/images/c/dem-tan-so-xuat-hien-tu-trong-chuoi-c.pdf" 
    target="_blank" 
    rel="noopener noreferrer"
    class="py-2 text-white">
    🔎 Mở tab mới xem tài liệu
  </a>
</div>

<iframe
  src="/images/c/dem-tan-so-xuat-hien-tu-trong-chuoi-c.pdf"
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

	char text[1000];
	char words[1000][500];
	int wordCount = 0;

    printf("\nInput: ");
    fgets(text, sizeof(text), stdin);
    text[strcspn(text, "\n")] = '\0';

    printf("\nOutput: %s", text);

    char *token = strtok(text, " ");

    while(token != NULL) {
    	//printf("\n%s", token);
    	strcpy(words[wordCount++], token);
    	token = strtok(NULL, " ");
	}

	printf("\nWords array:\n");
    for(int i = 0; i < wordCount; i++) {
        printf("\nwords[%d] = %s", i, words[i]);
    }

    int freq[wordCount];
    //for(int i = 0; i < wordCount; i++) {
    //    freq[i] = 0;
    //}
    memset(freq, 0, sizeof(freq));

    for(int i = 0; i < wordCount; i++) {

    	if(freq[i] == -2910) {
    		continue;
		}

    	freq[i] = 1;

    	for(int j = i + 1; j < wordCount; j++) {
    		if(strcmp(words[i], words[j]) == 0) {
	    		freq[i]++;
	    		freq[j] = -2910;
			}
		}

	}

	printf("\n\nResult:\n");
	for(int i = 0; i < wordCount; i++) {
		if(freq[i] != -2910) {
            printf("%s - %d\n", words[i], freq[i]);
        }
	}

	return 0;
}
```

</details>
