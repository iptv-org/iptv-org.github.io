<script lang="ts">
  import type { Context } from 'svelte-simple-modal'
  import { getContext } from 'svelte'
  import { Channel } from '~/models'
  import {
    ShareChannelButton,
    BlockedBadge,
    CloseButton,
    ClosedBadge,
    ChannelMenu,
    HTMLPreview,
    Popup,
    Card
  } from '~/components'

  export let channel: Channel

  const isTouchDevice =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const { close } = getContext<Context>('simple-modal')

  window.onpopstate = event => {
    if (event.target.location.pathname === '/') {
      close()
    }
  }
</script>

<Popup onClose={close}>
  <Card>
    <div slot="headerLeft">
      <div class="text-l font-medium text-gray-900 dark:text-white sm:pl-1 space-x-1">
        <span>{channel.getDisplayName()}</span>
        {#if channel.isClosed()}
          <ClosedBadge {channel} />
        {/if}
        {#if channel.isBlocked()}
          <BlockedBadge {channel} />
        {/if}
      </div>
    </div>
    <div slot="headerRight" class="inline-flex w-30 shrink-0 items-center justify-end">
      {#if isTouchDevice}
        <ShareChannelButton {channel} />
      {/if}
      <ChannelMenu {channel} />
      <CloseButton onClick={close} />
    </div>
    <div slot="body" class="pt-4 pb-3 px-4 sm:py-9 sm:px-11">
      <HTMLPreview fieldset={channel.getFieldset()} onClick={close} />
    </div>
  </Card>
</Popup>
