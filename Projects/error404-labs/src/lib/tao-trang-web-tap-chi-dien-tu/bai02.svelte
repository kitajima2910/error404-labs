<script lang="ts">
	import CodeBlock from '../../components/CodeBlock.svelte';
	import './../huong-dan-hoc.css';

	const code: string = `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Sử dụng các tag cơ bản</title>
			</head>
			<body>
				<h1 align="center" style="color: #006600">Bài 02: Sử dụng các tag cơ bản (tt)</h1>
				<h2 style="text-decoration: underline; color: #0000ff">Yêu cầu</h2>
				<p style="font-weight: 700">Thiết kế trang web có nội dung như sau:</p>
				<h2 align="center" style="color: #ff3399; background-color: #fecffd">-:- BÀN PHÍM -:-</h2>
				<div style="background-color: #ffffcc">
					<p align="center" style="color: #0000ff; font-style: italic">
						Bàn phím im lìm dưới ánh đèn,<br />Mười ngón tay lướt trên nền,<br />Nét chữ, dòng thơ, hay
						nốt nhạc,<br />Âm thanh cất lên, chẳng còn im lặng.
					</p>
					<hr width="250" />
					<p align="center" style="color: #006600; font-style: italic">
						Gõ nhịp thời gian, từng giây, từng phút,<br />Công việc, giải trí, chẳng chút ngập ngừng,<br />Dù
						là sáng tác hay làm bài tập,<br />Bàn phím âm thầm, bênh cạnh ta cùng.
					</p>
				</div>
			</body>
		</html>	
	`;
</script>

