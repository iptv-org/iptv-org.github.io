<script lang="ts">
  import type { Channel, Feed } from '$lib/models'
  import { Button } from '$lib/components'
  import * as Icon from '$lib/icons'

  interface Props {
    channel: Channel
    feed?: Feed
    onClick?: () => void
  }

  const { channel, feed, onClick = () => {} }: Props = $props()

  function getAddLogoUrl(): string {
    return feed ? feed.getAddLogoUrl() : channel.getAddLogoUrl()
  }

  function _onClick() {
    window.open(getAddLogoUrl(), '_blank')
    onClick()
  }
</script>

<Button onClick={_onClick} label="Add Logo">
  {#snippet left()}
    <Icon.Image class="text-gray-400" size={17} />
  {/snippet}
  {#snippet right()}
    <Icon.ExternalLink class="text-gray-400 dark:text-gray-500" size={17} />
  {/snippet}
</Button>
