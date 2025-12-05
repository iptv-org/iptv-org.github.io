<script lang="ts">
  import { IconButton } from '$lib/components'
  import type { Feed } from '$lib/models'
  import * as Icon from '$lib/icons'
  import qs from 'qs'

  interface Props {
    feed: Feed
    onClick?: () => void
  }

  const { feed, onClick = () => {} }: Props = $props()

  const endpoint = 'https://github.com/iptv-org/iptv/issues/new'
  const params = qs.stringify({
    labels: 'streams:add',
    template: '1_streams_add.yml',
    title: `Add: ${feed.getFullName()}`,
    stream_id: feed.getStreamId()
  })

  const url = `${endpoint}?${params}`

  function _onClick() {
    window.open(url, '_blank')
    onClick()
  }
</script>

<IconButton onClick={_onClick} title="Add Stream">
  <Icon.AddCircle class="text-gray-400" size={20} />
</IconButton>
