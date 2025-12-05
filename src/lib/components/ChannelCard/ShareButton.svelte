<script lang="ts">
  import { IconButton } from '$lib/components'
  import type { Channel } from '$lib/models'
  import * as Icon from '$lib/icons'

  interface Props {
    channel: Channel
  }

  const { channel }: Props = $props()

  async function _onClick() {
    if (navigator.canShare) {
      try {
        navigator.share({
          title: channel.getUniqueName(),
          url: channel.getPageUrl()
        })
      } catch (err) {
        console.log(err.message)
      }
    }
  }
</script>

<IconButton onClick={_onClick}>
  <Icon.Share class="text-gray-400" size={18} />
</IconButton>
