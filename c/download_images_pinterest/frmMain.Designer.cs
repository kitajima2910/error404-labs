namespace download_images_pinterest
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmMain));
            btnDownload = new Button();
            wvMain = new Microsoft.Web.WebView2.WinForms.WebView2();
            txtSearch = new TextBox();
            cbSize = new ComboBox();
            btnStop = new Button();
            label1 = new Label();
            label2 = new Label();
            pictureBox1 = new PictureBox();
            ((System.ComponentModel.ISupportInitialize)wvMain).BeginInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox1).BeginInit();
            SuspendLayout();
            // 
            // btnDownload
            // 
            btnDownload.Location = new Point(542, 11);
            btnDownload.Name = "btnDownload";
            btnDownload.Size = new Size(93, 25);
            btnDownload.TabIndex = 0;
            btnDownload.Text = "Tải ảnh";
            btnDownload.UseVisualStyleBackColor = true;
            btnDownload.Click += btnDownload_Click;
            // 
            // wvMain
            // 
            wvMain.AllowExternalDrop = true;
            wvMain.CreationProperties = null;
            wvMain.DefaultBackgroundColor = Color.White;
            wvMain.ImeMode = ImeMode.Disable;
            wvMain.Location = new Point(12, 12);
            wvMain.Name = "wvMain";
            wvMain.Size = new Size(397, 207);
            wvMain.TabIndex = 1;
            wvMain.ZoomFactor = 1D;
            // 
            // txtSearch
            // 
            txtSearch.Location = new Point(415, 12);
            txtSearch.Name = "txtSearch";
            txtSearch.Size = new Size(121, 23);
            txtSearch.TabIndex = 2;
            // 
            // cbSize
            // 
            cbSize.DropDownStyle = ComboBoxStyle.DropDownList;
            cbSize.FormattingEnabled = true;
            cbSize.Items.AddRange(new object[] { "10 ảnh", "20 ảnh", "30 ảnh", "40 ảnh", "50 ảnh", "60 ảnh", "70 ảnh", "80 ảnh", "90 ảnh", "100 ảnh" });
            cbSize.Location = new Point(415, 41);
            cbSize.Name = "cbSize";
            cbSize.Size = new Size(121, 23);
            cbSize.TabIndex = 3;
            // 
            // btnStop
            // 
            btnStop.Location = new Point(542, 40);
            btnStop.Name = "btnStop";
            btnStop.Size = new Size(93, 25);
            btnStop.TabIndex = 0;
            btnStop.Text = "Dừng tải";
            btnStop.UseVisualStyleBackColor = true;
            btnStop.Click += btnStop_Click;
            // 
            // label1
            // 
            label1.Font = new Font("Segoe UI", 9F);
            label1.ForeColor = Color.Red;
            label1.Location = new Point(415, 102);
            label1.Name = "label1";
            label1.Size = new Size(218, 24);
            label1.TabIndex = 4;
            label1.Text = "Phiên bản - 1.0.0";
            // 
            // label2
            // 
            label2.Font = new Font("Segoe UI", 9F);
            label2.ForeColor = Color.Red;
            label2.Location = new Point(415, 126);
            label2.Name = "label2";
            label2.Size = new Size(218, 24);
            label2.TabIndex = 4;
            label2.Text = "Copyright © by Phạm Xuân Hoài";
            // 
            // pictureBox1
            // 
            pictureBox1.Image = (Image)resources.GetObject("pictureBox1.Image");
            pictureBox1.Location = new Point(475, 162);
            pictureBox1.Name = "pictureBox1";
            pictureBox1.Size = new Size(109, 57);
            pictureBox1.SizeMode = PictureBoxSizeMode.Zoom;
            pictureBox1.TabIndex = 5;
            pictureBox1.TabStop = false;
            // 
            // frmMain
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(645, 232);
            Controls.Add(pictureBox1);
            Controls.Add(label2);
            Controls.Add(label1);
            Controls.Add(cbSize);
            Controls.Add(txtSearch);
            Controls.Add(wvMain);
            Controls.Add(btnStop);
            Controls.Add(btnDownload);
            FormBorderStyle = FormBorderStyle.FixedSingle;
            Icon = (Icon)resources.GetObject("$this.Icon");
            MaximizeBox = false;
            Name = "frmMain";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Tải nhiều ảnh từ Pinterest - Phạm Xuân Hoài";
            Load += frmMain_Load;
            ((System.ComponentModel.ISupportInitialize)wvMain).EndInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox1).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button btnDownload;
        private Microsoft.Web.WebView2.WinForms.WebView2 wvMain;
        private TextBox txtSearch;
        private ComboBox cbSize;
        private Button btnStop;
        private Label label1;
        private Label label2;
        private PictureBox pictureBox1;
    }
}
