<script lang="ts">
	import { onMount } from 'svelte';
	import lottie from 'lottie-web';
	import sleepAnimationJson from '$lib/animations/sleep.json';
	import happyAnimationJson from '$lib/animations/happy.json';
	import cookies from '$lib/images/cookies.png';
	import Footer from '$lib/components/Footer.svelte';

	let counter = 0;
	$: animationToLoad = chooseAnimation(counter);
	$: prevAnimationToLoad = chooseAnimation(counter - 1);
	$: nextAnimationToLoad = chooseAnimation(counter + 1);

	const chooseAnimation = (curr: number) => {
		if (curr >= 10) {
			return happyAnimationJson;
		} else {
			return sleepAnimationJson;
		}
	};

	const createAnimation = (compare?: unknown, current?: unknown) => {
		let animationToUse;

		if (counter === 0 || (compare === undefined && current === undefined)) {
			animationToUse = sleepAnimationJson;
		} else {
			animationToUse = compare;
		}

		if (compare !== current || counter === 0) {
			lottie.destroy();
			lottie.loadAnimation({
				container: document.getElementById('lottie')!,
				animationData: animationToUse,
				loop: true,
				autoplay: true
			});
		}
	};

	const buttonIncrementHandler = () => {
		counter++;
		createAnimation(nextAnimationToLoad, animationToLoad);
	};

	const buttonDecrementHandler = () => {
		counter--;
		createAnimation(prevAnimationToLoad, animationToLoad);
	};

	const buttonResetHandler = () => {
		counter = 0;
		createAnimation();
	};

	onMount(async () => {
		lottie.loadAnimation({
			container: document.getElementById('lottie')!,
			animationData: animationToLoad,
			loop: true,
			autoplay: true
		});
	});
</script>

<svelte:head>
	<title>Advent of Svelte - Day 02</title>
</svelte:head>

<section
	class="flex min-h-[100dvh] min-w-full flex-col items-center justify-center gap-4 bg-gray-50 text-slate-700"
>
	<h1 class="text-3xl font-semibold">Cookie Counter</h1>

	<section class="flex items-center justify-center gap-1">
		Cookies Eaten: {counter}
		{#if counter > 0}
			<span>x</span>
			<img class="h-4 w-4" src={cookies} alt="cookies" />
			{#if counter >= 10}
				<img class="h-4 w-4" src={cookies} alt="cookies" />
			{/if}
		{/if}
	</section>

	<section id="lottie" class="flex h-48 w-48 gap-4"></section>

	<section class="flex gap-2">
		<button
			class="rounded bg-amber-400 px-4 py-2 text-slate-100 transition-colors duration-300 hover:bg-amber-400/50 hover:text-slate-700"
			on:click={buttonIncrementHandler}>+</button
		>
		<button
			class="rounded px-4 py-2 text-slate-100 transition-all duration-300 {counter <= 0
				? 'bg-gray-400/50 hover:bg-gray-400/50'
				: 'bg-red-400 hover:bg-red-400/50 hover:text-slate-700'}"
			disabled={counter <= 0 ? true : false}
			on:click={buttonDecrementHandler}>-</button
		>
		<button
			class="rounded bg-blue-400 px-4 py-2 text-slate-100 transition-colors duration-300 hover:bg-blue-400/50 hover:text-slate-700"
			on:click={buttonResetHandler}>Reset</button
		>
	</section>

	<Footer />
</section>
