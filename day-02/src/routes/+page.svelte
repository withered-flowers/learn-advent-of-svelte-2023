<script lang="ts">
	import { onMount } from 'svelte';
	import lottie from 'lottie-web';
	import sleepAnimationJson from '$lib/animations/sleep.json';
	import happyAnimationJson from '$lib/animations/happy.json';
	import cookies from '$lib/images/cookies.png';
	import Github from '$lib/icons/github.svg';

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
	class="bg-gray-50 min-w-full min-h-[100dvh] flex flex-col gap-4 items-center justify-center text-slate-700"
>
	<h1 class="text-3xl font-semibold">Cookie Counter</h1>

	<section class="flex gap-1 items-center justify-center">
		Cookies Eaten: {counter}
		{#if counter > 0}
			<span>x</span>
			<img class="w-4 h-4" src={cookies} alt="cookies" />
			{#if counter >= 10}
				<img class="w-4 h-4" src={cookies} alt="cookies" />
			{/if}
		{/if}
	</section>

	<section id="lottie" class="w-48 h-48 flex gap-4"></section>

	<section class="flex gap-2">
		<button
			class="py-2 px-4 text-slate-100 hover:text-slate-700 bg-amber-400 hover:bg-amber-400/50 duration-300 transition-colors rounded"
			on:click={buttonIncrementHandler}>+</button
		>
		<button
			class="py-2 px-4 duration-300 transition-all rounded text-slate-100 {counter <= 0
				? 'bg-gray-400/50 hover:bg-gray-400/50'
				: 'bg-red-400 hover:bg-red-400/50 hover:text-slate-700'}"
			disabled={counter <= 0 ? true : false}
			on:click={buttonDecrementHandler}>-</button
		>
		<button
			class="py-2 px-4 bg-blue-400 text-slate-100 hover:text-slate-700 hover:bg-blue-400/50 duration-300 transition-colors rounded"
			on:click={buttonResetHandler}>Reset</button
		>
	</section>

	<section>
		<a
			href="https://github.com/withered-flowers/learn-advent-of-svelte-2023/tree/day-02/day-02"
			class="bg-gray-200 hover:bg-gray-200/50 text-slate-700 transition-colors duration-300 py-2 px-4 rounded flex gap-2 items-center"
		>
			<img class="link-image" src={Github} alt="github" />
			(Source Code)
		</a>
	</section>
</section>
