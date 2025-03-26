using Microsoft.Web.WebView2.Core;
using System;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CaoDuLieuRealtime
{
    public partial class frmMain : Form
    {
        public frmMain()
        {
            InitializeComponent();
        }

        private async void frmMain_Load(object sender, EventArgs e)
        {
            await InitializeWebView();
        }

        private async Task InitializeWebView()
        {
            try
            {
                var env = await CoreWebView2Environment.CreateAsync(null, Path.Combine(Path.GetTempPath(), "WebView2Cache"));
                await wvMain.EnsureCoreWebView2Async(env);

                wvMain.Source = new Uri("https://www.binance.com/vi/trade/BTC_USDT?type=spot", UriKind.Absolute);
                wvMain.CoreWebView2.Settings.AreBrowserAcceleratorKeysEnabled = false;
                wvMain.CoreWebView2.Settings.IsScriptEnabled = true;
                wvMain.CoreWebView2.Settings.AreDefaultContextMenusEnabled = false;

                //await wvMain.CoreWebView2.Profile.ClearBrowsingDataAsync();
            }
            catch (Exception ex)
            {
                MessageBox.Show("❌ Lỗi khởi tạo WebView2: " + ex.Message, "Lỗi", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }



        private async Task ProcessResultLabel(string selector, Label lblResult, string textForData)
        {
            if (wvMain.InvokeRequired) // Kiểm tra xem có đang chạy trên UI thread không
            {
                wvMain.Invoke(new Action(async () => await ProcessResultLabel(selector, lblResult, textForData)));
                return;
            }

            if (wvMain.CoreWebView2 != null)
            {
                string script = $@"
                (function() {{
                    let data = document.querySelector('{selector}');
                    if (data) {{
                        return data.innerText;
                    }} else {{
                        return 'null';
                    }}
                }})();";

                try
                {
                    string data = await wvMain.CoreWebView2.ExecuteScriptAsync(script);
                    data = data.Trim('"');

                    if (data == "null" || string.IsNullOrWhiteSpace(data))
                    {
                        lblResult.Text = "⚠️ Chưa lấy được dữ liệu. Đang thử lại...";
                    }
                    else
                    {
                        lblResult.Text = textForData + data;
                    }
                }
                catch (Exception ex)
                {
                    lblResult.Text = "❌ Lỗi: " + ex.Message;
                }
            }
            else
            {
                lblResult.Text = "❌ Lỗi: WebView2 chưa khởi tạo!";
            }
        }

        private async void Timer_Tick(object sender, EventArgs e)
        {
            await ProcessResultLabel(".showPrice", lblDataBTCUSDT, "📈 Biến động: ");
        }
    }
}
