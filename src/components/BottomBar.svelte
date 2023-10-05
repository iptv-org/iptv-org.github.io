<script>
  import { slide } from 'svelte/transition'
  import DownloadButton from '~/components/DownloadButton.svelte'
  import SelectAllButton from '~/components/SelectAllButton.svelte'
  import Divider from '~/components/Divider.svelte'
  import SquareButton from '~/components/SquareButton.svelte'
  import { selected } from '~/store'
  import { downloadMode } from '~/store'
</script>

<div
  transition:slide={{ duration: 200 }}
  class="h-16 bg-white dark:bg-gray-800 fixed bottom-0 left-0 right-0 py-2.5 border-t border-t-gray-100 dark:border-t-gray-800"
>
  <div class="flex justify-between items-center max-w-5xl mx-auto px-3">
    <div class="text-sm text-gray-600 dark:text-gray-400 font-mono">
      Selected {$selected.length.toLocaleString()} channel(s)
    </div>
    <div class="flex space-x-2 items-center">
      <SelectAllButton />
      <DownloadButton />
      <Divider />
      <SquareButton
        on:click={() => {
          downloadMode.set(false)
        }}
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
      </SquareButton>
    </div>
  </div>
</div>
