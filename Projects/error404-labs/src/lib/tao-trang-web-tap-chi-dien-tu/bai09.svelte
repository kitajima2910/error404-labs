<script lang="ts">
	import CodeBlock from '../../components/CodeBlock.svelte';
	import './../huong-dan-hoc.css';

	const code: string = `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Tạo bảng, trộn dòng và cột</title>

				<style>
					body {
						font-family: 'tahoma';

						.title {
							text-align: center;
							color: #cc0033;
						}

						table {
							max-width: 100%;
							width: 600px;
							margin: 0 auto;
							border-collapse: collapse;
							font-size: 12px;

							th {
								background-color: #cc0033;
								color: #fff;
							}

							th,
							td {
								border: 1px solid #cc0033;
							}
						}
					}
				<\/style>
			</head>
			<body>
				<h1 class="title">Chương trình học - ngành lập trình</h1>

				<table>
					<thead>
						<tr>
							<th rowspan="2">Nhóm học phần</th>
							<th rowspan="2">Môn học</th>
							<th colspan="2">Số tiết</th>
						</tr>
						<tr>
							<th>Lý thuyết</th>
							<th>Thực hành</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td rowspan="6" style="text-align: center; color: #cc0033">I<br />Tin học văn phòng</td>
							<td>Hệ điều hành Windows</td>
							<td style="text-align: center">3</td>
							<td style="text-align: center">5</td>
						</tr>
						<tr>
							<td>Sử dụng Internet</td>
							<td style="text-align: center">3</td>
							<td style="text-align: center">5</td>
						</tr>
						<tr>
							<td>Soạn thảo văn bản với MS Word</td>
							<td style="text-align: center">24</td>
							<td style="text-align: center">40</td>
						</tr>
						<tr>
							<td>Tạo bài trình diễn với MS PowerPoint</td>
							<td style="text-align: center">9</td>
							<td style="text-align: center">15</td>
						</tr>
						<tr>
							<td>Xử lý số liệu với MS Excel</td>
							<td style="text-align: center">24</td>
							<td style="text-align: center">40</td>
						</tr>
						<tr>
							<td>Tạo trang Web với MS FrontPage</td>
							<td style="text-align: center">9</td>
							<td style="text-align: center">15</td>
						</tr>
						<tr>
							<td rowspan="2" style="text-align: center; color: #cc0033">
								II<br />Kỹ thuật lập trình (VB.NET)
							</td>
							<td>Nhập môn lập trình</td>
							<td style="text-align: center">36</td>
							<td style="text-align: center">60</td>
						</tr>
						<tr>
							<td>Kỹ thuật lập trình</td>
							<td style="text-align: center">36</td>
							<td style="text-align: center">60</td>
						</tr>
						<tr>
							<td colspan="4">...</td>
						</tr>
					</tbody>
				</table>
			</body>
		</html>
	`;
</script>

