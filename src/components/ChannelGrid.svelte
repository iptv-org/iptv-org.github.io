<script lang="ts">
  import type { Collection } from '@freearhey/core/browser'
  import ChannelItem from './ChannelItem.svelte'
  import { query } from '~/store'

  export let channels: Collection

  let limit = 100
  $: channelsDisplay = channels.slice(0, limit)

  query.subscribe(() => {
    limit = 100
  })

  function showMore() {
    limit += 100
  }
</script>

<div class="flex flex-col bg-white dark:bg-primary-810 rounded-b-md">
  <div>
    <div class="w-full inline-block min-w-full align-middle">
      <div class="min-w-full w-full">
        {#each channelsDisplay.all() as channel, index (channel.id)}
          <ChannelItem bind:channel />
        {/each}
      </div>
    </div>
  </div>
  {#if channelsDisplay.count() < channels.count()}
    <button
      class="flex border-t border-gray-200 dark:border-primary-700 items-center justify-center h-12 w-full text-blue-500 dark:text-blue-400 hover:bg-gray-50 hover:dark:bg-primary-750 focus-visible:outline-0 cursor-pointer"
      onclick={showMore}>Show More</button
    >
  {/if}
</div>
