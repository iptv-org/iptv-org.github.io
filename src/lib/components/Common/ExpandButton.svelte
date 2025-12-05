<script lang="ts">
  import { IconButton } from '$lib/components'
  import * as Icon from '$lib/icons'

  interface Props {
    expanded?: boolean
    onClick?: () => void
  }

  const { expanded = false, onClick = () => {} }: Props = $props()
</script>

<IconButton {onClick} size={32} aria-label={expanded ? 'Collapse' : 'Expand'}>
  <div class:rotate-180={expanded}>
    <Icon.Expand size={20} />
  </div>
</IconButton>
