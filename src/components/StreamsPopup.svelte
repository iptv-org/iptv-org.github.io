<script>
  import StreamItem from './StreamItem.svelte'
  import { getContext } from 'svelte'
  const { close } = getContext('simple-modal')

  export let streams = []
  export let title = 'Streams'
</script>

<div class="relative px-2 py-[10rem] flex justify-center" on:click|self="{close}">
  <div class="relative bg-white rounded-md shadow dark:bg-gray-800 w-full max-w-2xl">
    <div
      class="flex justify-between items-center py-4 pl-5 pr-4 rounded-t border-b dark:border-gray-700"
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
          </svg> </span
        >{title}
      </h3>
      <button
        on:click="{close}"
        type="button"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
    <div class="overflow-y-scroll overflow-x-hidden w-full">
      <div class="p-6 space-y-2">
        {#each streams as stream}
        <StreamItem stream="{stream}" />
        {/each}
      </div>
    </div>
  </div>
</div>
