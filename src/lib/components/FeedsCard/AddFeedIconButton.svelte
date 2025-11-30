<script lang="ts">
  import { IconButton } from '$lib/components'
  import type { Channel } from '$lib/models'
  import * as Icon from '$lib/icons'
  import qs from 'qs'

  interface Props {
    channel: Channel
    onClick?: () => void
  }

  const { channel, onClick = () => {} }: Props = $props()

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'feeds:add',
    template: '04_feeds_add.yml',
    title: `Add: ${channel.name} Feed`,
    channel_id: channel.id
  })

  const url = `${endpoint}?${params}`

  function _onClick() {
    window.open(url, '_blank')
    onClick()
  }
</script>

<IconButton onClick={_onClick} title="Add Feed">
  <Icon.AddCircle class="text-gray-400" size={20} />
</IconButton>
