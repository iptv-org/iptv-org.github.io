<script lang="ts">
  import { Collection } from '@freearhey/core/browser'
  import { toast } from '@zerodevx/svelte-toast'
  import { Channel, Feed } from '~/models'
  import * as Icon from '~/icons'
  import {
    ChannelRemoveButton,
    ShareChannelButton,
    ChannelEditButton,
    FeedAddIconButton,
    CopyLinkButton,
    BlockedBadge,
    HTMLPreview,
    ClosedBadge,
    FeedItem,
    NavBar,
    Card,
    Menu,
    LogoPreview
  } from '~/components'
  import Modal from 'svelte-simple-modal'

  export let data

  const isTouchDevice =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const channel: Channel = new Channel().deserialize(data.channel)
  let feeds = channel ? channel.getFeeds() : new Collection()

  feeds = feeds.orderBy(
    [(feed: Feed) => (feed.isMain ? 1 : 0), (feed: Feed) => feed.id],
    ['desc', 'asc']
  )

  let isLoading = false

  function schema() {
    return `<script type="application/ld+json">${JSON.stringify(
      channel.getStructuredData()
    )}<\/script>`
  }

  let isFeedMenuOpened = false
  function closeFeedMenu() {
    isFeedMenuOpened = false
  }

  let isChannelMenuOpened = false
  function closeChannelMenu() {
    isChannelMenuOpened = false
  }

  function onLinkCopy() {
    toast.push('Link copied to clipboard')
    closeChannelMenu()
  }
</script>

<svelte:head>
  <title>{channel ? `${channel.getUniqueName()} • iptv-org` : 'iptv-org'}</title>
  <meta name="description" content="Detailed description of {channel.getUniqueName()}." />
  {@html schema()}
</svelte:head>

<header class="fixed z-40 w-full min-w-[360px] top-0">
  <NavBar version="channelPage" />
</header>

{#if channel}
  <main class="bg-slate-50 dark:bg-primary-850 min-h-screen min-w-[360px] pt-16">
    <section class="container max-w-3xl mx-auto px-2 pt-1 sm:pt-6 pb-20 flex-col space-y-4">
      {#if isLoading}
        <div
          class="flex items-center justify-center w-full pt-1 pb-6 tracking-tight text-sm text-gray-500 dark:text-gray-400 font-mono"
        >
          loading...
        </div>
      {/if}
      {#if channel}
        <Card border>
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
          <div slot="headerRight" class="inline-flex w-30 justify-end">
            {#if isTouchDevice}
              <ShareChannelButton {channel} />
            {/if}
            <Menu bind:isOpened={isChannelMenuOpened}>
              <CopyLinkButton link={channel.getPageUrl()} onCopy={onLinkCopy} />
              <ChannelEditButton {channel} onClick={closeChannelMenu} />
              <ChannelRemoveButton {channel} onClick={closeChannelMenu} />
            </Menu>
          </div>
          <div slot="body">
            <div class="py-3 px-4 sm:pb-7 sm:px-11 sm:pt-6 flex-col space-y-5">
              <Modal
                unstyled={true}
                classBg="fixed top-0 left-0 z-80 w-screen h-screen flex flex-col bg-black/70 overflow-y-scroll"
                closeButton={false}
              >
                <LogoPreview {channel} />
              </Modal>
              <HTMLPreview fieldset={channel.getFieldset()} />
            </div>
          </div>
        </Card>
      {/if}
      {#if channel.hasFeeds()}
        <Card border>
          <div slot="headerLeft">
            <div
              class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center space-x-1"
            >
              <span class="text-gray-500 dark:text-gray-100">
                <Icon.Feed size={21} />
              </span>
              <span>Feeds</span>
            </div>
          </div>
          <div slot="headerRight">
            <FeedAddIconButton {channel} />
          </div>
          <div slot="body">
            <div class="flex flex-col gap-2 p-2 sm:p-5">
              {#each feeds.all() as feed (feed.getUUID())}
                <FeedItem {channel} {feed} />
              {/each}
            </div>
          </div>
        </Card>
      {/if}
    </section>
  </main>
{/if}
