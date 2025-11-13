<script lang="ts">
	import PreloadLinkWithData from '../../components/PreloadLinkWithData.svelte';

	type Course = {
		title: string;
		link: string;
	};

	const DATA_COURSE: Course[] = [
		{
			title: 'Lập trình Web',
			link: '/huong-dan-hoc/webs'
		},
		{
			title: 'Lập trình C/C++',
			link: '/huong-dan-hoc/c'
		}
	];
</script>

<div class="guides">
	<!-- List card course have title Web, C/C++, Java,... -->
	<ul
		class="list-none grid justify-items-center gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"
	>
		{#each DATA_COURSE as course (course.title)}
			<li
				data-sveltekit-preload-data
				data-sveltekit-preload
				class="hover-rgb cursor-pointer w-[250px] h-[150px] border border-dashed border-[#1e5b66] rounded-[5px] p-2.5! shadow-[0_2px_5px_rgba(0,0,0,0.1)]"
			>
				<PreloadLinkWithData
					href={course.link}
					style="display: flex; align-items: center; justify-content: center; color: var(--primary);"
				>
					{course.title}
				</PreloadLinkWithData>
			</li>
		{/each}
	</ul>
</div>
