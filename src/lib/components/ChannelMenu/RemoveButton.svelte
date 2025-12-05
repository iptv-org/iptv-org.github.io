<script lang="ts">
  import type { Channel } from '$lib/models'
  import { Button } from '$lib/components'
  import * as Icon from '$lib/icons'

  interface Props {
    channel: Channel
    onClick?: () => void
  }

  const { channel, onClick = () => {} }: Props = $props()

  function _onClick() {
    onClick()
    window.open(channel.getRemoveUrl(), '_blank')
  }
</script>

<Button onClick={_onClick} label="Remove">
  {#snippet left()}
    <Icon.Remove class="text-gray-400" size={20} />
  {/snippet}
  {#snippet right()}
    <Icon.ExternalLink class="text-gray-400 dark:text-gray-500" size={17} />
  {/snippet}
</Button>
