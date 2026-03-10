---
layout: '../../layouts/BlogPostLayout.astro'
title: 'Kế Thừa (Inheritance) & base chuyên sâu'
date: 2026-03-09
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh-oop-c-sharp-2026-01/kh-oop-c-sharp-2026-01-ke-thua-inheritance-va-base-chuyen-sau.avif',
        alt: 'Kế Thừa (Inheritance) & base chuyên sâu',
    }
description: Tìm hiểu Kế thừa (Inheritance) trong C# và cách sử dụng từ khóa base để gọi constructor, thuộc tính, và phương thức của lớp cha. Bài viết giải thích cách mở rộng và ghi đè hành vi của lớp cha, giúp code dễ tái sử dụng và đúng chuẩn lập trình hướng đối tượng (OOP). 🚀
draft: false
category: KH_OOP_C_SHARP_2026_01
---

## 📖 Tài liệu

<div class="mb-3 flex gap-3">
  <a 
    href="/images/java/phan-tich-thua-so-nguyen-to-trong-java.pdf" 
    target="_blank" 
    rel="noopener noreferrer"
    class="py-2 text-white">
    🔎 Mở tab mới xem tài liệu (PDF)
  </a>
</div>

---

# 🌱 1. Vì sao cần kế thừa?

Giả sử có hệ thống quản lý nhân sự:

- Nhân viên văn phòng
- Nhân viên sản xuất
- Nhân viên quản lý

Tất cả đều có:

- Tên
- Lương cơ bản
- Hiển thị thông tin

Nếu viết 3 class riêng và copy y chang phần chung, code sẽ:

- Lặp lại
- Khó bảo trì
- Dễ sai khi chỉnh sửa

👉 Kế thừa sinh ra để giải quyết điều đó.

---

# 🧠 2. Kế thừa là gì?

> Class con nhận lại thuộc tính và phương thức của class cha.

Cú pháp:

```csharp
class Con : Cha
{
}
```

---

# 🔥 3. Thiết kế class cha đúng cách

---

## Bài toán: Hệ thống nhân viên

---

## Bước 1 — Tạo class cha

```csharp
class NhanVien
{
    protected string ten;
    protected double luongCoBan;

    public NhanVien(string ten, double luongCoBan)
    {
        this.ten = ten;
        this.luongCoBan = luongCoBan;
    }

    public virtual double TinhLuong()
    {
        return luongCoBan;
    }

    public void HienThi()
    {
        Console.WriteLine($"Tên: {ten} | Lương: {TinhLuong()}");
    }
}
```

---

## Giải thích thiết kế

- `protected` → class con truy cập được
- `virtual` → cho phép class con thay đổi cách tính lương
- `TinhLuong()` không cố định, vì mỗi loại nhân viên tính khác nhau

Đây là tư duy thiết kế quan trọng:

> Những gì có khả năng thay đổi → để virtual.

---

# 🔥 4. `base()` trong constructor

---

## Tạo class con

```csharp
class NhanVienVanPhong : NhanVien
{
    private double phuCap;

    public NhanVienVanPhong(string ten, double luongCoBan, double phuCap)
        : base(ten, luongCoBan)
    {
        this.phuCap = phuCap;
    }
}
```

---

## Điều gì đang xảy ra?

Khi tạo:

```csharp
NhanVienVanPhong nv = new NhanVienVanPhong("An", 7000000, 2000000);
```

Trình tự:

1. Constructor của `NhanVien` chạy trước
2. Constructor của `NhanVienVanPhong` chạy sau

`base(ten, luongCoBan)` đảm bảo phần cha được khởi tạo đúng.

---

## Lỗi thường gặp

Nếu class cha không có constructor rỗng:

```csharp
class NhanVien
{
    public NhanVien(string ten) { }
}
```

Mà class con không gọi base → lỗi compile.

---

# 🔥 5. override & base.Method()

Bây giờ cần tính lương riêng cho từng loại.

---

## Hoàn chỉnh class Văn Phòng

```csharp
class NhanVienVanPhong : NhanVien
{
    private double phuCap;

    public NhanVienVanPhong(string ten, double luongCoBan, double phuCap)
        : base(ten, luongCoBan)
    {
        this.phuCap = phuCap;
    }

    public override double TinhLuong()
    {
        double luongGoc = base.TinhLuong();
        return luongGoc + phuCap;
    }
}
```

