<script lang="ts">
	import CodeBlock from '../../components/CodeBlock.svelte';
	import './../huong-dan-hoc.css';

	const code: string = `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Ký tự đặc biệt, chèn hình ảnh, tạo danh sách và liên kết</title>
			</head>
			<body>
				<h1 style="text-align: center; color: #d21e61">Công ty Hoa tươi Nhân Ái</h1>
				<div style="display: flex">
					<img src="https://iili.io/f2BukPV.png" alt="Hoa Tươi" height="230px" />
					<div>
						<ol>
							<li>
								<span style="background-color: #d21e61; color: #fff">Giới thiệu&nbsp;&nbsp;</span>
								<ul type="square" style="padding-left: 20px; margin-bottom: 20px">
									<li>Thành lập ngày: 11/20/2025</li>
									<li>Chuyên cung cấp các loại hoa tươi</li>
									<li>Có trên 20 cửa hàng bán lẻ tại TP.HCM</li>
									<li>Nhận kết giỏ hoa theo yêu cầu của khách hàng</li>
								</ul>
							</li>
							<hr />
							<li>
								<span style="background-color: #d21e61; color: #fff"
									>Liên hệ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
								>
								<ul style="padding-left: 20px">
									<li>Điện thoại: 84-09-1858004</li>
									<li>Địa chỉ: <i>123 Thạnh Xuân, Quận 12, TP.HCM</i></li>
								</ul>
								<p style="background-color: #fce7fd; font-weight: 700">
									&copy; Copyright:
									<a href="https://www.error404-labs.info.vn/" target="_blank">Error404-Labs</a> -
									<a href="https://artkidgarden.edu.vn/" target="_blank">ART KID GARDEN</a>
								</p>
							</li>
						</ol>
					</div>
				</div>
			</body>
		</html>
	`;
</script>

