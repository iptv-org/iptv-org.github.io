<script lang="ts">
  import type { Stream } from '$lib/models'
  import { Button } from '$lib/components'
  import * as Icon from '$lib/icons'

  interface Props {
    stream: Stream
    onClick?: () => void
  }

  const { stream, onClick }: Props = $props()

  function _onClick() {
    window.open(stream.getEditUrl(), '_blank')
    onClick()
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
