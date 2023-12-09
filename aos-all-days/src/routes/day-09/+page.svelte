<script lang="ts">
	// Modified from
	// https://tailwindcomponents.com/component/countdown-timer
	import Confetti from '$lib/components/Confetti.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import dayjs from 'dayjs';
	import lottie from 'lottie-web';
	import superChristmas from '$lib/animations/super-christmas.json';

	import { onMount, onDestroy } from 'svelte';

	// Since I'm from UTC+7, I'll use my timezone
	const endTime = '2023-12-25T00:00:00.000+07:00';

	let timer: number = -1;
	let now = dayjs().valueOf();
	let end = dayjs(endTime).valueOf();

	export let dayVal = 'day';
	export let hourVal = 'hour';
	export let minuteVal = 'minute';
	export let secondVal = 'second';

	onMount(() => {
		timer = setInterval(() => {
			now = dayjs().valueOf();

			if (checkEventEnded()) {
				clearInterval(timer);
			}
		}, 1000);

		lottie.loadAnimation({
			container: document.getElementById('lottie')!,
			animationData: superChristmas,
			loop: true,
			autoplay: true
		});
	});

	onDestroy(() => {
		clearInterval(timer);
	});

	$: count = isNaN(Math.round((end - now) / 1000)) ? 0 : Math.round((end - now) / 1000);
	$: d = Math.floor(count / (3600 * 24));
	$: h = Math.floor(count / 3600) % 24;
	$: m = Math.floor(count / 60) % 60;
	$: s = count % 60;

	const checkEventEnded = (): boolean => {
		let currentTime: number = dayjs().valueOf();
		let eventEnd: number = dayjs(endTime).valueOf();

		return currentTime >= eventEnd;
	};
</script>

<svelte:head>
	<title>Advent of Svelte - Day 09</title>
</svelte:head>

<section
	class="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-4 bg-gray-50 p-4 text-slate-700"
>
	<h1 class="animate-pulse text-center text-3xl font-semibold">Countdown to Christmas (2023)</h1>
	<section id="lottie" class="flex h-48 w-48 gap-4"></section>
	<section class="flex w-full items-center justify-center text-center text-6xl">
		<section class="mx-1 w-24 rounded-lg bg-white p-2 text-[#4285f4]">
			<section class="font-mono leading-none">{d}</section>
			<section class="font-mono text-sm uppercase leading-none">{dayVal}</section>
		</section>
		<section class="mx-1 w-24 rounded-lg bg-white p-2 text-[#fbbc05]">
			<section class="font-mono leading-none">{h}</section>
			<section class="font-mono text-sm uppercase leading-none">{hourVal}</section>
		</section>
		<section class="mx-1 w-24 rounded-lg bg-white p-2 text-[#1aa260]">
			<section class="font-mono leading-none">{m}</section>
			<section class="font-mono text-sm uppercase leading-none">{minuteVal}</section>
		</section>
		<section class="mx-1 text-2xl font-extralight text-slate-500">and</section>
		<section class="mx-1 w-24 rounded-lg bg-white p-2 text-[#db4437]">
			<section class="font-mono leading-none">{s}</section>
			<section class="font-mono text-sm uppercase leading-none">{secondVal}</section>
		</section>
	</section>
	<Footer />
	<Confetti />
</section>
