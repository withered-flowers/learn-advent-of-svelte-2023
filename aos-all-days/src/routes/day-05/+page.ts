import { fetchDataDashboard } from '$lib/utils/d5-dashboard';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const tasks = await fetchDataDashboard();

	return {
		epd: tasks
	};
};