<div class="wrapper">
	<h1>Sử dụng các tag cơ bản (tt)</h1>
	<h2>1️⃣ Cấu Trúc Cơ Bản của HTML</h2>
	<div class="p">Mỗi trang HTML cần có các thẻ cơ bản sau:</div>
	<div class="p"><strong>&lt;!DOCTYPE html&gt;</strong></div>
	<div class="p">Khai báo kiểu tài liệu, cho trình duyệt biết đây là HTML5</div>
	<CodeBlock code={`<!DOCTYPE html>`} />
	<div class="p"><strong>&lt;html&gt;</strong></div>
	<div class="p">Thẻ gốc chứa toàn bộ nội dung trang web</div>
	<CodeBlock
		code={`
		<html lang="vi"> ... </html>
	`}
	/>
	<div class="p"><strong>&lt;head&gt;</strong></div>
	<div class="p">Chứa thông tin meta của trang (tiêu đề, ký tự, v.v.)</div>
	<CodeBlock
		code={`
		<head>
			<meta charset="UTF-8">
			<title>Tiêu đề</title>
		</head>
	`}
	/>
	<div class="p"><strong>&lt;body&gt;</strong></div>
	<div class="p">Chứa nội dung hiển thị trên trang web</div>
	<CodeBlock
		code={`
		<body> ... </body>
	`}
	/>
	<h2>2️⃣ Thẻ Tiêu Đề (Heading Tags)</h2>
	<div class="p">Dùng để tạo các tiêu đề với mức độ khác nhau:</div>
	<div class="p"><strong>&lt;h1&gt; đến &lt;h6&gt;</strong></div>
	<div class="p">Tạo tiêu đề từ cấp 1 (lớn nhất) đến cấp 6 (nhỏ nhất)</div>
	<CodeBlock
		code={`
		<h1>Tiêu đề cấp 1</h1>
		<h2>Tiêu đề cấp 2</h2>
		<h3>Tiêu đề cấp 3</h3>
	`}
	/>
	<div class="tips">
		💡 Mẹo: Luôn dùng h1 cho tiêu đề chính của trang, h2 cho phần tiêu đề, và tiếp tục theo thứ tự
		để tốt cho SEO.
	</div>
	<h2>3️⃣ Thẻ Đoạn Văn và Ngắt Dòng</h2>
	<div class="p"><strong>&lt;p&gt;</strong></div>
	<div class="p">Tạo một đoạn văn, có khoảng cách trên dưới tự động</div>
	<CodeBlock
		code={`
		<p>Đây là một đoạn văn.</p>
	`}
	/>
	<div class="p"><strong>&lt;br&gt;</strong></div>
	<div class="p">Ngắt dòng (break line) - không cần thẻ đóng</div>
	<CodeBlock
		code={`
		Dòng 1<br>Dòng 2
	`}
	/>
	<div class="p"><strong>&lt;hr&gt;</strong></div>
	<div class="p">Vạch ngang để tách biệt các phần nội dung</div>
	<CodeBlock
		code={`
		<hr>
	`}
	/>
	<h2>4️⃣ Thẻ Định Dạng Text</h2>
	<div class="p"><strong>&lt;strong&gt;</strong></div>
	<div class="p">In đậm văn bản (semantic, dùng cho nội dung quan trọng)</div>
	<CodeBlock
		code={`
		<strong>Văn bản quan trọng</strong>
	`}
	/>
	<div class="p"><strong>&lt;em&gt;</strong></div>
	<div class="p">In nghiêng văn bản (semantic, nhấn mạnh)</div>
	<CodeBlock
		code={`
		<em>Văn bản nghiêng</em>
	`}
	/>
	<div class="p"><strong>&lt;div&gt;</strong></div>
	<div class="p">Khối container để nhóm các phần tử lại với nhau</div>
	<CodeBlock
		code={`
		<div>Nội dung</div>
	`}
	/>
	<h2>5️⃣ Các Thuộc Tính Cơ Bản</h2>
	<div class="p"><strong>style</strong></div>
	<div class="p">Thêm CSS inline để tùy chỉnh màu sắc, kích thước, v.v.</div>
	<CodeBlock
		code={`
		<p style="color: blue; font-size: 18px;">Text</p>
	`}
	/>
	<div class="p"><strong>align</strong></div>
	<div class="p">Căn chỉnh nội dung (left, center, right)</div>
	<CodeBlock
		code={`
		<h1 align="center">Tiêu đề</h1>
	`}
	/>
	<div class="p"><strong>bgcolor / background-color</strong></div>
	<div class="p">Đặt màu nền cho phần tử</div>
	<CodeBlock
		code={`
		<div style="background-color: #ffffcc;"></div>
	`}
	/>
	<h2>6️⃣ Demo - Ứng Dụng Thực Tế</h2>
	<div class="p">Dưới đây là ví dụ từ code ban đầu được hiển thị:</div>
	<details>
		<summary>Xem Code</summary>
		<div class="full-code">
			<CodeBlock {code} />
		</div>
	</details>
	<img
		class="border"
		src="/tao-trang-web-tap-chi-dien-tu/bai02-0.png"
		alt="Bài 02: Sử dụng các tag cơ bản (tt)"
	/>
	<div class="tips">
		<div class="p"><strong>📝 Phân tích code:</strong></div>
		<ul>
			<li>Sử dụng &lt;h3&gt; cho tiêu đề chính</li>
			<li>Sử dụng &lt;p&gt; cho các đoạn văn</li>
			<li>Sử dụng &lt;br&gt; để ngắt dòng thơ</li>
			<li>Sử dụng style để tùy chỉnh màu sắc, kiểu chữ</li>
			<li>Sử dụng &lt;hr&gt; để phân tách nội dung</li>
			<li>Sử dụng &lt;div&gt; để nhóm các phần tử</li>
		</ul>
	</div>
	<h2>7️⃣ Kiến Thức Cần Nhớ</h2>
	<div class="tips">
		<ul>
			<li>HTML có cấu trúc nhất định: &lt;html&gt; → &lt;head&gt; + &lt;body&gt;</li>
			<li>Các thẻ tiêu đề (&lt;h1&gt;-&lt;h6&gt;) giúp tổ chức nội dung</li>
			<li>Các thẻ định dạng (&lt;strong&gt;, &lt;em&gt;) nhấn mạnh nội dung</li>
			<li>Thuộc tính style giúp tùy chỉnh giao diện</li>
			<li>Luôn sử dụng các thẻ semantic (có ý nghĩa) cho tốt SEO</li>
		</ul>
	</div>
</div>