---

## Ý nghĩa của `base.TinhLuong()`

- Không lặp lại logic cha
- Nếu sau này thay đổi cách tính lương cơ bản → class con vẫn đúng
- Đây là mở rộng, không phá vỡ

---

# 🔥 6. Thêm loại nhân viên thứ hai

```csharp
class NhanVienSanXuat : NhanVien
{
    private int soSanPham;

    public NhanVienSanXuat(string ten, double luongCoBan, int soSanPham)
        : base(ten, luongCoBan)
    {
        this.soSanPham = soSanPham;
    }

    public override double TinhLuong()
    {
        return base.TinhLuong() + soSanPham * 5000;
    }
}
```

---

# 🧪 7. Test Console (Quan trọng)

---

```csharp
List<NhanVien> danhSach = new List<NhanVien>();

danhSach.Add(new NhanVienVanPhong("An", 7000000, 2000000));
danhSach.Add(new NhanVienSanXuat("Bình", 6000000, 100));

foreach (var nv in danhSach)
{
    nv.HienThi();
}
```

---

Điểm cực quan trọng:

```csharp
List<NhanVien>
```

Danh sách kiểu cha, nhưng chứa object con.

Đây là nền tảng của đa hình (sẽ đào sâu ở bài đa hình).

---

# 🎮 8. Ví dụ Game cho dễ hình dung

---

## Class cha

```csharp
class NhanVat
{
    protected string ten;

    public NhanVat(string ten)
    {
        this.ten = ten;
    }

    public virtual void TanCong()
    {
        Console.WriteLine(ten + " tấn công cơ bản ⚔️");
    }
}
```

---

## Class con

```csharp
class KiemSi : NhanVat
{
    public KiemSi(string ten) : base(ten) { }

    public override void TanCong()
    {
        base.TanCong();
        Console.WriteLine(ten + " chém mạnh 💥");
    }
}
```

---

Khi gọi:

```csharp
NhanVat nv = new KiemSi("Arthur");
nv.TanCong();
```

Hành vi sẽ chạy của class con.

Đây là bước đệm cho đa hình runtime.

---

# 🖥️ 9. Ý tưởng WinForms thực tế hơn

---

## Mini App: Hệ thống thêm nhân viên đa loại

### UI:

- ComboBox: chọn loại nhân viên
- TextBox: nhập tên
- TextBox: nhập lương cơ bản
- TextBox: nhập phụ cấp hoặc số sản phẩm
- TextBox: tính tổng nhân viên văn phòng
- TextBox: tính tổng nhân viên sản phẩm
- DataGridView: hiển thị danh sách

![KeThua](/images/kh-oop-c-sharp-2026-01/KeThua.avif)

---

## Logic lõi (code mẫu chưa bắt lỗi)

<details>
    <summary>Xem code của NhanVien.cs</summary>

```csharp
public class NhanVien
{
    public string Ten { get; set; }
    public double LuongCoBan { get; set; }
    public virtual string PhuCap_SoSanPham { get; set; }
    public virtual string LoaiNhanVien { get; set; }

    public NhanVien(string Ten, double LuongCoBan)
    {
        this.Ten = Ten;
        this.LuongCoBan = LuongCoBan;
    }

    public virtual double TinhLuong()
    {
        return LuongCoBan;
    }

    public void HienThi()
    {
        Console.WriteLine($"Tên: {Ten} | Lương: {TinhLuong()}");
    }
}
```

</details>

<details>
    <summary>Xem code của NhanVienVanPhong.cs</summary>

```csharp
public class NhanVienVanPhong : NhanVien
{
    private double phuCap;

    public NhanVienVanPhong(string Ten, double LuongCoBan, double phuCap) : base(Ten, LuongCoBan)
    {
        this.phuCap = phuCap;
    }

    public override double TinhLuong()
    {
        double luongGoc = base.TinhLuong();
        return luongGoc + phuCap;
    }

    public override string PhuCap_SoSanPham
    {
        get { return phuCap.ToString(); }
    }

    public override string LoaiNhanVien
    {
        get { return "Văn Phòng"; }
    }
}
```

