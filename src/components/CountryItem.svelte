<script>
	import ChannelItem from './ChannelItem.svelte'

	export let country
	export let channels = []
	export let normQuery

	function onExpand() {
		country.expanded = !country.expanded
	}
</script>

{#if channels && channels.length > 0}
<div class="card mb-3 is-shadowless" style="border: 1px solid #dbdbdb">
	<div class="card-header is-shadowless is-clickable" on:click="{onExpand}">
		<span class="card-header-title">{country.flag}&nbsp;{country.name}</span>
		<button class="card-header-icon" aria-label="more options">
			<span class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
					{#if !country.expanded}
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="48"
						d="M112 184l144 144 144-144"
					/>
					{/if} {#if country.expanded}
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="48"
						d="M112 328l144-144 144 144"
					/>
					{/if}
				</svg>
			</span>
		</button>
	</div>
	{#if country.expanded || (channels && channels.length > 0 && normQuery.length)}
	<div class="card-content">
		<div class="table-container">
			<table class="table" style="min-width: 100%">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>TVG-ID</th>
						<th>EPG</th>
					</tr>
				</thead>
				<tbody>
					{#each channels as channel}
					<ChannelItem bind:channel="{channel}"></ChannelItem>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
	{/if}
</div>
{/if}
