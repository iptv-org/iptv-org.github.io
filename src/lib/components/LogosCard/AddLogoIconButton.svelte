<script lang="ts">
  import type { Channel, Feed } from '$lib/models'
  import { IconButton } from '$lib/components'
  import * as Icon from '$lib/icons'

  interface Props {
    channel: Channel
    feed?: Feed
    onClick?: () => void
  }

  const { channel, feed, onClick = () => {} }: Props = $props()

  function getAddLogoUrl(): string {
    return feed ? feed.getAddLogoUrl() : channel.getAddLogoUrl()
  }

  function _onClick() {
    window.open(getAddLogoUrl(), '_blank')
    onClick()
  }
</script>

<IconButton onClick={_onClick} title="Add Logo">
  <Icon.AddCircle class="text-gray-400" size={20} />
</IconButton>
