<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
		Colors
	} from 'chart.js';
	import type { ChartData } from '$lib/utils/d5-dashboard';

	export let data: ChartData;

	ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors);
</script>

<Bar {data} options={data.options} height={300} width={400} />
