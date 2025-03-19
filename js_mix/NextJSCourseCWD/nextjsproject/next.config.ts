import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true, // Tạo source maps cho production
  optimizeFonts: true, // Tối ưu hóa font
  compress: true, // Nén file
};

export default nextConfig;
