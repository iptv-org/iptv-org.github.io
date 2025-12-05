<script lang="ts">
  import { CopyLinkButton, Menu } from '$lib/components'
  import type { Channel, Feed } from '$lib/models'
  import { toast } from '@zerodevx/svelte-toast'
  import * as FeedMenu from './'

  interface Props {
    feed: Feed
    channel: Channel
  }

  const { feed, channel }: Props = $props()

  function getLogos() {
    return feed.getLogos()
  }

  function getStreams() {
    return feed.getStreams()
  }

  const streams = getStreams()

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
  <CopyLinkButton link={feed.getPageUrl()} onCopy={onLinkCopy} />
  {#if getLogos().isEmpty()}
    <FeedMenu.AddLogoButton {channel} {feed} onClick={closeMenu} />
  {/if}
  {#if streams.isEmpty() && !channel.isBlocked() && !channel.isClosed()}
    <FeedMenu.AddStreamButton {feed} onClick={closeMenu} />
  {/if}
  {#if streams.isEmpty() && !channel.isBlocked() && !channel.isClosed()}
    <FeedMenu.RequestLinkButton {feed} onClick={closeMenu} />
  {/if}
  <FeedMenu.EditButton {feed} onClick={closeMenu} />
  <FeedMenu.RemoveButton {feed} onClick={closeMenu} />
</Menu>
