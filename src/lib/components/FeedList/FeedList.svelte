<script lang="ts">
  import type { Collection } from '@freearhey/core'
  import type { Channel, Feed } from '$lib/models'
  import * as FeedList from './'

  interface Props {
    channel: Channel
    feeds: Collection<Feed>
    onClose?: () => void
  }

  const { channel, feeds, onClose = () => {} }: Props = $props()
</script>

{#each feeds.all() as feed (feed.uuid)}
  <FeedList.Item {channel} {feed} {onClose} />
{/each}
