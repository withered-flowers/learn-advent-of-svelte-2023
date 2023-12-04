<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	export let data: number[];
	export let width = 640;
	export let height = 400;
	export let marginTop = 20;
	export let marginRight = 20;
	export let marginBottom = 20;
	export let marginLeft = 20;

	let svg;
	let svgPath: d3.Selection<SVGPathElement, unknown, HTMLElement, any>;
	let svgG: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	let svgXAxis: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
	let svgYAxis: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

	$: x = d3
		.scaleLinear()
		.domain([0, data.length - 1])
		.range([marginLeft + 20, width - marginRight - marginLeft]);

	$: y = d3
		.scaleLinear()
		.domain(d3.extent(data) as number[])
		.range([height - marginBottom - marginTop, marginTop + marginBottom]);

	$: line = d3.line((d, i) => x(i), y);

	onMount(() => {
		svg = d3
			.select('#lineChart')
			.append('svg')
			.attr('width', width + marginLeft + marginRight)
			.attr('height', height + marginTop + marginBottom)
			.attr(
				'viewBox',
				`0 0 ${width + marginLeft + marginRight} ${height + marginTop + marginBottom}`
			)
			.attr('preserveAspectRatio', 'xMinYMin meet');

		// Label X
		svg
			.append('text')
			.attr('x', 15)
			.attr('y', 15)
			.attr('stroke', 'currentColor')
			.attr('font-size', '1rem')
			.attr('font-weight', '400')
			.text('Heart Rate');

		// Label Y
		svg
			.append('text')
			.attr('x', width - marginRight - 40)
			.attr('y', height - marginBottom - marginTop)
			.attr('stroke', 'currentColor')
			.attr('font-size', '1rem')
			.attr('font-weight', '400')
			.text('Time Ticks');

		// X Axis
		svgXAxis = svg.append('g').attr('transform', `translate(0, ${height - marginBottom})`);

		// Y Axis
		svgYAxis = svg.append('g').attr('transform', `translate(${marginLeft + marginRight / 2}, 0)`);

		svgPath = svg.append('path');

		svgG = svg
			.append('g')
			.attr('fill', 'white')
			.attr('stroke', 'currentColor')
			.attr('stroke-width', 1.5);
	});

	$: {
		svgPath
			?.datum(data)
			.attr('fill', 'none')
			.attr('stroke', 'currentColor')
			.attr('stroke-width', 1.5)
			.attr('d', line);

		svgG
			?.selectAll('circle')
			.data(data)
			.join('circle')
			.attr('cx', (_d, i) => x(i))
			.attr('cy', y)
			.attr('r', 2.5);

		svgG
			?.selectAll('text')
			.data(data)
			.join('text')
			.attr('x', (_d, i) => x(i) + 10)
			.attr('y', (d) => y(d) - 10)
			.attr('font-size', '0.75rem')
			.attr('font-weight', '100')
			.attr('color', (d) => (d < 80 || d > 120 ? 'red' : 'green'))
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'middle')
			.text((d) => d);

		// svgXAxis will increase the label ticks by 1
		svgXAxis
			?.call(d3.axisBottom(x).ticks(data.length + 1))
			.selectAll('text')
			.text((d) => (d as number) + 1);

		svgYAxis?.call(d3.axisLeft(y));
	}
</script>

<!-- <svg class="w-[40rem] h-[25rem]">
	<path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
	<g fill="white" stroke="currentColor" stroke-width="1.5">
		{#each data as d, i}
			<circle cx={x(i)} cy={y(d)} r="2.5" />
		{/each}
	</g>
</svg> -->

<section id="lineChart"></section>
