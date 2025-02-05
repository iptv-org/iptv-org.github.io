<script>
  import HTMLPreview from '~/components/HTMLPreview.svelte'
  import EditButton from '~/components/EditButton.svelte'
  import Divider from '~/components/Divider.svelte'
  import CloseButton from '~/components/CloseButton.svelte'
  import BlockedBadge from './BlockedBadge.svelte'
  import ClosedBadge from './ClosedBadge.svelte'
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
      class="flex justify-between items-center py-3 pl-5 pr-3 md:pr-4 rounded-t border-b dark:border-gray-700"
    >
      <div class="w-2/3 overflow-hidden">
        <div class="flex items-center space-x-3">
          <h3 class="text-l font-medium text-gray-900 dark:text-white">{channel.displayName}</h3>
          <div class="flex space-x-2">
            {#if channel.is_closed}
              <ClosedBadge {channel} />
            {/if}
            {#if channel.is_blocked}
              <BlockedBadge {channel} />
            {/if}
          </div>
        </div>
      </div>

      <div class="inline-flex w-1/3 justify-end space-x-2 items-center">
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
