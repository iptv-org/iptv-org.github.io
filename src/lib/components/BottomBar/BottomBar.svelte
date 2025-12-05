<script lang="ts">
  import { downloadMode, selectedFeeds } from '$lib/store'
  import { CloseButton } from '$lib/components'
  import * as BottomBar from './'
</script>

<div class="px-2 w-full fixed bottom-10 sm:bottom-20 flex justify-center pointer-events-none">
  <div
    class="h-16 px-3 py-3 w-full min-w-[300px] max-w-[calc(100%-16px)] sm:w-[540px] bg-primary-850 rounded-lg pointer-events-auto"
  >
    <div class="flex justify-between items-center w-full max-w-7xl">
      <div class="text-sm text-gray-300 font-mono pl-2">
        {$selectedFeeds.size} selected
      </div>
      <div class="flex space-x-1 sm:space-x-2 items-center">
        <BottomBar.ResetButton variant="dark" />
        <BottomBar.SelectAllButton variant="dark" />
        <BottomBar.DownloadButton variant="dark" />
        <CloseButton
          onClick={() => {
            downloadMode.set(false)
          }}
          variant="dark"
        />
      </div>
    </div>
  </div>
</div>
