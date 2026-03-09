namespace Buoi05KeThua
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
            dataGridView = new DataGridView();
            comboBox = new ComboBox();
            txtTen = new TextBox();
            label1 = new Label();
            label2 = new Label();
            txtLuongCoBan = new TextBox();
            label3 = new Label();
            txtPhuCapSoSanPham = new TextBox();
            btnThem = new Button();
            btnTLNVVP = new Button();
            btnTLNVSP = new Button();
            ((System.ComponentModel.ISupportInitialize)dataGridView).BeginInit();
            SuspendLayout();
            // 
            // dataGridView
            // 
            dataGridView.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridView.Location = new Point(12, 12);
            dataGridView.Name = "dataGridView";
            dataGridView.Size = new Size(743, 226);
            dataGridView.TabIndex = 0;
            // 
            // comboBox
            // 
            comboBox.FormattingEnabled = true;
            comboBox.Location = new Point(12, 347);
            comboBox.Name = "comboBox";
            comboBox.Size = new Size(90, 23);
            comboBox.TabIndex = 1;
            // 
            // txtTen
            // 
            txtTen.Location = new Point(111, 275);
            txtTen.Name = "txtTen";
            txtTen.Size = new Size(122, 23);
            txtTen.TabIndex = 2;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(12, 278);
            label1.Name = "label1";
            label1.Size = new Size(80, 15);
            label1.TabIndex = 3;
            label1.Text = "Tên nhân viên";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(12, 306);
            label2.Name = "label2";
            label2.Size = new Size(80, 15);
            label2.TabIndex = 3;
            label2.Text = "Lương cơ bản";
            // 
            // txtLuongCoBan
            // 
            txtLuongCoBan.Location = new Point(111, 306);
            txtLuongCoBan.Name = "txtLuongCoBan";
            txtLuongCoBan.Size = new Size(122, 23);
            txtLuongCoBan.TabIndex = 2;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(254, 278);
            label3.Name = "label3";
            label3.Size = new Size(129, 15);
            label3.TabIndex = 3;
            label3.Text = "Phụ cấp / Số sản phẩm";
            // 
            // txtPhuCapSoSanPham
            // 
            txtPhuCapSoSanPham.Location = new Point(254, 306);
            txtPhuCapSoSanPham.Name = "txtPhuCapSoSanPham";
            txtPhuCapSoSanPham.Size = new Size(129, 23);
            txtPhuCapSoSanPham.TabIndex = 2;
            // 
            // btnThem
            // 
            btnThem.Location = new Point(111, 347);
            btnThem.Name = "btnThem";
            btnThem.Size = new Size(75, 23);
            btnThem.TabIndex = 4;
            btnThem.Text = "Thêm";
            btnThem.UseVisualStyleBackColor = true;
            btnThem.Click += btnThem_Click;
            // 
            // btnTLNVVP
            // 
            btnTLNVVP.Location = new Point(403, 306);
            btnTLNVVP.Name = "btnTLNVVP";
            btnTLNVVP.Size = new Size(352, 23);
            btnTLNVVP.TabIndex = 5;
            btnTLNVVP.Text = "Tổng lương nhân viên văn phòng";
            btnTLNVVP.UseVisualStyleBackColor = true;
            btnTLNVVP.Click += btnTLNVVP_Click;
            // 
            // btnTLNVSP
            // 
            btnTLNVSP.Location = new Point(403, 346);
            btnTLNVSP.Name = "btnTLNVSP";
            btnTLNVSP.Size = new Size(352, 23);
            btnTLNVSP.TabIndex = 5;
            btnTLNVSP.Text = "Tổng lương nhân viên sản phẩm";
            btnTLNVSP.UseVisualStyleBackColor = true;
            btnTLNVSP.Click += btnTLNVSP_Click;
            // 
            // frmMain
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(767, 398);
            Controls.Add(btnTLNVSP);
            Controls.Add(btnTLNVVP);
            Controls.Add(btnThem);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(label1);
            Controls.Add(txtPhuCapSoSanPham);
            Controls.Add(txtLuongCoBan);
            Controls.Add(txtTen);
            Controls.Add(comboBox);
            Controls.Add(dataGridView);
            MaximizeBox = false;
            Name = "frmMain";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Kế Thừa";
            Load += frmMain_Load;
            ((System.ComponentModel.ISupportInitialize)dataGridView).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private DataGridView dataGridView;
        private ComboBox comboBox;
        private TextBox txtTen;
        private Label label1;
        private Label label2;
        private TextBox txtLuongCoBan;
        private Label label3;
        private TextBox txtPhuCapSoSanPham;
        private Button btnThem;
        private Button btnTLNVVP;
        private Button btnTLNVSP;
    }
}
