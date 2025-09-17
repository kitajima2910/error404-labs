namespace dowload_imgs
{
    partial class frmMain
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
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
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmMain));
            this.wvMain = new Microsoft.Web.WebView2.WinForms.WebView2();
            this.btnDownload = new System.Windows.Forms.Button();
            this.txtSearch = new System.Windows.Forms.TextBox();
            this.cbSize = new System.Windows.Forms.ComboBox();
            this.btnStop = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.wvMain)).BeginInit();
            this.SuspendLayout();
            // 
            // wvMain
            // 
            this.wvMain.AllowExternalDrop = true;
            this.wvMain.CreationProperties = null;
            this.wvMain.DefaultBackgroundColor = System.Drawing.Color.White;
            this.wvMain.Location = new System.Drawing.Point(11, 13);
            this.wvMain.Name = "wvMain";
            this.wvMain.Size = new System.Drawing.Size(0, 0);
            this.wvMain.TabIndex = 0;
            this.wvMain.ZoomFactor = 1D;
            // 
            // btnDownload
            // 
            this.btnDownload.Location = new System.Drawing.Point(316, 11);
            this.btnDownload.Name = "btnDownload";
            this.btnDownload.Size = new System.Drawing.Size(119, 23);
            this.btnDownload.TabIndex = 1;
            this.btnDownload.Text = "Tải ảnh";
            this.btnDownload.UseVisualStyleBackColor = true;
            this.btnDownload.Click += new System.EventHandler(this.btnDownload_Click);
            // 
            // txtSearch
            // 
            this.txtSearch.Location = new System.Drawing.Point(12, 12);
            this.txtSearch.Name = "txtSearch";
            this.txtSearch.Size = new System.Drawing.Size(207, 20);
            this.txtSearch.TabIndex = 2;
            // 
            // cbSize
            // 
            this.cbSize.FormattingEnabled = true;
            this.cbSize.Items.AddRange(new object[] {
            "10 ảnh",
            "20 ảnh",
            "30 ảnh",
            "40 ảnh",
            "50 ảnh",
            "60 ảnh",
            "70 ảnh",
            "80 ảnh",
            "90 ảnh",
            "100 ảnh"});
            this.cbSize.Location = new System.Drawing.Point(225, 12);
            this.cbSize.Name = "cbSize";
            this.cbSize.Size = new System.Drawing.Size(85, 21);
            this.cbSize.TabIndex = 3;
            // 
            // btnStop
            // 
            this.btnStop.Location = new System.Drawing.Point(441, 11);
            this.btnStop.Name = "btnStop";
            this.btnStop.Size = new System.Drawing.Size(119, 23);
            this.btnStop.TabIndex = 4;
            this.btnStop.Text = "Dừng tải";
            this.btnStop.UseVisualStyleBackColor = true;
            this.btnStop.Click += new System.EventHandler(this.btnStop_Click);
            // 
            // frmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(570, 46);
            this.Controls.Add(this.btnStop);
            this.Controls.Add(this.cbSize);
            this.Controls.Add(this.txtSearch);
            this.Controls.Add(this.btnDownload);
            this.Controls.Add(this.wvMain);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximizeBox = false;
            this.Name = "frmMain";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Tải nhiều ảnh từ Pinterest ver1.0.0 - Phạm Xuân Hoài";
            this.Load += new System.EventHandler(this.frmMain_Load);
            ((System.ComponentModel.ISupportInitialize)(this.wvMain)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Microsoft.Web.WebView2.WinForms.WebView2 wvMain;
        private System.Windows.Forms.Button btnDownload;
        private System.Windows.Forms.TextBox txtSearch;
        private System.Windows.Forms.ComboBox cbSize;
        private System.Windows.Forms.Button btnStop;
    }
}

