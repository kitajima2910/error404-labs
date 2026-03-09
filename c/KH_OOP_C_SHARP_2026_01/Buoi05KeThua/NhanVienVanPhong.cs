using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Buoi05KeThua
{
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
}
