<script lang="ts">
	import { Doughnut } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		ArcElement,
		CategoryScale,
		Colors
	} from 'chart.js';
	import type { ChartData } from '$lib/utils/d5-dashboard';

	export let data: ChartData;

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, Colors);
</script>

<Doughnut {data} options={data.options} />
