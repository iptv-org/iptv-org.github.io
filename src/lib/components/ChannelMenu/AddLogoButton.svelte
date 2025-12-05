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
    labels: 'logos:add',
    template: '07_logos_add.yml',
    title: `Add: ${channel.name} Logo`,
    channel_id: channel.id
  })

  const url = `${endpoint}?${params}`

  function _onClick() {
    window.open(url, '_blank')
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
