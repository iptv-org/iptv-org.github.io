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

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'feeds:edit',
    template: '05_feeds_edit.yml',
    title: `Edit: ${feed.getFullName()}`,
    feed_id: feed.id,
    channel_id: feed.channel
  })

  const editUrl = `${endpoint}?${params}`

  function _onClick() {
    window.open(editUrl, '_blank')
    onClick()
  }
</script>

<Button onClick={_onClick} label="Edit">
  {#snippet left()}
    <Icon.Edit class="text-gray-400" size={16} />
  {/snippet}
  {#snippet right()}
    <Icon.ExternalLink class="text-gray-400 dark:text-gray-500" size={17} />
  {/snippet}
</Button>
