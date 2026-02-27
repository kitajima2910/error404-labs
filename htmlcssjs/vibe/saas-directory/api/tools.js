const { neon } = require("@neondatabase/serverless");

// Cache connection outside handler to avoid cold start on every request
let _sql = null;
function getDb() {
  if (!_sql && process.env.DATABASE_URL) {
    _sql = neon(process.env.DATABASE_URL);
  }
  return _sql;
}

module.exports = async function handler(req, res) {
  // ============================================================
  // CORS: Whitelist các domain được phép gọi API
  // ============================================================
  const ALLOWED_ORIGINS = [
    "https://www.error404-labs.info.vn",
    "https://error404-labs.info.vn",
    "https://saas-directory-one.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    // Development (Live Server) - xoá/comment dòng dưới khi production
    "http://localhost:5500",
    "http://127.0.0.1:5500",
  ];

  const origin = req.headers["origin"];

  // Chặn request không có Origin (Postman, curl, server-to-server)
  if (!origin) {
    return res
      .status(403)
      .json({ error: "Forbidden: Direct API access không được phép." });
  }

  // Chặn origin không nằm trong whitelist
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return res
      .status(403)
      .json({ error: `Forbidden: Origin '${origin}' không được phép.` });
  }

  // Set CORS headers cho origin hợp lệ
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, HX-Request, HX-Trigger, HX-Trigger-Name, HX-Target, HX-Current-URL, HX-Boosted, HX-History-Restore-Request, HX-Prompt",
  );

  // Preflight Request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 1. Lọc Request
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  // 2. Lấy Query parameters
  const search = req.query.search || "";
  const category = req.query.category || "";

  try {
    // 3. Kết nối Neon Database
    if (!process.env.DATABASE_URL) {
      console.warn("Bạn chưa cấu hình DATABASE_URL.");
      return res.send(`
        <div class="col-span-full p-6 border-2 border-warning bg-warning/10 text-warning rounded-2xl flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
                <h3 class="font-bold text-lg">Thiếu cấu hình Database</h3>
                <p>Vui lòng cập nhật biến môi trường DATABASE_URL trong tệp .env của bạn để kết nối Postgres trên Neon.</p>
            </div>
        </div>
      `);
    }

    const sql = getDb();

    // 4. Xây dựng truy vấn
    let queryArgs = [];
    let queryConditions = ["1=1"];

    if (search.trim()) {
      queryArgs.push(`%${search.trim()}%`);
      queryConditions.push(
        `(name ILIKE $${queryArgs.length} OR description ILIKE $${queryArgs.length})`,
      );
    }

    if (category.trim()) {
      queryArgs.push(category.trim());
      queryConditions.push(`category = $${queryArgs.length}`);
    }

    let orderByClause = "id DESC"; // Default is 'newest'
    const sort = req.query.sort || "newest";

    if (sort === "alphabet") {
      orderByClause = "name ASC";
    } else if (sort === "popular") {
      // Assuming 'popular' is just an example for now (you could add a views column later).
      // Here we'll just mock it slightly differently, or keep identical.
      orderByClause = "id ASC";
    }

    let queryStr = `SELECT * FROM app3.tools WHERE ${queryConditions.join(" AND ")}`;
    queryStr += ` ORDER BY ${orderByClause} LIMIT 50`;

    // 5. Query dữ liệu
    // SDK @neondatabase/serverless yêu cầu gọi `.query()` nếu muốn truyền SQL builder string và biến params động thay vì string template.
    const toolsResult = await sql.query(queryStr, queryArgs);
    const tools = toolsResult.rows || toolsResult;

    // 6. Xử lý "Không tìm thấy"
    if (tools.length === 0) {
      return res.send(`
        <div class="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center bg-base-100 rounded-3xl border border-base-200 shadow-sm">
          <div class="w-24 h-24 mb-6 rounded-full bg-base-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-2">Không tìm thấy công cụ nào!</h3>
          <p class="text-base-content/60 max-w-sm mx-auto mb-6">Xin lỗi, chúng tôi không tìm thấy phần mềm nào khớp với từ khóa <strong>"${search}"</strong>. Thử một từ khóa khác xem sao?</p>
          <button class="btn btn-primary rounded-full px-8" onclick="document.querySelector('input[type=search]').value=''; document.querySelector('input[type=search]').dispatchEvent(new Event('input'))">
            Xóa bộ lọc
          </button>
        </div>
      `);
    }

    // 7. Render Card của DaisyUI
    const htmlResponse = tools
      .map(
        (tool) => `
      <div class="card bg-base-100 shadow-sm border border-base-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
        <!-- Image Cover -->
        <figure class="px-6 pt-6 shrink-0 h-48 bg-base-200/50 relative overflow-hidden group border-b border-base-200">
           ${
             tool.image_url
               ? `<img src="${tool.image_url}" alt="${tool.name}" class="object-contain h-full w-full max-h-32 transform group-hover:scale-105 transition-transform duration-500" loading="lazy" onerror="this.onerror=null; this.outerHTML='<div class=\\'w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-4xl font-bold opacity-50 uppercase shadow-inner\\'>${tool.name.charAt(0)}</div>';" />`
               : `<div class="w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-4xl font-bold opacity-50 uppercase shadow-inner">${tool.name.charAt(0)}</div>`
           }
            <div class="absolute top-4 right-4 badge ${tool.category ? "badge-primary" : "badge-ghost"} badge-sm shadow-sm">${tool.category || "Directory"}</div>
        </figure>

        <div class="card-body p-6 flex flex-col flex-grow gap-3">
          <h2 class="card-title text-xl font-bold font-['Outfit']">${tool.name}</h2>
          <p class="text-sm text-base-content/70 flex-grow leading-relaxed overflow-hidden text-ellipsis" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
            ${tool.description || "Chưa có thông tin mô tả chi tiết cho sản phẩm phần mềm SaaS này. Nhấn nút dưới để khám phá thêm."}
          </p>

          <div class="card-actions justify-end mt-4 pt-4 border-t border-base-200/60 w-full shrink-0">
             <a href="${tool.url || "#"}" target="_blank" rel="noopener noreferrer" class="btn btn-primary rounded-full btn-sm px-6 w-full lg:w-auto hover:scale-105 transition-transform">
                Visit Website
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
             </a>
          </div>
        </div>
      </div>
    `,
      )
      .join("");

    // Headers để báo hiệu kết quả trả về là chuẩn cho HTMX
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(htmlResponse);
  } catch (error) {
    console.error("Lỗi khi fetch tools:", error.message);
    return res.status(500).send(`
      <div class="col-span-full border border-error bg-error/10 text-error p-4 rounded-xl">
        <p class="font-bold">Database Error</p>
        <p class="text-sm opacity-80">${error.message}</p>
      </div>
    `);
  }
};
