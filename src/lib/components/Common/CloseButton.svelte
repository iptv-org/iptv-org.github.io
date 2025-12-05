<script lang="ts">
  import { IconButton } from '$lib/components'
  import * as Icon from '$lib/icons'

  interface Props {
    variant?: string
    onClick?: () => void
  }

  const { variant = 'default', onClick = () => {} }: Props = $props()
</script>

<IconButton {onClick} aria-label="Close" title="Close" {variant}>
  <Icon.Close size={20} />
</IconButton>
