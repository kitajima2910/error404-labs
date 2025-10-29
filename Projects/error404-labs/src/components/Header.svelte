<script lang="ts">
	const FACEBOOK: string = 'https://www.facebook.com/kitajima2910';
</script>

<div class="wrapper">
	<div class="left">
		<div class="location">
			<i class="fa-solid fa-location-dot"></i>
			<span>TP. Hồ Chí Minh</span>
		</div>
	</div>
	<div class="right">
		<div class="media">
			<a href={FACEBOOK} target="_blank" aria-label="facebook">
				<i class="fa-brands fa-facebook"></i>
			</a>
		</div>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 1200px;
		height: 40px;
		margin: 0 auto;
		/* background-color: pink; */
	}

	/* Location */
	.location {
		display: flex;
	}

	.location i {
		color: #00adef;
		margin-right: 6px;
		display: flex;
	}

	.location span {
		font-size: 15px;
	}

	/* Media */
	.media i {
		color: #00adef;
		font-size: 25px;
	}

	.media i:hover {
		color: #001a65;
	}
</style>
