namespace Buoi05KeThua
{
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
}
