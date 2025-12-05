<script lang="ts">
  import { CopyLinkButton, Menu } from '$lib/components'
  import { toast } from '@zerodevx/svelte-toast'
  import type { Channel } from '$lib/models'
  import * as ChannelMenu from './'

  interface Props {
    channel: Channel
  }

  const { channel }: Props = $props()

  function getLogos() {
    return channel.getLogos()
  }

  let menu: Menu
  function closeMenu() {
    if (menu) menu.close()
  }

  function onLinkCopy() {
    toast.push('Link copied to clipboard')
    closeMenu()
  }
</script>

<Menu bind:this={menu}>
  <CopyLinkButton link={channel.getPageUrl()} onCopy={onLinkCopy} />
  {#if getLogos().isEmpty()}
    <ChannelMenu.AddLogoButton {channel} onClick={closeMenu} />
  {/if}
  <ChannelMenu.EditButton {channel} onClick={closeMenu} />
  <ChannelMenu.RemoveButton {channel} onClick={closeMenu} />
</Menu>
