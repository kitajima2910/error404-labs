namespace Buoi01DoiTuongVaLopTrongCSharp
{
    public partial class frmMain : Form
    {
        public frmMain()
        {
            InitializeComponent();
        }

        private void frmMain_Load(object sender, EventArgs e)
        {
            SinhVien sv = new SinhVien();

            sv.ten = "Phạm Xuân Hoài";
            sv.tuoi = 31;

            sv.HienThi(lblTen, lblTuoi);

            lblThongTin.Text = sv.LayThongTin();
        }
    }
}
