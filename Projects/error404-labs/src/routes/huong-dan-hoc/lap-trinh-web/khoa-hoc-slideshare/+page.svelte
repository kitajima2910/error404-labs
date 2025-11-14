<script lang="ts">
	import Breadcrumb from '../../../../components/Breadcrumb.svelte';

	type Lesson = {
		icon: string;
		name_lesson: string;
		name: string;
		link: string;
	};

	const LESSONS: Lesson[] = [
		{
			icon: '📚',
			name_lesson: 'Bài 01',
			name: 'Sử dụng các Tag Cơ Bản HTML',
			link: '/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/01'
		},
		{
			icon: '🎓',
			name_lesson: 'Bài 02',
			name: 'SỬ DỤNG CÁC TAG CƠ BẢN HTML (PHẦN TIẾP THEO)',
			link: '/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/02'
		},
		{
			icon: '🎨',
			name_lesson: 'Bài 03',
			name: 'Định dạng trang web',
			link: '/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/03'
		}
	];
</script>

<Breadcrumb />

<div
	class="border! border-solid! border-[#ccc]! rounded-[5px]! p-4! text-center! transition-all! duration-300! ease-in-out! w-full! shadow-[0_8px_16px_0_rgba(0,0,0,0.2)]!"
>
	<h3 class="text-center!">✧･ﾟ: *✧･ﾟ:* 💎 BÀI HỌC 💎 *:･ﾟ✧*:･ﾟ✧</h3>
	{#each LESSONS as { icon, name_lesson, name, link }}
		<p class="m-7! text-justify! h-1.5!">
			<a
				data-sveltekit-preload-data
				data-sveltekit-preload
				href={link}
				class="text-black! decoration-0! transition-all! duration-300! ease-in-out! hover:underline!"
			>
				<span class="icon">{icon}</span>
				<strong>{name_lesson}:</strong>
				{name}</a
			>
		</p>
	{/each}
</div>
