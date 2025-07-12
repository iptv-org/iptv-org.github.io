<script lang="ts">
  import type { Context } from 'svelte-simple-modal'
  import Modal from 'svelte-simple-modal'
  import { getContext } from 'svelte'
  import { page } from '$app/state'
  import * as Icon from '~/icons'
  import { Channel, Feed } from '~/models'
  import {
    ExpandButton,
    StreamsPopup,
    HTMLPreview,
    GuidesPopup,
    LogoPreview,
    CodeBlock,
    FeedMenu
  } from '~/components'

  export let channel: Channel
  export let feed: Feed
  export let onClose = () => {}

  const modal = getContext<Context>('simple-modal')

  const hash = page.url.hash.replace('#', '').toLowerCase()
  let isExpanded = (!hash && feed.isMain) || hash === feed.id.toLowerCase()

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
</script>

<div class="w-full rounded-md border border-gray-200 dark:border-gray-700" id={feed.id}>
  <div
    class="w-full inline-flex justify-between px-2 py-1.5 border-gray-200 dark:border-gray-700"
    class:border-b={isExpanded}
  >
    <div class="flex items-center w-full">
      <div class="flex items-center w-full max-w-52 space-x-2 pr-3">
        <ExpandButton bind:expanded={isExpanded} />
        <div class="w-full text-gray-600 dark:text-white truncate">{feed.name}</div>
      </div>
      <div class="w-full hidden sm:flex">
        <CodeBlock>{feed.id}</CodeBlock>
      </div>
      <div class="text-right flex justify-end items-center w-full">
        <div class="flex space-x-5 items-center px-2 h-10">
          {#if feed.hasStreams()}
            <button
              onclick={showStreams}
              class="text-sm text-gray-400 inline-flex space-x-1 flex items-center hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer"
              title="Streams"
            >
              <Icon.Stream size={20} />
              <div>{feed.getStreams().count()}</div>
            </button>
          {/if}
          {#if feed.hasGuides()}
            <button
              onclick={showGuides}
              class="text-sm text-gray-400 inline-flex space-x-1 flex items-center hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer"
              title="Guides"
            >
              <Icon.Guide size={20} />
              <div>{feed.getGuides().count()}</div>
            </button>
          {/if}
        </div>
        <FeedMenu {feed} />
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
