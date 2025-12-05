<script lang="ts">
  import { Card, CloseButton, LogoList } from '$lib/components'
  import type { Channel, Logo, Feed } from '$lib/models'
  import type { Collection } from '@freearhey/core'
  import * as Icon from '$lib/icons'
  import * as LogosCard from './'

  interface Props {
    channel: Channel
    feed?: Feed
    onClose?: () => void
    title?: string
  }

  const { title = 'Logos', channel, feed = undefined, onClose = () => {} }: Props = $props()

  const logos: Collection<Logo> = feed ? feed.getLogos() : channel.getLogos()
</script>

<Card>
  <div
    slot="headerLeft"
    class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center"
  >
    <span
      class="inline-flex items-center pr-2 text-sm font-semibold text-gray-500 dark:text-gray-100 rounded-full"
    >
      <Icon.Images size={18} />
    </span>{title}
  </div>
  <div slot="headerRight" class="inline-flex">
    <LogosCard.AddLogoIconButton {channel} {feed} />
    <CloseButton onClick={onClose} />
  </div>

  <div slot="body" class="flex flex-col gap-2 p-2 sm:p-5 sm:pt-3">
    <LogoList {logos} />
  </div>
</Card>
