# 🧭 SEO Hướng Dẫn Hoàn Chỉnh Cho Website Error404-Labs (SvelteKit)

## 🌐 Cấu trúc thư mục

Tạo 3 route trong `src/routes/`:

```
src/
└── routes/
    ├── hoc-lap-trinh-c-cpp/
    │   └── +page.svelte
    ├── hoc-lap-trinh-web/
    │   └── +page.svelte
    └── hoc-lap-trinh-ai/
        └── +page.svelte
```

---

## 🧩 1. Nội dung file `+page.svelte` cho từng trang

### 📘 `src/routes/hoc-lap-trinh-c-cpp/+page.svelte`

```svelte
<svelte:head>
	<title>Error404-Labs | Học lập trình C/C++ từ cơ bản đến nâng cao</title>
	<meta
		name="description"
		content="Khóa học lập trình C/C++ tại Error404-Labs. Học từ cơ bản đến nâng cao, hướng dẫn qua dự án thực tế, dễ hiểu, dễ ứng dụng."
	/>
	<meta
		name="keywords"
		content="học lập trình C++, C, error404 labs, học C, lập trình căn bản, hướng dẫn C++, dự án lập trình C++"
	/>
	<link rel="canonical" href="https://error404-labs.info.vn/hoc-lap-trinh-c-cpp" />
</svelte:head>

<article>
	<h1>Học lập trình C/C++ cùng Error404-Labs</h1>
	<p>
		C/C++ là ngôn ngữ nền tảng cho lập trình viên chuyên nghiệp. Tại Error404-Labs, bạn sẽ được học
		qua các ví dụ và dự án thực tế.
	</p>
	<ul>
		<li>Tổng quan C/C++ và ứng dụng trong phát triển phần mềm.</li>
		<li>Kiến thức cơ bản: biến, vòng lặp, điều kiện, hàm.</li>
		<li>Lập trình hướng đối tượng với class, struct, pointer.</li>
		<li>Dự án nhỏ: game console, thuật toán, xử lý file.</li>
	</ul>
</article>
```

---

### 🌐 `src/routes/hoc-lap-trinh-web/+page.svelte`

```svelte
<svelte:head>
	<title>Error404-Labs | Học lập trình Web Frontend & Backend hiện đại</title>
	<meta
		name="description"
		content="Khóa học lập trình Web với SvelteKit, HTML5, CSS3, JavaScript, Node.js và API. Học qua dự án thực tế cùng Error404-Labs."
	/>
	<meta
		name="keywords"
		content="học lập trình web, error404 labs, SvelteKit, JavaScript, Node.js, lập trình frontend, backend, fullstack"
	/>
	<link rel="canonical" href="https://error404-labs.info.vn/hoc-lap-trinh-web" />
</svelte:head>

<article>
	<h1>Học lập trình Web cùng Error404-Labs</h1>
	<p>
		Khóa học lập trình Web tại Error404-Labs giúp bạn xây dựng website thực tế với SvelteKit, HTML,
		CSS, JavaScript và API.
	</p>
	<ul>
		<li>Hiểu rõ cách hoạt động của Web: frontend, backend, server.</li>
		<li>Làm chủ HTML5, CSS3, và JavaScript hiện đại.</li>
		<li>Xây dựng ứng dụng với SvelteKit và REST API.</li>
		<li>Triển khai dự án thật lên Vercel, Firebase hoặc Neon DB.</li>
	</ul>
</article>
```

---

### 🤖 `src/routes/hoc-lap-trinh-ai/+page.svelte`

```svelte
<svelte:head>
	<title>Error404-Labs | Học lập trình AI & Machine Learning thực chiến</title>
	<meta
		name="description"
		content="Khóa học AI và Machine Learning tại Error404-Labs. Học Python, xử lý dữ liệu, xây mô hình trí tuệ nhân tạo thực tế."
	/>
	<meta
		name="keywords"
		content="học AI, học machine learning, error404 labs, python AI, học trí tuệ nhân tạo, deep learning, neural network"
	/>
	<link rel="canonical" href="https://error404-labs.info.vn/hoc-lap-trinh-ai" />
</svelte:head>

<article>
	<h1>Học lập trình AI cùng Error404-Labs</h1>
	<p>
		Tìm hiểu nền tảng Trí tuệ nhân tạo (AI) và Machine Learning qua các ví dụ thực tế. Học cách làm
		việc với dữ liệu và mô hình học máy.
	</p>
	<ul>
		<li>Làm quen với Python và các thư viện AI như TensorFlow, PyTorch.</li>
		<li>Phân tích dữ liệu và huấn luyện mô hình học máy cơ bản.</li>
		<li>Tạo chatbot, nhận dạng hình ảnh, và dự án AI nhỏ.</li>
	</ul>
</article>
```

