<script lang="ts">
  import { Button } from '$lib/components'
  import type { Feed } from '$lib/models'
  import * as Icon from '$lib/icons'

  interface Props {
    feed: Feed
    onClick?: () => void
  }

  const { feed, onClick = () => {} }: Props = $props()

  function _onClick() {
    window.open(feed.getEditUrl(), '_blank')
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
