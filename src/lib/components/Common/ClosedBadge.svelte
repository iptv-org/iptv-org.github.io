<script lang="ts">
  import { Badge } from '$lib/components'
  import { Channel } from '$lib/models'
  import { tippy } from '$lib/actions'

  interface Props {
    channel: Channel
  }

  let { channel }: Props = $props()
</script>

<Badge>
  {#if channel.closed}
    <div
      use:tippy={{
        content: `closed: ${channel.closed}`,
        allowHTML: true,
        interactive: true
      }}
    >
      Closed
    </div>
  {:else}
    Closed
  {/if}
</Badge>