<div class="wrapper">
	<h1>📘 Ký tự đặc biệt, chèn hình ảnh, tạo danh sách và liên kết</h1>
	<h2>🎯 Học được gì qua bài này</h2>
	<ul>
		<li>Sử dụng các ký tự đặc biệt trong HTML</li>
		<li>Chèn và định dạng hình ảnh trên trang web</li>
		<li>Tạo danh sách có thứ tự (ordered list) và danh sách không thứ tự (unordered list)</li>
		<li>Tạo liên kết siêu văn bản (hyperlink) để điều hướng trang web</li>
		<li>
			Sử dụng các thuộc tính CSS để điều chỉnh khoảng cách (padding, margin) và hiển thị (display)
		</li>
	</ul>
	<h2>🧩 Kiến thức cần học thêm</h2>
	<div class="p"><strong>🌟 Tag HTML cơ bản</strong></div>
	<table>
		<thead>
			<tr>
				<th>Tag</th>
				<th>Ý nghĩa</th>
				<th>Ví dụ</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>&lt;img&gt;</code></td>
				<td>Chèn hình ảnh vào trang web</td>
				<td>
					<code>&lt;img src="anh.jpg" alt="Ảnh mô tả"&gt;</code>
				</td>
			</tr>
			<tr>
				<td><code>&lt;ol&gt;</code></td>
				<td>Tạo danh sách có thứ tự (1, 2, 3...)</td>
				<td>
					<code>&lt;ol&gt;&lt;li&gt;Item 1&lt;/li&gt;&lt;/ol&gt;</code>
				</td>
			</tr>
			<tr>
				<td><code>&lt;ul&gt;</code></td>
				<td>Tạo danh sách không thứ tự (•, ◦...)</td>
				<td>
					<code>&lt;ul&gt;&lt;li&gt;Item 1&lt;/li&gt;&lt;/ul&gt;</code>
				</td>
			</tr>
			<tr>
				<td><code>&lt;li&gt;</code></td>
				<td>Tạo mục trong danh sách</td>
				<td>
					<code>&lt;li&gt;Mục trong danh sách&lt;/li&gt;</code>
				</td>
			</tr>
			<tr>
				<td><code>&lt;a&gt;</code></td>
				<td>Tạo liên kết (hyperlink)</td>
				<td>
					<code>&lt;a href="trang.html"&gt;Link&lt;/a&gt;</code>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="p"><strong>Giải thích:</strong></div>
	<ul>
		<li>
			<code><b>&lt;img&gt;</b></code>: Tag này dùng để hiển thị hình ảnh. Nó là tag tự đóng
			(self-closing), không cần tag đóng.
		</li>
		<li>
			<code><b>&lt;ol&gt;</b></code> và <code><b>&lt;ul&gt;</b></code>: Hai tag này tạo danh sách.
			<code>&lt;ol&gt;</code>
			tạo danh sách đánh số, còn <code>&lt;ul&gt;</code> tạo danh sách dấu đầu dòng.
		</li>
		<li>
			<code><b>&lt;li&gt;</b></code>: Luôn phải nằm bên trong <code>&lt;ol&gt;</code> hoặc
			<code>&lt;ul&gt;</code> để tạo từng mục của danh sách.
		</li>
		<li>
			<code><b>&lt;a&gt;</b></code>: Tag này tạo liên kết cho phép người dùng nhấp chuột để truy cập
			URL khác.
		</li>
	</ul>
	<div class="p"><strong>🌟 Attribute HTML</strong></div>
	<table>
		<thead>
			<tr>
				<th>Attribute</th>
				<th>Mô tả</th>
				<th>Ví dụ</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>alt</code></td>
				<td>Mô tả văn bản thay thế cho hình ảnh (dùng khi ảnh không tải được)</td>
				<td>
					<code>&lt;img src="anh.jpg" alt="Mô tả ảnh"&gt;</code>
				</td>
			</tr>
			<tr>
				<td><code>height</code></td>
				<td>Chiều cao của hình ảnh (px hoặc %)</td>
				<td>
					<code>&lt;img src="anh.jpg" height="200"&gt;</code>
				</td>
			</tr>
			<tr>
				<td><code>width</code></td>
				<td>Chiều rộng của hình ảnh (px hoặc %)</td>
				<td>
					<code>&lt;img src="anh.jpg" width="300"&gt;</code>
				</td>
			</tr>
			<tr>
				<td><code>type</code></td>
				<td>Xác định loại danh sách trong <code>&lt;ol&gt;</code> (1, a, A, i, I)</td>
				<td>
					<code>&lt;ol type="a"&gt;&lt;li&gt;a&lt;/li&gt;&lt;/ol&gt;</code>
				</td>
			</tr>
			<tr>
				<td><code>target</code></td>
				<td>Xác định cách mở liên kết (_blank: tab mới, _self: tab hiện tại)</td>
				<td>
					<code>&lt;a href="trang.html" target="_blank"&gt;Link&lt;/a&gt;</code>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="p"><strong>Giải thích:</strong></div>
	<ul>
		<li>
			<code><b>alt</b></code>: Rất quan trọng cho SEO và tính năng trợ năng. Khi hình ảnh không tải,
			người dùng sẽ thấy văn bản này.
		</li>
		<li>
			<code><b>height</b></code> và <code><b>width</b></code>: Nên sử dụng cả hai để tránh ảnh bị
			méo. Nếu chỉ set một chiều, chiều kia sẽ tự điều chỉnh theo tỉ lệ.
		</li>
		<li>
			<code><b>type</b></code>: Trong <code>&lt;ol&gt;</code>, type="1" (mặc định), type="a" (a, b,
			c...), type="A" (A, B, C...), type="i" (i, ii, iii...)
		</li>
		<li>
			<code><b>target="_blank"</b></code>: Mở liên kết trong tab mới thay vì thay thế trang hiện
			tại.
		</li>
	</ul>
	<div class="p"><strong>🌟 Tính năng CSS cơ bản</strong></div>
	<table>
		<thead>
			<tr>
				<th>Thuộc tính CSS</th>
				<th>Ý nghĩa</th>
				<th>Ví dụ</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>display</code></td>
				<td>Kiểm soát cách phần tử hiển thị (block, inline, inline-block, none, flex, grid)</td>
				<td><code>display: block;</code></td>
			</tr>
			<tr>
				<td><code>display: flex</code></td>
				<td>Sắp xếp các phần tử theo hàng hoặc cột với căn chỉnh linh hoạt</td>
				<td><code>display: flex; justify-content: center;</code></td>
			</tr>
			<tr>
				<td><code>display: grid</code></td>
				<td>Sắp xếp các phần tử theo lưới (hàng và cột)</td>
				<td><code>display: grid; grid-template-columns: 1fr 1fr;</code></td>
			</tr>
			<tr>
				<td><code>padding</code></td>
				<td>Khoảng cách từ nội dung đến viền phần tử (4 phía)</td>
				<td><code>padding: 20px;</code></td>
			</tr>
			<tr>
				<td><code>padding-top</code></td>
				<td>Khoảng cách từ nội dung đến viền trên</td>
				<td><code>padding-top: 10px;</code></td>
			</tr>
			<tr>
				<td><code>padding-right</code></td>
				<td>Khoảng cách từ nội dung đến viền phải</td>
				<td><code>padding-right: 15px;</code></td>
			</tr>
			<tr>
				<td><code>padding-bottom</code></td>
				<td>Khoảng cách từ nội dung đến viền dưới</td>
				<td><code>padding-bottom: 10px;</code></td>
			</tr>
			<tr>
				<td><code>padding-left</code></td>
				<td>Khoảng cách từ nội dung đến viền trái</td>
				<td><code>padding-left: 15px;</code></td>
			</tr>
			<tr>
				<td><code>margin</code></td>
				<td>Khoảng cách từ viền phần tử đến các phần tử khác (4 phía)</td>
				<td><code>margin: 20px;</code></td>
			</tr>
			<tr>
				<td><code>margin-top</code></td>
				<td>Khoảng cách từ viền trên phần tử đến phần tử khác</td>
				<td><code>margin-top: 10px;</code></td>
			</tr>
			<tr>
				<td><code>margin-right</code></td>
				<td>Khoảng cách từ viền phải phần tử đến phần tử khác</td>
				<td><code>margin-right: 15px;</code></td>
			</tr>
			<tr>
				<td><code>margin-bottom</code></td>
				<td>Khoảng cách từ viền dưới phần tử đến phần tử khác</td>
				<td><code>margin-bottom: 10px;</code></td>
			</tr>
			<tr>
				<td><code>margin-left</code></td>
				<td>Khoảng cách từ viền trái phần tử đến phần tử khác</td>
				<td><code>margin-left: 15px;</code></td>
			</tr>
		</tbody>
	</table>
	<div class="p"><strong>Giải thích:</strong></div>
	<ul>
		<li>
			<code><b>display</b></code>: <code>block</code> (chiếm toàn bộ chiều rộng),
			<code>inline</code>
			(chỉ chiếm không gian cần thiết), <code>inline-block</code> (vừa inline vừa block),
			<code>none</code>
			(ẩn phần tử), <code>flex</code> (sắp xếp linh hoạt),
			<code>grid</code> (sắp xếp lưới).
		</li>
		<li>
			<code><b>display: flex</b></code>: Dùng để sắp xếp các phần tử con theo hàng ngang (default)
			hoặc cột dọc. Rất hữu ích cho layout, căn giữa, và tạo menu.
		</li>
		<li>
			<code><b>display: grid</b></code>: Dùng để tạo lưới 2 chiều (hàng và cột). Mạnh hơn flex khi
			cần sắp xếp phức tạp.
		</li>
		<li>
			<code><b>padding</b></code>: Khoảng cách bên trong phần tử (giữa nội dung và viền).
		</li>
		<li>
			<code><b>margin</b></code>: Khoảng cách bên ngoài phần tử (giữa viền và các phần tử khác).
		</li>
	</ul>
	<div class="tips">
		Cú pháp viết tắt padding: 10px 15px 10px 15px; (top, right, bottom, left) hoặc padding: 10px
		15px; (top/bottom, left/right).
	</div>
	<div class="p"><strong>🌟 Ký tự đặc biệt</strong></div>
	<table>
		<thead>
			<tr>
				<th>Ký tự HTML</th>
				<th>Ý nghĩa</th>
				<th>Ví dụ</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<code>{`&nbsp;`}</code>
				</td>
				<td>Khoảng trắng không được nhập (non-breaking space)</td>
				<td><code>{`Hello&nbsp;World`}</code> → Hello World</td>
			</tr>
			<tr>
				<td><code>{`&copy;`}</code></td>
				<td>Ký hiệu bản quyền ©</td>
				<td><code>{`&copy; 2024`}</code> → © 2024</td>
			</tr>
		</tbody>
	</table>
	<div class="p"><strong>Giải thích:</strong></div>
	<ul>
		<li>
			<code><b>{`&nbsp;`}</b></code>: Dùng khi muốn chèn khoảng trắng mà không bị lược bỏ bởi HTML.
			Có thể dùng nhiều lần để tạo khoảng cách lớn hơn.
		</li>
		<li>
			<code><b>{`&copy;`}</b></code>: Ký hiệu bản quyền. Các ký tự đặc biệt khác:
			<code>{`&reg;`}</code>
			(®),
			<code>{`&trade;`}</code> (™), <code>{`&euro;`}</code> (€), <code>{`&yen;`}</code> (¥).
		</li>
	</ul>
	<h2>📝 Yêu cầu bài tập</h2>
	<div class="p">Nhiệm vụ: mô tả ngắn gọn sản phẩm cần làm</div>
	<table>
		<thead>
			<tr>
				<th>Đối tượng</th>
				<th>Yêu cầu</th>
				<th>Mã màu</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Trang web</td>
				<td>- Tiêu đề trang web: Ký tự đặc biệt, chèn hình ảnh, tạo danh sách và liên kết</td>
				<td></td>
			</tr>
			<tr>
				<td>Nội dung</td>
				<td>- Sử dụng các tag định dạng văn bản như hình dưới</td>
				<td>#d21e61, #fff</td>
			</tr>
			<tr>
				<td></td>
				<td
					>- Khi nhấn vào chữ "Error404-Labs" mở trang web: <a
						href="https://www.error404-labs.info.vn/"
						target="_blank"
						rel="noopener noreferrer">https://www.error404-labs.info.vn/</a
					></td
				>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td
					>- Khi nhấn vào chữ "ART KID GARDEN" mở trang web: <a
						href="https://artkidgarden.edu.vn/"
						target="_blank"
						rel="noopener noreferrer">https://artkidgarden.edu.vn/</a
					></td
				>
				<td></td>
			</tr>
		</tbody>
	</table>
	<img
		class="border"
		src="/tao-trang-web-tap-chi-dien-tu/bai07-0.png"
		alt="📘 Bài 07: Ký tự đặc biệt, chèn hình ảnh, tạo danh sách và liên kết"
	/>
	<h2>💡 Code mẫu (để tham khảo)</h2>
	<details>
		<summary>Xem Code</summary>
		<div class="full-code">
			<CodeBlock {code} />
		</div>
	</details>
	<div class="p"><strong>✍️ Người soạn:</strong> Phạm Xuân Hoài</div>
	<div class="p"><strong>📚 Chủ đề:</strong> HTML cơ bản</div>
	<div class="p"><em>Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!</em></div>
</div>
