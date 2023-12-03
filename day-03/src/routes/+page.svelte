<script lang="ts">
	import { fade } from 'svelte/transition';
	import { sleighWeightsProblem, type Item } from '$lib/utils/knapsack';
	import type { PageData } from './$types';

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

<section class="bg-slate-50 w-full min-h-[100dvh] flex flex-col gap-4 p-4 text-slate-700">
	<section>
		{#if remainingSleighLoads.length > 0}
			<p class="text-center">Gifts Remaining: {remainingSleighLoads.length}</p>
		{/if}
		{#if remainingSleighLoads.length <= 0}
			<p
				class="text-center animate-pulse text-red-400 text-3xl"
				transition:fade={{ duration: 1000 }}
			>
				😭 Knapsack is difficult 😭
			</p>
		{/if}
	</section>
	<!-- Button to Gifts -->
	<button
		class="bg-[#5B8E7D] hover:bg-[#5B8E7D]/50 hover:text-slate-700 text-slate-50 mx-auto py-2 px-4 rounded transition-all duration-300"
		on:click={sleighLoadsBalanceHandler}>Sleigh Load Balance</button
	>

	<!-- Chosen Data -->
	{#if chosenSleighLoads.length > 0}
		<section transition:fade={{ duration: 1000 }}>
			<p class="text-left font-semibold text-3xl mb-4">Chosen Gifts</p>

			{#each chosenSleighLoads as item, index}
				<section class="mb-4" transition:fade={{ duration: 1000 }}>
					<p class="text-left font-semibold text-xl mb-4">
						Sleigh #{index + 1} ({item.data.length}) - {item.totalWeight.toFixed(2)}
					</p>
					<section
						class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
					>
						{#each item.data as gift}
							<section
								class="p-4 bg-zinc-400 hover:bg-zinc-400/50 text-slate-50 hover:text-slate-700 transition-all duration-300 rounded"
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
			<p class="text-left font-semibold text-3xl mb-4">Unsorted Gifts</p>
			<section
				class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
			>
				{#each remainingSleighLoads as item}
					<section
						class="p-4 bg-zinc-400 hover:bg-zinc-400/50 text-slate-50 hover:text-slate-700 transition-all duration-300 rounded"
					>
						<span>{item.name} - {item.weight}</span>
					</section>
				{/each}
			</section>
		</section>
	{/if}
</section>
