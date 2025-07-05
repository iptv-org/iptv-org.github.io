<script lang="ts">
  import Button from '~/components/Button.svelte'
  import type { Channel } from '~/models'
  import * as Icon from '~/icons'
  import qs from 'qs'

  export let channel: Channel
  export let onClick = () => {}

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'feeds:add',
    template: '04_feeds_add.yml',
    title: `Add: ${channel.name} Feed`,
    channel_id: channel.id
  })

  const url = `${endpoint}?${params}`

  function _onClick() {
    window.open(url, '_blank')
    onClick()
  }
</script>

<Button onClick={_onClick} label="Add Feed">
  <Icon.Add slot="left" class="text-gray-400" size={19} />
  <Icon.ExternalLink slot="right" class="text-gray-400 dark:text-gray-500" size={17} />
</Button>
