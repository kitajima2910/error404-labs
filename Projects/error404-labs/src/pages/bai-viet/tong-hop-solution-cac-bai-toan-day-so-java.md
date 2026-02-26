---
layout: '../../layouts/BlogPostLayout.astro'
title: '✨ Tổng hợp Solution: Các Bài Toán Dãy Số (Java) ✨'
date: 2026-02-27
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/tong-hop-solution-cac-bai-toan-day-so-java.avif',
        alt: '✨ Tổng hợp Solution: Các Bài Toán Dãy Số (Java) ✨',
    }
description: Bạn có biết toán học chính là siêu năng lực bí mật của mọi Coder không? ✨ Cùng Error404-Labs và bé mèo kính cận triệu hồi câu thần chú Gauss huyền thoại, biến những bài toán dãy số rắc rối trong Java trở nên dễ như ăn kẹo. Bấm vào ngay để nhận siêu năng lực toán học cực cute nào! 👇💖
draft: false
category: Java
---

Để tối ưu hóa việc tính toán các dãy số trong Java, chúng ta sẽ áp dụng hai phương pháp: **Vòng lặp (Loop)** và **Công thức Toán học**.

> **💡 Công thức toán học dùng chung (Cấp số cộng):**
>
> 1. **Số lượng số hạng ($m$):** >  
>    $$m = (SoCuoi - SoDau) / KhoangCach + 1$$
> 2. **Tổng dãy số ($S$):** >  
>    $$S = (SoDau + SoCuoi) \times m / 2$$

---

### 🌸 In các số lẻ từ 1 đến 99 và tính tổng của chúng

**Yêu cầu:** Xuất ra màn hình các số lẻ từ 1 đến 99 và tính tổng của chúng.

- **Cách 1 - Vòng lặp:**

```java
for (int i = 1; i <= 99; i += 2) {
    System.out.print(i + " ");
}

int sum = 0;
for (int i = 1; i <= 99; i += 2) {
    sum += i;
}

```

- **Cách 2 - Toán học (Thế số):**
- $SoDau = 1$
- $SoCuoi = 99$
- $KhoangCach = 2$
- $m = (99 - 1) / 2 + 1 = 50$ (số hạng)
- **Áp dụng:** $S = (1 + 99) \times 50 / 2 = 2500$

---

### 🍀 Tổng các bội số của 5 (từ 1 đến 100)

**Yêu cầu:** Tính tổng dãy số 5, 10, 15, ..., 100.

- **Cách 1 - Vòng lặp:**

```java
int sum = 0;
for (int i = 5; i <= 100; i += 5) {
    sum += i;
}

```

- **Cách 2 - Toán học (Thế số):**
- $SoDau = 5$
- $SoCuoi = 100$
- $KhoangCach = 5$
- $m = (100 - 5) / 5 + 1 = 20$
- **Áp dụng:** $S = (5 + 100) \times 20 / 2 = 1050$

---

### 📘 Tổng 1 + 2 + 3 + … + n

**Yêu cầu:** Tính tổng các số nguyên liên tiếp từ 1 đến $n$.

- **Cách 1 - Vòng lặp:**

```java
long sum = 0;
for (int i = 1; i <= n; i++) sum += i;

```

- **Cách 2 - Toán học (Thế số):**
- $SoDau = 1$
- $SoCuoi = n$
- $KhoangCach = 1$
- $m = (n - 1) / 1 + 1 = n$
- **Áp dụng:** $S = (1 + n) \times n / 2$

---

### 🍎 Tổng chẵn/lẻ cùng tính chất với n

**Yêu cầu:** $n$ lẻ tính tổng lẻ ($1+3+...+n$), $n$ chẵn tính tổng chẵn ($2+4+...+n$).

- **Cách 1 - Vòng lặp:**

```java
int soDau = (n % 2 != 0) ? 1 : 2;
long sum = 0;
for (int i = soDau; i <= n; i += 2) {
    sum += i;
}

```

- **Cách 2 - Toán học (Thế số):**
- **Nếu $n = 10$ (Chẵn):**
- $SoDau = 2$
- $SoCuoi = 10$
- $KhoangCach = 2$
- $m = (10 - 2) / 2 + 1 = 5$
- **Áp dụng:** $S = (2 + 10) \times 5 / 2 = 30$

<br/>

- **Nếu $n = 11$ (Lẻ):**
- $SoDau = 1$
- $SoCuoi = 11$
- $KhoangCach = 2$
- $m = (11 - 1) / 2 + 1 = 6$
- **Áp dụng:** $S = (1 + 11) \times 6 / 2 = 36$
