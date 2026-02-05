using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Buoi01DoiTuongVaLopTrongCSharp
{
    public class SinhVien
    {
        public string ten;
        public int tuoi;

        public void HienThi(Label lblTen, Label lblTuoi)
        {
            lblTen.Text = "Tên: " + ten;
            lblTuoi.Text = "Tuổi: " + tuoi;
        }

        public string LayThongTin()
        {
            return "Tên: " + ten + ", Tuổi: " + tuoi;
        }
    }
}
