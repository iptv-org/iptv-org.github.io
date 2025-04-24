<script>
  import { DownloadButton, SelectAllButton, ResetButton, CloseButton } from '~/components'
  import { downloadMode } from '~/store'
  import { selected } from '~/store'
</script>

<div class="px-2 w-full fixed bottom-10 sm:bottom-20 flex justify-center pointer-events-none">
  <div
    class="h-16 px-3 py-3 w-full min-w-[300px] max-w-[calc(100%-16px)] sm:w-[540px] bg-primary-850 rounded-lg pointer-events-auto"
  >
    <div class="flex justify-between items-center w-full max-w-7xl">
      <div class="text-sm text-gray-300 font-mono pl-2">
        {$selected.count()} selected
      </div>
      <div class="flex space-x-1 sm:space-x-2 items-center">
        <ResetButton />
        <SelectAllButton />
        <DownloadButton />
        <CloseButton
          onClick={() => {
            downloadMode.set(false)
          }}
          variant="light"
        />
      </div>
    </div>
  </div>
</div>
