<script lang="ts">
	const FACEBOOK: string = 'https://www.facebook.com/kitajima2910';
</script>

<div class="wrapper">
	<div class="top">
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
	<div class="bottom">
		<div class="wrapper-bottom">
			<div class="logo">
				<img src="/imgs/icon_pxh.png" alt="logo" />
			</div>
			<div class="menu">
				<div class="menu-item">
					<a href="/#">C/C++</a>
				</div>
				<div class="menu-item">
					<a href="/#">HTML/CSS/JS</a>
				</div>
			</div>
			<div class="search">
				<input type="text" placeholder="Search..." />
			</div>
		</div>
	</div>
</div>

<style>
	/* Wrapper */
	.wrapper {
		width: 100%;
	}

	/* Top */
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: calc((1200 * 1rem) / 16);
		height: calc((40 * 1rem) / 16);
		padding-left: 1rem;
		padding-right: 1rem;
		margin: 0 auto;
	}

	/* Location */
	.location {
		display: flex;
	}

	.location i {
		color: #00adef;
		margin-right: calc((6 * 1rem) / 16);
		display: flex;
	}

	.location span {
		font-size: calc((15 * 1rem) / 16);
		font-weight: 400;
	}

	/* Media */
	.media i {
		color: #00adef;
		font-size: calc((25 * 1rem) / 16);
	}

	.media i:hover {
		color: #001a65;
	}

	/* Bottom */
	.bottom {
		background-color: #001a65;
	}

	/* Wrapper Bottom */
	.wrapper-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: calc((80 * 1rem) / 16);
		padding-left: 1rem;
		padding-right: 1rem;
		max-width: calc((1200 * 1rem) / 16);
		margin: 0 auto;
	}

	/* Menu */
	.menu {
		display: flex;
	}

	.menu-item {
		margin-right: calc((20 * 1rem) / 16);
	}

	.menu-item a {
		color: #fff;
		text-decoration: none;
		font-size: calc((15 * 1rem) / 16);
		font-weight: 600;
	}

	.menu-item a:hover {
		color: #00adef;
	}

	/* Search */
	.search {
		display: flex;
	}

	.search input {
		width: calc((300 * 1rem) / 16);
		height: calc((30 * 1rem) / 16);
		border-radius: calc((5 * 1rem) / 16);
		outline: none;
		border: none;
		padding-left: calc((10 * 1rem) / 16);
	}

	/* Logo */
	.logo {
		width: calc((60 * 1rem) / 16);
		height: calc((60 * 1rem) / 16);
	}

	.logo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: calc((50 * 1rem) / 16);
	}
</style>
