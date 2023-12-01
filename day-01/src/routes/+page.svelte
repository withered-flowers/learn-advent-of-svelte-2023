<script lang="ts">
	import { recalculateScore } from '$lib';
	import type { PageData } from './$types';

	export let data: PageData;
	let newData = data.score;

	export let inputName: string = '';
	export let inputTally: number = 0;

	const onFormSubmitHandler = () => {
		const index = newData.findIndex((item) => item.name === inputName);

		if (index !== -1) {
			newData[index].tally += inputTally;
			newData[index].score = recalculateScore(newData[index].tally);
		} else {
			newData = [
				...newData,
				{
					name: inputName,
					tally: inputTally,
					score: recalculateScore(inputTally)
				}
			];
		}

		newData = newData.toSorted((a, b) => {
			return a.name.localeCompare(b.name);
		});
	};
</script>

<svelte:head>
	<title>Advent of Svelte - Day 01</title>
	<meta name="description" content="Advent of Svelte - Day 01" />
	<meta name="keywords" content="svelte,advent of svelte,day 01" />
</svelte:head>


<!-- Form Add Data -->
<section class="form-container">
	<form on:submit|preventDefault={onFormSubmitHandler}>
		<label for="name">Name</label>
		<input type="text" id="name" name="name" placeholder="Name" bind:value={inputName} />

		<label for="tally">Tally</label>
		<input type="number" id="tally" name="tally" placeholder="Tally" bind:value={inputTally} />

		<button type="submit">Add</button>
	</form>
</section>

<!-- Div Show Data -->
<section class="grid-container">
	{#each newData as eachScore}
		<!-- If score is naughty add score-naughty class -->
		<div class="grid-item {eachScore.score === 'naughty' ? 'score-naughty' : 'score-nice'}">
			{eachScore.name}: {eachScore.tally} ({eachScore.score})
		</div>
	{/each}
</section>

<style lang="postcss">
	@media (min-width: 640px) {
		:root {
			--custom-grid-column: 1fr 1fr;
		}
	}

	@media (min-width: 1024px) {
		:root {
			--custom-grid-column: 1fr 1fr 1fr;
		}
	}

	@media (min-width: 1280px) {
		:root {
			--custom-grid-column: 1fr 1fr 1fr 1fr;
		}
	}

	* {
		font-family: sans-serif;
		color: '#334155';
	}

	.form-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.grid-container {
		display: grid;
		grid-template-columns: var(--custom-grid-column, 1fr);
		grid-gap: 0.25rem;
		padding: 1rem;
	}

	.grid-item {
		padding: 1rem;
		border-radius: 5px;
	}

	.score-naughty {
		background-color: #fecaca;
	}

	.score-nice {
		background-color: #a5f3fc;
	}
</style>
