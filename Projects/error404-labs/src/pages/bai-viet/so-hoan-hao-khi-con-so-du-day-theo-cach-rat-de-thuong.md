---
layout: '../../layouts/BlogPostLayout.astro'
title: 'Số Hoàn Hảo – Khi Con Số “Đủ Đầy” Theo Cách Rất Dễ Thương 😄'
date: 2026-03-01
author: Phạm Xuân Hoài
image:
    {
        src: '/images/c/so-hoan-hao-khi-con-so-du-day-theo-cach-rat-de-thuong.avif',
        alt: 'Số Hoàn Hảo – Khi Con Số “Đủ Đầy” Theo Cách Rất Dễ Thương 😄',
    }
description: Một đoạn code nhỏ kiểm tra số hoàn hảo theo cách tối ưu O(√n). Thay vì duyệt hết từ 1 đến n, ta tận dụng tính chất ước số theo cặp để giảm số vòng lặp đáng kể. Code gọn gàng, dễ hiểu, tránh cộng trùng và xử lý luôn các trường hợp đặc biệt. Một ví dụ đơn giản nhưng đủ để thấy - hiểu bản chất toán học sẽ giúp thuật toán “xịn” hơn rất nhiều 😄
draft: false
category: C
---

## 📖 Tài liệu

<div class="mb-3 flex gap-3">
  <a 
    href="/images/c/so-hoan-hao-khi-con-so-du-day-theo-cach-rat-de-thuong.pdf" 
    target="_blank" 
    rel="noopener noreferrer"
    class="py-2 text-white">
    🔎 Mở tab mới xem tài liệu
  </a>
</div>

<iframe
  src="/images/c/so-hoan-hao-khi-con-so-du-day-theo-cach-rat-de-thuong.pdf"
  width="100%"
  height="1000px"
  style="border: none;"
  loading="lazy"
  title="Tài liệu số hoàn hảo"
  aria-label="Tài liệu số hoàn hảo"
></iframe>

---

## 💻 Tham khảo code

<details>
    <summary>Xem code</summary>

```c
#include <stdio.h>

// So hoan hao:
// 6 = 1 + 2 + 3 (cac uoc so cong lai bang chinh no)

int kiemTraSoHoanHao(int n) {

	if(n <= 1) return 0;

    int tong = 1;

	for(int i = 2; i <= n / i ; i++) {
		if(n % i == 0) {
			tong += i; // uoc 1

			int doi = n / i; // uoc 2

			if(i != doi) {
				tong += doi;
			}
		}
	}

	return tong == n;
}

int main() {

	int n = 8128;

	if(kiemTraSoHoanHao(n)) {
		printf("%d la so hoan hao", n);
	} else {
		printf("%d khong la so hoan hao", n);
	}

	return 0;
}
```

</details>
