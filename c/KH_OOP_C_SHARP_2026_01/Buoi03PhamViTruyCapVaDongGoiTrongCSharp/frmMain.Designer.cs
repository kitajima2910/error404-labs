namespace Buoi03PhamViTruyCapVaDongGoiTrongCSharp
{
    partial class frmMain
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            txtTenSanPham = new TextBox();
            lblTenSanPham = new Label();
            btnXacNhan = new Button();
            label1 = new Label();
            txtGia = new TextBox();
            SuspendLayout();
            // 
            // txtTenSanPham
            // 
            txtTenSanPham.Location = new Point(108, 12);
            txtTenSanPham.Name = "txtTenSanPham";
            txtTenSanPham.Size = new Size(277, 23);
            txtTenSanPham.TabIndex = 0;
            // 
            // lblTenSanPham
            // 
            lblTenSanPham.AutoSize = true;
            lblTenSanPham.Location = new Point(12, 15);
            lblTenSanPham.Name = "lblTenSanPham";
            lblTenSanPham.Size = new Size(80, 15);
            lblTenSanPham.TabIndex = 1;
            lblTenSanPham.Text = "Tên sản phẩm";
            // 
            // btnXacNhan
            // 
            btnXacNhan.Location = new Point(310, 59);
            btnXacNhan.Name = "btnXacNhan";
            btnXacNhan.Size = new Size(75, 23);
            btnXacNhan.TabIndex = 2;
            btnXacNhan.Text = "Xác nhận";
            btnXacNhan.UseVisualStyleBackColor = true;
            btnXacNhan.Click += btnXacNhan_Click;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(12, 62);
            label1.Name = "label1";
            label1.Size = new Size(24, 15);
            label1.TabIndex = 1;
            label1.Text = "Giá";
            // 
            // txtGia
            // 
            txtGia.Location = new Point(108, 59);
            txtGia.Name = "txtGia";
            txtGia.Size = new Size(172, 23);
            txtGia.TabIndex = 1;
            // 
            // frmMain
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(405, 99);
            Controls.Add(btnXacNhan);
            Controls.Add(label1);
            Controls.Add(lblTenSanPham);
            Controls.Add(txtGia);
            Controls.Add(txtTenSanPham);
            FormBorderStyle = FormBorderStyle.FixedSingle;
            MaximizeBox = false;
            Name = "frmMain";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "🔒 Phạm Vi Truy Cập & Đóng Gói — Bí Mật Nội Tâm Của Object 💖";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox txtTenSanPham;
        private Label lblTenSanPham;
        private Button btnXacNhan;
        private Label label1;
        private TextBox txtGia;
    }
}
