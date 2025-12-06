<script lang="ts">
  import { IconButton } from '$lib/components'
  import type { Feed } from '$lib/models'
  import * as Icon from '$lib/icons'

  interface Props {
    feed: Feed
    onClick?: () => void
  }

  const { feed, onClick = () => {} }: Props = $props()

  function _onClick() {
    window.open(feed.getAddStreamUrl(), '_blank')
    onClick()
  }
</script>

<IconButton onClick={_onClick} title="Add Stream">
  <Icon.AddCircle class="text-gray-400" size={20} />
</IconButton>
