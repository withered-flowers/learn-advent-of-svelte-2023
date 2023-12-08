<script lang="ts">
	import { arrImageStore, type CardState } from '$lib/utils/d8-pairoftwo';
	import { onDestroy } from 'svelte';
	import catHolidays from '$lib/images/cat-holidays.png';

	let subbedArrImageStore: CardState[][];
	let theGameState = [
		{ row: -1, col: -1 },
		{ row: -1, col: -1 }
	];
	let totalMatches = 0;
	let cheatSwitch = false;

	let unsubArrImageStore = arrImageStore.subscribe((value) => {
		subbedArrImageStore = value;
	});

	const imageClickHandler = (colNumber: number, rowNumber: number) => {
		// If current location is already visible or matched, do nothing
		if (
			subbedArrImageStore[rowNumber][colNumber].state === 'visible' ||
			subbedArrImageStore[rowNumber][colNumber].state === 'matched'
		) {
			return;
		}

		// If this is the first, set the first location
		if (theGameState[0].row === -1 && theGameState[0].col === -1) {
			theGameState[0].row = rowNumber;
			theGameState[0].col = colNumber;
			subbedArrImageStore[rowNumber][colNumber].state = 'visible';
			return;
		} else if (theGameState[1].row === -1 && theGameState[1].col === -1) {
			// If this is the second, set the second location
			theGameState[1].row = rowNumber;
			theGameState[1].col = colNumber;
			subbedArrImageStore[rowNumber][colNumber].state = 'visible';

			// Check if the two locations match
			if (
				subbedArrImageStore[theGameState[0].row][theGameState[0].col].imageNumber ===
				subbedArrImageStore[theGameState[1].row][theGameState[1].col].imageNumber
			) {
				// If they match, set the state to matched
				subbedArrImageStore[theGameState[0].row][theGameState[0].col].state = 'matched';
				subbedArrImageStore[theGameState[1].row][theGameState[1].col].state = 'matched';
				theGameState[0].row = -1;
				theGameState[0].col = -1;
				theGameState[1].row = -1;
				theGameState[1].col = -1;
				totalMatches++;
				return;
			}
		} else {
			// If this is the third, reset the first and second location
			subbedArrImageStore[theGameState[0].row][theGameState[0].col].state = 'hidden';
			subbedArrImageStore[theGameState[1].row][theGameState[1].col].state = 'hidden';
			theGameState[0].row = rowNumber;
			theGameState[0].col = colNumber;
			theGameState[1].row = -1;
			theGameState[1].col = -1;
			subbedArrImageStore[rowNumber][colNumber].state = 'visible';
			return;
		}
	};

	onDestroy(() => {
		unsubArrImageStore();
	});
</script>

<svelte:head>
	<title>Advent of Svelte - Day 08</title>
</svelte:head>

<section
	class="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-4 bg-gray-50 p-4 text-slate-700"
>
	<p>Santa's Mysterious Deck of Doubles</p>

	<section>
		<button
			class="rounded bg-blue-400 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-400/50 hover:text-red-400"
			on:click={() => (cheatSwitch = !cheatSwitch)}
		>
			<span class="hover:animate-pulse">{cheatSwitch ? 'Hide' : 'Show'} Cheat</span>
		</button>
	</section>

	<section class="grid grid-cols-6 gap-4">
		{#each subbedArrImageStore as row, rowNumber}
			{#each row as col, colNumber}
				<button class="group" on:click={() => imageClickHandler(colNumber, rowNumber)}>
					<section class="transition-all duration-500 group-hover:opacity-80 group-hover:shadow-md">
						{#if cheatSwitch}
							<span
								class="invisible absolute -ml-3 -mt-8 rounded bg-gray-100 p-1 text-red-500 opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:z-50 group-hover:opacity-100"
								>{col.imageNumber}</span
							>
						{/if}
						<img
							class="h-24 w-16 rounded font-mono text-blue-400"
							class:matched={col.state === 'matched'}
							src={col.state === 'hidden'
								? catHolidays
								: `https://advent.sveltesociety.dev/data/2023/day-eight/${col.imageNumber}.png`}
							alt={`Cheat (${col.imageNumber})`}
						/>
					</section>
				</button>
			{/each}
		{/each}
	</section>

	<section>
		Total Matches: {totalMatches}
	</section>
</section>

<style lang="postcss">
	.matched {
		@apply opacity-50 transition-opacity duration-300;
	}
</style>
