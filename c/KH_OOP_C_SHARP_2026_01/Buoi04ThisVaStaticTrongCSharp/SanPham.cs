using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Buoi04ThisVaStaticTrongCSharp
{
    public class SanPham
    {
        private static int autoID = 0;

        public int MaSP { get; private set; }
        public string TenSP { get; set; }
        public int GiaSP { get; set; }

        public SanPham(string TenSP, int GiaSP)
        {
            MaSP = ++autoID;
            this.TenSP = TenSP;
            this.GiaSP = GiaSP;
        }
    }
}
