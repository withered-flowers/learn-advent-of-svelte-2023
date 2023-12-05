<script lang="ts">
	import { page } from '$app/stores';
	import BarChart from '$lib/components/BarChart.svelte';
	import DoughnutChart from '$lib/components/DoughnutChart.svelte';
	import {
		type ChartData,
		createChartData,
		createWrappedVsCreatedData,
		createMinutesTakenChartData
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
			// [DATA] Elf Group
			const objElfGroup: Record<string, number> = {};

			filteredData.forEach((item) => {
				const elfGroup = item.elf;
				objElfGroup[elfGroup] = 0;
			});

			const elfGroup = filteredData.reduce(
				(acc, curr) => {
					const elfGroup = curr.elf;
					acc[elfGroup]++;
					return acc;
				},
				{ ...objElfGroup }
			);

			// [DATA] Timestamp Count
			const objTimestampCount: Record<string, number> = {};

			filteredData.forEach((item) => {
				const timestamp = new Date(item.date).toLocaleString();
				objTimestampCount[timestamp] = 0;
			});

			const timestampGroup = filteredData.reduce(
				(acc, curr) => {
					const timestamp = new Date(curr.date).toLocaleString();
					acc[timestamp]++;
					return acc;
				},
				{ ...objTimestampCount }
			);

			newChartToMake = [
				...newChartToMake,
				createWrappedVsCreatedData(filteredData),
				createMinutesTakenChartData(filteredData),
				// Elf Group
				createChartData({
					chartType: 'Bar',
					label: 'Count',
					title: 'Elf Group',
					titleLabel: Object.keys(elfGroup),
					data: Object.values(elfGroup),
					position: 'top'
				}),
				// Timestamp Group
				createChartData({
					chartType: 'Bar',
					label: 'Count',
					title: 'Timestamp Group',
					titleLabel: Object.keys(timestampGroup),
					data: Object.values(timestampGroup),
					position: 'top'
				})
			];
		}

		chartToMake = newChartToMake;
	}
</script>

<section class="grid min-h-[100dvh] w-full grid-cols-10 gap-2 bg-gray-50 text-slate-700">
	<!-- Left (NavBar) -->
	<section class="col-span-10 bg-gray-100 p-4 lg:col-span-2">
		<p class="mb-4 text-xl font-semibold">Filter - {filterParams}</p>
		<ul
			class="ml-0 flex list-none flex-row justify-between gap-2 lg:ml-4 lg:list-disc lg:flex-col lg:justify-start"
		>
			<li>
				<a href="/day-05" class="text-blue-400 underline underline-offset-2 hover:text-blue-500"
					>All</a
				>
			</li>
			<li>
				<a
					href="/day-05?filter=WRAPPED_PRESENT"
					class="text-blue-400 underline underline-offset-2 hover:text-blue-500">Wrapped Present</a
				>
			</li>
			<li>
				<a
					href="/day-05?filter=CREATED_TOY"
					class="text-blue-400 underline underline-offset-2 hover:text-blue-500">Created Toy</a
				>
			</li>
		</ul>
	</section>

	<!-- Right (Content) -->
	<section class="col-span-10 bg-gray-100 p-4 lg:col-span-8">
		<p class="mb-4 text-center text-xl font-semibold">Chart for {filterParams}</p>
		<section class="wrap grid grid-cols-2 items-center justify-center gap-4">
			{#each chartToMake as dataChart}
				<section class="mx-auto max-h-[24rem] max-w-[32rem]">
					{#if dataChart.chartType === 'Doughnut'}
						<DoughnutChart data={dataChart} />
					{:else if dataChart.chartType === 'Bar'}
						<!-- <DoughnutChart data={dataChart} /> -->
						<BarChart data={dataChart} />
					{/if}
				</section>
			{/each}
		</section>
	</section>
</section>
