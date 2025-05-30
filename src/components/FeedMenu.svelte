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
  {#if !feed.channel.isBlocked() && !feed.channel.isClosed()}
    <StreamAddButton {feed} onClick={closeMenu} />
  {/if}
  {#if !feed.hasStreams() && !feed.channel.isBlocked() && !feed.channel.isClosed()}
    <RequestLinkButton {feed} onClick={closeMenu} />
  {/if}
  <FeedEditButton {feed} onClick={closeMenu} />
  <FeedRemoveButton {feed} onClick={closeMenu} />
</Menu>
