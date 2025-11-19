# 📘 **Nhập xuất dữ liệu cơ bản trong C++**

## 🎯 **Học được gì qua bài này**

- Sử dụng các **kiểu dữ liệu** cơ bản trong C++<br/><br/>
- Nhập dữ liệu từ bàn phím bằng **`cin`**<br/><br/>
- Xuất dữ liệu ra màn hình bằng **`cout`** và **`printf`**<br/><br/>
- Định dạng đầu ra với các **specifier** trong `printf`<br/><br/>

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Kiểu dữ liệu cơ bản**

| Kiểu dữ liệu | Ý nghĩa                            | Ví dụ                   |
| ------------ | ---------------------------------- | ----------------------- |
| `char`       | Lưu trữ một ký tự đơn              | `char kyTu = 'A';`      |
| `int`        | Lưu trữ số nguyên                  | `int soNguyen = 42;`    |
| `float`      | Lưu trữ số thực (độ chính xác đơn) | `float soThuc = 3.14f;` |

**Giải thích:**

- **`char`**: Kiểu dữ liệu ký tự, chiếm 1 byte bộ nhớ
- **`int`**: Kiểu dữ liệu số nguyên, thường chiếm 4 bytes
- **`float`**: Kiểu dữ liệu số thực, chiếm 4 bytes, có thể lưu số thập phân

---

### 🌟 **Nhập dữ liệu với `cin`**

| Cú pháp        | Ý nghĩa                           | Ví dụ              |
| -------------- | --------------------------------- | ------------------ |
| `cin >> biến;` | Nhập giá trị từ bàn phím vào biến | `cin >> soNguyen;` |

**Giải thích:**

- **`cin`**: Là luồng nhập từ bàn phím (console input)
- **`>>`**: Toán tử trích xuất (extraction operator)
- Người dùng nhập giá trị và nhấn Enter để xác nhận

---

### 🌟 **Xuất dữ liệu với `cout` và `printf`**

| Hàm                    | Ý nghĩa                                     | Ví dụ                         |
| ---------------------- | ------------------------------------------- | ----------------------------- |
| `cout << biến;`        | Xuất dữ liệu ra màn hình (C++ style)        | `cout << "Số: " << soNguyen;` |
| `printf(format, ...);` | Xuất dữ liệu với định dạng cụ thể (C style) | `printf("%d", soNguyen);`     |

**Giải thích:**

- **`cout`**: Luồng xuất ra màn hình, dễ sử dụng hơn, không cần định dạng phức tạp
- **`printf`**: Hàm in với định dạng chi tiết, cần chỉ định kiểu dữ liệu

---

### 🌟 **Format specifier trong `printf`**

| Specifier | Ý nghĩa                                                   | Ví dụ                      |
| --------- | --------------------------------------------------------- | -------------------------- |
| `%c`      | Xuất ký tự                                                | `printf("%c", kyTu);`      |
| `%d`      | Xuất số nguyên                                            | `printf("%d", soNguyen);`  |
| `%f`      | Xuất số thực (mặc định 6 chữ số thập phân)                | `printf("%f", soThuc);`    |
| `%3c`     | Xuất ký tự, chiếm tối thiểu 3 ký tự                       | `printf("%3c", kyTu);`     |
| `%6d`     | Xuất số nguyên, chiếm tối thiểu 6 ký tự                   | `printf("%6d", soNguyen);` |
| `%.3f`    | Xuất số thực với 3 chữ số thập phân                       | `printf("%.3f", soThuc);`  |
| `%8.3f`   | Xuất số thực, chiếm tối thiểu 8 ký tự, 3 chữ số thập phân | `printf("%8.3f", soThuc);` |

**Giải thích:**

- **Số trước dấu chấm**: Tổng chiều rộng tối thiểu mà dữ liệu sẽ chiếm (canh phải)
- **Số sau dấu chấm**: Số chữ số thập phân (cho `%f`)
- Ví dụ: `%8.3f` nghĩa là số thực sẽ hiển thị với tối thiểu 8 ký tự, trong đó có 3 chữ số sau dấu thập phân

---

### 🌟 **Các ký tự đặc biệt**

| Ký tự | Ý nghĩa              | Ví dụ                |
| ----- | -------------------- | -------------------- |
| `\n`  | Xuống dòng           | `printf("Hello\n");` |
| `\t`  | Tab (khoảng trắng)   | `printf("A\tB");`    |
| `\\`  | Xuất ký tự backslash | `printf("\\");`      |

---

## 💡 **Code mẫu**---

<details>
<summary>Xem code mẫu</summary>

<iframe title="Nhập xuất dữ liệu cơ bản trong C++" scrolling="no" loading="eager" style="height:600px; width: 100%; border:1px solid black; border-radius:6px;" src="https://www.online-cpp.com/t6zjehmnvz">
</iframe>

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** C++ - Nhập xuất dữ liệu<br/>

_Chúc bạn học tốt và hoàn thành bài tập thành công!_
