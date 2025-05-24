<script lang="ts">
  import { toast } from '@zerodevx/svelte-toast'
  import type { Feed } from '~/models'
  import {
    RequestLinkButton,
    FeedRemoveButton,
    StreamAddButton,
    CopyLinkButton,
    FeedEditButton,
    Menu
  } from '~/components'

  export let feed: Feed

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
  <CopyLinkButton link={feed.getPageUrl()} onCopy={onLinkCopy} />
  <StreamAddButton {feed} onClick={closeMenu} />
  {#if !feed.hasStreams()}
    <RequestLinkButton {feed} onClick={closeMenu} />
  {/if}
  <FeedEditButton {feed} onClick={closeMenu} />
  <FeedRemoveButton {feed} onClick={closeMenu} />
</Menu>
