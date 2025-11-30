<script lang="ts">
  import type { Channel, Feed } from '$lib/models'
  import { IconButton } from '$lib/components'
  import * as Icon from '$lib/icons'
  import qs from 'qs'

  interface Props {
    channel: Channel
    feed?: Feed
    onClick?: () => void
  }

  const { channel, feed, onClick = () => {} }: Props = $props()

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'logos:add',
    template: '07_logos_add.yml',
    title: feed ? `Add: ${feed.getFullName()} Logo` : `Add: ${channel.name} Logo`,
    channel_id: channel.id,
    feed_id: feed ? feed.id : null
  })

  const url = `${endpoint}?${params}`

  function _onClick() {
    window.open(url, '_blank')
    onClick()
  }
</script>

<IconButton onClick={_onClick} title="Add Logo">
  <Icon.AddCircle class="text-gray-400" size={20} />
</IconButton>
