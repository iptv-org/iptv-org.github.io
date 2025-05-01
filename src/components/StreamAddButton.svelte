<script lang="ts">
  import Button from '~/components/Button.svelte'
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

<Button onClick={_onClick} label="Add Stream">
  <Icon.Stream slot="left" class="text-gray-400" size={19} />
  <Icon.ExternalLink slot="right" class="text-gray-400 dark:text-gray-500" size={17} />
</Button>
