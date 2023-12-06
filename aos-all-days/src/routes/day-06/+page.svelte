<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import ticks from '$lib/sounds/tick.mp3';
	import tocks from '$lib/sounds/tock.mp3';
	import Footer from '$lib/components/Footer.svelte';

	let tempo = '4/4';
	let isStarted = false;
	let beat = 0;
	let seconds = 1;
	let interval = -1;
	let currBpm = '0';

	let audioTick: HTMLAudioElement;
	let audioTock: HTMLAudioElement;

	let currNumerator = 0;
	$: numerator = Number(tempo.split('/')[0]) + 1;

	const fractionStringToNumber = (strNumber: string) => {
		const [numerator, denominator] = strNumber.split('/').map(Number);
		return numerator / denominator;
	};

	const countBpm = () => {
		if (!isStarted) {
			isStarted = true;
			beat = 0;
			seconds = 1;

			interval = setInterval(() => {
				seconds += 1;
			}, 1000);
		}

		beat += 1;
		currNumerator = beat % numerator;

		currBpm = isNaN((beat / seconds) * 60 * fractionStringToNumber(tempo))
			? '0'
			: ((beat / seconds) * 60 * fractionStringToNumber(tempo)).toFixed(2);

		// Play ticks or tocks based on tempo
		if (currNumerator === 0) {
			audioTock.play();
		} else {
			audioTick.play();
		}
	};

	const stopBpm = () => {
		isStarted = false;
		clearInterval(interval);
	};

	onMount(() => {
		audioTick = new Audio(ticks);
		audioTock = new Audio(tocks);

		const keydownHandler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				stopBpm();
			}
		};

		window.addEventListener('keydown', keydownHandler);

		return () => {
			window.removeEventListener('keydown', keydownHandler);
		};
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Advent of Svelte - Day 6</title>
</svelte:head>

<section
	class="flex min-h-[100dvh] w-full flex-col items-center gap-4 bg-gray-50 p-4 text-slate-700"
>
	<p class="mb-4 text-center text-3xl font-semibold">Mistletoe Metronome</p>

	<section class="w-1/2 rounded-lg bg-[#fff7c4] px-4 py-2 md:w-1/3">
		<label for="tempo" class="mb-2 block text-sm font-bold">Tempo</label>
		<select
			name="tempo"
			id="tempo"
			class="w-full rounded-lg border border-[#A9B388] bg-[#fff7c4] px-4 py-2 shadow-md transition-all duration-300 hover:border-[#A9B388]/80 hover:shadow-lg"
			bind:value={tempo}
		>
			<option value="3/4">3/4</option>
			<option value="4/4">4/4</option>
			<option value="6/8">6/8</option>
		</select>

		{#if !isStarted}
			<p class="mt-4 text-center">Press the button to start</p>
		{/if}
		{#if isStarted}
			<p class="mt-4 text-center">Press the button to calculate the bpm, Esc to stop</p>
		{/if}

		<section
			class="mx-auto my-8 w-1/4 rounded-lg bg-[#A9B388] p-4 shadow-md transition-all duration-300 hover:bg-[#A9B388]/80 hover:text-white hover:shadow-lg"
			class:end={!isStarted}
		>
			<p class="text-center text-3xl font-semibold">{currBpm}</p>
		</section>

		<section
			class="mx-auto mb-4 flex w-[560px] items-center justify-center overflow-hidden rounded-xl"
		>
			<iframe
				width="560"
				height="315"
				src="https://www.youtube-nocookie.com/embed/nlR0MkrRklg?si=jCodXwPVExH4eeiD"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			></iframe>
		</section>

		<section class="flex items-center">
			<button
				class="mb-4 w-full rounded-lg bg-[#ffeb6d] px-4 py-2 shadow-md transition-all duration-300 hover:bg-[#ffeb6d]/80 hover:shadow-lg"
				on:click={countBpm}>bpm</button
			>
		</section>
	</section>

	<Footer />
</section>

<style lang="postcss">
	.end {
		@apply bg-[#5F6F52];
	}
</style>
