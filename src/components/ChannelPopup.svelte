<script lang="ts">
  import type { Context } from 'svelte-simple-modal'
  import Modal from 'svelte-simple-modal'
  import { getContext } from 'svelte'
  import { Channel } from '~/models'
  import {
    ShareChannelButton,
    BlockedBadge,
    CloseButton,
    ClosedBadge,
    ChannelMenu,
    HTMLPreview,
    LogoPreview,
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
    <div slot="body" class="pt-3 pb-4 px-4 sm:pb-7 sm:px-11 sm:pt-6 flex-col space-y-5">
      <Modal
        unstyled={true}
        classBg="fixed top-0 left-0 z-80 w-screen h-screen flex flex-col bg-black/70 overflow-y-scroll"
        closeButton={false}
      >
        <LogoPreview {channel} />
      </Modal>
      <HTMLPreview fieldset={channel.getFieldset()} onClick={close} />
    </div>
  </Card>
</Popup>
