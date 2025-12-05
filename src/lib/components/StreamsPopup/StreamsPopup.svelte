<script lang="ts">
  import { Popup, StreamsCard } from '$lib/components'
  import type { Context } from 'svelte-simple-modal'
  import type { Feed } from '$lib/models'
  import { getContext } from 'svelte'

  interface Props {
    feed: Feed
  }

  const { feed }: Props = $props()

  const { close } = getContext<Context>('simple-modal')
</script>

<Popup onClose={close} wrapperClass="flex justify-center p-2 pt-16 sm:py-44 z-50">
  <StreamsCard {feed} onClose={close} />
</Popup>
