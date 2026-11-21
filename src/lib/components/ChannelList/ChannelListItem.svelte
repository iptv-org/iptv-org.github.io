<script lang="ts">
  import { downloadMode } from '$lib/downloadMode.svelte'
  import { channelModal } from '$lib/channelModal.svelte'
  import type { ModalContext } from '$lib/modal.svelte'
  import { pluralize, unpack } from '$lib/utils'
  import { toast } from '@zerodevx/svelte-toast'
  import { pushState } from '$app/navigation'
  import type { Channel, Feed, Logo, Stream } from '$lib/types'
  import { fade } from 'svelte/transition'
  import { getContext } from 'svelte'
  import * as Icon from '$lib/icons'
  import {
    BlockedBadge,
    ClosedBadge,
    CodeBlock,
    FeedsCard,
    LogosCard,
    SelectButton,
    StreamList
  } from '$lib/components'

  interface Props {
    channel: Channel.Stub
  }

  const { channel }: Props = $props()

  let isLoadingStreams = $state(false)

  let isStreamExpanded = $state(false)

  let hasStreams = $state(channel.streams.length > 0)

  let cachedStreams : Stream.Type[] | null = $state(null)

  let streamButtonClass = $derived([
    "text-sm text-gray-400 space-x-1 flex items-center",
    hasStreams
      ? 'text-green-500 dark:text-green-400 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer'
      : 'text-red-400',
    isStreamExpanded
      ? 'bg-gray-400/20 p-1 rounded-md'
      : null
  ])

  async function openChannel(event: MouseEvent) {
    event.preventDefault()

    const [channelSlug, countryCode] = channel.id.split('.')

    channelModal.setOriginUrl(new URL(window.location.href))
    pushState(`/channels/${countryCode}/${channelSlug}`, { channelId: channel.id })
  }

  const modal = getContext<ModalContext>('modal')

  async function showFeedsPopup(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    try {
      const feedsBuffer = await fetch(channel.feedsPath).then(res => res.arrayBuffer())

      const feeds = unpack<Feed.Type>(feedsBuffer)

      modal.open(FeedsCard, {
        feeds,
        title: channel.uniqueName,
        addFeedUrl: channel.addFeedUrl,
        onClose: () => modal.close()
      })
    } catch (error) {
      toast.push(error.message)
    }
  }

  function clearCachedStreams() {
    cachedStreams = null
  }

  function extractStreamsFromFeeds(feeds: Feed.Type[]): Stream.Type[] {
    let streams: Stream.Type[] = []

    for(var feed of feeds){
      if(feed.streamsCount && feed.streamsCount > 0 && feed.streams)
        streams = streams.concat(feed.streams)
    }

    return streams
  }

  async function loadStreamsIfNeeded() {
      if(cachedStreams === null) {
        try {
          const feedsBuffer = await fetch(channel.feedsPath).then(res => res.arrayBuffer())
          cachedStreams = extractStreamsFromFeeds(unpack<Feed.Type>(feedsBuffer))
        } catch (error) {
          toast.push(error.message)
        }
      }
  }

  async function handleStreamExpansion(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    if(!isLoadingStreams){
      if(!isStreamExpanded && hasStreams){
        isLoadingStreams = true

        await loadStreamsIfNeeded()

        if(cachedStreams && cachedStreams.length > 0)
          isStreamExpanded = true
        else
          hasStreams = false

        isLoadingStreams = false
      }
      else{
        isStreamExpanded = false
        clearCachedStreams()
      }
    }
  }

  async function showLogosPopup(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    try {
      const logosBuffer = await fetch(channel.logosPath).then(res => res.arrayBuffer())

      const logos = unpack<Logo.Type>(logosBuffer)

      modal.open(LogosCard, {
        logos,
        title: channel.uniqueName,
        addLogoUrl: channel.addLogoUrl,
        onClose: () => modal.close()
      })
    } catch (error) {
      toast.push(error.message)
    }
  }
</script>

