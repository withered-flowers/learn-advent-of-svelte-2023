export type HeartRateResponse = {
	heartRate: number;
};

// We will simulate the data given from source:
// - https://advent.sveltesociety.dev/data/2023/day-four.json

// To minimalize the fetch request to the server, we will generate random data
export const randomHeartRate = (): HeartRateResponse => {
	return {
		heartRate: Math.floor(Math.random() * 70) + 50
	};
};
