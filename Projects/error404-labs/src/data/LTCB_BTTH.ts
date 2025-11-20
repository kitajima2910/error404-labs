export interface Lesson {
	lesson: string;
	title: string;
	data: {
		lesson: string;
		subLesson: string;
		content: string;
	}[];
}

export interface PageParams {
	lesson: string;
	subLesson: string;
	content: string;
}

export const DATA_LESSONS: Lesson[] = [
	{
		lesson: '01',
		title: 'Buổi 01: Kiểu dữ liệu, toán tử và biểu thức',
		data: [
			{
				lesson: '01',
				subLesson: '01',
				content: String.raw`
					<div>
					Viết chương trình nhập vào một ký tự, một số nguyên, một số thực. Hãy in ra màn hình ký tự có độ rộng là 3, số nguyên có độ rộng là 6, số thực có độ rộng là 8 với 3 chữ số lẻ.
					</div>
					`
			},
			{
				lesson: '01',
				subLesson: '02',
				content: String.raw`
					<div>
					Viết chương trình nhập vào một ký tự. Hãy in ra mã ASCII của ký tự.
					</div>
					`
			},
			{
				lesson: '01',
				subLesson: '03',
				content: String.raw`
					<div>
					Viết chương trình nhập hai số nguyên a, b. Hãy in ra tổng và tích của hai số.
					</div>
					`
			},
			{
				lesson: '01',
				subLesson: '04',
				content: String.raw`
					<div>
					Viết chương trình nhập hai số nguyên a, b. Hãy in ra giá trị trung bình của hai số, lưu ý: giá trị trung bình có thể là số lẻ. Gợi ý: dùng toán tử ép kiểu bắt buộc.
					</div>
					`
			},
			{
				lesson: '01',
				subLesson: '05',
				content: String.raw`
					<div>
					Viết chương trình nhập ba số thực x, y, z. Hãy in ra giá trị trung bình của ba số.
					</div>
					`
			},
			{
				lesson: '01',
				subLesson: '06',
				content: String.raw`
					<div>
					Viết chương trình nhập hai số nguyên a, b. Hãy in ra tổng bình phương của hai số.<br/>
					Tổng = a² + b².
					</div>
					`
			},
			{
				lesson: '01',
				subLesson: '07',
				content: String.raw`
					<div>
					Viết chương trình nhập hai số nguyên a, b. Hãy tính giá trị biểu thức (a + b)².
					</div>
					`
			},
			{
				lesson: '01',
				subLesson: '08',
				content: String.raw`
					<div>
					Viết chương trình nhập một số nguyên n. Hãy in ra phần nguyên và phần dư khi chia n cho 6.
					</div>
					`
			},
			{
				lesson: '01',
				subLesson: '09',
				content: String.raw`
					<div>
					Viết chương trình nhập vào bán kính của hình tròn. Tính và in ra chu vi hình tròn và diện tích của hình tròn <i>(định dạng hai số thập phân)</i>.<br/>
					Biết rằng:
					<ul style="padding-left: 50px">
						<li>Chu vi: cv = 2 * 3.14 * R</li>
						<li>Diện tích: dt = 3.14 * R * R, với R là bán kính hình tròn.</li>
					</ul>
					</div>
					`
			},
			{
				lesson: '01',
				subLesson: '10',
				content: String.raw`
					<div>
					Viết chương trình nhập vào chiều dài 2 cạnh của hình chữ nhật. Tính và in ra chu vi, diện tích hình chữ nhật.<br/>
					Biết rằng:
					<ul style="padding-left: 50px">
						<li>Chu vi: cv = (d + r) * 2</li>
						<li>Diện tích: dt = d * r, với d và r là độ dài 2 cạnh.</li>
					</ul>
					</div>
					`
			}
		]
	},
	{
		lesson: '03',
		title: 'Buổi 03: Lập trình hàm',
		data: [
			{
				lesson: '03',
				subLesson: '01',
				content: String.raw`
					<div>
					Viết hàm kiểm tra một số nguyên dương có phải số hoàn hảo hay không (số hoàn hảo khi tổng các ước của n (không tính n) bằng với n).
					<br/><br/> 
					Viết chương trình nhập vào một số nguyên dương n, sử dụng hàm vừa viết để kiểm tra n. 
					<br/><br/> 
					Nếu n là số hoàn hảo thì in “So vua nhap la so hoan hao”, ngược lại thì in “So vua nhap khong phai la so hoan hao”.
					</div>
				`
			},
			{
				lesson: '03',
				subLesson: '02',
				content: String.raw`
					<div>
					<p class="pxh-center"><span>Viết hàm tính và trả về tổ hợp chập k của n theo công thức:</span> \(C_n^k = \frac{n!}{k!(n-k)!}\)<p> 
					<p class="pxh-center"><span>Trong đó n!=1*2*3*...*n với n, k là các số nguyên dương</span> \((0 \leq k \leq n)\)</p>
					Viết chương trình nhập vào một số nguyên n và một số nguyên k, sử dụng hàm vừa viết để tính và in ra giá trị tổ hợp.<br/><br/>
					<strong>Ví dụ:</strong> \(C_5^3 = \frac{5!}{3!(5-3)!} = \frac{120}{6 \times 2} = 10\)</div>
				`
			}
		]
	}
];
