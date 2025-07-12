<script lang="ts">
  import {
    ChannelRemoveButton,
    ChannelEditButton,
    CopyLinkButton,
    LogoAddButton,
    Menu
  } from '~/components'
  import { toast } from '@zerodevx/svelte-toast'
  import type { Channel } from '~/models'

  export let channel: Channel

  let isMenuOpened = false
  function closeMenu() {
    isMenuOpened = false
  }

  function onLinkCopy() {
    toast.push('Link copied to clipboard')
    closeMenu()
  }
</script>

<Menu bind:isOpened={isMenuOpened}>
  <CopyLinkButton link={channel.getPageUrl()} onCopy={onLinkCopy} />
  {#if !channel.hasLogo()}
    <LogoAddButton {channel} onClick={closeMenu} />
  {/if}
  <ChannelEditButton {channel} onClick={closeMenu} />
  <ChannelRemoveButton {channel} onClick={closeMenu} />
</Menu>
