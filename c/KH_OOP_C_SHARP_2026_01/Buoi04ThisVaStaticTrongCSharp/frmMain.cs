namespace Buoi04ThisVaStaticTrongCSharp
{
    public partial class frmMain : Form
    {
        public frmMain()
        {
            InitializeComponent();
        }

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
    }


}
