<script lang="ts">
  import { CopyLinkButton, Menu } from '$lib/components'
  import { toast } from '@zerodevx/svelte-toast'
  import type { Stream } from '$lib/models'
  import * as StreamMenu from './'

  interface Props {
    stream: Stream
  }

  const { stream }: Props = $props()

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
  <CopyLinkButton link={stream.url} onCopy={onLinkCopy} />
  <StreamMenu.EditButton {stream} onClick={closeMenu} />
  <StreamMenu.ReportButton {stream} onClick={closeMenu} />
</Menu>
