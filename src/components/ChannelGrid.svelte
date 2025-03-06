<script>
  import ChannelItem from './ChannelItem.svelte'

  export let channels = []

  let limit = 100

  $: channelsDisplay = channels.slice(0, limit)

  function showMore() {
    limit += 100
  }
</script>

<div class="flex flex-col bg-white dark:bg-gray-800">
  <div class="overflow-y-auto scrollbar-hide">
    <div class="inline-block min-w-full align-middle">
      <div class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <div class="bg-gray-50 dark:bg-gray-700">
          <div class="flex">
            <div class="w-36 sm:w-[200px] shrink-0"></div>
            <div
              class="w-[216px] sm:w-80 py-3 px-2 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase dark:text-gray-400 shrink-0"
            >
              Name
            </div>
            <div
              class="w-52 sm:w-[280px] py-3 px-2 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase dark:text-gray-400"
            >
              ID
            </div>
            <div>
              <span class="sr-only">Actions</span>
            </div>
          </div>
        </div>
        <div>
          {#each channelsDisplay as channel}
            <ChannelItem bind:channel />
          {/each}
        </div>
      </div>
    </div>
  </div>
  {#if channelsDisplay.length < channels.length}
    <button
      class="flex border-t border-gray-200 dark:border-gray-700 items-center justify-center h-12 w-full text-blue-500 dark:text-blue-400 hover:bg-gray-50 hover:dark:bg-gray-700 focus-visible:outline-0"
      on:click={showMore}>Show More</button
    >
  {/if}
</div>
