<script lang="ts">
  import Button from '~/components/Button.svelte'
  import type { Feed } from '~/models'
  import * as Icon from '~/icons'
  import qs from 'qs'

  export let feed: Feed
  export let onClick = () => {}

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'feeds:remove',
    template: '6_feeds_remove.yml',
    title: `Edit: ${feed.getDisplayName()}`,
    feed_id: feed.id,
    channel_id: feed.channelId
  })

  const url = `${endpoint}?${params}`

  function _onClick() {
    window.open(url, '_blank')
    onClick()
  }
</script>

<Button onClick={_onClick} label="Remove">
  <Icon.Remove slot="left" class="text-gray-400" size={20} />
  <Icon.ExternalLink slot="right" class="text-gray-400 dark:text-gray-500" size={17} />
</Button>
