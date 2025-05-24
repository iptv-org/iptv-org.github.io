<script lang="ts">
  import Button from '~/components/Button.svelte'
  import type { Feed } from '~/models'
  import * as Icon from '~/icons'
  import qs from 'qs'

  export let feed: Feed
  export let onClick = () => {}

  const endpoint = 'https://github.com/iptv-org/iptv/issues/new'
  const params = qs.stringify({
    labels: 'channel search',
    template: '4_channel-search.yml',
    title: `Find: ${feed.getDisplayName()}`,
    stream_id: feed.getStreamId()
  })

  const url = `${endpoint}?${params}`

  function _onClick() {
    onClick()
    window.open(url, '_blank')
  }
</script>

<Button onClick={_onClick} label="Request Link">
  <Icon.Request slot="left" class="text-gray-400" size={16} />
  <Icon.ExternalLink slot="right" class="text-gray-400 dark:text-gray-500" size={17} />
</Button>
