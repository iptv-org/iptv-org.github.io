<script lang="ts">
  import { Popup, ChannelCard } from '$lib/components'
  import type { Channel } from '$lib/models'
  import { pushState } from '$app/navigation'
  import { rootUrl } from '$lib/store'

  interface Props {
    channel: Channel
  }

  const { channel }: Props = $props()

  function _onClose() {
    pushState($rootUrl, {})
  }
</script>

<Popup onClose={_onClose}>
  <ChannelCard {channel} onClose={_onClose} />
</Popup>