<div
  transition:fade={{ duration: 200 }}
  class="w-12 h-16 shrink-0 flex items-center absolute -left-14"
  class:opacity-0={!downloadMode.isEnabled}
  class:opacity-100={downloadMode.isEnabled}
>
  <SelectButton streams={channel.streams} />
</div>
<div class="border-b last:border-b-0 last:rounded-b-md border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-primary-750">
  <div
    class="min-h-16 sm:h-16 py-2 flex items-center relative"
    style="content-visibility: auto contain-intrinsic-size: auto 64px "
  >
    <div class="px-4 sm:pl-10 sm:pr-16 w-28 sm:w-[200px] flex shrink-0 items-center justify-center">
      <div class="inline-flex items-center justify-center whitespace-nowrap overflow-hidden">
        {#if channel.mainLogoUrl}
          <button
            onclick={showLogosPopup}
            type="button"
            class="cursor-pointer relative flex justify-center items-center h-[2.75rem] w-20"
            title="{channel.name} logos"
          >
            <img
              class="block align-middle mx-auto max-w-20 max-h-[2.75rem] text-sm text-gray-400 dark:text-gray-600 cursor-defaults"
              loading="lazy"
              referrerpolicy="no-referrer"
              src={channel.mainLogoUrl}
              alt={channel.name}
              title={channel.mainLogoUrl}
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
          onclick={openChannel}
          href={channel.pagePath}
          tabindex="0"
          class="text-gray-600 dark:text-white hover:underline hover:text-blue-400 truncate whitespace-nowrap"
          title={channel.name}
        >
          {channel.name}
        </a>
        {#if channel.isClosed}
          <div class="hidden sm:inline">
            <ClosedBadge {channel} />
          </div>
        {/if}
        {#if channel.isBlocked}
          <div class="hidden sm:inline">
            <BlockedBadge {channel} />
          </div>
        {/if}
      </div>
      {#if channel.hasAltNames}
        <div
          class="text-sm text-gray-400 dark:text-gray-400 line-clamp-1"
          title={channel.altNames.join(', ')}
        >
          {channel.altNames.join(', ')}
        </div>
      {/if}

      <div class="pt-0.5">
        {#if channel.isClosed}
          <div class="inline sm:hidden">
            <ClosedBadge {channel} />
          </div>
        {/if}
        {#if channel.isBlocked}
          <div class="inline sm:hidden">
            <BlockedBadge {channel} />
          </div>
        {/if}
      </div>
    </div>
    <div class="w-54 sm:w-[280px] px-4 hidden lg:flex sm:shrink-0">
      <CodeBlock>{channel.id}</CodeBlock>
    </div>
    <div class="sm:w-full px-3 sm:pl-4 sm:pr-5 sm:w-20">
      <div class="text-right flex justify-end space-x-3 items-center">
        {#if channel.feedsCount}
          <button
            onclick={showFeedsPopup}
            class="text-sm text-gray-400 inline-flex space-x-1 flex items-center hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer"
          >
            <Icon.Feed size={20} />
            <div>{channel.feedsCount}</div>
            <div class="hidden md:block">{pluralize(channel.feedsCount, 'feed')}</div>
          </button>
          <button
            onclick={handleStreamExpansion}
            class={streamButtonClass}
            class:inline-flex={!downloadMode.isEnabled}
            class:hidden={downloadMode.isEnabled}
            title="Streams"
          >
            {#if isLoadingStreams}
              <Icon.Spinner size={20} />
            {/if}
            {#if !isLoadingStreams}
              <Icon.Stream size={20} />
            {/if}
          </button>
        {/if}
      </div>
    </div>
  </div>
  {#if isStreamExpanded}
    <div
      class="p-4 space-y-2"
    >
      {#if cachedStreams && cachedStreams.length > 0}
        <StreamList streams={cachedStreams}/>
      {:else}
        <div class="text-center text-sm text-gray-400 dark:text-gray-400 line-clamp-1">No streams available</div>
      {/if}
    </div>
  {/if}
</div>
