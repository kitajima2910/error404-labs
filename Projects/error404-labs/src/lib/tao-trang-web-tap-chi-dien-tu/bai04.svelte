<script lang="ts">
	import CodeBlock from '../../components/CodeBlock.svelte';
	import './../huong-dan-hoc.css';

	const code = `
		<!doctype html>
		<html lang="vi">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Định dạng trang web (tt)</title>
			</head>
			<body style="background-image: url('https://iili.io/fdcwRZF.jpg'); color: #008888">
				<h1 style="text-align: center">lorem ipsum</h1>
				<p style="background-color: #339999; color: #fff; font-weight: 700; font-style: italic">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptate optio non
					dignissimos culpa ipsum nulla esse ab nihil veniam? Possimus quaerat excepturi totam
					dignissimos? Labore quis recusandae ab quod porro itaque deserunt sit maiores sint ut quisquam
					nesciunt quasi vitae tempore exercitationem, animi nostrum officiis iste, rerum illo eaque!
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est vel voluptate sequi optio
					impedit, doloremque corrupti nihil natus, aliquid adipisci minus fugiat cum ratione et
					voluptatum magnam ex non consequatur.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vel illo earum a sint magni. Ab
					cupiditate fuga vel, accusamus tempore facere consectetur sunt quod. Dignissimos est debitis
					hic ullam libero saepe, dolore provident asperiores in architecto necessitatibus, non laborum
					praesentium, eos minima atque velit alias! Autem officiis perferendis nemo.
				</p>
			</body>
		</html>
	`;
</script>

<div class="wrapper">
	<h1>Định dạng trang web (tiếp theo)</h1>
	<h2>1. Giới thiệu</h2>
	<div class="p">
		Bài giảng này tập trung vào các kỹ thuật định dạng nâng cao cho trang web HTML, bao gồm
		background, màu sắc, typography và styling inline.
	</div>
	<h2>2. Các yếu tố cơ bản</h2>
	<div class="p"><strong>2.1 Cấu trúc HTML cơ bản</strong></div>
	<ul>
		<li><strong>&lt;!doctype html&gt;:</strong> Khai báo loại tài liệu</li>
		<li><strong>&lt;html lang=&quot;vi&quot;&gt;:</strong> Xác định ngôn ngữ trang (Tiếng Việt)</li>
		<li><strong>&lt;head&gt;:</strong> Phần tiêu đề chứa metadata</li>
		<li><strong>&lt;body&gt;:</strong> Phần nội dung chính</li>
	</ul>
	<div class="p"><strong>2.2 Meta tags quan trọng</strong></div>
	<CodeBlock
		code={`
		<meta charset="UTF-8" />
	`}
	/>
	<div class="p">
		Xác định bộ ký tự UTF-8, cho phép hiển thị đúng các ký tự Tiếng Việt và các ký tự đặc biệt.
	</div>
	<CodeBlock
		code={`
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	`}
	/>
	<div class="p">
		Đảm bảo trang web tự động điều chỉnh kích thước phù hợp với các thiết bị khác nhau (responsive
		design).
	</div>
	<h2>3. Định dạng nâng cao</h2>
	<div class="p"><strong>3.1 Background cho trang</strong></div>
	<CodeBlock
		code={`
		<body style="background-image: url('...'); color: #008888">
	`}
	/>
	<ul>
		<li><strong>background-image:</strong> Thiết lập ảnh nền cho trang web</li>
		<li><strong>color:</strong> Định dạng màu chữ mặc định cho toàn trang</li>
	</ul>
	<div class="p"><strong>3.2 Căn chỉnh văn bản</strong></div>
	<CodeBlock
		code={`
		<h1 style="text-align: center">lorem ipsum</h1>
	`}
	/>
	<ul>
		<li><strong>text-align:</strong> center: Căn giữa tiêu đề</li>
	</ul>
	<div class="p"><strong>3.3 Định dạng đoạn văn (Paragraph styling)</strong></div>
	<CodeBlock
		code={`
		<p style="background-color: #339999; color: #fff; font-weight: 700; font-style: italic">
	`}
	/>
	<div class="p">Các thuộc tính được sử dụng:</div>
	<ul>
		<li><strong>background-color:</strong> Màu nền cho đoạn văn (#339999 = xanh đậm)</li>
		<li><strong>color:</strong> Màu chữ (#fff = trắng)</li>
		<li><strong>font-weight: 700:</strong> Làm chữ đậm (700 = bold)</li>
		<li><strong>font-style: italic:</strong> Làm chữ nghiêng</li>
	</ul>
	<h2>4. Hệ thống màu hex</h2>
	<div class="p">Trong ví dụ này sử dụng các màu hex:</div>
	<ul>
		<li><strong>#008888:</strong> Xanh đậm (màu chữ mặc định)</li>
		<li><strong>#339999:</strong> Xanh lục nhạt (nền đoạn văn)</li>
		<li><strong>#fff</strong> hay <strong>#ffffff:</strong> Trắng (chữ trắng)</li>
	</ul>
	<div class="p">
		<strong>Cách đọc:</strong> Mỗi màu hex gồm 6 ký tự: RR (đỏ), GG (xanh lá), BB (xanh dương)
	</div>
	<h2>5. Inline styling vs External CSS</h2>
	<div class="p">
		Code này sử dụng <strong>inline styling</strong> (ghi style trực tiếp trong thẻ HTML):
	</div>
	<CodeBlock
		code={`
		<element style="property: value; property: value;">
	`}
	/>
	<div class="p">
		<strong>Ưu điểm:</strong> Dễ kiểm soát, nhanh chóng áp dụng <strong>Nhược điểm:</strong> Khó bảo
		trì khi dự án lớn
	</div>
	<hr />
	<details>
		<summary>Xem Code</summary>
		<CodeBlock {code} />
	</details>
	<img
		class="border"
		src="/tao-trang-web-tap-chi-dien-tu/bai04-0.png"
		alt="Định dạng trang web (tiếp theo)"
	/>
	<h2>6. Ứng dụng thực tế</h2>
	<div class="p">Từ đoạn code trên, bạn có thể:</div>
	<ul>
		<li>1. Thay đổi URL hình ảnh nền</li>
		<li>2. Điều chỉnh màu sắc theo yêu cầu thiết kế</li>
		<li>
			3. Sử dụng các thuộc tính khác như <strong>font-size</strong>, <strong>padding</strong>,
			<strong>margin</strong>
		</li>
		<li>4. Tạo ra các trang web có giao diện đẹp và chuyên nghiệp</li>
	</ul>
	<h2>7. Bài tập thực hành</h2>
	<ul>
		<li>1. Thay đổi màu chữ mặc định thành màu khác</li>
		<li>2. Thêm <strong>font-size: 18px;</strong> cho tiêu đề</li>
		<li>3. Thay đổi ảnh nền thành ảnh của bạn</li>
		<li>4. Thêm <strong>border</strong> và <strong>padding</strong> cho các đoạn văn</li>
	</ul>
	<h2>8. Kết luận</h2>
	<div class="p">
		Định dạng trang web là bước quan trọng để tạo ra giao diện người dùng tốt. Hiểu rõ về màu sắc,
		typography, và layout sẽ giúp bạn thiết kế trang web chuyên nghiệp và hấp dẫn.
	</div>
</div>
