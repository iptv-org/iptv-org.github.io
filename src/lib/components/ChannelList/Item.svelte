<script lang="ts">
  import type { Context } from 'svelte-simple-modal'
  import { pushState } from '$app/navigation'
  import { downloadMode } from '$lib/store'
  import { fade } from 'svelte/transition'
  import { pluralize } from '$lib/utils'
  import { Channel } from '$lib/models'
  import { getContext } from 'svelte'
  import * as Icon from '$lib/icons'
  import * as ChannelList from './'
  import {
    ChannelPopup,
    BlockedBadge,
    ClosedBadge,
    CodeBlock,
    FeedsPopup,
    LogosPopup
  } from '$lib/components'

  interface Props {
    channel: Channel
  }

  const { channel }: Props = $props()

  function getLogos() {
    return channel.getLogos()
  }

  function getFeeds() {
    return channel.getFeeds()
  }

  const feeds = getFeeds()
  const logo = getLogos().first()

  const { open } = getContext<Context>('simple-modal')

  let prevUrl = '/'
  function onOpened() {
    prevUrl = window.location.href
    pushState(channel.getPagePath(), {})
  }

  function onClose() {
    pushState(prevUrl, {})
  }

  function showFeeds() {
    open(
      FeedsPopup,
      { channel },
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } }
    )
  }

  function showChannelData(event: MouseEvent) {
    event.preventDefault()

    open(
      ChannelPopup,
      { channel },
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } },
      { onOpened, onClose }
    )
  }

  function showLogos() {
    open(
      LogosPopup,
      { channel },
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } }
    )
  }
</script>

{#if $downloadMode}
  <div
    transition:fade={{ duration: 200 }}
    class="w-12 h-16 shrink-0 flex items-center absolute -left-14"
  >
    <ChannelList.SelectButton {channel} />
  </div>
{/if}
<div
  class="border-b last:border-b-0 last:rounded-b-md border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-primary-750 min-h-16 sm:h-16 py-2 flex items-center relative"
>
  <div class="px-4 sm:pl-10 sm:pr-16 w-28 sm:w-[200px] flex shrink-0 items-center justify-center">
    <div class="inline-flex items-center justify-center whitespace-nowrap overflow-hidden">
      {#if logo}
        <button
          onclick={showLogos}
          class="cursor-pointer w-full relative flex justify-center items-center"
          title="{channel.name} logos"
        >
          <img
            class="block align-middle mx-auto max-w-20 max-h-[2.75rem] text-sm text-gray-400 dark:text-gray-600 cursor-defaults"
            loading="lazy"
            referrerpolicy="no-referrer"
            src={logo.url}
            alt={channel.name}
            title={logo.url}
          />
        </button>
      {:else}
        <Icon.NoImage size={25} class="text-gray-400" />
      {/if}
    </div>
  </div>
  <div class="w-full sm:w-77 px-2 sm:shrink-0 overflow-hidden sm:overflow-auto">
    <div class="flex items-center space-x-2 text-left">
      <a
        onclick={showChannelData}
        href={channel.getPagePath()}
        tabindex="0"
        class="text-gray-600 dark:text-white hover:underline hover:text-blue-400 truncate whitespace-nowrap"
        title={channel.name}
      >
        {channel.name}
      </a>
      {#if channel.isClosed()}
        <div class="hidden sm:inline">
          <ClosedBadge {channel} />
        </div>
      {/if}
      {#if channel.isBlocked()}
        <div class="hidden sm:inline">
          <BlockedBadge {channel} />
        </div>
      {/if}
    </div>
    {#if channel.alt_names.length}
      <div
        class="text-sm text-gray-400 dark:text-gray-400 line-clamp-1"
        title={channel.alt_names.join(', ')}
      >
        {channel.alt_names.join(', ')}
      </div>
    {/if}
  </div>
  <div class="w-54 sm:w-[280px] px-4 hidden lg:flex sm:shrink-0">
    <CodeBlock>{channel.id}</CodeBlock>
  </div>
  <div class="sm:w-full px-3 sm:pl-4 sm:pr-5 sm:w-20">
    <div class="text-right flex justify-end space-x-3 items-center">
      {#if feeds.count()}
        <button
          onclick={showFeeds}
          class="text-sm text-gray-400 inline-flex space-x-1 flex items-center hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer"
        >
          <Icon.Feed size={20} />
          <div>{feeds.count()}</div>
          <div class="hidden sm:block">{pluralize(feeds.count(), 'feed')}</div>
        </button>
      {/if}
    </div>
  </div>
</div>
