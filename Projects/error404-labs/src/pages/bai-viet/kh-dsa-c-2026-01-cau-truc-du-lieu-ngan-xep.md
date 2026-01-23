---
layout: '../../layouts/BlogPostLayout.astro'
title: '📚 Cấu trúc dữ liệu ngăn xếp'
date: 2026-01-26
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_dsa_c_2026_01/kh-dsa-c-2026-01-cau-truc-du-lieu-ngan-xep.avif',
        alt: '📚 Cấu trúc dữ liệu ngăn xếp',
    }
description: 🧠 Stack là cấu trúc dữ liệu nền tảng trong lập trình. Bài viết hướng dẫn chi tiết cách dùng Stack trong C qua bài toán đảo chuỗi, kèm 2 mẫu code dễ hiểu và giải thích rõ cách dùng struct, con trỏ.
draft: false
category: KH_DSA_C_2026_01
---

## Đảo chuỗi bằng Stack – Level 1 & Level 2

---

## 🎯 Mục tiêu bài học

Sau bài này, bạn sẽ:

- Hiểu **Stack (ngăn xếp)** là gì
- Nắm vững nguyên lý **LIFO – Vào sau, ra trước**
- Biết cách **đảo chuỗi bằng Stack**
- Phân biệt:
    - Stack **Level 1 (biến global)**
    - Stack **Level 2 (dùng struct – chuẩn DSA)**

- Hiểu rõ khi nào dùng:
    - `s.top`
    - `s->top`
    - `Stack s`
    - `Stack *s`

---

## 1️⃣ Stack là gì?

**Stack (Ngăn xếp)** là cấu trúc dữ liệu hoạt động theo nguyên tắc:

> **Last In – First Out (LIFO)**
> Phần tử vào sau sẽ được lấy ra trước

📌 Ví dụ đời thực:

- Chồng đĩa
- Chồng sách
- Undo / Redo trong phần mềm

---

## 2️⃣ Bài toán: Đảo chuỗi bằng Stack

### 🔹 Mô tả

Cho một chuỗi ký tự `s`.
Hãy in ra **chuỗi đảo ngược** của chuỗi đó bằng **Stack**.

### 🔹 Ví dụ

| Input           | Output          |
| --------------- | --------------- |
| `error404-labs` | `sbal-404rorre` |
| `abcd`          | `dcba`          |

---

## 3️⃣ Ý tưởng giải bài

1. Duyệt từng ký tự của chuỗi
2. **Push** từng ký tự vào Stack
3. **Pop** từng ký tự ra và in

📌 Do Stack là LIFO nên thứ tự sẽ bị đảo ngược tự động.

---

# 🧪 CÁCH 1 – Stack Level 1 (dùng biến global)

> ✔ Phù hợp cho người mới bắt đầu

> ✔ Dễ hiểu, dễ học

> ❌ Chỉ dùng được 1 Stack

---

## 📌 Code C – Stack Level 1 (có kiểm tra điều kiện)

```c
#include <stdio.h>
#include <string.h>

#define MAX 1000

char stack[MAX];
int top = -1;

// Khai bao ham
int isEmpty();
int isFull();
void push(char c);
char pop();

int main() {
    char str[MAX];

    // Nhap chuoi
    fgets(str, MAX, stdin);
    str[strcspn(str, "\n")] = '\0';

    // Push tung ky tu vao stack
    for (int i = 0; str[i] != '\0'; i++) {
        push(str[i]);
    }

    // Pop va in chuoi dao nguoc
    while (!isEmpty()) {
        printf("%c", pop());
    }

    return 0;
}

// Kiem tra stack rong
int isEmpty() {
    return top == -1;
}

// Kiem tra stack day
int isFull() {
    return top == MAX - 1;
}

// Day du lieu vao stack
void push(char c) {
    if (!isFull()) {
        stack[++top] = c;
    }
}

// Lay du lieu ra khoi stack
char pop() {
    if (!isEmpty()) {
        return stack[top--];
    }
    return '\0';
}
```

---

## 🔍 Giải thích nhanh Level 1

- `top` là **biến global**
- Tất cả hàm (`push`, `pop`, `isEmpty`) đều dùng chung `top`
- Phù hợp để **hiểu nguyên lý Stack lần đầu**

---

## ⚠️ Hạn chế Level 1

- Chỉ tạo được **1 Stack**
- Không phù hợp chương trình lớn
- Không đúng kiến trúc DSA nâng cao

👉 Vì vậy ta cần **Level 2**.

---

# 🧪 CÁCH 2 – Stack Level 2 (dùng `struct`, chuẩn DSA)

