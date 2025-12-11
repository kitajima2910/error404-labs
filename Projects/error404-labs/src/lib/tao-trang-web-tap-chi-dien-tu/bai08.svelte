<script lang="ts">
	import CodeBlock from '../../components/CodeBlock.svelte';
	import './../huong-dan-hoc.css';

	const code: string = `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Tạo bảng</title>
			</head>
			<body style="background-color: #ffedca">
				<div style="text-align: center; color: #cc6600">
					<h1 style="text-transform: capitalize">Các món ngon Sài Gòn</h1>
				</div>
				<div style="display: flex; justify-content: center">
					<div style="width: 300px; height: 200px">
						<img src="https://iili.io/f2sr8UG.png" alt="Cafe" width="100%" height="100%" />
					</div>
					<div>
						<table
							width="300px"
							border="1"
							bordercolor="#a5818e"
							cellpadding="5"
							cellspacing="0"
							style="border-collapse: collapse"
						>
							<thead style="background-color: #cc6600; color: #ffffff; font-weight: 700">
								<tr>
									<th>STT</th>
									<th>Tên món ăn</th>
								</tr>
							</thead>
							<tr style="background-color: #fff">
								<td>1.</td>
								<td>Cháo lòng</td>
							</tr>
							<tr>
								<td>2.</td>
								<td>Bánh mì</td>
							</tr>
							<tr style="background-color: #fff">
								<td>3.</td>
								<td>Xôi</td>
							</tr>
							<tr>
								<td>4.</td>
								<td>Bột chiên</td>
							</tr>
							<tr style="background-color: #fff">
								<td>5.</td>
								<td>Bún bò</td>
							</tr>
							<tr>
								<td>6.</td>
								<td>Hủ tiếu</td>
							</tr>
							<tr style="background-color: #fff">
								<td>7.</td>
								<td>Bánh canh</td>
							</tr>
							<tr>
								<td>8.</td>
								<td>Cơm tấm</td>
							</tr>
							<tr style="background-color: #fff">
								<td>9.</td>
								<td>Bánh khọt</td>
							</tr>
							<tr>
								<td>10.</td>
								<td>Bánh xèo</td>
							</tr>
						</table>
					</div>
				</div>
			</body>
		</html>
	`;
</script>

