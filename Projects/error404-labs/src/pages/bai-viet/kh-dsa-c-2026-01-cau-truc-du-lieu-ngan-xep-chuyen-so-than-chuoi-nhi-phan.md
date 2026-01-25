---
layout: '../../layouts/BlogPostLayout.astro'
title: '🧱 Cấu trúc dữ liệu ngăn xếp - Chuyển số thành chuỗi nhị phân'
date: 2026-01-27
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_dsa_c_2026_01/kh-dsa-c-2026-01-cau-truc-du-lieu-ngan-xep-chuyen-so-than-chuoi-nhi-phan.avif',
        alt: '🧱 Cấu trúc dữ liệu ngăn xếp - Chuyển số thành chuỗi nhị phân',
    }
description: 🔢 Từ phép chia dư quen thuộc đến tư duy dùng Stack một cách tự nhiên. Bài viết dẫn dắt từng bước bằng phân tích tay, comment và debug, giúp bạn hiểu vì sao cần Stack, chứ không chỉ biết cách dùng. Phù hợp cho người mới học DSA, người dạy học và những ai muốn học lập trình bằng tư duy, không học vẹt.
draft: false
category: KH_DSA_C_2026_01
---

## 🎯 Mục tiêu của bài viết

Bài này **không bắt đầu bằng Stack**.

Chúng ta sẽ:

- Phân tích **bằng tay, bằng suy nghĩ**
- Dùng **comment + debug** để nhìn rõ thuật toán
- Từ đó thấy **Stack xuất hiện là điều tất yếu**
- Cuối cùng mới viết code hoàn chỉnh

👉 Mục tiêu là **hiểu vì sao dùng Stack**, không phải “biết dùng”.

---

## 🧠 Bắt đầu từ bài toán rất quen thuộc

Cho một số nguyên dương `n`.

Hãy chuyển `n` sang **dạng nhị phân**.

Ví dụ:

- 13 → 1101
- 3 → 11

Ai cũng biết quy tắc:

- Chia liên tục cho 2
- Lấy phần dư (`n % 2`)

Nhưng **đừng vội viết vòng lặp**.

Hãy làm như một người đang **nghĩ bằng tay**.

---

## ✍️ Phân tích bằng code mô phỏng (comment + debug)

```c
/*
    int n = 13;

    int r;

    r = n % 2;
    n = n / 2;
    printf("%d - %d\n", n, r);

    r = n % 2;
    n = n / 2;
    printf("%d - %d\n", n, r);

    r = n % 2;
    n = n / 2;
    printf("%d - %d\n", n, r);

    r = n % 2;
    n = n / 2;
    printf("%d - %d\n", n, r);
*/
```

Đoạn code này **không để chạy thật**.

Nó dùng để:

- Nhìn rõ từng bước
- Hiểu thuật toán đang làm gì
- Thấy vấn đề trước khi giải

---

## 🧠 Chạy từng bước trong đầu

| Lần | n trước | r = n % 2 | n sau |
| --- | ------- | --------- | ----- |
| 1   | 13      | 1         | 6     |
| 2   | 6       | 0         | 3     |
| 3   | 3       | 1         | 1     |
| 4   | 1       | 1         | 0     |

Các bit ta thu được theo thứ tự:

```
1 0 1 1
```

Nhưng khi viết nhị phân, ta cần:

```
1101
```

---

## ❗ Vấn đề xuất hiện

> Các bit sinh ra **theo thứ tự ngược với thứ tự cần in**.

Đây là **điểm mấu chốt** của cả bài.

- Thuật toán chia dư **không sai**
- Nhưng cách sinh dữ liệu **bị ngược chiều**

👉 Nếu không nhìn thấy điều này, bạn sẽ:

- Viết code chạy được
- Nhưng **không hiểu vì sao phải dùng Stack**

---

## 🤔 Ta cần gì để giải quyết vấn đề này?

Ta cần một cơ chế:

- Ghi lại các bit theo thứ tự sinh ra
- Sau đó lấy ra **ngược lại**

Nói cách khác:

- Vào trước → ra sau
- Vào sau → ra trước

👉 Đây chính là **LIFO**

---

## 🧱 Stack xuất hiện một cách tự nhiên

**Stack (ngăn xếp)** có đặc điểm:

- Last In – First Out
- Phần tử vào sau sẽ được lấy ra trước

👉 Stack **nó giải quyết đúng vấn đề đang gặp**.

---

## 🧱 Cài đặt Stack bằng mảng trong C

### Khai báo Stack

```c
#define MAX 1000

typedef struct {
    int data[MAX];
    int top;
} Stack;
```

- `data`: nơi lưu các bit nhị phân
- `top`: chỉ số phần tử trên cùng

---

### Khởi tạo Stack

```c
void initStack(Stack *s) {
    s->top = -1;
}
```

📌 `top = -1` → stack rỗng

---

### Kiểm tra trạng thái Stack

```c
int isEmpty(Stack *s) {
    return s->top == -1;
}

int isFull(Stack *s) {
    return s->top == MAX - 1;
}
```

📌 Mảng bắt đầu từ chỉ số 0
→ phần tử cuối là `MAX - 1`

---

### Đưa phần tử vào Stack (push)

```c
void push(Stack *s, int r) {
    if(!isFull(s)) {
        s->data[++s->top] = r;
    }
}
```

---

### Lấy phần tử ra khỏi Stack (pop)

```c
int pop(Stack *s) {
    if(!isEmpty(s)) {
        return s->data[s->top--];
    }
    return -1;
}
```

---

## 🔄 Áp dụng Stack để chuyển sang nhị phân

```c
void stackBin(Stack *s, int n) {
    if(n == 0) {
        printf("0");
        return;
    }

    while(n) {
        int r = n % 2;
        // mỗi lần lặp sinh ra 1 bit nhị phân
        push(s, r);
        n = n / 2;
    }

    // lấy ra theo thứ tự ngược lại
    while(!isEmpty(s)) {
        printf("%d", pop(s));
    }
}
```

---

## 🧠 Ghép lại toàn bộ tư duy

1. Phân tích bằng tay → thấy bit sinh ra bị ngược
2. Nhận ra vấn đề → cần đảo thứ tự
3. Tìm cấu trúc phù hợp → Stack
4. Code chỉ là bước cuối cùng

👉 Đây mới là **DSA đúng nghĩa**.

---

## 🧪 Hàm main

```c
int main() {
    Stack s;
    initStack(&s);

    int n;
    scanf("%d", &n);

    stackBin(&s, n);
    return 0;
}
```

---

## ⚠️ Những điều dễ sai khi mới học

- Truyền nhầm con trỏ (`&s` khi `s` đã là con trỏ)
- Không hiểu `top` là **chỉ số**, không phải số lượng
- Viết code trước khi hiểu thuật toán

---

## 🧠 Tổng kết

- Stack không phải thứ để học thuộc
- Nó xuất hiện khi **ta thật sự cần đảo thứ tự**
- Comment và debug **không phải thừa**
- Chúng giúp ta **nhìn thấy tư duy của chính mình**

> Học cấu trúc dữ liệu không phải để nhớ hàm,

> mà để biết **khi nào nên dùng nó**.
