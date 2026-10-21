<script lang="ts">
  import { CopyLinkButton, Menu } from '$lib/components'
  import { toast } from '@zerodevx/svelte-toast'
  import type { SvelteComponent } from 'svelte'
  import type { Channel } from '$lib/types'

  interface Props {
    channel: Channel.Type
  }

  const { channel }: Props = $props()

  let menu: SvelteComponent
  function closeMenu() {
    if (menu) menu.close()
  }

  function onLinkCopy() {
    toast.push('Link copied to clipboard')
    closeMenu()
  }
</script>

<Menu bind:this={menu}>
  <CopyLinkButton url={channel.pageUrl} onCopy={onLinkCopy} />
  {#if !channel.hasLogos}
    <Menu.Button
      url={channel.addLogoUrl || ''}
      label="Add Logo"
      iconName="Image"
      external
      onClick={closeMenu}
    />
  {/if}
  <Menu.Button
    url={channel.editUrl || ''}
    label="Edit"
    iconName="Edit"
    external
    onClick={closeMenu}
  />
  <Menu.Button
    url={channel.removeUrl}
    label="Remove"
    iconName="Remove"
    external
    onClick={closeMenu}
  />
</Menu>
