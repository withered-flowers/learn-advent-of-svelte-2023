<script lang="ts">
	import { onMount } from 'svelte';
	import { type HeartRateResponse, randomHeartRate } from '$lib/utils/random';
	import LinePlot from '../components/LinePlot.svelte';

	let arrHeartRate: HeartRateResponse[] = [];
	let currGraphHeartRate: HeartRateResponse[] = [];

	// Find minimum heart rate from arrHeartRate
	$: minHeartRate =
		arrHeartRate.length > 0 ? Math.min(...arrHeartRate.map((datum) => datum.heartRate)) : 0.0;
	$: maxHeartRate =
		arrHeartRate.length > 0 ? Math.max(...arrHeartRate.map((datum) => datum.heartRate)) : 0;
	$: avgHeartRate =
		arrHeartRate.length > 0
			? arrHeartRate.reduce((acc, curr) => acc + curr.heartRate, 0) / arrHeartRate.length
			: 0;

	const pushHeartRate = () => {
		const newHeartRate = randomHeartRate();

		arrHeartRate = [...arrHeartRate, newHeartRate];

		// If data already 30, remove the first element
		if (currGraphHeartRate.length >= 30) {
			currGraphHeartRate.shift();
		}

		currGraphHeartRate = [...currGraphHeartRate, newHeartRate];
	};

	onMount(() => {
		const interval = setInterval(pushHeartRate, 1000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Advent of Svelte - Day 04</title>
</svelte:head>

<section class="bg-gray-50 w-full min-h-[100dvh] p-4 text-slate-700">
	<p class="text-3xl font-semibold mb-4">Santa's Heart Rate Monitor&trade;</p>
	<p class="animate-pulse text-red-300">This won't work well on mobile devices</p>

	<section class="flex flex-col items-center justify-center p-4 gap-4">
		<LinePlot data={currGraphHeartRate.map((datum) => datum.heartRate)} />
		<section class="text-center text-sm">
			<p>Total Data: {arrHeartRate.length + 1}</p>
			<section class="flex gap-4">
				<p>Min: {minHeartRate.toFixed(2)}</p>
				<p>Average: {avgHeartRate.toFixed(2)}</p>
				<p>Max: {maxHeartRate.toFixed(2)}</p>
			</section>
		</section>
	</section>
</section>
