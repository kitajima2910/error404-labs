namespace Buoi02HamKhoiTaoVaHamHuyTrongCSharp
{
    public partial class frmMain : Form
    {
        public frmMain()
        {
            InitializeComponent();
        }

        private void btnDuLieu01_Click(object sender, EventArgs e)
        {
            SanPham sp = new SanPham();

            lblMa01.Text = "Mã: " + sp.ma;
            lblTen01.Text = "Tên: " + sp.ten;
            lblGia01.Text = "Giá: " + sp.gia;

        }

        private void btnDuLieu02_Click(object sender, EventArgs e)
        {
            SanPham sp = new SanPham("SP002", "San Pham 02", 20000);

            lblMa02.Text = "Mã: " + sp.ma;
            lblTen02.Text = "Tên: " + sp.ten;
            lblGia02.Text = "Giá: " + sp.gia;
        }

        private void frmMain_Load(object sender, EventArgs e)
        {

        }
    }
}
