<script lang="ts">
	import CodeBlock from '../../components/CodeBlock.svelte';
	import './../huong-dan-hoc.css';

	const code: string = `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>ART KID GARDEN</title>
			</head>
			<body>
				<h1
					style="
						border-width: 3px;
						border-style: solid;
						border-color: #ee710e;
						text-align: center;
						color: #ee710e;
					"
				>
					ART KID GARDEN
				</h1>
				<p>
					<span style="font-size: 50px; color: #9c0105; font-weight: 700">A</span>rt Kid Garden là lớp
					học giáo dục nghệ thuật và kĩ năng dành cho nhóm trẻ từ 4 đến 12 tuổi, tập trung vào mục tiêu
					phát triển 4 năng lực nền tảng và cân bằng gốc thông qua các hoạt động đa dạng do Nhà giáo dục
					Phan Tường An (Cô Cỏ) xây dựng và phát triển. Nhiệm vụ của Art Kid Garden là xây dựng môi
					trường phù hợp <b><u>cho sự phát triển tự nhiên của trẻ.</u></b>
				</p>
				<h2 style="text-align: right; background-color: #ee710e; color: #fff">
					HỆ SINH THÁI MINDFLOW ART!
				</h2>
				<p style="text-align: right">
					<span style="font-size: 50px; color: #9c0105; font-weight: 700">A</span>rt Kid Garden là lớp
					học giáo dục <span style="color: #9c0105; font-weight: 700">nghệ thuật</span> và
					<span style="color: #9c0105; font-weight: 700">kĩ năng</span> cho trẻ từ 4 đến 12 tuổi, thành
					lập từ năm 2018. Sử dụng chương trình giáo dục nghệ thuật Mindflow Art do Nhà giáo dục
					<span style="background-color: #facb02">Phan Tường An</span> xây dựng và phát triển.
				</p>
			</body>
		</html>
	`;
</script>

<div class="wrapper">
	<h1>Định dạng văn bản (tt)</h1>
	<details>
		<summary>Xem Code</summary>
		<div class="full-code">
			<CodeBlock {code} />
		</div>
	</details>
	<img
		class="border"
		src="/tao-trang-web-tap-chi-dien-tu/bai06-0.png"
		alt="Bài 06: Định dạng inline"
	/>
	<h2>I. Khái niệm CSS Inline</h2>
	<div class="p">
		<strong>CSS Inline</strong> là cách viết CSS trực tiếp trong thuộc tính <strong>style</strong> của
		thẻ HTML. Phương pháp này áp dụng định dạng ngay tại phần tử cần thay đổi.
	</div>
	<div class="p"><strong>Cú pháp:</strong></div>
	<CodeBlock
		code={`
		<thẻ style="thuộc-tính: giá-trị; thuộc-tính: giá-trị;">
	`}
	/>
	<h2>II. Các Thuộc Tính Định Dạng Chính</h2>
	<div class="p"><strong>1. Định dạng đường viền (Border)</strong></div>
	<CodeBlock
		code={`
		border-width: 3px;      /* Độ dày đường viền */
		border-style: solid;    /* Kiểu viền (solid, dashed, dotted...) */
		border-color: #ee710e;  /* Màu viền */
	`}
	/>
	<div class="p"><strong>Ví dụ thực tế:</strong> Tiêu đề "ART KID GARDEN" có viền cam dày 3px</div>
	<div class="p"><strong>2. Căn chỉnh văn bản (Text Alignment)</strong></div>
	<CodeBlock
		code={`
		text-align: center;  /* Căn giữa */
		text-align: right;   /* Căn phải */
		text-align: left;    /* Căn trái (mặc định) */
	`}
	/>
	<div class="p"><strong>Ví dụ:</strong></div>
	<ul>
		<li>&lt;h1&gt; được căn giữa</li>
		<li>&lt;h2&gt; và đoạn văn thứ 2 được căn phải</li>
	</ul>
	<div class="p"><strong>3. Màu sắc (Color)</strong></div>
	<CodeBlock
		code={`
		color: #ee710e;              /* Màu chữ */
		background-color: #facb02;   /* Màu nền */
	`}
	/>
	<div class="p"><strong>Mã màu hex:</strong></div>
	<ul>
		<li><font color="#ee710e" style="background-color: #ccc">#ee710e</font> - Cam</li>
		<li><font color="#9c0105" style="background-color: #ccc">#9c0105</font> - Đỏ đậm</li>
		<li><font color="#facb02" style="background-color: #ccc">#facb02</font> - Vàng</li>
		<li><font color="#fff" style="background-color: #ccc">#fff</font> - Trắng</li>
	</ul>
	<div class="p"><strong>4. Kích thước và Độ đậm chữ</strong></div>
	<CodeBlock
		code={`
		font-size: 50px;      /* Kích thước chữ */
		font-weight: 700;     /* Độ đậm (400=normal, 700=bold) */
	`}
	/>
	<div class="p"><strong>Ví dụ:</strong> Chữ cái "A" đầu đoạn có kích thước 50px và màu đỏ đậm</div>
	<div class="p"><strong>5. Định dạng văn bản đặc biệt</strong></div>
	<CodeBlock
		code={`
		<b>Văn bản đậm</b>        <!-- Chữ in đậm -->
		<u>Văn bản gạch chân</u>  <!-- Gạch chân -->
		<span>Văn bản inline</span> <!-- Nhóm văn bản để định dạng -->
	`}
	/>
	<h2>III. Phân Tích Code Mẫu</h2>
	<div class="p"><strong>Ví dụ 1: Tiêu đề H1</strong></div>
	<CodeBlock
		code={`
		<h1 style="border-width: 3px; border-style: solid; 
			border-color: #ee710e; text-align: center; color: #ee710e;">
			ART KID GARDEN
		</h1>
	`}
	/>
	<div class="p"><strong>Kết quả:</strong> Tiêu đề màu cam, căn giữa, có viền cam 3px</div>
	<div class="p"><strong>Ví dụ 2: Chữ cái đầu Drop Cap</strong></div>
	<CodeBlock
		code={`
		<span style="font-size: 50px; color: #9c0105; font-weight: 700">A</span>rt Kid Garden...
	`}
	/>
	<div class="p">
		<strong>Kỹ thuật:</strong> Tách chữ "A" ra, phóng to và đổi màu để tạo hiệu ứng chữ cái đầu nổi bật
	</div>
	<div class="p"><strong>Ví dụ 3: Highlight Text</strong></div>
	<CodeBlock
		code={`
		<span style="background-color: #facb02">Phan Tường An</span>
	`}
	/>
	<div class="p"><strong>Kết quả:</strong> Tạo hiệu ứng highlight cho chữ "Phan Tường An"</div>
	<h2>IV. Lưu Ý Quan Trọng</h2>
	<div class="p"><strong>✅ Ưu điểm CSS Inline:</strong></div>
	<ul>
		<li>Áp dụng nhanh, trực tiếp</li>
		<li>Ưu tiên cao nhất (ghi đè CSS khác)</li>
	</ul>
	<div class="p"><strong>❌ Nhược điểm CSS Inline:</strong></div>
	<ul>
		<li>Khó bảo trì khi trang web lớn</li>
		<li>Không tái sử dụng được</li>
		<li>Code dài và khó đọc</li>
	</ul>
	<div class="p">
		<strong>Khuyến nghị:</strong> Sử dụng CSS Inline cho định dạng đặc biệt, nhanh chóng. Với dự án lớn
		nên dùng CSS External hoặc Internal.
	</div>
</div>
