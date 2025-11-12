<script lang="ts">
	import { page } from '$app/state';

	let email = page.params.email;
</script>

<div class="hero min-h-screen bg-base-300">
	<div class="hero-content">
		<div class="max-w-2xl text-center">
			<h1 class="text-4xl font-bold text-white">{email}'s Page</h1>
			<p class="mx-auto max-w-md py-3">User description here...</p>
			<div class="grid grid-cols-3">
				<div class="card m-4 bg-slate-700 shadow-lg shadow-blue-900">
					<div class="card-body">
						<div class="text-center">
							<img src={''} alt="Pokemon Image" class="mx-auto h-32 w-32 bg-gray-500" />
							<h2 class="text-2xl font-bold text-white">Pikachu</h2>
							<p class="text-info">Electric</p>
						</div>
					</div>
				</div>
				<div class="card m-4 bg-slate-700 shadow-lg shadow-blue-900">
					<div class="card-body">
						<div class="text-center">
							<img src={''} alt="Pokemon Image" class="mx-auto h-32 w-32 bg-gray-500" />
							<h2 class="text-2xl font-bold text-white">Pikachu</h2>
							<p class="text-info">Electric</p>
						</div>
					</div>
				</div>
				<div class="card m-4 bg-slate-700 shadow-lg shadow-blue-900">
					<div class="card-body">
						<div class="text-center">
							<img src={''} alt="Pokemon Image" class="mx-auto h-32 w-32 bg-gray-500" />
							<h2 class="text-2xl font-bold text-white">Pikachu</h2>
							<p class="text-info">Electric</p>
						</div>
					</div>
				</div>
				<div class="card m-4 bg-slate-700 shadow-lg shadow-blue-900">
					<div class="card-body">
						<div class="text-center">
							<img src={''} alt="Pokemon Image" class="mx-auto h-32 w-32 bg-gray-500" />
							<h2 class="text-2xl font-bold text-white">Pikachu</h2>
							<p class="text-info">Electric</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
