<script lang="ts">
  import { Button } from '$lib/components'
  import type { Channel } from '$lib/models'
  import * as Icon from '$lib/icons'

  interface Props {
    channel: Channel
    onClick?: () => void
  }

  const { channel, onClick = () => {} }: Props = $props()

  function _onClick() {
    window.open(channel.getRequestLinkUrl(), '_blank')
    onClick()
  }
</script>

<Button onClick={_onClick} label="Request Stream">
  {#snippet left()}
    <Icon.Request class="text-gray-400" size={16} />
  {/snippet}
  {#snippet right()}
    <Icon.ExternalLink class="text-gray-400 dark:text-gray-500" size={17} />
  {/snippet}
</Button>
