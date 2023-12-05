type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT';

export type Position = 'top' | 'bottom';
export type ChartType = 'Bar' | 'Doughnut';

export type ChartData = {
	chartType: ChartType;
	labels?: string[];
	datasets: {
		label?: string;
		data: number[];
	}[];
	options?: {
		plugins: {
			title: {
				display: boolean;
				text: string;
				position: Position;
			};
			responsive: boolean;
		};
	};
};

export interface Task {
	elf: string;
	task: TaskType;
	minutesTaken: number;
	date: string;
}

export const createChartData = ({
	chartType,
	label,
	position,
	title,
	titleLabel,
	data
}: {
	chartType: ChartType;
	label: string;
	title: string;
	titleLabel?: string[];
	position: Position;
	data: number[];
}): ChartData => {
	const datasets = [
		{
			label: label,
			data: data
		}
	];
	const options = {
		plugins: {
			title: {
				display: true,
				text: title,
				position,
				font: {
					size: 16
				}
			},
			responsive: true
		}
	};

	return {
		chartType,
		labels: titleLabel,
		datasets,
		options
	};
};

export const fetchDataDashboard = async (): Promise<Task[]> => {
	const response: Response = await fetch(
		'https://advent.sveltesociety.dev/data/2023/day-five.json'
	);
	return await response.json();
};

export const createWrappedVsCreatedData = (filteredData: Task[]): ChartData => {
	const wrapVsCreate = filteredData.reduce(
		(acc, curr) => {
			if (curr.task === 'WRAPPED_PRESENT') acc[0]++;
			if (curr.task === 'CREATED_TOY') acc[1]++;
			return acc;
		},
		[0, 0]
	);

	return createChartData({
		chartType: 'Doughnut',
		label: 'Count',
		title: 'Wrapped vs Created',
		titleLabel: ['Wrapped', 'Created'],
		data: wrapVsCreate,
		position: 'top'
	});
};

export const createMinutesTakenChartData = (filteredData: Task[]): ChartData => {
	const minMinutesTaken = Math.min(...filteredData.map((item) => item.minutesTaken));
	const maxMinutesTaken = Math.max(...filteredData.map((item) => item.minutesTaken));

	const objMinutesTaken: Record<number, number> = {};

	for (let i = minMinutesTaken; i <= maxMinutesTaken; i++) {
		objMinutesTaken[i] = 0;
	}

	const minutesTakenGroup = filteredData.reduce(
		(acc, curr) => {
			const minutesTaken = curr.minutesTaken;
			acc[minutesTaken]++;
			return acc;
		},
		{ ...objMinutesTaken }
	);

	return createChartData({
		chartType: 'Bar',
		label: 'Count',
		title: 'Minutes Taken',
		titleLabel: Object.keys(minutesTakenGroup).map((item) => `${item} min`),
		data: Object.values(minutesTakenGroup),
		position: 'top'
	});
};

// TODO: Refactor code from day-05/+page.svelte
