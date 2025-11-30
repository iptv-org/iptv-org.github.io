<script lang="ts">
  import { IconButton } from '$lib/components'
  import * as Icon from '$lib/icons'

  interface Props {
    onClick?: () => void
  }

  const { onClick }: Props = $props()
</script>

<IconButton {onClick} aria-label="Go to search" title="Go to search">
  <span class="inline">
    <Icon.Search size={20} />
  </span>
</IconButton>
