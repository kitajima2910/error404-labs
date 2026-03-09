using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Buoi05KeThua
{
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
}
