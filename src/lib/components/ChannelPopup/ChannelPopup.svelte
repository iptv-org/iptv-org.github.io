<script lang="ts">
  import { Popup, ChannelCard } from '$lib/components'
  import { pushState } from '$app/navigation'
  import type { Channel } from '$lib/models'

  interface Props {
    channel: Channel
    onClose: () => void
  }

  const { channel, onClose }: Props = $props()
</script>

<Popup {onClose}>
  <ChannelCard {channel} {onClose} />
</Popup>
