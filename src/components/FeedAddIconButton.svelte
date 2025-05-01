<script lang="ts">
  import IconButton from '~/components/IconButton.svelte'
  import type { Channel } from '~/models'
  import * as Icon from '~/icons'
  import qs from 'qs'

  export let channel: Channel
  export let onClick = () => {}

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'feeds:add',
    template: '4_feeds_add.yml',
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
