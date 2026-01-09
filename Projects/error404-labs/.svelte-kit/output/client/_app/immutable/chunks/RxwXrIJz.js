import{f as b,a as v}from"./1ECRtOeo.js";import"./DCRZB7lX.js";import{s as n,c as d,r as g,n as m}from"./BlOM0YrC.js";import{C as t}from"./y0KBGaBm.js";/* empty css        */var y=b('<div class="wrapper"><h1>📘 Tạo bảng HTML – Trộn dòng và cột (rowspan & colspan)</h1> <h2>1️⃣ Mục tiêu bài học</h2> <div class="p">Sau bài học này, học viên có thể:</div> <ul><li>Tạo bảng HTML đúng cấu trúc (<span class="code">&lt;table&gt;</span>, <span class="code">&lt;thead&gt;</span>, <span class="code">&lt;tbody&gt;</span>)</li> <li>Trộn cột bằng <span class="code">colspan</span></li> <li>Trộn dòng bằng <span class="code">rowspan</span></li> <li>Canh chỉnh kích thước cột bằng <span class="code">colgroup</span></li> <li>Đưa hình ảnh vào ô bảng và hiển thị <strong>responsive</strong></li></ul> <details><summary>Xem Code</summary> <!></details> <img class="border" src="/tao-trang-web-tap-chi-dien-tu/bai10-0.png" alt="📘 Bài 10: Tạo bảng HTML – Trộn dòng và cột (rowspan &amp; colspan)"/> <h2>2️⃣ Cấu trúc bảng HTML chuẩn</h2> <!> <div class="p"><strong>🔹 Giải thích:</strong></div> <ul><li><span class="code">thead</span>: phần tiêu đề (header)</li> <li><span class="code">tbody</span>: phần nội dung</li> <li><span class="code">colgroup</span>: kiểm soát độ rộng từng cột → rất quan trọng khi trộn cột</li></ul> <h2>3️⃣ Trộn cột với <span class="code">colspan</span></h2> <!> <div class="p">📌 Ý nghĩa:</div> <ul><li>Ô này <strong>chiếm 3 cột ngang</strong></li> <li>Dùng khi muốn <strong>gom nhiều cột thành 1 tiêu đề</strong></li></ul> <div class="p"><strong>👉 Trong bài:</strong></div> <ul><li>Dòng 1 và dòng 3 của <span class="code">thead</span> đều dùng <span class="code">colspan="3"</span></li></ul> <h2>4️⃣ Trộn dòng với <span class="code">rowspan</span></h2> <!> <div class="p">📌 Ý nghĩa:</div> <ul><li>Ô này <strong>chiếm 3 dòng dọc</strong></li> <li>Thường dùng để đặt <strong>ảnh / thông tin cố định bên cạnh nhiều dòng</strong></li></ul> <div class="p">👉 Ảnh sản phẩm nằm bên phải và kéo dài suốt 3 dòng tiêu đề</div> <h2>5️⃣ Kết hợp <span class="code">colspan</span> + <span class="code">rowspan</span></h2> <div class="p">🔴 Đây là phần học viên hay sai nhất</div> <div class="p">Nguyên tắc quan trọng:</div> <div class="tips">Tổng số cột mỗi dòng phải luôn bằng nhau</div> <div class="p">Trong bảng này:</div> <ul><li>Tổng cột = <strong>4</strong></li> <li>Trái: <span class="code">colspan="3"</span></li> <li>Phải: <span class="code">rowspan="3"</span> → vẫn đủ 4 cột</li></ul> <h2>6️⃣ Điều khiển độ rộng cột bằng <span class="code">colgroup</span></h2> <!> <div class="p">📌 Lợi ích:</div> <ul><li>Không phụ thuộc nội dung</li> <li>Giữ layout <strong>ổn định</strong></li> <li>Rất cần khi bảng có <span class="code">colspan</span></li></ul> <h2>7️⃣ Đưa hình ảnh full ô bảng (không méo)</h2> <!> <div class="p">✅ Giải thích:</div> <ul><li><span class="code">object-fit: cover</span>: lấp đầy ô, không méo ảnh</li> <li><span class="code">display: block</span>: loại bỏ khoảng trắng thừa</li></ul> <h2>8️⃣ Trộn cột trong tbody</h2> <!> <div class="p">👉 Dùng để:</div> <ul><li>Chia nội dung thành <strong>2 khối lớn</strong></li> <li>Phù hợp layout dạng <strong>quảng cáo / thông báo</strong></li></ul> <h2>9️⃣ Tổng kết nhanh</h2> <div class="p"><ul><li>✔ <span class="code">colspan</span> → trộn ngang</li> <li>✔ <span class="code">rowspan</span> → trộn dọc</li> <li>✔ <span class="code">colgroup</span> → kiểm soát layout</li> <li>✔ Tổng cột mỗi dòng luôn phải khớp</li> <li>✔ <span class="code">object-fit: cover</span> → ảnh đẹp, không vỡ layout</li></ul></div></div>');function C(p){const r=`
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Tạo bảng, trộn dòng và cột</title>
				<style>
					table {
						border-collapse: collapse;
						width: 100%;
						max-width: 800px;
						margin: 0 auto;
					}

					th,
					td {
						border: 2px solid #ff0000;
					}

					tr:nth-of-type(1) > th:nth-of-type(1) {
						text-align: right;
						color: #fff;
						background-color: #ff0000;
						padding: 10px 0;
					}

					tr:nth-of-type(2) > th:nth-of-type(1) {
						padding: 5px 0;
					}

					tr:nth-of-type(3) > th:nth-of-type(1) {
						text-align: center;
						color: #ff0000;
						background-color: #ffbbbb;
						padding: 10px 0;
						font-size: 25px;
					}

					td span {
						font-weight: bold;
						color: #ff0000;
						font-weight: bolder;

						display: block;
						margin-bottom: 10px;
					}

					tbody td {
						text-align: left;
						vertical-align: top;
					}

					tbody td ol li {
						margin-bottom: 10px;
					}

					thead th {
						padding: 0;
					}

					thead th img {
						width: 100%;
						height: 100%;
						object-fit: cover; /* full ô, không méo */
						display: block; /* bỏ khoảng trắng inline */
					}
				</style>
			</head>
			<body>
				<table>
					<colgroup>
						<col style="width: 25%" />
						<col style="width: 25%" />
						<col style="width: 35%" />
						<col style="width: 15%" />
					</colgroup>

					<thead>
						<tr>
							<th colspan="3">Công nghệ dầu gội dưỡng tóc mới</th>
							<!-- <th>b</th> -->
							<!-- <th>c</th> -->
							<th rowspan="3">
								<img src="https://iili.io/f7sCyOv.png" alt="double rich" />
							</th>
						</tr>
						<tr>
							<th colspan="3"></th>
							<!-- <th></th> -->
							<!-- <th></th> -->
							<!-- <th>d</th> -->
						</tr>
						<tr>
							<th colspan="3">Tỏa sáng cùng DOUBLE RICH</th>
							<!-- <th>b</th> -->
							<!-- <th>c</th> -->
							<!-- <th>d</th> -->
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colspan="2">
								<span>&#9633; Sản phẩm khuyến mãi :</span>
								<ul>
									<li>Dầu gội Double Rich mới 200ml, 400ml có tem khuyến mãi</li>
								</ul>
								<span>&#9633; Đối tượng tham gia :</span>
								<ul>
									<li>Áp dụng cho tất cả người tiêu dùng cuối cùng mua sản phẩm khuyến mãi.</li>
									<li>
										Chương trình không áp dụng chp nhân viên, nhà phân phối bao gồm các tổng đại lý, đại
										lý, cửa hàng bán sỉ, lẻ và các cá nhân kinh doanh sản phẩm công ty LDMP LG Vina,
										công ty quảng cáo, công ty làm dịch vụ chương trình khuyến mãi này, nhân viên siêu
										thị
									</li>
								</ul>
							</td>
							<!-- <td>2</td> -->
							<td colspan="2">
								<span>&#9633; Cách thức nhận giải :</span>
								<ol type="1">
									<li>
										<strong><em>Giải khuyến khích</em> : </strong>Khách hàng đổi quà tại các cửa hàng
										bán lẻ trên toàn quốc bắt đầu. Bắt đầu từ ngày 15/06/2025 đến 17h ngày 12/08/2025
									</li>
									<li>
										<strong><em>Giải đặc biệt, nhất, nhì</em> : </strong>Khách hàng cắt phần mã vạch
										trên mỗi chai dầu gội có khuyến mãi và gởi kèm phiếu trúng thưởng về văn phòng công
										ty, hạn chót hết ngày 31/07/2025 (căn cứ theo dấu bưu điện nơi gởi). Sau đó công ty
										sẽ gởi thư thông báo trúng thưởng và cách thức nhận quà cho khách hàng
									</li>
								</ol>
							</td>
							<!-- <td>4</td> -->
						</tr>
					</tbody>
				</table>
			</body>
		</html>
	`;var i=y(),l=n(d(i),8),e=n(d(l),2);t(e,{code:r}),g(l);var s=n(l,6);t(s,{code:`
		<table>
			<colgroup>...</colgroup>
			<thead>...</thead>
			<tbody>...</tbody>
		</table>
	`});var h=n(s,8);t(h,{code:`
		<th colspan="3">Công nghệ dầu gội dưỡng tóc mới</th>
	`});var a=n(h,12);t(a,{code:`
		<th rowspan="3">
			<img src="..." />
		</th>
	`});var c=n(a,22);t(c,{code:`
		<colgroup>
			<col style="width: 25%" />
			<col style="width: 25%" />
			<col style="width: 35%" />
			<col style="width: 15%" />
		</colgroup>
	`});var o=n(c,8);t(o,{code:`
		thead th img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	`});var u=n(o,8);t(u,{code:`
		<td colspan="2">...</td>
		<td colspan="2">...</td>
	`}),m(8),g(i),v(p,i)}export{C as default};
