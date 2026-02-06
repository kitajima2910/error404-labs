namespace Buoi03PhamViTruyCapVaDongGoiTrongCSharp
{
    public partial class frmMain : Form
    {
        public frmMain()
        {
            InitializeComponent();
        }

        private void btnXacNhan_Click(object sender, EventArgs e)
        {
            SanPham sp = new SanPham();

            // Sử dụng các thuộc tính (properties) để truy cập và gán giá trị
            sp.Ten = txtTenSanPham.Text;
            sp.Gia = double.Parse(txtGia.Text);

            MessageBox.Show($"Tên sản phẩm: {sp.Ten}\nGiá: {sp.Gia}");
        }
    }
}
