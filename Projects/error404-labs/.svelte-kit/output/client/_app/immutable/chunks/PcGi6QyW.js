import{f as u,a as b}from"./1ECRtOeo.js";import"./DCRZB7lX.js";import{s as t,c as g,r as a,n as m}from"./BlOM0YrC.js";import{C as n}from"./y0KBGaBm.js";/* empty css        */var T=u(`<div class="wrapper"><h1>Sử dụng các tag cơ bản</h1> <h2>1. Giới Thiệu</h2> <div class="p">HTML (HyperText Markup Language) sử dụng các <strong>tag</strong> để đánh dấu và tổ chức nội dung
		trang web. Bài học này sẽ hướng dẫn bạn sử dụng các tag cơ bản nhất trong HTML.</div> <h2>2. Tag Tiêu Đề (Heading Tags)</h2> <div class="p">Các tag h1 đến h6 dùng để tạo tiêu đề, h1 là quan trọng nhất, h6 là ít quan trọng nhất.</div> <div class="p"><strong>Cú pháp:</strong></div> <!> <div class="p"><strong>Kết quả hiển thị:</strong></div> <img class="border" src="/tao-trang-web-tap-chi-dien-tu/bai01-0.png" alt="Bài 01: Sử dụng các tag cơ bản"/> <h2>3. Tag Đoạn Văn (Paragraph Tag)</h2> <div class="p">Tag &lt;p&gt; dùng để tạo một đoạn văn. Mỗi đoạn văn tự động có khoảng cách trước và sau.</div> <div class="p"><strong>Cú pháp:</strong></div> <!> <div class="p"><strong>Kết quả hiển thị:</strong></div> <img class="border" src="/tao-trang-web-tap-chi-dien-tu/bai01-1.png" alt="Bài 01: Sử dụng các tag cơ bản"/> <h2>4. Tag Ngắt Dòng (Break Tag)</h2> <div class="p">Tag &lt;br /&gt; dùng để tạo một dòng mới mà không tạo đoạn văn mới. Đây là một tag tự đóng
		(không có tag đóng).</div> <div class="p"><strong>Cú pháp:</strong></div> <!> <div class="p"><strong>Kết quả hiển thị:</strong></div> <img class="border" src="/tao-trang-web-tap-chi-dien-tu/bai01-2.png" alt="Bài 01: Sử dụng các tag cơ bản"/> <h2>5. Tags Định Dạng Văn Bản</h2> <table><thead><tr><th>Tag</th><th>Ý Nghĩa</th><th>Ví Dụ</th><th>Kết Quả</th></tr></thead><tbody><tr><td>&lt;strong&gt;</td><td>In đậm (quan trọng)</td><td>&lt;strong&gt;Quan trọng&lt;/strong&gt;</td><td><strong>Quan trọng</strong></td></tr><tr><td>&lt;em&gt;</td><td>In nghiêng (nhấn mạnh)</td><td>&lt;em&gt;Nhấn mạnh&lt;/em&gt;</td><td><em>Nhấn mạnh</em></td></tr><tr><td>&lt;u&gt;</td><td>Gạch chân</td><td>&lt;u&gt;Gạch chân&lt;/u&gt;</td><td><u>Gạch chân</u></td></tr></tbody></table> <h2>6. Các Thuộc Tính Cơ Bản</h2> <div class="p"><strong>6.1 Thuộc tính align (căn lề)</strong></div> <div class="p">Dùng để căn lề nội dung: left (trái), center (giữa), right (phải)</div> <!> <div class="p"><strong>6.2 Thuộc tính style (kiểu dáng)</strong></div> <div class="p">Dùng để thêm các kiểu dáng CSS trực tiếp trên tag</div> <!> <h2>7. Code Hoàn Chỉnh</h2> <details><summary>Tổng hợp tất cả các tag đã học</summary> <div class="full-code"><!></div></details> <img class="border" src="/tao-trang-web-tap-chi-dien-tu/bai01-3.png" alt="Bài 01: Sử dụng các tag cơ bản"/> <h2>8. Tổng Kết</h2> <table><thead><tr><th>Tag</th><th>Tác Dụng</th></tr></thead><tbody><tr><td>&lt;h1&gt; ... &lt;h6&gt;</td><td>Tạo tiêu đề cấp 1 đến cấp 6</td></tr><tr><td>&lt;p&gt;</td><td>Tạo đoạn văn</td></tr><tr><td>&lt;br /&gt;</td><td>Ngắt dòng</td></tr><tr><td>&lt;strong&gt;</td><td>In đậm văn bản</td></tr><tr><td>&lt;em&gt;</td><td>In nghiêng văn bản</td></tr><tr><td>&lt;u&gt;</td><td>Gạch chân văn bản</td></tr></tbody></table></div>`);function L(l){const p=`
		<!DOCTYPE html>
		<html lang="vi">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Sử dụng các tag cơ bản</title>
			</head>
			<body>
				<!-- Tiêu đề chính, căn giữa -->
				<h1 align="center">Bài 01: Sử dụng các tag cơ bản</h1>

				<!-- Tiêu đề phụ với gạch chân -->
				<h2 style="text-decoration: underline">Yêu cầu</h2>

				<!-- Đoạn văn in đậm -->
				<p style="font-weight: bold">Thiết kế trang web có nội dung như sau:</p>

				<!-- Nội dung căn giữa với ngắt dòng -->
				<p align="center">
					Lập trình Web tại Error404-Labs<br />
					Chào mừng các bạn đến với ngôn ngữ HTML
				</p>
			</body>
		</html>
	`;var d=T(),h=t(g(d),12);n(h,{code:`
		<h1>Tiêu đề cấp 1</h1>
		<h2>Tiêu đề cấp 2</h2>

		Ví dụ:
		<h1>Bài 01: Sử dụng các tag cơ bản</h1>
		<h2>Yêu cầu</h2>
	`});var i=t(h,12);n(i,{code:`
		<p>Nội dung đoạn văn</p>

		Ví dụ:
		<p>Thiết kế trang web có nội dung như sau:</p>
		<p>Lập trình Web tại Error404-Labs</p>
	`});var r=t(i,12);n(r,{code:`
		<br /> hoặc <br>

		Ví dụ:
		<p>
			Lập trình Web tại Error404-Labs<br />
			Chào mừng các bạn đến với ngôn ngữ HTML
		</p>
	`});var c=t(r,16);n(c,{code:`
		<h1 align="center">Tiêu đề căn giữa</h1>
		<p align="center">Đoạn văn căn giữa</p>
	`});var s=t(c,6);n(s,{code:`
		<h2 style="text-decoration: underline">Tiêu đề gạch chân</h2>
		<p style="font-weight: bold">Đoạn văn in đậm</p>
	`});var o=t(s,4),e=t(g(o),2),v=g(e);n(v,{code:p}),a(e),a(o),m(6),a(d),b(l,d)}export{L as default};