<div class="wrapper">
	<h1>Bài Giảng: Tạo Bảng trong HTML</h1>
	<h2>1. Giới Thiệu Về Bảng HTML</h2>
	<div class="p">
		Bảng (table) là một cấu trúc quan trọng trong HTML để hiển thị dữ liệu có tổ chức theo hàng và
		cột. Trong bài này, chúng ta sẽ tìm hiểu cách tạo bảng thông qua ví dụ danh sách món ăn Sài Gòn.
	</div>
	<h2>2. Cấu Trúc Cơ Bản Của Bảng</h2>
	<div class="p"><strong>2.1 Các Thẻ Chính</strong></div>
	<CodeBlock
		code={`
		<table>      <!-- Khởi tạo bảng -->
			<thead>    <!-- Phần tiêu đề bảng -->
				<tr>     <!-- Hàng (table row) -->
					<th>   <!-- Ô tiêu đề (table header) -->
			<tbody>    <!-- Phần thân bảng (tùy chọn) -->
				<tr>     <!-- Hàng dữ liệu -->
					<td>   <!-- Ô dữ liệu (table data) -->
	`}
	/>
	<div class="p"><strong>2.2 Phân Tích Code Mẫu</strong></div>
	<div class="p"><strong>Bảng món ăn có cấu trúc:</strong></div>
	<ul>
		<li><code>&lt;table&gt;</code> - Thẻ bao ngoài tạo bảng</li>
		<li><code>&lt;thead&gt;</code> - Chứa hàng tiêu đề</li>
		<li><code>&lt;tr&gt;</code> - Mỗi hàng trong bảng</li>
		<li><code>&lt;th&gt;</code> - Ô tiêu đề (STT, Tên món ăn)</li>
		<li><code>&lt;td&gt;</code> - Ô dữ liệu (1., Cháo lòng...)</li>
	</ul>
	<h2>3. Thuộc Tính Của Bảng</h2>
	<div class="p"><strong>3.1 Thuộc Tính Căn Bản</strong></div>
	<CodeBlock
		code={`
			<table
				width="300px"           <!-- Chiều rộng bảng -->
				border="1"              <!-- Độ dày viền -->
				bordercolor="#a5818e"   <!-- Màu viền -->
				cellpadding="5"         <!-- Khoảng cách nội dung đến viền ô -->
				cellspacing="0"         <!-- Khoảng cách giữa các ô -->
			>
		`}
	/>
	<div class="p"><strong>Giải thích:</strong></div>
	<ul>
		<li><code>width</code> - Chiều rộng bảng</li>
		<li><code>border</code> - Độ dày viền</li>
		<li><code>bordercolor</code> - Màu viền</li>
		<li><code>cellpadding</code> - Khoảng cách nội dung đến viền ô</li>
		<li><code>cellspacing</code> - Khoảng cách giữa các ô</li>
	</ul>
	<div class="p"><strong>3.2 CSS Inline</strong></div>
	<CodeBlock code={`style="border-collapse: collapse"`} />
	<ul>
		<li>
			<code>border-collapse: collapse</code> - Gộp viền của các ô lại với nhau, tạo viền đơn thay vì
			viền đôi
		</li>
	</ul>
	<h2>4. Tạo Hiệu Ứng Hàng Đan Xen</h2>
	<div class="p">Trong code mẫu, các hàng có màu nền xen kẽ:</div>
	<CodeBlock
		code={`
			<!-- Hàng lẻ - màu trắng -->
			<tr style="background-color: #fff">
				<td>1.</td>
				<td>Cháo lòng</td>
			</tr>

			<!-- Hàng chẵn - không có background (kế thừa màu mặc định) -->
			<tr>
				<td>2.</td>
				<td>Bánh mì</td>
			</tr>
		`}
	/>
	<div class="p">
		<strong>Lợi ích:</strong> Giúp người đọc dễ theo dõi từng hàng, tăng tính dễ đọc.
	</div>
	<h2>5. Styling Cho Tiêu Đề Bảng</h2>
	<CodeBlock code={`<thead style="background-color: #cc6600; color: #ffffff; font-weight: 700">`} />
	<div class="p"><strong>Phân tích:</strong></div>
	<ul>
		<li><code>background-color: #cc6600</code> - Màu nền cam đậm</li>
		<li><code>color: #ffffff</code> - Màu chữ trắng</li>
		<li><code>font-weight: 700</code> - Độ đậm chữ</li>
	</ul>
	<h2>6. Bố Cục Tổng Thể</h2>
	<div class="p"><strong>6.1 Căn Giữa Nội Dung</strong></div>
	<CodeBlock code={`<div style="display: flex; justify-content: center">`} />
	<ul>
		<li><code>display: flex</code> - Sử dụng flexbox</li>
		<li><code>justify-content: center</code> - Căn giữa nội dung</li>
	</ul>
	<div class="p"><strong>6.2 Kết Hợp Ảnh Và Bảng</strong></div>
	<div class="p">Code đặt ảnh và bảng cạnh nhau:</div>
	<CodeBlock
		code={`
		<div style="width: 300px; height: 200px">
			<img src="..." width="100%" height="100%" />
		</div>
		<div>
			<table>...</table>
		</div>
	`}
	/>
	<h2>7. Code Mẫu</h2>
	<details>
		<summary>Xem Code</summary>
		<div class="full-code">
			<CodeBlock {code} />
		</div>
	</details>
	<img class="border" src="/tao-trang-web-tap-chi-dien-tu/bai08-0.png" alt="📘 Bài 08: Tạo bảng" />
	<h2>8. Lưu Ý Quan Trọng</h2>
	<div class="p"><strong>⚠️ Các thuộc tính HTML cũ:</strong></div>
	<ul>
		<li>
			<code>border</code>, <code>bordercolor</code>, <code>cellpadding</code>,
			<code>cellspacing</code> đang dần lỗi thời
		</li>
		<li>Nên sử dụng CSS thay thế cho styling hiện đại</li>
	</ul>
	<div class="p"><strong>✅ Best Practice:</strong></div>
	<CodeBlock
		code={`
		/* Thay vì dùng thuộc tính HTML */
		table {
			border: 1px solid #a5818e;
			border-collapse: collapse;
			width: 300px;
		}
		td, th {
			padding: 5px;
			border: 1px solid #a5818e;
		}
	`}
	/>
	<h2>9. Tổng Kết</h2>
	<div class="p"><strong>Các điểm chính cần nhớ:</strong></div>
	<ul>
		<li>
			1. Bảng gồm <code>&lt;table&gt;</code>, <code>&lt;tr&gt;</code>, <code>&lt;th&gt;</code>,
			<code>&lt;td&gt;</code>
		</li>
		<li>2. <code>&lt;thead&gt;</code> dùng cho tiêu đề, giúp phân biệt cấu trúc</li>
		<li>3. Styling giúp bảng đẹp mắt và dễ đọc</li>
		<li>4. Hàng đan xen màu cải thiện trải nghiệm người dùng</li>
		<li>5. Nên chuyển sang CSS thuần thay vì thuộc tính HTML cũ</li>
	</ul>
</div>
