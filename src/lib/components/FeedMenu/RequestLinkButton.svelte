<script lang="ts">
  import { Button } from '$lib/components'
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
    labels: 'channel search',
    template: '4_channel-search.yml',
    title: `Find: ${feed.getFullName()}`,
    stream_id: feed.getStreamId()
  })

  const url = `${endpoint}?${params}`

  function _onClick() {
    window.open(url, '_blank')
    onClick()
  }
</script>

<Button onClick={_onClick} label="Request Link">
  {#snippet left()}
    <Icon.Request class="text-gray-400" size={16} />
  {/snippet}
  {#snippet right()}
    <Icon.ExternalLink class="text-gray-400 dark:text-gray-500" size={17} />
  {/snippet}
</Button>
