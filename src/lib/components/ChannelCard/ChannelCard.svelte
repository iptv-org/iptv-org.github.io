<script lang="ts">
  import type { Channel } from '$lib/models'
  import Modal from 'svelte-simple-modal'
  import * as ChannelCard from './'
  import {
    BlockedBadge,
    HTMLPreview,
    ClosedBadge,
    LogoPreview,
    Card,
    ChannelMenu,
    CloseButton
  } from '$lib/components'

  interface Props {
    variant?: string
    channel: Channel
    onClose?: () => void
  }

  const { variant = 'default', channel, onClose = () => {} }: Props = $props()

  const isTouchDevice =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
</script>

<Card border={variant === 'channelPage'}>
  {#snippet headerLeft()}
    <div >
      <div class="text-l font-medium text-gray-900 dark:text-white sm:pl-1 space-x-1">
        <span>{channel.name}</span>
        {#if channel.isClosed()}
          <ClosedBadge {channel} />
        {/if}
        {#if channel.isBlocked()}
          <BlockedBadge {channel} />
        {/if}
      </div>
    </div>
  {/snippet}
  {#snippet headerRight()}
    <div  class="inline-flex w-30 shrink-0 items-center justify-end">
      {#if isTouchDevice}
        <ChannelCard.ShareButton {channel} />
      {/if}
      <ChannelMenu {channel} />
      {#if variant === 'default'}
        <CloseButton onClick={onClose} />
      {/if}
    </div>
  {/snippet}
  {#snippet body()}
    <div  class="pt-3 pb-4 px-4 sm:pb-7 sm:px-11 sm:pt-6 flex-col space-y-5">
      <Modal
        unstyled={true}
        classBg="fixed top-0 left-0 z-80 w-screen h-screen flex flex-col bg-black/70 overflow-y-scroll"
        closeButton={false}
      >
        <LogoPreview {channel} />
      </Modal>
      <HTMLPreview fieldset={channel.getFieldset()} onClick={onClose} />
    </div>
  {/snippet}
</Card>
