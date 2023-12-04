const MAX_WEIGHT = 100.0;

export interface Item {
	name: string;
	weight: number;
}

export interface Result {
	chosen: Item[];
	remaining: Item[];
}

// Based on https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/
// Function is generated by OpenAI & Github Copilot
export function sleighWeightsProblem(items: Item[], maxWeight: number = MAX_WEIGHT): Result {
	const scale = 100; // Adjust this based on your needs

	// Scale the weights
	const scaledItems = items.map((item) => ({ ...item, weight: Math.round(item.weight * scale) }));
	const scaledMaxWeight = Math.round(maxWeight * scale);

	const n = scaledItems.length;

	// Create a 2D array to store the maximum number of items that can be carried for each weight
	const dp: number[][] = Array.from({ length: n + 1 }, () => Array(scaledMaxWeight + 1).fill(0));

	// Build the DP table
	for (let i = 1; i <= n; i++) {
		const currentItem = scaledItems[i - 1];

		for (let w = 1; w <= scaledMaxWeight; w++) {
			if (currentItem.weight <= w) {
				// Choose the maximum between including and excluding the current item
				dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - currentItem.weight] + 1);
			} else {
				// If the current item's weight is greater than the current capacity, exclude it
				dp[i][w] = dp[i - 1][w];
			}
		}
	}

	// Trace back to find the selected items
	let i = n;
	let w = scaledMaxWeight;
	const selectedItems: Item[] = [];

	while (i > 0 && w > 0) {
		const currentItem = scaledItems[i - 1];

		if (dp[i][w] !== dp[i - 1][w]) {
			// Include the current item in the selected items
			selectedItems.push({ ...currentItem, weight: currentItem.weight / scale });
			w -= currentItem.weight;
		}

		i--;
	}

	// The remaining items are those not included in the selected items
	const remainingItems = scaledItems
		.filter((item) => !selectedItems.some((selectedItem) => selectedItem.name === item.name))
		.map((item) => ({ ...item, weight: item.weight / scale }));

	return {
		chosen: selectedItems,
		remaining: remainingItems
	};
}