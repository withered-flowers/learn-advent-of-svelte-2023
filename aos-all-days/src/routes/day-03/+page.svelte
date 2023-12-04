<script lang="ts">
	import { fade } from 'svelte/transition';
	import { sleighWeightsProblem, type Item } from '$lib/utils/d3-knapsack';
	import type { PageData } from './$types';
	import Footer from '$lib/components/Footer.svelte';

	type SleighLoadBalancer = {
		data: Item[];
		totalWeight: number;
	};

	export let data: PageData;

	let chosenSleighLoads: SleighLoadBalancer[] = [];
	let remainingSleighLoads: Item[] = [...data.sleighLoads];

	const sleighLoadsBalanceHandler = () => {
		if (remainingSleighLoads.length === 0) return;

		const { chosen, remaining } = sleighWeightsProblem(remainingSleighLoads);

		const dataToPush = {
			data: [
				...chosen.sort((a, b) => {
					return a.name.localeCompare(b.name);
				})
			],
			totalWeight: chosen.reduce((acc, curr) => acc + curr.weight, 0)
		};

		chosenSleighLoads = [...chosenSleighLoads, dataToPush];
		remainingSleighLoads = [...remaining];
	};
</script>

<svelte:head>
	<title>Advent of Svelte - Day 03</title>
</svelte:head>

<section class="flex min-h-[100dvh] w-full flex-col gap-4 bg-gray-50 p-4 text-slate-700">
	<section>
		{#if remainingSleighLoads.length > 0}
			<p class="text-center">Gifts Remaining: {remainingSleighLoads.length}</p>
		{/if}
		{#if remainingSleighLoads.length <= 0}
			<p
				class="animate-pulse text-center text-3xl text-red-400"
				transition:fade={{ duration: 1000 }}
			>
				😭 Knapsack is difficult 😭
			</p>
		{/if}
	</section>
	<!-- Button to Gifts -->
	<button
		class="mx-auto rounded bg-[#5B8E7D] px-4 py-2 text-slate-50 transition-all duration-300 hover:bg-[#5B8E7D]/50 hover:text-slate-700"
		on:click={sleighLoadsBalanceHandler}>Sleigh Load Balance</button
	>

	<!-- Chosen Data -->
	{#if chosenSleighLoads.length > 0}
		<section transition:fade={{ duration: 1000 }}>
			<p class="mb-4 text-left text-3xl font-semibold">Chosen Gifts</p>

			{#each chosenSleighLoads as item, index}
				<section class="mb-4" transition:fade={{ duration: 1000 }}>
					<p class="mb-4 text-left text-xl font-semibold">
						Sleigh #{index + 1} ({item.data.length}) - {item.totalWeight.toFixed(2)}
					</p>
					<section
						class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
					>
						{#each item.data as gift}
							<section
								class="rounded bg-zinc-400 p-4 text-slate-50 transition-all duration-300 hover:bg-zinc-400/50 hover:text-slate-700"
							>
								<span>{gift.name} - {gift.weight}</span>
							</section>
						{/each}
					</section>
				</section>
			{/each}
		</section>
	{/if}

	<!-- Remaining Data -->
	{#if remainingSleighLoads.length > 0}
		<section transition:fade={{ duration: 1000 }}>
			<p class="mb-4 text-left text-3xl font-semibold">Unsorted Gifts</p>
			<section
				class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
			>
				{#each remainingSleighLoads as item}
					<section
						class="rounded bg-zinc-400 p-4 text-slate-50 transition-all duration-300 hover:bg-zinc-400/50 hover:text-slate-700"
					>
						<span>{item.name} - {item.weight}</span>
					</section>
				{/each}
			</section>
		</section>
	{/if}

	<Footer />
</section>
