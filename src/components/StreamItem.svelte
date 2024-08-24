<script>
  import { text } from 'svelte/internal';
  import CopyToClipboard from './CopyToClipboard.svelte'
  import StreamPlayer from './StreamPlayer.svelte'
  import ExpandButton from './ExpandButton.svelte'
  import JsonDataViewer from './JsonDataViewer.svelte'

  export let stream
  export let title

  let expanded = false
</script>

<div
  class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-600 rounded-md border border-gray-200"
>
  <div
    class="w-full inline-flex justify-between px-3 py-2 border-gray-200 dark:border-gray-600"
    class:border-b={expanded}
  >
    <div class="flex space-x-3 items-center max-w-[90%] w-full">
      <ExpandButton on:click={event => (expanded = event.detail.state)} />
      <a
        class="whitespace-nowrap text-sm text-gray-600 dark:text-gray-100 hover:text-blue-500 hover:underline inline-flex align-middle max-w-[85%] w-full"
        href={stream.url}
        title={stream.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="truncate">{stream.url}</span><span
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
          </svg>
        </span></a
      >
    </div>
    <div class="flex shrink-0">
      <CopyToClipboard text={stream.url} />
    </div>
    <div>
      <StreamPlayer text={stream.url} name={title} />
    </div>
  </div>
  {#if expanded}
    <div class="w-full flex px-2 py-4">
      <JsonDataViewer data={stream} />
    </div>
  {/if}
</div>
