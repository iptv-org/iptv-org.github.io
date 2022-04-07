<script>
  import JsonDataViewer from './JsonDataViewer.svelte'
  import HTMLPreview from './HTMLPreview.svelte'
  import { getContext } from 'svelte'
  const { close } = getContext('simple-modal')

  export let channel

  let view = 'html'
  function switchView(value) {
    view = value
  }

  const closePopup = () => {
    close()
  }
</script>

<style>
  .active {
    background-color: #f3f4f6;
    color: #111828;
  }
</style>

<div class="relative px-2 py-[4rem] flex justify-center" on:click|self="{closePopup}">
  <div class="relative bg-white rounded-md shadow dark:bg-gray-800 w-full max-w-4xl">
    <div
      class="flex justify-between items-center py-4 pl-5 pr-4 rounded-t border-b dark:border-gray-700"
    >
      <div class="w-1/3 overflow-hidden">
        <h3 class="text-l font-medium text-gray-900 dark:text-white">{channel.name}</h3>
      </div>
      <div class="inline-flex justify-center w-1/3">
        <div class="inline-flex rounded-md" role="group">
          <button
            type="button"
            area-selected="{view === 'html'}"
            on:click="{() => switchView('html')}"
            class:active="{view === 'html'}"
            class="py-2 px-4 text-xs font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-transparent dark:text-white dark:hover:text-white dark:hover:bg-gray-600"
          >
            HTML
          </button>
          <button
            type="button"
            area-selected="{view === 'html'}"
            on:click="{() => switchView('json')}"
            class:active="{view === 'json'}"
            class="py-2 px-4 text-xs font-medium text-gray-900 bg-white border-t border-b border-r rounded-r-lg border-gray-200 hover:bg-gray-100 dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-600"
          >
            JSON
          </button>
        </div>
      </div>

      <div class="inline-flex w-1/3 justify-end">
        <button
          on:click="{closePopup}"
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
    </div>
    <div class="overflow-y-scroll overflow-x-hidden w-full">
      {#if view === 'json'}
      <div class="pb-8 px-8 pt-6">
        <div class="flex p-4 bg-gray-50 dark:bg-gray-700 rounded-md w-full">
          <JsonDataViewer data="{channel._raw}" />
        </div>
      </div>
      {:else if view === 'html'}
      <HTMLPreview data="{channel}" close="{closePopup}" />
      {/if}
    </div>
  </div>
</div>
