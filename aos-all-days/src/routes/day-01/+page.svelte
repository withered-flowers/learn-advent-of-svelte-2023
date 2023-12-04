<script lang="ts">
	import { recalculateScore } from '$lib/utils/d1-score';
	import Github from '$lib/icons/github.svg';
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

		newData.sort((a, b) => {
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
	<form class="form" on:submit|preventDefault={onFormSubmitHandler}>
		<label for="name">Name</label>
		<input type="text" id="name" name="name" placeholder="Name" bind:value={inputName} />

		<label for="tally">Tally</label>
		<input type="number" id="tally" name="tally" placeholder="Tally" bind:value={inputTally} />

		<button class="form-button" type="submit">Add</button>
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

<!-- Div Link -->
<section class="link-container">
	<a
		href="https://github.com/withered-flowers/learn-advent-of-svelte-2023/tree/main/aos-all-days"
		class="link-item"
	>
		<img class="link-image" src={Github} alt="github" />
		(Source Code)
	</a>
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
			--custom-form-flex-direction: row;
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

	input {
		padding: 0.25rem;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	button {
		padding: 0.25rem;
		border-radius: 5px;
		border: 1px solid #ccc;
		cursor: pointer;
		min-width: 5rem;
	}

	button:hover {
		background-color: rgb(230, 230, 230);
	}

	.form-container,
	.link-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.form-container {
		margin-top: 1rem;
	}

	.link-container {
		margin-bottom: 1rem;
	}

	.form {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: var(--custom-form-flex-direction, column);
		gap: 0.5rem;
	}

	.form-button {
		width: 100%;
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

	.link-item {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		text-decoration: underline;
		text-underline-offset: 0.1rem;
	}

	.link-item:hover {
		color: blue;
	}

	.link-item:hover .link-image {
		opacity: 0.5;
	}

	.link-image {
		width: 2rem;
		height: 2rem;
	}
</style>
