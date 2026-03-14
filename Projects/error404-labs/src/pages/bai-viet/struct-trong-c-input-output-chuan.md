---
layout: '../../layouts/BlogPostLayout.astro'
title: 'struct trong C (Input / Output chuẩn)'
date: 2026-03-14
author: Phạm Xuân Hoài
image: { src: '/images/c/struct-trong-c-input-output-chuan.avif', alt: 'struct trong C (Input / Output chuẩn)' }
description: Bài học này giới thiệu về struct trong ngôn ngữ lập trình C, một kiểu dữ liệu cho phép gom nhiều biến khác nhau vào cùng một cấu trúc để quản lý dữ liệu có tổ chức hơn. Thông qua ví dụ quản lý thông tin sinh viên (tên, tuổi, điểm), người học sẽ hiểu cách khai báo struct, tạo biến từ struct, cũng như cách truy cập và sử dụng các thành viên của nó.
draft: false
category: C
---

## 📖 Tài liệu

<div class="mb-3 flex gap-3">
  <a 
    href="/images/c/struct-trong-c-input-output-chuan.pdf" 
    target="_blank" 
    rel="noopener noreferrer"
    class="py-2 text-white">
    🔎 Mở tab mới xem tài liệu (PDF)
  </a>
</div>

---

## 1. Mục tiêu bài học

Sau bài này, người học sẽ:

- hiểu `struct` là gì
- biết cách khai báo `struct`
- nhập dữ liệu từ bàn phím
- xuất dữ liệu ra màn hình

---

# 2. Khai báo `struct`

```c
struct SinhVien {
    char ten[50];
    int tuoi;
    float diem;
};
```

### Giải thích

| Thành phần        | Ý nghĩa                               |
| ----------------- | ------------------------------------- |
| `struct SinhVien` | tạo kiểu dữ liệu mới tên **SinhVien** |
| `char ten[50]`    | chuỗi lưu tên sinh viên               |
| `int tuoi`        | lưu tuổi                              |
| `float diem`      | lưu điểm                              |

`struct` cho phép **gom nhiều biến liên quan vào cùng một đối tượng**.

---

# 3. Chương trình hoàn chỉnh

```c
#include <stdio.h>
#include <string.h>

struct SinhVien {
    char ten[50];
    int tuoi;
    float diem;
};

int main() {

    struct SinhVien sv;
    char buffer[100];

    printf("Nhap ten sinh vien: ");
    fgets(sv.ten, sizeof(sv.ten), stdin);
    sv.ten[strcspn(sv.ten, "\n")] = '\0';

    printf("Nhap tuoi: ");
    fgets(buffer, sizeof(buffer), stdin);
    sscanf(buffer, "%d", &sv.tuoi);

    printf("Nhap diem: ");
    fgets(buffer, sizeof(buffer), stdin);
    sscanf(buffer, "%f", &sv.diem);

    printf("\nThong tin sinh vien\n");
    printf("Ten: %s\n", sv.ten);
    printf("Tuoi: %d\n", sv.tuoi);
    printf("Diem: %.2f\n", sv.diem);

    return 0;
}
```

---

# 4. Giải thích từng phần của chương trình

## 4.1 Thư viện sử dụng

```c
#include <stdio.h>
#include <string.h>
```

- `stdio.h` → dùng `printf`, `fgets`
- `string.h` → dùng `strcspn`

---

# 4.2 Khai báo cấu trúc sinh viên

```c
struct SinhVien {
    char ten[50];
    int tuoi;
    float diem;
};
```

Cấu trúc này giống như **một mẫu (template)** để tạo ra các đối tượng sinh viên.

---

# 4.3 Tạo biến `struct`

```c
struct SinhVien sv;
```

Biến `sv` sẽ chứa:

```text
sv.ten
sv.tuoi
sv.diem
```

---

# 4.4 Buffer dùng để nhập số

```c
char buffer[100];
```

Dùng để:

1. đọc dữ liệu từ bàn phím bằng `fgets`
2. sau đó chuyển sang số bằng `sscanf`

Cách này **tránh lỗi nhập liệu trong C**.

---

# 4.5 Nhập tên sinh viên

```c
fgets(sv.ten, sizeof(sv.ten), stdin);
```

`fgets` đọc cả khoảng trắng nên phù hợp để nhập tên.

Ví dụ người dùng nhập:

```
Nguyen Van A
```

---

## Loại bỏ ký tự xuống dòng

```c
sv.ten[strcspn(sv.ten, "\n")] = '\0';
```

`fgets` thường lưu thêm ký tự `\n`.

Ví dụ:

```
"Nguyen Van A\n"
```

Dòng code trên sẽ đổi `\n` thành `\0` để chuỗi trở thành:

```
"Nguyen Van A"
```

---

# 4.6 Nhập tuổi

```c
fgets(buffer, sizeof(buffer), stdin);
sscanf(buffer, "%d", &sv.tuoi);
```

Quy trình:

```
stdin → fgets → buffer → sscanf → sv.tuoi
```

Ví dụ:

```
Input: 20
```

Sau `sscanf`:

```
sv.tuoi = 20
```

---

# 4.7 Nhập điểm

```c
fgets(buffer, sizeof(buffer), stdin);
sscanf(buffer, "%f", &sv.diem);
```

Ví dụ:

```
Input: 8.5
```

Sau đó:

```
sv.diem = 8.5
```

---

# 4.8 Xuất thông tin sinh viên

```c
printf("Ten: %s\n", sv.ten);
printf("Tuoi: %d\n", sv.tuoi);
printf("Diem: %.2f\n", sv.diem);
```

Kết quả hiển thị:

```
Ten: Nguyen Van A
Tuoi: 20
Diem: 8.50
```

---

# 5. Ví dụ chạy chương trình

Input

```
Nhap ten sinh vien: Nguyen Van A
Nhap tuoi: 20
Nhap diem: 8.5
```

Output

```
Thong tin sinh vien
Ten: Nguyen Van A
Tuoi: 20
Diem: 8.50
```

---

# 6. Tổng kết

Sau bài này, bạn đã biết:

| Kiến thức | Ý nghĩa              |
| --------- | -------------------- |
| `struct`  | tạo kiểu dữ liệu mới |
| `.`       | truy cập thành viên  |
| `fgets`   | nhập chuỗi           |
| `sscanf`  | chuyển chuỗi sang số |
| `printf`  | xuất dữ liệu         |
