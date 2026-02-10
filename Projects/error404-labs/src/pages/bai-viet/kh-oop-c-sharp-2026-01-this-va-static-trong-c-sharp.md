---
layout: '../../layouts/BlogPostLayout.astro'
title: '🧠📦 this và 🏢⚡ static trong C#'
date: 2026-02-10
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh-oop-c-sharp-2026-01/kh-oop-c-sharp-2026-01-this-va-static-trong-c-sharp.avif',
        alt: '🧠📦 this và 🏢⚡ static trong C#',
    }
description: this 🧠 đại diện cho chính bản thân object hiện tại — mỗi object sẽ có dữ liệu riêng, cảm xúc riêng (giống mỗi người một tính cách 🐣). static ⚡ lại thuộc về class tổng thể — dùng chung cho tất cả object, như một “kho sức mạnh chung” 🏢.
draft: false
category: KH_OOP_C_SHARP_2026_01
---

# 🎯 MỤC TIÊU

✅ Hiểu **`this` là gì, dùng khi nào**

✅ Phân biệt **biến instance vs static**

✅ Biết **method static**

✅ Áp dụng static để đếm object, quản lý dữ liệu chung

---

# 1️⃣ TỪ KHÓA `this` LÀ GÌ?

---

## Định nghĩa dễ hiểu 🧠

> `this` = **chính object hiện tại**

---

## Ví dụ đời thật 👤

- “Tôi” trong đời thật
- Mỗi người có “tôi” khác nhau

👉 Trong code:

- `this` của `sv1` ≠ `this` của `sv2`

---

# 2️⃣ KHI NÀO CẦN `this`?

---

## Ví dụ gây nhầm lẫn 😵

```csharp
class SinhVien
{
    private string ten;

    public void SetTen(string ten)
    {
        ten = ten; // ❌ sai, vô nghĩa
    }
}
```

---

## Sửa đúng bằng `this` ✅

```csharp
public void SetTen(string ten)
{
    this.ten = ten;
}
```

📌 `this.ten` = biến của class

📌 `ten` = tham số truyền vào

---

# 3️⃣ `this` TRONG CONSTRUCTOR

---

```csharp
class NhanVien
{
    private string ten;
    private double luong;

    public NhanVien(string ten, double luong)
    {
        this.ten = ten;
        this.luong = luong;
    }

    public void HienThi()
    {
        Console.WriteLine($"{ten} | {luong}");
    }
}
```

---

## Test

```csharp
NhanVien nv = new NhanVien("Hoài", 15000000);
nv.HienThi();
```

---

# 4️⃣ `this` GỌI CONSTRUCTOR KHÁC 🔁

---

## Overload nâng cao

```csharp
class Xe
{
    private string hang;
    private string mau;
    private int tocDo;

    public Xe() : this("Chưa rõ", "Trắng", 0)
    {
    }

    public Xe(string hang) : this(hang, "Trắng", 0)
    {
    }

    public Xe(string hang, string mau, int tocDo)
    {
        this.hang = hang;
        this.mau = mau;
        this.tocDo = tocDo;
    }

    public void HienThi()
    {
        Console.WriteLine($"{hang} | {mau} | {tocDo}");
    }
}
```

📌 Code gọn hơn — tránh lặp logic.

---

# 5️⃣ STATIC LÀ GÌ?

---

## Định nghĩa

> `static` = **thuộc về class**, không thuộc object

---

## So sánh nhanh ⚖️

| Instance      | Static          |
| ------------- | --------------- |
| Mỗi object có | Dùng chung      |
| Cần `new`     | Không cần       |
| Dữ liệu riêng | Dữ liệu toàn hệ |

---

# 6️⃣ BIẾN STATIC — DÙNG KHI NÀO?

---

## Ví dụ đếm số sinh viên 🎓

```csharp
class SinhVien
{
    public static int dem = 0;
    public string ten;

    public SinhVien(string ten)
    {
        this.ten = ten;
        dem++;
    }
}
```

---

## Test

```csharp
SinhVien a = new SinhVien("A");
SinhVien b = new SinhVien("B");
SinhVien c = new SinhVien("C");

Console.WriteLine(SinhVien.dem);
```

👉 Output:

```
3
```

📌 Không cần tạo object để dùng `dem`.

---

# 7️⃣ METHOD STATIC 🔧

---

```csharp
class ToanHoc
{
    public static int Cong(int a, int b)
    {
        return a + b;
    }
}
```

---

## Gọi

```csharp
int kq = ToanHoc.Cong(3, 5);
Console.WriteLine(kq);
```

📌 Không cần `new ToanHoc()`.

---

# 8️⃣ STATIC + ENCAPSULATION 🔐

---

