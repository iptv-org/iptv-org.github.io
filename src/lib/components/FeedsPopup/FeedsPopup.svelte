<script lang="ts">
  import { Popup, FeedsCard } from '$lib/components'
  import type { Context } from 'svelte-simple-modal'
  import type { Channel } from '$lib/models'

  import { getContext } from 'svelte'

  interface Props {
    channel: Channel
  }

  const { channel }: Props = $props()

  const { close } = getContext<Context>('simple-modal')
</script>

<Popup onClose={close}>
  <FeedsCard {channel} onClose={close} />
</Popup>
