<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	const dayDone = 9;
</script>

<svelte:head>
	<title>Advent of Svelte - withered-flowers</title>
</svelte:head>

<section
	class="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-gray-50 text-slate-700"
>
	<section class="mx-auto max-w-3xl">
		<h1 class="text-center text-3xl font-bold text-gray-900">Advent of Svelte</h1>

		<section class="grid grid-cols-7 rounded-md p-4 md:grid-cols-7">
			{#each Array.from({ length: 24 }, (_, i) => i + 1) as day}
				<a
					href={`/day-${day.toString().padStart(2, '0')}`}
					class="m-2 flex flex-col items-center justify-center rounded-md bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
					class:pointer-events-none={day > dayDone}
					class:opacity-30={day > dayDone}
					aria-disabled={day > dayDone}
				>
					<span class="text-sm font-medium text-gray-500">Day</span>
					<span class="text-2xl font-bold text-gray-900">{day.toString().padStart(2, '0')}</span>
				</a>
			{/each}
		</section>
	</section>

	<Footer />
</section>
