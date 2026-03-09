using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Buoi05KeThua
{
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
}
