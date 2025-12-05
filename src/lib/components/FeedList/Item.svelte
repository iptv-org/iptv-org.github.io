<script lang="ts">
  import type { Context } from 'svelte-simple-modal'
  import { Channel, Feed } from '$lib/models'
  import { downloadMode } from '$lib/store'
  import Modal from 'svelte-simple-modal'
  import { getContext } from 'svelte'
  import * as Icon from '$lib/icons'
  import { page } from '$app/state'
  import * as FeedList from './'
  import {
    ExpandButton,
    StreamsPopup,
    HTMLPreview,
    GuidesPopup,
    LogoPreview,
    CodeBlock,
    FeedMenu
  } from '$lib/components'

  interface Props {
    channel: Channel
    feed: Feed
    onClose?: () => void
  }

  const { channel, feed, onClose = () => {} }: Props = $props()

  function getStreams() {
    return feed.getStreams()
  }

  function getGuides() {
    return feed.getGuides()
  }

  function isMain() {
    return feed.is_main
  }

  function getId() {
    return feed.id
  }

  const streams = getStreams()

  const guides = getGuides()

  const modal = getContext<Context>('simple-modal')

  function showGuides() {
    modal.open(
      GuidesPopup,
      { feed },
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } }
    )
  }

  function showStreams() {
    modal.open(
      StreamsPopup,
      { feed },
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } }
    )
  }

  function _onClose() {
    modal.close()
    onClose()
  }

  const hash = page.url.hash.replace('#', '')

  let isExpanded = $state((!hash && isMain()) || hash.toLowerCase() === getId().toLowerCase())
  function _onClick() {
    isExpanded = !isExpanded
  }
</script>

<div class="relative" class:pl-12={$downloadMode}>
  {#if $downloadMode}
    <div class="w-10 h-14 shrink-0 flex items-center absolute" class:left-0={$downloadMode}>
      <FeedList.SelectButton {feed} />
    </div>
  {/if}
  <div class="w-full rounded-md border border-gray-200 dark:border-gray-700" id={feed.id}>
    <div
      class="w-full inline-flex justify-between px-2 py-1.5 border-gray-200 dark:border-gray-700"
      class:border-b={isExpanded}
    >
      <div class="flex items-center w-full">
        <ExpandButton expanded={isExpanded} onClick={_onClick} />
        <div
          class="w-full text-gray-600 dark:text-white overflow-hidden pl-2 sm:w-[260px] sm:shrink-0"
        >
          <div class="truncate whitespace-nowrap">{feed.name}</div>
        </div>
        <div class="w-full hidden sm:flex overflow-hidden">
          <CodeBlock>{feed.id}</CodeBlock>
        </div>
        <div class="text-right flex justify-end items-center w-[140px] shrink-0">
          <div class="flex space-x-5 items-center px-2 h-10">
            {#if streams.isNotEmpty()}
              <button
                onclick={showStreams}
                class="text-sm text-gray-400 inline-flex space-x-1 flex items-center hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer"
                title="Streams"
              >
                <Icon.Stream size={20} />
                <div>{streams.count()}</div>
              </button>
            {/if}
            {#if guides.isNotEmpty()}
              <button
                onclick={showGuides}
                class="text-sm text-gray-400 inline-flex space-x-1 flex items-center hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer"
                title="Guides"
              >
                <Icon.Guide size={20} />
                <div>{guides.count()}</div>
              </button>
            {/if}
          </div>
          <FeedMenu {feed} {channel} />
        </div>
      </div>
    </div>
    {#if isExpanded}
      <div class="w-full px-6 pt-5 pb-2 flex-col space-y-5">
        <Modal
          unstyled={true}
          classBg="fixed top-0 left-0 z-80 w-screen h-screen flex flex-col bg-black/70 overflow-y-scroll"
          closeButton={false}
        >
          <LogoPreview {channel} {feed} />
        </Modal>
        <HTMLPreview fieldset={feed.getFieldset()} onClick={_onClose} />
      </div>
    {/if}
  </div>
</div>
