<script>
  import ChannelItem from './ChannelItem.svelte'

  export let channels = []
</script>

<div class="flex flex-col">
  <div class="overflow-y-auto scrollbar-hide">
    <div class="inline-block min-w-full align-middle overflow-hidden">
      <div class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <div class="bg-gray-50 dark:bg-gray-700">
          <div class="flex">
            <div class="w-36 sm:w-52 shrink-0"></div>
            <div
              class="py-3 px-2 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase dark:text-gray-400 w-52 sm:w-80 shrink-0"
            >
              Name
            </div>
            <div
              class="py-3 px-2 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase dark:text-gray-400 w-48 sm:w-80"
            >
              TVG-ID
            </div>
            <div>
              <span class="sr-only">Actions</span>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800">
          {#each channels as channel (channel.id)}
            <ChannelItem bind:channel />
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
