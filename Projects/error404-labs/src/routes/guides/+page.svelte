<script lang="ts">
	type Course = {
		title: string;
		img: string;
		description: string;
		link: string;
	};

	const DATA_COURSE: Course[] = [
		{
			title: 'Web',
			img: '/guides/imgs/webs.png',
			description: '',
			link: '/guides/webs'
		},
		{
			title: 'C/C++',
			img: '/guides/imgs/c.png',
			description: '',
			link: '/guides/c'
		}
	];
</script>

<div class="guides">
	<!-- List card course have title Web, C/C++, Java,... -->
	<ul>
		{#each DATA_COURSE as course (course.title)}
			<li data-sveltekit-preload-data data-sveltekit-preload>
				<a href={course.link}>
					<img src={course.img} alt={course.title} />
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.guides {
		ul {
			list-style: none;
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			gap: 3rem;

			li {
				cursor: pointer;

				a {
					display: inline-block;
					text-decoration: none;
					color: black;

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
						transition: all 0.3s ease-in-out;
						border-radius: calc((10 * 1rem) / 16);
						box-shadow: 0 calc((2 * 1rem) / 16) calc((5 * 1rem) / 16) rgba(0, 0, 0, 0.1);

						&:hover {
							transform: scale(1.05);
						}
					}
				}
			}
		}
	}
</style>
