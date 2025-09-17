using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;
using Microsoft.Web.WebView2.Core;
using System.Collections.Generic;
using System.Threading;

namespace download_images_pinterest
{
    public partial class frmMain : Form
    {
        private bool _isExtracting = false;
        private readonly HttpClient _httpClient;
        private bool _cancelRequested = false;

        public frmMain()
        {
            InitializeComponent();
            //InitWebView();

            // Initialize HttpClient once
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
            _httpClient.Timeout = TimeSpan.FromSeconds(30); // Set timeout
        }

        private void frmMain_Load(object sender, EventArgs e)
        {
            wvMain.Source = new Uri("https://www.pinterest.com/");
            wvMain.Enabled = false;

            cbSize.SelectedItem = cbSize.Items[0];
            //MessageBox.Show($"{cbSize.Text.Split(' ')[0]}");
            _cancelRequested = false;
            if (btnDownload.Enabled)
            {
                btnStop.Enabled = false;
                txtSearch.Enabled = true;
            }
        }

        private async void InitWebView()
        {
            try
            {
                await wvMain.EnsureCoreWebView2Async(null);
                wvMain.CoreWebView2.Settings.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
                //wvMain.CoreWebView2.Settings.ArePasswordAutosaveEnabled = false;
                //wvMain.CoreWebView2.Settings.AreGeneralAutofillEnabled = false;

                string keyword = txtSearch.Text.Trim();
                string url = $"https://www.pinterest.com/search/pins/?q={Uri.EscapeDataString(keyword)}";
                wvMain.Source = new Uri(url);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Lỗi khởi tạo: {ex.Message}");
            }
        }

        private async void btnDownload_Click(object sender, EventArgs e)
        {
            if (txtSearch.Text.Trim() == "")
            {
                //MessageBox.Show("Vui lòng nhập từ khóa tìm kiếm.");
                MessageBox.Show(new Form { TopMost = true }, $"Vui lòng nhập từ khóa tìm kiếm.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            try
            {
                InitWebView();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Lỗi: {ex.Message}");
                return;
            }

            await Task.Delay(2500);

            if (_isExtracting) return;
            _isExtracting = true;

            int desiredCount = int.Parse(cbSize.Text.Split(' ')[0]);
            int downloadedCount = 0;
            var seen = new HashSet<string>();

            try
            {
                btnDownload.Text = "Đang tải...";
                btnDownload.Enabled = false;

                if (!btnDownload.Enabled)
                {
                    btnStop.Enabled = true;
                    txtSearch.Enabled = false;
                }

                var nameTimes = DateTime.Now.ToFileTime();

                while (downloadedCount < desiredCount && !_cancelRequested)
                {
                    // 1. Scroll xuống 1 đoạn
                    string scrollJs = "window.scrollBy(0, 1000);";
                    await wvMain.CoreWebView2.ExecuteScriptAsync(scrollJs);
                    await Task.Delay(1500); // chờ load

                    // 2. Lấy danh sách ảnh hiện tại
                    string js = @"
                    (function() {
                        const urls = [];
                        const images = document.querySelectorAll('img.hCL');
                        for (const img of images) {
                            if (img.className === 'hCL' &&
                                img.src &&
                                !img.src.startsWith('data:') &&
                                !img.src.includes('avatar') &&
                                !img.src.includes('profile')) {
                            
                                let cleanUrl = img.src.split('?')[0];
                                if (cleanUrl.includes('/236x/')) {
                                    cleanUrl = cleanUrl.replace('/236x/', '/736x/');
                                }
                                urls.push(cleanUrl);
                            }
                        }
                        return JSON.stringify(urls);
                    })();";

                    string result = await wvMain.CoreWebView2.ExecuteScriptAsync(js);

                    string cleanResult = result.Trim('"')
                                               .Replace("\\\"", "\"")
                                               .Replace("\\\\", "\\");

                    var imgUrls = JsonConvert.DeserializeObject<string[]>(cleanResult);

                    // 3. Với mỗi ảnh mới, tải xuống
                    foreach (var url in imgUrls)
                    {
                        if (seen.Contains(url)) continue;
                        seen.Add(url);

                        string extension = GetImageExtension(url);
                        string downloadPath = Path.Combine(Application.StartupPath, $"Images_{nameTimes}");
                        Directory.CreateDirectory(downloadPath);
                        string filename = Path.Combine(downloadPath, $"pinterest_img_{downloadedCount + 1:D3}{extension}");

                        try
                        {
                            byte[] imageData = await _httpClient.GetByteArrayAsync(url);
                            using (var fs = new FileStream(filename, FileMode.Create, FileAccess.Write, FileShare.None, 4096, useAsync: true))
                            {
                                await fs.WriteAsync(imageData, 0, imageData.Length);
                            }
                            downloadedCount++;

                            Console.WriteLine($"Downloaded {downloadedCount}/{desiredCount}: {filename}");
                        }
                        catch { }

                        if (downloadedCount >= desiredCount)
                            break;
                    }
                }

                //MessageBox.Show($"Xong, đã tải {downloadedCount} ảnh!");
                MessageBox.Show(new Form { TopMost = true }, $"Xong, đã tải {downloadedCount} ảnh!", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            finally
            {
                _isExtracting = false;
                btnDownload.Text = "Tải ảnh";
                btnDownload.Enabled = true;

                if (btnDownload.Enabled)
                {
                    btnStop.Enabled = false;
                    txtSearch.Enabled = true;
                }
            }
        }

        private string GetImageExtension(string url)
        {
            try
            {
                string cleanUrl = url.Split('?')[0];
                string extension = Path.GetExtension(cleanUrl);

                if (string.IsNullOrEmpty(extension) || extension.Length > 6)
                {
                    // Try to determine from URL patterns
                    if (url.Contains(".jpg") || url.Contains("jpeg"))
                        return ".jpg";
                    else if (url.Contains(".png"))
                        return ".png";
                    else if (url.Contains(".webp"))
                        return ".webp";
                    else if (url.Contains(".gif"))
                        return ".gif";
                    else
                        return ".jpg"; // Default
                }

                return extension;
            }
            catch
            {
                return ".jpg";
            }
        }

        private void btnStop_Click(object sender, EventArgs e)
        {
            _cancelRequested = true;
            btnDownload.Text = "Tải ảnh";
            btnDownload.Enabled = true;
            btnStop.Enabled = false;
            txtSearch.Enabled = true;
        }

        protected override void OnFormClosed(FormClosedEventArgs e)
        {
            _httpClient?.Dispose();
            base.OnFormClosed(e);
        }
    }
}
