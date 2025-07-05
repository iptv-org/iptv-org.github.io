<script lang="ts">
  import type { Collection } from '@freearhey/core/browser'
  import type { Context } from 'svelte-simple-modal'
  import { downloadMode, selected } from '~/store'
  import { pushState } from '$app/navigation'
  import { fade } from 'svelte/transition'
  import { getContext } from 'svelte'
  import { pluralize } from '~/utils'
  import { Channel } from '~/models'
  import * as Icon from '~/icons'
  import {
    ChannelPopup,
    BlockedBadge,
    ClosedBadge,
    CodeBlock,
    FeedPopup,
    Checkbox
  } from '~/components'

  export let channel: Channel

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
      FeedPopup,
      { feeds: channel.getFeeds(), channel },
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } }
    )
  }

  function showChannelData(event) {
    event.preventDefault()

    open(
      ChannelPopup,
      { channel },
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } },
      { onOpened, onClose }
    )
  }

  function onCheckboxChange(state: boolean) {
    selected.update((selectedChannels: Collection) => {
      if (state) {
        selectedChannels.push(channel)
      } else {
        selectedChannels = selectedChannels.filter(
          (selectedChannel: Channel) => selectedChannel.id !== channel.id
        )
      }

      return selectedChannels
    })
  }

  $: isSelected = !!$selected.find((selectedChannel: Channel) => selectedChannel.id === channel.id)
  $: isDisabled = channel.getStreams().isEmpty()
</script>

{#if $downloadMode}
  <div
    transition:fade={{ duration: 200 }}
    class="w-12 h-16 shrink-0 flex items-center absolute -left-14"
  >
    <Checkbox selected={isSelected} disabled={isDisabled} onChange={onCheckboxChange} />
  </div>
{/if}
<div
  class="border-b last:border-b-0 last:rounded-b-md border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-primary-750 min-h-16 sm:h-16 py-2 flex items-center relative"
>
  <div class="px-4 sm:pl-10 sm:pr-16 w-28 sm:w-[200px] flex shrink-0 items-center justify-center">
    <div class="inline-flex items-center justify-center whitespace-nowrap overflow-hidden">
      {#if channel.hasLogo()}
        <img
          class="block align-middle mx-auto max-w-20 max-h-[2.75rem] text-sm text-gray-400 dark:text-gray-600 cursor-defaults"
          loading="lazy"
          referrerpolicy="no-referrer"
          src={channel.getLogoUrl()}
          alt={channel.getDisplayName()}
          title={channel.getLogoUrl()}
        />
      {:else}
        <Icon.NoImage size={25} class="text-gray-400" />
      {/if}
    </div>
  </div>
  <div class="w-full sm:w-78 px-2 sm:shrink-0 overflow-hidden sm:overflow-auto">
    <div class="flex items-center space-x-2 text-left">
      <a
        onclick={showChannelData}
        href={channel.getPagePath()}
        tabindex="0"
        class="text-gray-600 dark:text-white hover:underline hover:text-blue-400 truncate whitespace-nowrap"
        title={channel.getDisplayName()}
      >
        {channel.getDisplayName()}
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
    {#if channel.altNames.notEmpty()}
      <div
        class="text-sm text-gray-400 dark:text-gray-400 line-clamp-1"
        title={channel.altNames.join(', ')}
      >
        {channel.altNames.join(', ')}
      </div>
    {/if}
  </div>
  <div class="w-54 sm:w-[280px] px-4 hidden sm:flex">
    <CodeBlock>{channel.id}</CodeBlock>
  </div>
  <div class="sm:w-full px-3 sm:pl-4 sm:pr-5">
    <div class="text-right flex justify-end space-x-3 items-center">
      {#if channel.hasFeeds()}
        <button
          onclick={showFeeds}
          class="text-sm text-gray-400 inline-flex space-x-1 flex items-center hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer"
        >
          <Icon.Feed size={20} />
          <div>{channel.getFeeds().count()}</div>
          <div class="hidden sm:block">{pluralize(channel.getFeeds().count(), 'feed')}</div>
        </button>
      {/if}
    </div>
  </div>
</div>
