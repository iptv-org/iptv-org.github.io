<script lang="ts">
  import { selectedStreams, deselectAllStreams } from '$lib/store'
  import { IconButton } from '$lib/components'
  import * as Icon from '$lib/icons'

  interface Props {
    variant?: string
  }

  const { variant = 'default' }: Props = $props()
</script>

{#if $selectedStreams.size > 0}
  <IconButton onClick={deselectAllStreams} aria-label="Reset" title="Reset" {variant}>
    <Icon.Reset size={24} />
  </IconButton>
{/if}
