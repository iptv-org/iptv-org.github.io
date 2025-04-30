<script lang="ts">
  import { CopyLinkButton, Menu, StreamEditButton, StreamReportButton } from '~/components'
  import { toast } from '@zerodevx/svelte-toast'
  import type { Stream } from '~/models'

  export let stream: Stream

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
  <CopyLinkButton link={stream.url} onCopy={onLinkCopy} />
  <StreamEditButton {stream} onClick={closeMenu} />
  <StreamReportButton {stream} onClick={closeMenu} />
</Menu>
