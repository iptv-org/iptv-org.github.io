<script lang="ts">
  import type { Channel } from '$lib/models'
  import { Button } from '$lib/components'
  import * as Icon from '$lib/icons'
  import qs from 'qs'

  interface Props {
    channel: Channel
    onClick?: () => void
  }

  const { channel, onClick = () => {} }: Props = $props()

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'channels:remove',
    template: '03_channels_remove.yml',
    title: `Remove: ${channel.getUniqueName()}`,
    id: channel.id
  })

  const url = `${endpoint}?${params}`

  function _onClick() {
    onClick()
    window.open(url, '_blank')
  }
</script>

<Button onClick={_onClick} label="Remove">
  {#snippet left()}
    <Icon.Remove class="text-gray-400" size={20} />
  {/snippet}
  {#snippet right()}
    <Icon.ExternalLink class="text-gray-400 dark:text-gray-500" size={17} />
  {/snippet}
</Button>
