<script lang="ts">
  import { CloseButton, StreamList, Card } from '$lib/components'
  import type { Feed } from '$lib/models'
  import * as Icon from '$lib/icons'
  import * as StreamsCard from './'

  interface Props {
    feed: Feed
    onClose?: () => void
  }

  const { feed, onClose = () => {} }: Props = $props()
</script>

<Card>
  {#snippet headerLeft()}
    <div class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center">
      <span
        class="inline-flex items-center pr-2 text-sm font-semibold text-gray-500 dark:text-gray-100 rounded-full"
      >
        <Icon.Stream size={21} />
      </span><span>Streams</span>
    </div>
  {/snippet}
  {#snippet headerRight()}
    <div class="inline-flex">
      <StreamsCard.AddStreamIconButton {feed} />
      <CloseButton onClick={onClose} />
    </div>
  {/snippet}
  {#snippet body()}
    <div class="flex flex-col gap-2 p-2 sm:p-5">
      <StreamList streams={feed.getStreams()} />
    </div>
  {/snippet}
</Card>
