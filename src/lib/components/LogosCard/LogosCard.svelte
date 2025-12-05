<script lang="ts">
  import { Card, CloseButton, LogoList } from '$lib/components'
  import type { Channel, Feed } from '$lib/models'
  import * as Icon from '$lib/icons'
  import * as LogosCard from './'

  interface Props {
    channel: Channel
    feed?: Feed
    onClose?: () => void
    title?: string
  }

  const { title = 'Logos', channel, feed = undefined, onClose = () => {} }: Props = $props()

  function getLogos() {
    return feed ? feed.getLogos() : channel.getLogos()
  }
</script>

<Card>
  {#snippet headerLeft()}
    <div class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center">
      <span
        class="inline-flex items-center pr-2 text-sm font-semibold text-gray-500 dark:text-gray-100 rounded-full"
      >
        <Icon.Images size={18} />
      </span>{title}
    </div>
  {/snippet}
  {#snippet headerRight()}
    <div class="inline-flex">
      <LogosCard.AddLogoIconButton {channel} {feed} />
      <CloseButton onClick={onClose} />
    </div>
  {/snippet}
  {#snippet body()}
    <div class="flex flex-col gap-2 p-2 sm:p-5 sm:pt-3">
      <LogoList logos={getLogos()} />
    </div>
  {/snippet}
</Card>
