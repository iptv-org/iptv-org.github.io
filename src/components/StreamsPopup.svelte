<script>
  import CloseButton from '~/components/CloseButton.svelte'
  import StreamItem from '~/components/StreamItem.svelte'
  import { getContext } from 'svelte'

  export let streams = []
  export let title = 'Streams'

  const { close } = getContext('simple-modal')
</script>

<div class="relative px-2 py-32 flex justify-center" on:keypress on:click|self={close}>
  <div class="relative bg-white rounded-md shadow dark:bg-gray-800 w-full max-w-2xl">
    <div
      class="flex justify-between items-center py-3 pl-5 pr-4 rounded-t border-b dark:border-gray-700"
    >
      <h3 class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center">
        <span
          class="inline-flex items-center pr-2 text-sm font-semibold text-gray-500 dark:text-gray-100 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </span>{title}
      </h3>
      <CloseButton on:click={close} />
    </div>
    <div class="overflow-y-auto overflow-x-hidden w-full">
      <div class="p-6 space-y-2">
        {#each streams as stream}
          <StreamItem stream={stream} title={title}/>
        {/each}
      </div>
    </div>
  </div>
</div>