</details>

<details>
    <summary>Xem code của NhanVienSanXuat.cs</summary>

```csharp
public class NhanVienSanXuat : NhanVien
{
    private int soSanPham;

    public NhanVienSanXuat(string Ten, double LuongCoBan, int soSanPham)
        : base(Ten, LuongCoBan)
    {
        this.soSanPham = soSanPham;
    }

    public override double TinhLuong()
    {
        return base.TinhLuong() + soSanPham * 5000;
    }

    public override string PhuCap_SoSanPham
    {
            get { return soSanPham.ToString(); }
    }

    public override string LoaiNhanVien
    {
            get { return "Sản Xuất"; }
    }
}
```

</details>

<details>
    <summary>Xem code của frmMain.cs</summary>

```csharp
public partial class frmMain : Form
{
    List<NhanVien> ds = new List<NhanVien>();

    public frmMain()
    {
        InitializeComponent();
    }

    private void frmMain_Load(object sender, EventArgs e)
    {
        ds.Add(new NhanVienVanPhong("Nguyễn Văn A", 10000000, 500000));
        ds.Add(new NhanVienVanPhong("Lê Thị C", 12000000, 700000));
        ds.Add(new NhanVienVanPhong("Trần Thị B", 15000000, 1000000));
        ds.Add(new NhanVienSanXuat("Phạm Văn D", 13000000, 3000));
        ds.Add(new NhanVienSanXuat("Trần Thị B", 15000000, 2000));

        dataGridView.DataSource = ds;

        dataGridView.Columns["Ten"].HeaderText = "Tên Nhân Viên";
        dataGridView.Columns["LuongCoBan"].HeaderText = "Lương Cơ Bản";
        dataGridView.Columns["PhuCap_SoSanPham"].HeaderText = "Phụ Cấp / Số Sản Phẩm";
        dataGridView.Columns["LoaiNhanVien"].HeaderText = "Loại Nhân Viên";

        dataGridView.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
        dataGridView.RowHeadersVisible = false;
        dataGridView.ReadOnly = true;
        dataGridView.AllowUserToAddRows = false;
        dataGridView.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
        dataGridView.BackgroundColor = Color.White;

        // Load Combobox
        String[] options = { "Văn Phòng", "Sản Xuất" };
        comboBox.DataSource = options;
    }

    private void btnThem_Click(object sender, EventArgs e)
    {
        string ten = txtTen.Text;
        string luongCoBan = txtLuongCoBan.Text;
        string phuCap_SoSanPham = txtPhuCapSoSanPham.Text;

        if (comboBox.SelectedItem.Equals("Văn Phòng"))
        {
            ds.Add(new NhanVienVanPhong(ten, double.Parse(luongCoBan), double.Parse(phuCap_SoSanPham)));
        }
        else if (comboBox.SelectedItem.Equals("Sản Xuất"))
        {
            ds.Add(new NhanVienSanXuat(ten, double.Parse(luongCoBan), int.Parse(phuCap_SoSanPham)));
        }

        dataGridView.DataSource = null;
        dataGridView.DataSource = ds;
    }

    private void btnTLNVVP_Click(object sender, EventArgs e)
    {
        double tongLuongNhanVienVanPhong = ds.Where(nv => nv is NhanVienVanPhong).Sum(nv => nv.TinhLuong());
        MessageBox.Show($"Tổng lương của nhân viên văn phòng: {tongLuongNhanVienVanPhong}");
    }

    private void btnTLNVSP_Click(object sender, EventArgs e)
    {
        double tongLuongNhanVienSanXuat = ds.Where(nv => nv is NhanVienSanXuat).Sum(nv => nv.TinhLuong());
        MessageBox.Show($"Tổng lương của nhân viên sản xuất: {tongLuongNhanVienSanXuat}");
    }
}
```

</details>

Đây là cách thiết kế ứng dụng chuyên nghiệp.

---

# 📌 Tổng kết

- Kế thừa giúp tái sử dụng code
- `protected` cho phép con truy cập
- `base()` gọi constructor cha
- `base.Method()` mở rộng hành vi
- `virtual + override` là nền tảng của đa hình
- Thiết kế tốt giúp hệ thống mở rộng dễ dàng
