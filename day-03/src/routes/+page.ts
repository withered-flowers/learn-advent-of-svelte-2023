import type { PageLoad } from './$types';
import type { Item } from '$lib/utils/knapsack';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json');
	const json: Item[] = await res.json();

	return {
		sleighLoads: json
	};
};
