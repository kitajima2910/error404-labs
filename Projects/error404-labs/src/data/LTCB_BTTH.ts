export interface Lesson {
	lesson: string;
	title: string;
	data: {
		lesson: string;
		subLesson: string;
		content: string;
		readme: string;
	}[];
}

export interface PageParams {
	lesson: string;
	subLesson: string;
	content: string;
	readme: string;
}

export const DATA_LESSONS: Lesson[] = [
	{
		lesson: '01',
		title: 'Buổi 01: Kiểu dữ liệu, toán tử và biểu thức',
		data: [
			{
				lesson: '01',
				subLesson: '01',
				content:
					'Viết chương trình nhập vào một ký tự, một số nguyên, một số thực. Hãy in ra màn hình ký tự có độ rộng là 3, số nguyên có độ rộng là 6, số thực có độ rộng là 8 với 3 chữ số lẻ.',
				readme: '/md/LTCB_BTTH/Buoi01/Bai01.md'
			},
			{
				lesson: '01',
				subLesson: '02',
				content: 'Viết chương trình nhập vào một ký tự. Hãy in ra mã ASCII của ký tự.',
				readme: '/md/LTCB_BTTH/Buoi01/Bai02.md'
			}
		]
	},
	{
		lesson: '03',
		title: 'Buổi 03: Lập trình hàm',
		data: [
			{
				lesson: '03',
				subLesson: '02',
				content: String.raw`
					<span>Viết hàm tính và trả về tổ hợp chập k của n theo công thức: \(C_n^k = \frac{n!}{k!(n-k)!}\), 
					trong đó n!=1*2*3*...*n với n, k là các số nguyên dương \((0 \leq k \leq n)\).
					Viết chương trình nhập vào một số nguyên n và một số nguyên k, sử dụng hàm vừa viết để tính và in ra giá trị tổ hợp.<br/><br/>
					<strong>Ví dụ:</strong> \(C_5^3 = \frac{5!}{3!(5-3)!} = \frac{120}{6 \times 2} = 10\)</span>
				`,
				readme: '/md/LTCB_BTTH/Buoi03/Bai02.md'
			},
			{
				lesson: '03',
				subLesson: '03',
				content:
					'Viết hàm tính và trả về chu vi một hình tròn, biết rằng công thức chu vi là cv = 2 * 3.14 * R, trong đó R là bán kính. Viết chương trình nhập vào bán kính hình tròn, sử dụng hàm vừa viết để tính và in ra chu vi hình tròn.',
				readme: '/md/LTCB_BTTH/Buoi03/Bai03.md'
			}
		]
	}
];
