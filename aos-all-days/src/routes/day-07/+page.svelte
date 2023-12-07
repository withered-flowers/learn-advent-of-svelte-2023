<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { playMorseSound, stopMorseSound, translateStringToMorse } from '$lib/utils/d7-morse';

	let stringToTranslate = '';
	let context: AudioContext;
	let gainNode: GainNode;
	let suspendState: boolean = false;

	const formSubmitHandler = () => {
		const morseSounds = translateStringToMorse(stringToTranslate);
		const { context: soundContext, gainNode: soundGainNode } = playMorseSound(context, morseSounds);

		context = soundContext;
		gainNode = soundGainNode;
	};

	const stopButtonHandler = () => {
		stopMorseSound(gainNode, context);
		suspendState = true;
	};

	const resumeButtonHandler = () => {
		context.resume();
		suspendState = false;
	};
</script>

<svelte:head>
	<title>Advent of Svelte - Day 07</title>
</svelte:head>

<section
	class="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-4 bg-gray-50 p-4 text-slate-700"
>
	<p>Morse Mischief</p>

	<form class="flex flex-col gap-4" on:submit|preventDefault={formSubmitHandler}>
		<input
			bind:value={stringToTranslate}
			type="text"
			placeholder="Insert sentence here"
			class="min-w-[10rem] px-4 py-2 md:min-w-[18rem]"
		/>
		<button
			class="rounded bg-blue-400 px-4 py-2 text-slate-100 transition-colors duration-300 hover:bg-blue-400/50 hover:text-slate-700"
			type="submit">Morse It !</button
		>
		{#if context && gainNode}
			{#if !suspendState}
				<button type="button" on:click={stopButtonHandler}>Stop Sound</button>
			{:else}
				<button type="button" on:click={resumeButtonHandler}>Resume Sound</button>
			{/if}
		{/if}
	</form>

	<Footer />
</section>
