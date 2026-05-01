<script lang="ts">
  import { Popup, ChannelCard } from '$lib/components'
  import { pushState } from '$app/navigation'
  import type { Channel } from '$lib/models'
  import { rootUrl } from '$lib/store'

  interface Props {
    channel: Channel
  }

  const { channel }: Props = $props()

  function _onClose() {
    pushState($rootUrl, { showModal: false })
  }
</script>

<Popup onClose={_onClose}>
  <ChannelCard {channel} onClose={_onClose} />
</Popup>
