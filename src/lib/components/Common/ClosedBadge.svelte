<script lang="ts">
  import { Badge } from '$lib/components'
  import { Channel } from '$lib/models'
  import { tooltip } from '$lib/actions/tooltip'

  interface Props {
    channel: Channel
  }

  let { channel }: Props = $props()
</script>

<Badge>
  {#if channel.closed}
    <div use:tooltip={{ content: `closed: ${channel.closed}` }}>
      Closed
    </div>
  {:else}
    Closed
  {/if}
</Badge>