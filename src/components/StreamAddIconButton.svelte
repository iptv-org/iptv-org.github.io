<script lang="ts">
  import IconButton from '~/components/IconButton.svelte'
  import type { Feed } from '~/models'
  import * as Icon from '~/icons'
  import qs from 'qs'

  export let feed: Feed
  export let onClick = () => {}

  const endpoint = 'https://github.com/iptv-org/iptv/issues/new'
  const params = qs.stringify({
    labels: 'streams:add',
    template: '1_streams_add.yml',
    title: `Add: ${feed.getDisplayName()}`,
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
