<script lang="ts">
  import { selectedFeeds, deselectAllFeeds } from '$lib/store'
  import { IconButton } from '$lib/components'
  import * as Icon from '$lib/icons'

  interface Props {
    variant?: string
  }

  const { variant = 'default' }: Props = $props()
</script>

{#if $selectedFeeds.size > 0}
  <IconButton onClick={deselectAllFeeds} aria-label="Reset" title="Reset" {variant}>
    <Icon.Reset size={24} />
  </IconButton>
{/if}
