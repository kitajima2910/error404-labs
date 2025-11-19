export interface Webs {
	name: string;
	link: string;
	title: string;
}

export const DATA_WEBS: Webs[] = [
	{
		name: 'Slide Share',
		link: '/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare',
		title: 'Khóa học: tạo trang web tạp chí điện tử'
	}
];

// Slide Share
export interface Lesson {
	icon: string;
	name_lesson: string;
	name: string;
	link: string;
}

export const DATA_SLIDESHARE_LESSONS: Lesson[] = [
	{
		icon: '📘',
		name_lesson: 'Bài 01',
		name: 'Sử dụng các tag cơ bản',
		link: '/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/01'
	},
	{
		icon: '📘',
		name_lesson: 'Bài 02',
		name: 'Sử dụng các tag cơ bản (tt)',
		link: '/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/02'
	},
	{
		icon: '📘',
		name_lesson: 'Bài 03',
		name: 'Định dạng trang web',
		link: '/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/03'
	},
	{
		icon: '📘',
		name_lesson: 'Bài 04',
		name: 'Định dạng trang web (tt)',
		link: '/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/04'
	}
];
