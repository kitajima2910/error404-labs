<script lang="ts">
	import CodeBlock from '../../components/CodeBlock.svelte';
	import './../huong-dan-hoc.css';

	const code = `
		<!doctype html>
		<html lang="vi">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Định dạng trang web</title>
			</head>
			<body
				style="
					background-color: #a06d21;
					color: #fff;
					background-image: url('https://uploads.onecompiler.io/442t2gwzd/444zm92ph/lorem-ipsum.png');
					background-position: center center;
					background-repeat: no-repeat;
					background-attachment: fixed;
					background-size: 50%;
					background-blend-mode: darken;
				"
			>
				<h2 align="center" style="color: #ffcc00; text-transform: uppercase">Lorem Ipsum</h2>
				<p>Lorem5000...</p>
			</body>
		</html>
	`;
</script>

<div class="wrapper">
	<h1>📚 Định Dạng Trang Web <span>Học cách làm đẹp trang web với HTML và CSS</span></h1>
	<h2>1. Giới Thiệu</h2>
	<div class="p">
		Định dạng trang web là quá trình áp dụng các kiểu dáng, màu sắc, hình ảnh nền và các thuộc tính
		khác để làm cho trang web trở nên đẹp mắt và chuyên nghiệp.
	</div>
	<div class="tips">
		💡 Lưu ý: Định dạng giúp tạo trải nghiệm người dùng tốt hơn và làm tăng sự hấp dẫn của trang
		web.
	</div>
	<h2>2. Các Thành Phần Chính Trong Code Ví Dụ</h2>
	<div class="p"><strong>📄 Meta Tags (Thẻ Meta)</strong></div>
	<div class="p">Những thẻ này giúp trình duyệt hiểu được thông tin về trang:</div>
	<CodeBlock
		code={`
		<meta charset="UTF-8" /> 
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	`}
	/>
	<ul>
		<li>
			<strong>charset=&quot;UTF-8&quot;:</strong> Cho phép hiển thị các ký tự đặc biệt (tiếng Việt, emoji...)
		</li>
		<li>
			<strong>viewport:</strong> Làm cho trang web phản hồi trên các thiết bị khác nhau (điện thoại,
			máy tính...)
		</li>
	</ul>
	<h2>🎨 Các Thuộc Tính Style</h2>
	<div class="p">
		Sử dụng thuộc tính <strong>style</strong> để định dạng trực tiếp trên phần tử:
	</div>
	<CodeBlock
		code={`
		background-color: #a06d21; /* Màu nền */ 
		color: #fff; /* Màu chữ */ 
		background-image: url(...); /* Hình nền */
	`}
	/>
	<h2>3. Chi Tiết Các Thuộc Tính Định Dạng</h2>
	<div class="p"><strong>🌈 Màu Sắc</strong></div>
	<ul>
		<li><strong>background-color:</strong> Đặt màu nền cho phần tử</li>
		<li><strong>color:</strong> Đặt màu cho văn bản</li>
		<li>Sử dụng mã hex (ví dụ: #a06d21) hoặc tên màu (red, blue...)</li>
	</ul>
	<div class="p"><strong>🖼️ Hình Nền (Background)</strong></div>
	<ul>
		<li><strong>background-image:</strong> URL của hình ảnh</li>
		<li><strong>background-position:</strong> Vị trí hình ảnh (center center, top left...)</li>
		<li><strong>background-repeat:</strong> Lặp lại hình (repeat, no-repeat, repeat-x...)</li>
		<li><strong>background-attachment:</strong> Fixed giữ hình khi cuộn</li>
		<li><strong>background-size:</strong> Kích thước hình (50%, cover, contain...)</li>
		<li><strong>background-blend-mode:</strong> Cách trộn hình với nền (darken, lighten...)</li>
	</ul>
	<div class="p"><strong>✍️ Văn Bản</strong></div>
	<ul>
		<li>
			<strong>text-transform:</strong> uppercase (chữ hoa), lowercase (chữ thường), capitalize
		</li>
		<li><strong>text-align:</strong> Căn lề (center, left, right, justify)</li>
	</ul>
	<h2>4. Xem Trước Kết Quả</h2>
	<div class="p">Dưới đây là cách mã code được hiển thị:</div>
	<details>
		<summary>Xem Code</summary>
		<div class="full-code">
			<CodeBlock {code} />
		</div>
	</details>
	<img
		class="border"
		src="/tao-trang-web-tap-chi-dien-tu/bai03-0.png"
		alt="📚 Định Dạng Trang Web"
	/>
	<h2>5. 📌 Tóm Tắt Kiến Thức</h2>
	<div class="p"><strong>Những điểm chính cần nhớ:</strong></div>
	<ul>
		<li>Meta tags giúp trình duyệt hiểu trang web tốt hơn</li>
		<li>Màu sắc được chỉ định bằng mã hex hoặc tên màu</li>
		<li>Background có nhiều thuộc tính để điều chỉnh hình nền</li>
		<li>Text-transform thay đổi cách viết của chữ</li>
		<li>Kết hợp các thuộc tính tạo ra giao diện chuyên nghiệp</li>
	</ul>
</div>
