<script>
	import ChannelGrid from './ChannelGrid.svelte'

	export let country
	export let channels = []
	export let hasQuery

	$: expanded = country.expanded || (channels && channels.length > 0 && hasQuery)

	function onExpand() {
		country.expanded = !country.expanded
	}
</script>

<div class="mb-3">
	<h2 id="accordion-heading-{country.code}">
		<button
			on:click="{onExpand}"
			type="button"
			class="flex items-center focus:ring-0 dark:focus:ring-gray-800 justify-between p-4 w-full font-medium text-left border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
			class:rounded-t-md="{expanded}"
			class:rounded-md="{!expanded}"
			class:border-b-0="{expanded}"
			aria-expanded="{expanded}"
			aria-controls="accordion-body-{country.code}"
		>
			<span>{country.flag}&nbsp;{country.name}</span>
			<svg
				class:rotate-180="{expanded}"
				class="w-6 h-6 shrink-0"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					clip-rule="evenodd"
				></path>
			</svg>
		</button>
	</h2>
	{#if expanded}
	<div id="accordion-body-{country.code}" aria-labelledby="accordion-heading-{country.code}">
		<div
			class="border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-b-md overflow-hidden"
		>
			<ChannelGrid bind:channels="{channels}" />
		</div>
	</div>
	{/if}
</div>
