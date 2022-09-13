<script>
	import ChannelItem from './ChannelItem.svelte'

	export let channels = []
</script>

<div class="flex flex-col">
	<div class="overflow-x-auto">
		<div class="inline-block min-w-full align-middle">
			<div class="overflow-hidden">
				<table
					class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed md:w-[62rem]"
				>
					<thead class="bg-gray-50 dark:bg-gray-700">
						<tr>
							<th scope="col" class="min-w-[10rem] md:w-[13rem] relative"></th>
							<th
								scope="col"
								class="py-3 px-3 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase dark:text-gray-400 min-w-[14rem] md:w-[19rem]"
							>
								Name
							</th>
							<th
								scope="col"
								class="py-3 px-2 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase dark:text-gray-400 min-w-[12rem] md:w-[16rem]"
							>
								TVG-ID
							</th>
							<th scope="col" class="relative min-w-[11rem]">
								<span class="sr-only">Actions</span>
							</th>
						</tr>
					</thead>
					<tbody class="bg-white dark:bg-gray-800">
						{#each channels as channel (channel.id)}
						<ChannelItem bind:channel="{channel}" />
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
