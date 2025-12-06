<script lang="ts">
  import { Popup, LogosCard } from '$lib/components'
  import type { Context } from 'svelte-simple-modal'
  import type { Channel, Feed } from '$lib/models'
  import { getContext } from 'svelte'

  interface Props {
    channel: Channel
    feed?: Feed
    variant: string
  }

  const { channel, feed = undefined, variant = 'default' }: Props = $props()

  const { close } = getContext<Context>('simple-modal')

  function getWrapperClasses() {
    return variant === 'default'
      ? 'flex justify-center p-2 pb-20 sm:py-28 z-50'
      : 'flex justify-center p-2 pt-14 pb-20 sm:py-44 z-50'
  }

  function getTitle() {
    return variant === 'default' ? channel.name : 'Logos'
  }
</script>

<Popup onClose={close} wrapperClass={getWrapperClasses()}>
  <LogosCard {channel} {feed} title={getTitle()} onClose={close} />
</Popup>
