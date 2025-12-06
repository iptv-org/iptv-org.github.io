<script lang="ts">
  import { Card, CloseButton, FeedList } from '$lib/components'
  import type { Channel, Feed } from '$lib/models'
  import Modal from 'svelte-simple-modal'
  import * as Icon from '$lib/icons'
  import * as FeedsCard from './'

  interface Props {
    variant?: string
    channel: Channel
    onClose?: () => void
  }

  const { variant = 'default', channel, onClose = () => {} }: Props = $props()

  function getFeeds() {
    return channel
      .getFeeds()
      .sortBy([(feed: Feed) => (feed.is_main ? 1 : 0), (feed: Feed) => feed.id], ['desc', 'asc'])
  }
</script>

<Card border={variant === 'channelPage'}>
  {#snippet headerLeft()}
    <div class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center">
      <span
        class="inline-flex items-center pr-2 text-sm font-semibold text-gray-500 dark:text-gray-100 rounded-full"
      >
        <Icon.Feed size={21} />
      </span>{variant === 'channelPage' ? 'Feeds' : channel.name}
    </div>
  {/snippet}
  {#snippet headerRight()}
    <div class="inline-flex">
      <FeedsCard.AddFeedIconButton {channel} />
      {#if variant === 'default'}
        <CloseButton onClick={onClose} />
      {/if}
    </div>
  {/snippet}
  {#snippet body()}
    <div class="flex flex-col gap-2 p-2 sm:p-5">
      <Modal
        unstyled={true}
        classBg="fixed top-0 left-0 z-80 w-screen h-screen flex flex-col bg-black/70 overflow-y-scroll"
        closeButton={false}
      >
        <FeedList {channel} feeds={getFeeds()} {onClose} />
      </Modal>
    </div>
  {/snippet}
</Card>
