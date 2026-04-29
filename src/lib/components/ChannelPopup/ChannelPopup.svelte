<script lang="ts">
  import { Popup, ChannelCard } from '$lib/components'
  import { pushState } from '$app/navigation'
  import type { Channel } from '$lib/models'
  import { resolve } from '$app/paths'

  interface Props {
    channel: Channel
  }

  const { channel }: Props = $props()

  function _onClose() {
    pushState(resolve('/'), {})
  }
</script>

<Popup onClose={_onClose}>
  <ChannelCard {channel} onClose={_onClose} />
</Popup>
