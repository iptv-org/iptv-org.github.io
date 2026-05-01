<script lang="ts">
  import { Popup, ChannelCard } from '$lib/components'
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
