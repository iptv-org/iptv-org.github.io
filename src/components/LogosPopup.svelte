<script lang="ts">
  import { Popup, Card, LogoAddIconButton, CloseButton } from '~/components'
  import type { Context } from 'svelte-simple-modal'
  import type { Channel, Feed } from '~/models'
  import LogoItem from './LogoItem.svelte'
  import { getContext } from 'svelte'
  import * as Icon from '~/icons'

  export let channel: Channel
  export let feed: Feed = undefined

  const logos = feed ? feed.getLogos() : channel.getLogos()

  const { close } = getContext<Context>('simple-modal')
</script>

<Popup onClose={close} wrapperClass="flex justify-center p-2 pt-14 sm:py-44 z-50">
  <Card>
    <div
      slot="headerLeft"
      class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center"
    >
      <span
        class="inline-flex items-center pr-2 text-sm font-semibold text-gray-500 dark:text-gray-100 rounded-full"
      >
        <Icon.Images size={18} />
      </span>Logos
    </div>
    <div slot="headerRight" class="inline-flex">
      <LogoAddIconButton {channel} {feed} />
      <CloseButton onClick={close} />
    </div>

    <div slot="body" class="flex flex-col gap-2 p-2 sm:p-5 sm:pt-3">
      {#each logos.all() as logo (logo.getUUID())}
        <LogoItem {logo} />
      {/each}
    </div>
  </Card>
</Popup>
