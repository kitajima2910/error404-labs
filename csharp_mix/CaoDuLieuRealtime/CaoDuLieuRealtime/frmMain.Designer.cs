namespace CaoDuLieuRealtime
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
            components = new System.ComponentModel.Container();
            wvMain = new Microsoft.Web.WebView2.WinForms.WebView2();
            lblDataBTCUSDT = new Label();
            Timer = new System.Windows.Forms.Timer(components);
            lblDataBTCUSDTPrice = new Label();
            ((System.ComponentModel.ISupportInitialize)wvMain).BeginInit();
            SuspendLayout();
            // 
            // wvMain
            // 
            wvMain.AllowExternalDrop = true;
            wvMain.CreationProperties = null;
            wvMain.DefaultBackgroundColor = Color.White;
            wvMain.Location = new Point(1, 0);
            wvMain.Name = "wvMain";
            wvMain.Size = new Size(319, 449);
            wvMain.TabIndex = 2;
            wvMain.ZoomFactor = 1D;
            // 
            // lblDataBTCUSDT
            // 
            lblDataBTCUSDT.AutoSize = true;
            lblDataBTCUSDT.Location = new Point(326, 9);
            lblDataBTCUSDT.Name = "lblDataBTCUSDT";
            lblDataBTCUSDT.Size = new Size(58, 15);
            lblDataBTCUSDT.TabIndex = 3;
            lblDataBTCUSDT.Text = "BTC/USDT";
            // 
            // Timer
            // 
            Timer.Enabled = true;
            Timer.Interval = 500;
            Timer.Tick += Timer_Tick;
            // 
            // lblDataBTCUSDTPrice
            // 
            lblDataBTCUSDTPrice.AutoSize = true;
            lblDataBTCUSDTPrice.Location = new Point(326, 36);
            lblDataBTCUSDTPrice.Name = "lblDataBTCUSDTPrice";
            lblDataBTCUSDTPrice.Size = new Size(106, 15);
            lblDataBTCUSDTPrice.TabIndex = 3;
            lblDataBTCUSDTPrice.Text = "BTC/USDT => Price";
            // 
            // frmMain
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(lblDataBTCUSDTPrice);
            Controls.Add(lblDataBTCUSDT);
            Controls.Add(wvMain);
            Name = "frmMain";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Cào Dữ Liệu Realtime";
            Load += frmMain_Load;
            ((System.ComponentModel.ISupportInitialize)wvMain).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion
        private Microsoft.Web.WebView2.WinForms.WebView2 wvMain;
        private Label lblDataBTCUSDT;
        private System.Windows.Forms.Timer Timer;
        private Label lblDataBTCUSDTPrice;
    }
}
