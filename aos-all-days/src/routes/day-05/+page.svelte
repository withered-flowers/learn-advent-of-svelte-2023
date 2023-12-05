<script lang="ts">
	import { page } from '$app/stores';
	import BarChart from '$lib/components/BarChart.svelte';
	import DoughnutChart from '$lib/components/DoughnutChart.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import {
		type ChartData,
		createWrappedVsCreatedData,
		createMinutesTakenChartData,
		createElfGroupData,
		createTimestampGroupData
	} from '$lib/utils/d5-dashboard';
	import type { PageData } from './$types';

	export let data: PageData;

	let chartToMake: ChartData[] = [];

	$: filterParams = $page.url.searchParams.get('filter') ?? 'ALL';
	$: filteredData = data.epd.filter((item) => {
		if (filterParams === 'ALL') return true;
		return item.task === filterParams;
	});

	$: {
		let newChartToMake: ChartData[] = [];

		if (filterParams === 'ALL') {
			newChartToMake = [
				...newChartToMake,
				createWrappedVsCreatedData(filteredData),
				createMinutesTakenChartData(filteredData),
				createElfGroupData(filteredData),
				createTimestampGroupData(filteredData)
			];
		} else {
			newChartToMake = [
				...newChartToMake,
				createMinutesTakenChartData(filteredData),
				createElfGroupData(filteredData),
				createTimestampGroupData(filteredData)
			];
		}

		chartToMake = newChartToMake;
	}
</script>

<section class="grid min-h-[100dvh] w-full grid-cols-10 gap-4 bg-gray-50 p-4 text-slate-700">
	<!-- Left (NavBar) -->
	<section class="col-span-10 rounded bg-gray-100 p-4 lg:col-span-2">
		<p class="mb-4 text-xl font-semibold">Filter - {filterParams}</p>
		<ul
			class="ml-0 flex list-none flex-row justify-between gap-2 lg:ml-4 lg:list-disc lg:flex-col lg:justify-start"
		>
			<li>
				<a
					href="/day-05"
					class="text-blue-400 underline underline-offset-2 transition-colors duration-300 hover:text-blue-500"
					class:active={filterParams === 'ALL'}>All</a
				>
			</li>
			<li>
				<a
					href="/day-05?filter=WRAPPED_PRESENT"
					class="text-blue-400 underline underline-offset-2 transition-colors duration-300 hover:text-blue-500"
					class:active={filterParams === 'WRAPPED_PRESENT'}>Wrapped Present</a
				>
			</li>
			<li>
				<a
					href="/day-05?filter=CREATED_TOY"
					class="text-blue-400 underline underline-offset-2 transition-colors duration-300 hover:text-blue-500"
					class:active={filterParams === 'CREATED_TOY'}>Created Toy</a
				>
			</li>
		</ul>

		<section class="mt-8">
			<Footer />
		</section>
	</section>

	<!-- Right (Content) -->
	<section class="col-span-10 rounded bg-gray-100 p-4 lg:col-span-8">
		<p class="mb-4 text-center text-xl font-semibold">Chart for {filterParams}</p>
		<section class="wrap grid grid-cols-2 items-center justify-center gap-4">
			{#each chartToMake as dataChart}
				<section class="mx-auto max-h-[24rem] max-w-[32rem]">
					{#if dataChart.chartType === 'Doughnut'}
						<DoughnutChart data={dataChart} />
					{:else if dataChart.chartType === 'Bar'}
						<BarChart data={dataChart} />
					{/if}
				</section>
			{/each}
		</section>
	</section>
</section>

<style lang="postcss" scoped>
	.active {
		@apply text-blue-600;
	}
</style>
