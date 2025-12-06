<script lang="ts">
  import { IconButton } from '$lib/components'
  import type { Channel } from '$lib/models'
  import * as Icon from '$lib/icons'

  interface Props {
    channel: Channel
    onClick?: () => void
  }

  const { channel, onClick = () => {} }: Props = $props()

  function _onClick() {
    window.open(channel.getAddFeedUrl(), '_blank')
    onClick()
  }
</script>

<IconButton onClick={_onClick} title="Add Feed">
  <Icon.AddCircle class="text-gray-400" size={20} />
</IconButton>
