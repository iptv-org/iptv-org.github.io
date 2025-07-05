<script lang="ts">
  import IconButton from '~/components/IconButton.svelte'
  import type { Channel, Feed } from '~/models'
  import * as Icon from '~/icons'
  import qs from 'qs'

  export let channel: Channel
  export let feed: Feed = undefined
  export let onClick = () => {}

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'logos:add',
    template: '07_logos_add.yml',
    title: feed ? `Add: ${feed.getDisplayName()} Logo` : `Add: ${channel.name} Logo`,
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
