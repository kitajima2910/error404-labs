namespace Buoi01DoiTuongVaLopTrongCSharp
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
            lblTen = new Label();
            lblTuoi = new Label();
            lblThongTin = new Label();
            label1 = new Label();
            SuspendLayout();
            // 
            // lblTen
            // 
            lblTen.AutoSize = true;
            lblTen.Font = new Font("Segoe UI", 20.25F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTen.Location = new Point(12, 9);
            lblTen.Name = "lblTen";
            lblTen.Size = new Size(62, 37);
            lblTen.TabIndex = 0;
            lblTen.Text = "Tên";
            // 
            // lblTuoi
            // 
            lblTuoi.AutoSize = true;
            lblTuoi.Font = new Font("Segoe UI", 20.25F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTuoi.Location = new Point(12, 66);
            lblTuoi.Name = "lblTuoi";
            lblTuoi.Size = new Size(72, 37);
            lblTuoi.TabIndex = 0;
            lblTuoi.Text = "Tuổi";
            // 
            // lblThongTin
            // 
            lblThongTin.AutoSize = true;
            lblThongTin.Font = new Font("Segoe UI", 20.25F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblThongTin.Location = new Point(12, 129);
            lblThongTin.Name = "lblThongTin";
            lblThongTin.Size = new Size(150, 37);
            lblThongTin.TabIndex = 0;
            lblThongTin.Text = "Tuổi + Tên";
            // 
            // label1
            // 
            label1.Location = new Point(12, 106);
            label1.Name = "label1";
            label1.Size = new Size(487, 23);
            label1.TabIndex = 1;
            label1.Text = "----------------------------------------------------------------------------------------------";
            // 
            // frmMain
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(511, 180);
            Controls.Add(label1);
            Controls.Add(lblThongTin);
            Controls.Add(lblTuoi);
            Controls.Add(lblTen);
            FormBorderStyle = FormBorderStyle.FixedSingle;
            MaximizeBox = false;
            Name = "frmMain";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "🚀 ĐỐI TƯỢNG & LỚP TRONG C#";
            Load += frmMain_Load;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lblTen;
        private Label lblTuoi;
        private Label lblThongTin;
        private Label label1;
    }
}