```csharp
class HeThong
{
    private static int soNguoiDung = 0;

    public static void TangNguoiDung()
    {
        soNguoiDung++;
    }

    public static int LaySoNguoiDung()
    {
        return soNguoiDung;
    }
}
```

---

## Test

```csharp
HeThong.TangNguoiDung();
HeThong.TangNguoiDung();

Console.WriteLine(HeThong.LaySoNguoiDung());
```

---

# 9️⃣ BÀI CONSOLE — LÀM TỪNG BƯỚC 🧩

---

## 🎯 Đề bài: QUẢN LÝ TÀI KHOẢN

---

### Yêu cầu:

- Mỗi tài khoản có số dư riêng
- Tổng số tài khoản là dùng chung

---

## ✍️ Bước 1 — Khai báo class

```csharp
class TaiKhoan
{
    private double soDu;
    public static int tongTaiKhoan = 0;
}
```

---

## ✍️ Bước 2 — Constructor

```csharp
public TaiKhoan(double soDu)
{
    if (soDu >= 0)
        this.soDu = soDu;

    tongTaiKhoan++;
}
```

---

## ✍️ Bước 3 — Method

```csharp
public void Nap(double tien)
{
    if (tien > 0)
        soDu += tien;
}

public void HienThi()
{
    Console.WriteLine("Số dư: " + soDu);
}
```

---

## Test

```csharp
TaiKhoan a = new TaiKhoan(1000);
TaiKhoan b = new TaiKhoan(2000);

Console.WriteLine("Tổng TK: " + TaiKhoan.tongTaiKhoan);

a.HienThi();
b.HienThi();
```

---

# 🔟 BÀI NÂNG CAO 🔥 QUẢN LÝ ID TỰ TĂNG

---

## Yêu cầu

- ID tự tăng cho mỗi object
- Không trùng ID

---

## Code

```csharp
class SanPham
{
    private static int autoId = 1;
    private int id;
    private string ten;

    public SanPham(string ten)
    {
        this.id = autoId;
        autoId++;
        this.ten = ten;
    }

    public void HienThi()
    {
        Console.WriteLine($"{id} | {ten}");
    }
}
```

---

## Test

```csharp
SanPham sp1 = new SanPham("Chuột");
SanPham sp2 = new SanPham("Bàn phím");

sp1.HienThi();
sp2.HienThi();
```

---

# 1️⃣1️⃣ PORT WINFORMS 🖥️

---

```csharp
public class SanPham
{
    private static int autoID = 0;

    public int MaSP { get; private set; }
    public string TenSP { get; set; }
    public int GiaSP { get; set; }

    public SanPham(string TenSP, int GiaSP)
    {
        MaSP = ++autoID;
        this.TenSP = TenSP;
        this.GiaSP = GiaSP;
    }
}
```

---

## UI bạn chèn

- DataGridView
    - dgvDuLieu: hiển thị danh sách sản phẩm

```csharp
private void frmMain_Load(object sender, EventArgs e)
{
    // 1. Tạo danh sách sản phẩm (ID auto tăng static)
    List<SanPham> danhSachSP = new List<SanPham>()
    {
        new SanPham("Book C", 10000),
        new SanPham("Book C++", 15000),
        new SanPham("Book C#", 20000),
    };

    // 2. Bind dữ liệu lên Grid
    dgvDuLieu.DataSource = danhSachSP;

    // 3. Đổi tên header
    dgvDuLieu.Columns["MaSP"].HeaderText = "Mã SP";
    dgvDuLieu.Columns["TenSP"].HeaderText = "Tên SP";
    dgvDuLieu.Columns["GiaSP"].HeaderText = "Giá SP";

    // 4. Cột giãn full chiều ngang
    dgvDuLieu.AutoSizeColumnsMode =
        DataGridViewAutoSizeColumnsMode.Fill;

    // 5. Ẩn cột mũi tên trái
    dgvDuLieu.RowHeadersVisible = false;

    // 6. Không cho sửa / thêm
    dgvDuLieu.ReadOnly = true;
    dgvDuLieu.AllowUserToAddRows = false;

    // 7. Select nguyên dòng
    dgvDuLieu.SelectionMode =
        DataGridViewSelectionMode.FullRowSelect;

    // 8. Nền trắng phần trống
    dgvDuLieu.BackgroundColor = Color.White;

}
```

![Buoi04ThisVaStaticTrongCSharp](/images/kh-oop-c-sharp-2026-01/Buoi04ThisVaStaticTrongCSharp.avif)

---

# 📌 TỔNG KẾT

---

## Học được gì?

✅ `this` phân biệt biến

✅ `this` gọi constructor

✅ static dùng chung

✅ method static

✅ auto ID

✅ đếm object

---
