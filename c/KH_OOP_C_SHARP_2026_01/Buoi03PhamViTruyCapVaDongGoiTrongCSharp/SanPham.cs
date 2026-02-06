using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Buoi03PhamViTruyCapVaDongGoiTrongCSharp
{
    public class SanPham
    {
        private string ten;
        private double gia;

        public string Ten
        {
            get { return ten; }
            set { ten = value; }
        }

        public double Gia
        {
            get { return gia; }
            set
            {
                if (value >= 0)
                {
                    gia = value;
                }
            }
        }
    }
}