> ✔ Mỗi Stack có trạng thái riêng

> ✔ Tạo được nhiều Stack

> ✔ Đúng tư duy cấu trúc dữ liệu

---

## 🧱 Khai báo Stack bằng `struct`

```c
#define MAX 1000

typedef struct {
    char data[MAX];
    int top;
} Stack;
```

📌 Mỗi `Stack` gồm:

- `data[]` : dữ liệu
- `top` : đỉnh Stack

---

## 🔧 Các hàm xử lý Stack (Level 2)

### 🔹 Khởi tạo Stack

```c
void initStack(Stack *s) {
    s->top = -1;
}
```

---

### 🔹 Kiểm tra rỗng

```c
int isEmpty(Stack *s) {
    return s->top == -1;
}
```

---

### 🔹 Kiểm tra đầy

```c
int isFull(Stack *s) {
    return s->top == MAX - 1;
}
```

---

### 🔹 Push

```c
void push(Stack *s, char c) {
    if (!isFull(s)) {
        s->data[++s->top] = c;
    }
}
```

---

### 🔹 Pop

```c
char pop(Stack *s) {
    if (!isEmpty(s)) {
        return s->data[s->top--];
    }
    return '\0';
}
```

---

## 💻 Code C hoàn chỉnh – Stack Level 2

```c
#include <stdio.h>
#include <string.h>

#define MAX 1000

typedef struct {
    char data[MAX];
    int top;
} Stack;

void initStack(Stack *s);
int isEmpty(Stack *s);
int isFull(Stack *s);
void push(Stack *s, char c);
char pop(Stack *s);

int main() {
    Stack s;
    char str[MAX];

    // Khoi tao stack
    initStack(&s);

    // Nhap chuoi
    fgets(str, MAX, stdin);
    str[strcspn(str, "\n")] = '\0';

    // Push tung ky tu vao stack
    for (int i = 0; str[i] != '\0'; i++) {
        push(&s, str[i]);
    }

    // Pop va in chuoi dao nguoc
    while (!isEmpty(&s)) {
        printf("%c", pop(&s));
    }

    return 0;
}

void initStack(Stack *s) {
    s->top = -1;
}

int isEmpty(Stack *s) {
    return s->top == -1;
}

int isFull(Stack *s) {
    return s->top == MAX - 1;
}

void push(Stack *s, char c) {
    if (!isFull(s)) {
        s->data[++s->top] = c;
    }
}

char pop(Stack *s) {
    if (!isEmpty(s)) {
        return s->data[s->top--];
    }
    return '\0';
}
```

---

## 4️⃣ Khi nào dùng `s.top`, khi nào dùng `s->top`?

### 🔑 Quy tắc nhớ nhanh

> **Không có `*` → dùng `.`**

> **Có `*` → dùng `->`**

---

### ✅ Dùng `s.top`

```c
Stack s;
s.top = -1;
```

➡️ `s` là **biến Stack**

---

### ✅ Dùng `s->top`

```c
Stack *s;
s->top = -1;
```

➡️ `s` là **con trỏ Stack**

📌 `s->top` ≡ `(*s).top`

---

## 5️⃣ Khi nào dùng `Stack s`, khi nào dùng `Stack *s`?

### 🔹 `Stack s`

- Khi **khai báo biến**
- Khi **dùng trong main**

```c
Stack s;
```

---

### 🔹 `Stack *s`

- Khi **truyền vào hàm**
- Khi cần **thay đổi Stack bên ngoài hàm**

```c
void push(Stack *s, char c);
```

📌 Nếu không dùng con trỏ → thay đổi sẽ không có tác dụng.

---

## 🔎 So sánh Level 1 & Level 2

| Tiêu chí  | Level 1   | Level 2        |
| --------- | --------- | -------------- |
| `top`     | Global    | Trong struct   |
| Số Stack  | 1         | Nhiều          |
| Kiến trúc | Đơn giản  | Chuẩn DSA      |
| Phù hợp   | Người mới | Học nghiêm túc |

---

## 🧠 Ghi chú quan trọng cho người mới

- Push / Pop **quản lý trạng thái Stack**
- Stack là nền tảng cho:
    - Queue
    - Undo / Redo
    - Biểu thức toán học
    - Đệ quy

---

## ✅ Kết luận

- Stack là **cấu trúc dữ liệu nền tảng**
- Level 1 giúp hiểu nhanh
- Level 2 giúp **đúng tư duy DSA**
- Hiểu rõ `s.top` và `s->top` là bước rất quan trọng
