<script>
  import CopyToClipboard from './CopyToClipboard.svelte'
  import JsonDataViewer from './JsonDataViewer.svelte'

  export let guide

  let expanded = false
</script>

<div
  class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-600 rounded-md border border-gray-200"
>
  <div
    class="w-full inline-flex justify-between px-3 py-2 border-gray-200 dark:border-gray-600"
    class:border-b="{expanded}"
  >
    <div class="flex space-x-3 items-center max-w-[90%]">
      <button
        class="w-4 h-4 flex justify-center align-middle text-gray-500 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-600 shrink-0"
        on:click="{() => {expanded = !expanded}}"
      >
        <svg
          class="w-4 h-4"
          class:rotate-90="{expanded}"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
      <a
        class="whitespace-nowrap text-sm text-gray-600 dark:text-gray-100 hover:text-blue-500 hover:underline inline-flex align-middle"
        href="{guide.url}"
        title="{guide.url}"
        target="_blank"
      >
        <span class="truncate max-w-[30rem]">{guide.url}</span
        ><span
          class="inline-flex items-center pl-1 text-sm font-semibold text-gray-500 rounded-full"
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
    </div>
    <div class="flex shrink-0">
      <CopyToClipboard text="{guide.url}" />
    </div>
  </div>
  {#if expanded}
  <div class="w-full flex px-2 py-4">
    <JsonDataViewer data="{guide}" />
  </div>
  {/if}
</div>
