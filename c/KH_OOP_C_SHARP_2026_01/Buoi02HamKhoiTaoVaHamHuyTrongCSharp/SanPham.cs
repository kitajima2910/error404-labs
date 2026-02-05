using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Buoi02HamKhoiTaoVaHamHuyTrongCSharp
{
    public class SanPham
    {
        public string ma;
        public string ten;
        public double gia;

        public SanPham()
        {
            ma = "SP001";
            ten = "San Pham Mac Dinh";
            gia = 10_000;
        }

        public SanPham(string ma, string ten, double gia)
        {
            this.ma = ma;
            this.ten = ten;
            this.gia = gia;
        }
    }
}
