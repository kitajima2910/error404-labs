<script lang="ts">
	import CodeBlock from '../../components/CodeBlock.svelte';
	import './../huong-dan-hoc.css';

	const code: string = `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Định dạng văn bản</title>
			</head>
			<body>
				<h1 style="text-align: center; color: #008888">Định dạng văn bản</h1>
				<div>
					<b><u>Hóa học:</u></b> <i>Nước:</i><font color="red">H<sub>2</sub>O</font>;
					<i>Axit Sunfuric:</i> <font color="red">H<sub>2</sub>SO<sub>4</sub></font>
				</div>
				<div>
					<b><u>Toán học:</u></b> <i>Pương trình bậc 2:</i>
					<font color="red">ax<sup>2</sup> + bx + c = 0</font>
				</div>
				<div>
					<b><u>Tin học:</u></b> <i>Vòng lặp For:</i>
				</div>
				<pre style="color: #0000cc; background-color: #ccc">
					
					for(int i = 0; i < 10; i++) {
						cout << i << endl;
					}
				</pre
				>
			</body>
		</html>
	`;
</script>

<div class="wrapper">
	<h1>📝 Bài giảng: Định dạng trang web với HTML</h1>
	<h2>1. Các thẻ định dạng văn bản cơ bản</h2>
	<table>
		<thead>
			<tr>
				<th>Thẻ HTML</th>
				<th>Mục đích</th>
				<th>Ví dụ trong code</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>&lt;b&gt;</td>
				<td>In đậm văn bản (Bold)</td>
				<td><strong>Hóa học:</strong></td>
			</tr>
			<tr>
				<td>&lt;u&gt;</td>
				<td>Gạch chân văn bản (Underline)</td>
				<td><u>Hóa học:</u></td>
			</tr>
			<tr>
				<td>&lt;i&gt;</td>
				<td>In nghiêng văn bản (Italic)</td>
				<td><i>Hóa học:</i></td>
			</tr>
			<tr>
				<td>&lt;sub&gt;</td>
				<td>Chỉ số dưới (Subscript)</td>
				<td>H<sub>2</sub>O</td>
			</tr>
			<tr>
				<td>&lt;sup&gt;</td>
				<td>Chỉ số trên (Superscript)</td>
				<td>x<sup>2</sup></td>
			</tr>
		</tbody>
	</table>
	<h2>2. Thẻ &lt;font&gt; - Định dạng màu sắc</h2>
	<div class="p">
		<strong>Cú pháp:</strong> &lt;font color=&quot;tên_màu_hoặc_mã_màu&quot;&gt;Nội dung&lt;/font&gt;
	</div>
	<div class="p"><strong>Ví dụ từ code:</strong></div>
	<CodeBlock
		code={`
		<font color="red">H<sub>2</sub>O</font>
	`}
	/>
	<div class="p"><strong>Kết quả: <font color="red">H<sub>2</sub>O</font></strong></div>
	<div class="tips">
		⚠️ <strong>Lưu ý:</strong> Thẻ
		<font>đã lỗi thời trong HTML5. Nên sử dụng CSS để định dạng màu sắc: style="color: red"</font>
	</div>
	<h2>3. Thẻ &lt;pre&gt; - Hiển thị văn bản được định dạng sẵn</h2>
	<div class="p">
		Thẻ &lt;pre&gt; giữ nguyên định dạng của văn bản, bao gồm khoảng trắng, xuống dòng và thụt lề.
	</div>
	<div class="p"><strong>Ví dụ từ code:</strong></div>
	<CodeBlock
		code={`
		<pre style="color: #0000cc; background-color: #ccc">
			for(int i = 0; i < 10; i++) {
				cout << i << endl;
			}
		</pre>
	`}
	/>
	<div class="p"><strong>Kết quả:</strong></div>
	<img
		class="border"
		src="/tao-trang-web-tap-chi-dien-tu/bai05-2.png"
		alt="Bài 05: Định dạng văn bản"
	/>
	<div class="p">
		<strong>Ứng dụng:</strong> Thường dùng để hiển thị code, thơ, hoặc văn bản cần giữ nguyên định dạng.
	</div>
	<h2>4. Thuộc tính style trong HTML</h2>
	<div class="p">
		Thuộc tính <strong>style</strong> cho phép thêm CSS trực tiếp vào thẻ HTML (inline CSS).
	</div>
	<div class="p"><strong>Ví dụ trong tiêu đề:</strong></div>
	<CodeBlock
		code={`
		<h1 style="text-align: center; color: #008888">Định dạng văn bản</h1>
	`}
	/>
	<div class="p"><strong>Kết quả:</strong></div>
	<img
		class="border"
		src="/tao-trang-web-tap-chi-dien-tu/bai05-0.png"
		alt="Bài 05: Định dạng văn bản"
	/>
	<div class="p"><strong>Các thuộc tính CSS phổ biến:</strong></div>
	<ul>
		<li><strong>color</strong>: Màu chữ</li>
		<li><strong>background-color</strong>: Màu nền</li>
		<li><strong>text-align</strong>: Căn chỉnh văn bản (left, center, right, justify)</li>
		<li><strong>font-size</strong>: Kích thước chữ</li>
	</ul>
	<h2>5. Bài tập thực hành</h2>
	<details>
		<summary>Xem Code</summary>
		<div class="full-code">
			<CodeBlock {code} />
		</div>
	</details>
	<img
		class="border"
		src="/tao-trang-web-tap-chi-dien-tu/bai05-1.png"
		alt="Bài 05: Định dạng văn bản"
	/>
</div>
