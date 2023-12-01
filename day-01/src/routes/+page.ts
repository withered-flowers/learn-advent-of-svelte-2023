import type { PageLoad } from './$types';

type ResponseJson = {
	name: string;
	tally: number;
};

type ResponseJsonCalculated = ResponseJson & {
	score: 'naughty' | 'nice';
};

export const load: PageLoad = async ({ fetch }) => {
	const fetchResponse = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
	const fetchResponseJson: ResponseJson[] = await fetchResponse.json();

	const result = fetchResponseJson
		.map(
			(item): ResponseJsonCalculated => ({
				...item,
				score: item.tally > 0 ? 'nice' : 'naughty'
			})
		)
		.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});

	return {
		score: result
	};
};
