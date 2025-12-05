<script lang="ts">
  import { Popup, ChannelCard } from '$lib/components'
  import type { Context } from 'svelte-simple-modal'
  import type { Channel } from '$lib/models'
  import { getContext } from 'svelte'

  interface Props {
    channel: Channel
  }

  const { channel }: Props = $props()

  const { close } = getContext<Context>('simple-modal')

  window.onpopstate = event => {
    if (event.target.location.pathname === '/') {
      close()
    }
  }
</script>

<Popup onClose={close}>
  <ChannelCard {channel} onClose={close} />
</Popup>
