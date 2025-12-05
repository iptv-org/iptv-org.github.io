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
    window.open(channel.getEditUrl(), '_blank')
  }
</script>

<Button onClick={_onClick} label="Edit">
  {#snippet left()}
    <Icon.Edit class="text-gray-400" size={16} />
  {/snippet}
  {#snippet right()}
    <Icon.ExternalLink class="text-gray-400 dark:text-gray-500" size={17} />
  {/snippet}
</Button>