---

## 🧩 2. Cập nhật `<head>` chung của trang chủ

Cập nhật lại thẻ `<head>` trong file `app.html` hoặc `+layout.svelte`:

```html
<title>Error404-Labs | Học lập trình C/C++, Web, Game, Mobile & AI - R&D Programmer</title>
<meta
	name="description"
	content="Error404-Labs là nơi học lập trình C/C++, Web, Game, Mobile và AI. Chia sẻ dự án, hướng dẫn và nghiên cứu phát triển công nghệ thực tế."
/>
<meta
	name="keywords"
	content="Error404-Labs, học lập trình, C++, Web Developer, Game Developer, AI, R&D, Phạm Xuân Hoài, kitajima2910, pxh2910"
/>
```

---

## 🧩 3. Structured Data (JSON-LD)

Dán đoạn này **trước `</head>`** trong `app.html`:

```html
<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "EducationalOrganization",
		"name": "Error404-Labs",
		"url": "https://error404-labs.info.vn/",
		"logo": "https://error404-labs.info.vn/favicon-96x96.png",
		"description": "RnD và học lập trình C/C++, C#, Java, Python, HTML, CSS, JS, JavaScript, Web, Game, Mobile, AI.",
		"sameAs": [
			"https://www.facebook.com/kitajima2910",
			"https://github.com/kitajima2910/error404-labs",
			"https://github.com/kitajima2910"
		],
		"knowsAbout": [
			"C/C++",
			"C#",
			"Java",
			"Python",
			"HTML",
			"CSS",
			"JS",
			"JavaScript",
			"Web Development",
			"Game Development",
			"AI",
			"Mobile App"
		],
		"founder": {
			"@type": "Person",
			"name": "Phạm Xuân Hoài",
			"jobTitle": "Research & Developer",
			"url": "https://error404-labs.info.vn/"
		}
	}
</script>
```

---

## 🧩 4. `robots.txt` (đặt trong thư mục `static/`)

```
User-agent: *
Allow: /

Sitemap: https://error404-labs.info.vn/sitemap.xml
```

---

## 🧩 5. `sitemap.xml` (đặt trong thư mục `static/`)

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://error404-labs.info.vn/</loc></url>
  <url><loc>https://error404-labs.info.vn/hoc-lap-trinh-c-cpp</loc></url>
  <url><loc>https://error404-labs.info.vn/hoc-lap-trinh-web</loc></url>
  <url><loc>https://error404-labs.info.vn/hoc-lap-trinh-ai</loc></url>
</urlset>
```

---

## 🧩 6. Đăng ký với **Google Search Console**

1. Vào: [https://search.google.com/search-console](https://search.google.com/search-console)
2. Chọn **“Add property” → Domain** (ví dụ: `error404-labs.info.vn`)
3. Xác minh quyền sở hữu (qua DNS hoặc file HTML)
4. Sau khi xác minh xong:
   - Mở tab **URL Inspection**
   - Nhập từng URL:

     ```
     https://error404-labs.info.vn/hoc-lap-trinh-c-cpp
     https://error404-labs.info.vn/hoc-lap-trinh-web
     https://error404-labs.info.vn/hoc-lap-trinh-ai
     ```

   - Nhấn **Request Indexing**

---

## 📈 7. Theo dõi kết quả

Sau 3–7 ngày, vào tab **Performance (Hiệu suất)** trong Search Console để xem:

- Các từ khóa mà người dùng tìm ra site bạn
- Số lần hiển thị (impressions)
- Tỷ lệ click (CTR)

---

## ✅ Kết quả mong đợi

Sau vài tuần, khi gõ trên Google:

- `error404 học lập trình`
- `error404 web`
- `error404 c/c++`
- `error404 ai`

→ Website của bạn sẽ bắt đầu xuất hiện trong kết quả tìm kiếm.

---

**Hoàn tất SEO chuẩn Google cho Error404-Labs 🚀**
Nếu bạn mở rộng thêm các chủ đề mới như:

- `/hoc-lap-trinh-game`
- `/hoc-lap-trinh-mobile`

→ chỉ cần nhân theo format này là Google sẽ tự hiểu website bạn là **trung tâm dạy và nghiên cứu lập trình toàn diện**.
