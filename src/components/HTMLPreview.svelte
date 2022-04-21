<script>
	import dayjs from 'dayjs'
	import { search, query, hasQuery, channels, setSearchParam } from '../store.js'

	export let data
	export let close

	let replaced_by = null
	if (data.replaced_by) {
		const channel = $channels.find(c => c.id === data.replaced_by)
		if (channel) replaced_by = channel.name
	}

	const fieldset = [
		{ name: 'logo', type: 'image', value: data.logo },
		{ name: 'name', type: 'string', value: data.name },
		{ name: 'native_name', type: 'string', value: data.native_name },
		{ name: 'network', type: 'link', value: data.network },
		{ name: 'country', type: 'link', value: data.country.name },
		{ name: 'subdivision', type: 'link', value: data.subdivision ? data.subdivision.name : null },
		{ name: 'city', type: 'link', value: data.city },
		{ name: 'broadcast_area', type: 'link[]', value: data.broadcast_area.map(v => v.name) },
		{ name: 'languages', type: 'link[]', value: data.languages.map(v => v.name) },
		{ name: 'categories', type: 'link[]', value: data.categories.map(v => v.name) },
		{ name: 'is_nsfw', type: 'link', value: data.is_nsfw.toString() },
		{
			name: 'launched',
			type: 'date',
			value: data.launched ? dayjs(data.launched).format('D MMMM YYYY') : null
		},
		{
			name: 'closed',
			type: 'date',
			value: data.closed ? dayjs(data.closed).format('D MMMM YYYY') : null
		},
		{ name: 'replaced_by', type: 'channel', value: replaced_by },
		{ name: 'website', type: 'external_link', value: data.website }
	].filter(f => (Array.isArray(f.value) ? f.value.length : f.value))

	function searchBy(name, value) {
		value = value.includes(' ') ? `"${value}"` : value
		const q = `${name}:${value}`
		if($query !== q) {
			query.set(q)
			hasQuery.set(true)
			search(q)
			setSearchParam('q', q)
		}
		close()
	}
</script>

<div class="pb-8 px-8 pt-6 dark:text-white">
	<div class="flex p-4 w-full">
		<table class="table-fixed w-full">
			<tbody>
				{#each fieldset as field}
				<tr>
					<td class="align-top w-[11rem]">
						<div class="flex px-4 py-1 text-sm text-gray-400 whitespace-nowrap dark:text-gray-400">
							{field.name}
						</div>
					</td>
					<td class="align-top">
						<div class="flex px-4 py-1 text-sm text-gray-700 dark:text-gray-100 flex-wrap">
							{#if field.type === 'image'}
							<img
								src="{field.value}"
								alt="{field.name}"
								loading="lazy"
								referrerpolicy="no-referrer"
								class="border rounded-sm overflow-hidden border-gray-200 bg-[#e6e6e6]"
							/>
							{:else if field.type === 'channel'}
							<button
								on:click="{() => searchBy('name', field.value)}"
								class="underline hover:text-blue-500"
							>
								{field.value}
							</button>
							{:else if field.type === 'link'}
							<button
								on:click="{() => searchBy(field.name, field.value)}"
								class="underline hover:text-blue-500"
							>
								{field.value}
							</button>
							{:else if field.type === 'link[]'} {#each field.value as value, i} {#if i > 0}<span
								>,&nbsp;
							</span>
							{/if}
							<button
								on:click="{() => searchBy(field.name, value)}"
								class="underline hover:text-blue-500"
							>
								{value}
							</button>
							{/each} {:else if field.type === 'external_link'}
							<a
								href="{field.value}"
								class="underline hover:text-blue-500 inline-flex align-middle"
								target="_blank"
								rel="noopener noreferrer"
								>{field.value}<span
									class="inline-flex items-center pl-1 text-sm font-semibold text-gray-400 rounded-full"
								>
									<svg
										class="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										></path>
									</svg> </span
							></a>
							{:else} {field.value} {/if}
						</div>
					</td>
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
