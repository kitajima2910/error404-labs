interface Lesson {
	lesson: string;
	title: string;
	data: {
		lesson: string;
		subLesson: string;
		content: string;
		readme: string;
	}[];
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
	}
];
