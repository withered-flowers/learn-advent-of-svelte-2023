<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { calculateSoundDelay, playMorseSound, translateStringToMorse } from '$lib/utils/d7-morse';

	let stringToTranslate = '';
	let morseString = '';
	let context: AudioContext;
	let isSuspended: boolean = false;

	const formSubmitHandler = () => {
		const morseSounds = translateStringToMorse(stringToTranslate);
		morseString = morseSounds
			.map((sound) => {
				let returnedString = '';

				if (sound === 'dash') {
					return '-';
				} else if (sound === 'dot') {
					return '.';
				} else if (sound === 'silence') {
					return '*';
				} else if (sound === 'space') {
					return '/';
				}

				return returnedString;
			})
			.join(' ');
		isSuspended = true;

		morseSounds.forEach((sound, index) => {
			setTimeout(
				() => {
					let delayNumber = calculateSoundDelay(sound);

					if (index === 0) {
						context = new AudioContext();
					}

					playMorseSound(context, 'sine', delayNumber);

					if (index === morseSounds.length - 1) {
						isSuspended = false;
					}
				},
				(index * 1000) / 3
			);
		});
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

		<section>
			<p>Morse String</p>
			<p>{morseString}</p>
		</section>

		<button
			class:custom-disabled={isSuspended}
			class="rounded bg-blue-400 px-4 py-2 text-slate-100 transition-colors duration-300 hover:bg-blue-400/50 hover:text-slate-700"
			type="submit">Morse It !</button
		>
	</form>

	<Footer />
</section>

<style lang="postcss">
	.custom-disabled {
		@apply pointer-events-none cursor-not-allowed opacity-50;
	}
</style>
