import { fetchDataDashboard } from '$lib/utils/d5-dashboard';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const tasks = await fetchDataDashboard(fetch);

	return {
		epd: tasks
	};
};
