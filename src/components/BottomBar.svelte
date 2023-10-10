<script>
  import { slide } from 'svelte/transition'
  import DownloadButton from '~/components/DownloadButton.svelte'
  import SelectAllButton from '~/components/SelectAllButton.svelte'
  import Divider from '~/components/Divider.svelte'
  import CloseButton from '~/components/CloseButton.svelte'
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
      <CloseButton
        on:click={() => {
          downloadMode.set(false)
        }}
      />
    </div>
  </div>
</div>
