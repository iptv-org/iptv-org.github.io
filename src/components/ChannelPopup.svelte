<script>
  import HTMLPreview from '~/components/HTMLPreview.svelte'
  import EditButton from '~/components/EditButton.svelte'
  import Divider from '~/components/Divider.svelte'
  import CloseButton from '~/components/CloseButton.svelte'
  import { getContext } from 'svelte'

  export let channel

  const { close } = getContext('simple-modal')

  window.onpopstate = event => {
    if (event.target.location.pathname === '/') {
      close()
    }
  }
</script>

<div class="relative px-2 py-24 flex justify-center" on:keypress on:click|self={close}>
  <div class="relative bg-white rounded-md shadow dark:bg-gray-800 w-full max-w-[820px]">
    <div
      class="flex justify-between items-center py-3 pl-5 pr-4 rounded-t border-b dark:border-gray-700"
    >
      <div class="w-2/3 overflow-hidden">
        <div class="flex items-center space-x-3">
          <h3 class="text-l font-medium text-gray-900 dark:text-white">{channel.displayName}</h3>
          <div class="flex space-x-2">
            {#if channel.is_closed}
              <div
                class="text-gray-500 border-[1px] border-gray-200 text-xs inline-flex items-center px-2.5 py-0.5 dark:text-gray-300 cursor-default rounded-full h-6"
                title="closed: {channel.closed}"
              >
                Closed
              </div>
            {/if}
            {#if channel.is_blocked}
              <div
                class="text-gray-500 border-[1px] border-gray-200 text-xs inline-flex items-center px-2.5 py-0.5 dark:text-gray-300 cursor-default rounded-full h-6"
                title="The channel has been added to our blocklist due to the claim of the copyright holder"
              >
                Blocked
              </div>
            {/if}
          </div>
        </div>
      </div>

      <div class="inline-flex w-1/3 justify-end space-x-3 items-center">
        <EditButton {channel} />
        <Divider />
        <CloseButton on:click={close} />
      </div>
    </div>
    <div class="overflow-y-auto overflow-x-scroll w-full scrollbar-hide">
      <div class="inline-table p-12 pt-10">
        <HTMLPreview data={channel} {close} />
      </div>
    </div>
  </div>
</div>
