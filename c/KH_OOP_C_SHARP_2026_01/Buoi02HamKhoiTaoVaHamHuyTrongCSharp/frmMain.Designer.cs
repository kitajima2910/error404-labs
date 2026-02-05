namespace Buoi02HamKhoiTaoVaHamHuyTrongCSharp
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
            lblMa01 = new Label();
            lblTen01 = new Label();
            lblGia01 = new Label();
            label1 = new Label();
            btnDuLieu01 = new Button();
            label2 = new Label();
            lblMa02 = new Label();
            lblTen02 = new Label();
            lblGia02 = new Label();
            btnDuLieu02 = new Button();
            SuspendLayout();
            // 
            // lblMa01
            // 
            lblMa01.AutoSize = true;
            lblMa01.Location = new Point(28, 69);
            lblMa01.Name = "lblMa01";
            lblMa01.Size = new Size(49, 15);
            lblMa01.TabIndex = 0;
            lblMa01.Text = "lblMa01";
            // 
            // lblTen01
            // 
            lblTen01.AutoSize = true;
            lblTen01.Location = new Point(28, 97);
            lblTen01.Name = "lblTen01";
            lblTen01.Size = new Size(50, 15);
            lblTen01.TabIndex = 0;
            lblTen01.Text = "lblTen01";
            // 
            // lblGia01
            // 
            lblGia01.AutoSize = true;
            lblGia01.Location = new Point(28, 121);
            lblGia01.Name = "lblGia01";
            lblGia01.Size = new Size(49, 15);
            lblGia01.TabIndex = 0;
            lblGia01.Text = "lblGia01";
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Segoe UI", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label1.Location = new Point(28, 25);
            label1.Name = "label1";
            label1.Size = new Size(118, 15);
            label1.TabIndex = 1;
            label1.Text = "Constructor Default";
            // 
            // btnDuLieu01
            // 
            btnDuLieu01.Location = new Point(296, 113);
            btnDuLieu01.Name = "btnDuLieu01";
            btnDuLieu01.Size = new Size(75, 23);
            btnDuLieu01.TabIndex = 2;
            btnDuLieu01.Text = "Tải Dữ Liệu";
            btnDuLieu01.UseVisualStyleBackColor = true;
            btnDuLieu01.Click += btnDuLieu01_Click;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Font = new Font("Segoe UI", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label2.Location = new Point(28, 188);
            label2.Name = "label2";
            label2.Size = new Size(116, 15);
            label2.TabIndex = 1;
            label2.Text = "Constructor Params";
            // 
            // lblMa02
            // 
            lblMa02.AutoSize = true;
            lblMa02.Location = new Point(28, 235);
            lblMa02.Name = "lblMa02";
            lblMa02.Size = new Size(49, 15);
            lblMa02.TabIndex = 0;
            lblMa02.Text = "lblMa02";
            // 
            // lblTen02
            // 
            lblTen02.AutoSize = true;
            lblTen02.Location = new Point(28, 262);
            lblTen02.Name = "lblTen02";
            lblTen02.Size = new Size(50, 15);
            lblTen02.TabIndex = 0;
            lblTen02.Text = "lblTen02";
            // 
            // lblGia02
            // 
            lblGia02.AutoSize = true;
            lblGia02.Location = new Point(28, 287);
            lblGia02.Name = "lblGia02";
            lblGia02.Size = new Size(49, 15);
            lblGia02.TabIndex = 0;
            lblGia02.Text = "lblGia02";
            // 
            // btnDuLieu02
            // 
            btnDuLieu02.Location = new Point(296, 279);
            btnDuLieu02.Name = "btnDuLieu02";
            btnDuLieu02.Size = new Size(75, 23);
            btnDuLieu02.TabIndex = 2;
            btnDuLieu02.Text = "Tải Dữ Liệu";
            btnDuLieu02.UseVisualStyleBackColor = true;
            btnDuLieu02.Click += btnDuLieu02_Click;
            // 
            // frmMain
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(400, 333);
            Controls.Add(btnDuLieu02);
            Controls.Add(btnDuLieu01);
            Controls.Add(label2);
            Controls.Add(label1);
            Controls.Add(lblGia02);
            Controls.Add(lblGia01);
            Controls.Add(lblTen02);
            Controls.Add(lblTen01);
            Controls.Add(lblMa02);
            Controls.Add(lblMa01);
            FormBorderStyle = FormBorderStyle.FixedSingle;
            MaximizeBox = false;
            Name = "frmMain";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "🚀🐣 Hàm Khởi Tạo & Hàm Hủy Trong C#";
            Load += frmMain_Load;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lblMa01;
        private Label lblTen01;
        private Label lblGia01;
        private Label label1;
        private Button btnDuLieu01;
        private Label label2;
        private Label lblMa02;
        private Label lblTen02;
        private Label lblGia02;
        private Button btnDuLieu02;
    }
}
