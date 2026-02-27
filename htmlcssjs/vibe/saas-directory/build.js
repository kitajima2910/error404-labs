const fs = require("fs");
const path = require("path");

const DIST_DIR = path.join(__dirname, "dist");

// Danh sách file cần copy sang dist/
const FILES_TO_COPY = ["index.html", "avatar_v2.avif"];

// Tạo thư mục dist nếu chưa có
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Copy từng file
FILES_TO_COPY.forEach((file) => {
  const src = path.join(__dirname, file);
  const dest = path.join(DIST_DIR, file);

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied: ${file} → dist/${file}`);
  } else {
    console.warn(`⚠️  Skipped (not found): ${file}`);
  }
});

// Nếu có biến VERCEL_PROD_URL trong env, tự inject vào index.html
const vercelUrl = process.env.VERCEL_PROD_URL || "";
if (vercelUrl) {
  const indexPath = path.join(DIST_DIR, "index.html");
  let html = fs.readFileSync(indexPath, "utf-8");
  html = html.replace(
    "var VERCEL_PROD_URL = '';",
    `var VERCEL_PROD_URL = '${vercelUrl}';`,
  );
  fs.writeFileSync(indexPath, html, "utf-8");
  console.log(`🔗 API Base URL set to: ${vercelUrl}`);
}

console.log("\n🎉 Build complete! Open dist/index.html to preview.");
if (!vercelUrl) {
  console.log(
    "💡 Tip: Set VERCEL_PROD_URL env to auto-inject API URL:\n   VERCEL_PROD_URL=https://your-app.vercel.app pnpm build",
  );
}
