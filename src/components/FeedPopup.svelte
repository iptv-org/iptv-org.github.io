<script lang="ts">
  import { Popup, Card, FeedAddIconButton, CloseButton } from '~/components'
  import { Collection } from '@freearhey/core/browser'
  import type { Context } from 'svelte-simple-modal'
  import type { Channel, Feed } from '~/models'
  import FeedItem from './FeedItem.svelte'
  import Modal from 'svelte-simple-modal'
  import { getContext } from 'svelte'
  import * as Icon from '~/icons'

  export let channel: Channel
  export let feeds: Collection = new Collection()

  feeds = feeds.orderBy(
    [(feed: Feed) => (feed.isMain ? 1 : 0), (feed: Feed) => feed.id],
    ['desc', 'asc']
  )

  const { close } = getContext<Context>('simple-modal')
</script>

<Popup onClose={close}>
  <Card>
    <div
      slot="headerLeft"
      class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center"
    >
      <span
        class="inline-flex items-center pr-2 text-sm font-semibold text-gray-500 dark:text-gray-100 rounded-full"
      >
        <Icon.Feed size={21} />
      </span>{channel.getDisplayName()}
    </div>
    <div slot="headerRight" class="inline-flex">
      <FeedAddIconButton {channel} />
      <CloseButton onClick={close} />
    </div>

    <div slot="body" class="flex flex-col gap-2 p-2 sm:p-5">
      <Modal
        unstyled={true}
        classBg="fixed top-0 left-0 z-80 w-screen h-screen flex flex-col bg-black/70 overflow-y-scroll"
        closeButton={false}
      >
        {#each feeds.all() as feed, index (feed.getUUID())}
          <FeedItem {feed} onClose={close} />
        {/each}
      </Modal>
    </div>
  </Card>
</Popup>