<div class="wrapper">
	<h1>📘 Tạo bảng, Trộn dòng và Trộn cột trong HTML</h1>
	<div class="p"><strong>🎯 Mục tiêu bài học</strong></div>
	<div class="p">Sau bài này, bạn sẽ biết:</div>
	<ul>
		<li>
			Cách tạo bảng trong HTML (<span class="code">&lt;table&gt;</span>,
			<span class="code">&lt;tr&gt;</span>, <span class="code">&lt;td&gt;</span>,
			<span class="code">&lt;th&gt;</span>).
		</li>
		<li>
			Cách trộn dòng (<span class="code">rowspan</span>) và trộn cột (<span class="code"
				>colspan</span
			>).
		</li>
		<li>Cách dùng CSS để trang trí bảng.</li>
	</ul>
	<details>
		<summary>Xem Code</summary>
		<CodeBlock {code} />
	</details>
	<img
		class="border"
		src="/tao-trang-web-tap-chi-dien-tu/bai09-0.png"
		alt="📘 Bài 09: Tạo bảng, Trộn dòng và Trộn cột trong HTML"
	/>
	<h2>1️⃣ TẠO MỘT BẢNG CƠ BẢN TRONG HTML</h2>
	<div class="p">HTML cung cấp các thẻ để tạo bảng:</div>
	<table>
		<thead>
			<tr>
				<th>Thẻ</th>
				<th>Ý nghĩa</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>&lt;table&gt;</td>
				<td>Tạo bảng</td>
			</tr>
			<tr>
				<td>&lt;tr&gt;</td>
				<td>Tạo hàng</td>
			</tr>
			<tr>
				<td>&lt;td&gt;</td>
				<td>Tạo ô</td>
			</tr>
			<tr>
				<td>&lt;th&gt;</td>
				<td>Tạo ô tiêu đề</td>
			</tr>
		</tbody>
	</table>
	<div class="p"><strong>Ví dụ:</strong></div>
	<CodeBlock
		code={`
		<table>
			<tr>
				<th>Môn học</th>
				<th>Số tiết</th>
			</tr>
			<tr>
				<td>Windows</td>
				<td>8</td>
			</tr>
		</table>
	`}
	/>
	<h2>2️⃣ TRỘN DÒNG (rowspan)</h2>
	<div class="p"><span class="code">rowspan</span> giúp một ô kéo dài qua nhiều dòng.</div>
	<div class="p"><strong>Ví dụ trong bài:</strong></div>
	<CodeBlock
		code={`
		<td rowspan="6">I<br>Tin học văn phòng</td>
	`}
	/>
	<div class="p">
		➡ Nghĩa là ô này chiếm <strong>6 hàng</strong>, dùng để gom nhóm các môn học chung một chủ đề.
	</div>
	<h2>3️⃣ TRỘN CỘT (colspan)</h2>
	<div class="p">
		<span class="code">colspan</span> giúp <strong>một ô kéo dài qua nhiều cột</strong>.
	</div>
	<div class="p">Ví dụ phần tiêu đề bảng:</div>
	<CodeBlock
		code={`
			<th colspan="2">Số tiết</th>
		`}
	/>
	<div class="p">➡ Ô này chiếm <strong>2 cột</strong>: Lý thuyết và Thực hành.</div>
	<div class="p">Cuối bảng:</div>
	<CodeBlock
		code={`
			<td colspan="4">...</td>
		`}
	/>
	<div class="p">➡ Dùng để tạo một dòng tổng hoặc ghi chú chiếm toàn bộ bảng.</div>
	<h2>4️⃣ TRANG TRÍ BẢNG BẰNG CSS</h2>
	<div class="p">Đoạn CSS trong code giúp bảng đẹp và rõ ràng hơn:</div>
	<ul>
		<li><span class="code">border-collapse: collapse;</span> → gộp đường viền lại nhìn gọn hơn</li>
		<li>
			<span class="code">max-width: 100%;</span> + <span class="code">margin: 0 auto;</span> → bảng nằm
			giữa trang
		</li>
		<li>Màu đỏ chủ đạo (#cc0033) dùng cho đường viền, tiêu đề.</li>
	</ul>
	<div class="p">Ví dụ:</div>
	<CodeBlock
		code={`
		th {
			background-color: #cc0033;
			color: #fff;
		}

		th, td {
			border: 1px solid #cc0033;
		}
	`}
	/>
	<h2>5️⃣ GIẢI THÍCH ĐOẠN CODE HOÀN CHỈNH</h2>
	<div class="p">Đoạn code tạo:</div>
	<ul>
		<li>Một tiêu đề lớn: "<strong>Chương trình học - ngành lập trình</strong>"</li>
		<li>
			Một bảng gồm:
			<ul>
				<li>Cột nhóm học phần (I, II…)</li>
				<li>Cột môn học</li>
				<li>Cột lý thuyết</li>
				<li>Cột thực hành</li>
			</ul>
		</li>
		<li>Dùng <strong>rowspan</strong> để nhóm nhiều môn học cùng một nhóm</li>
		<li>Dùng <strong>colspan</strong> để gộp các tiêu đề cột</li>
	</ul>
	<div class="p">
		👉 Đây là ví dụ thường dùng để trình bày chương trình học, thời khóa biểu, bảng giá, v.v.
	</div>
	<div class="p"><strong>📌 Kết luận</strong></div>
	<div class="p">Sau bài học, bạn có thể:</div>
	<ul>
		<li>Tạo bảng chuẩn HTML.</li>
		<li>Trộn ô theo hàng (rowspan) và theo cột (colspan).</li>
		<li>Trang trí bảng bằng CSS để chuyên nghiệp và dễ nhìn.</li>
	</ul>
</div>
