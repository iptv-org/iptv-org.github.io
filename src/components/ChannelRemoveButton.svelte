<script lang="ts">
  import Button from '~/components/Button.svelte'
  import type { Channel } from '~/models'
  import * as Icon from '~/icons'
  import qs from 'qs'

  export let channel: Channel
  export let onClick = () => {}

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'channels:remove',
    template: '3_channels_remove.yml',
    title: `Remove: ${channel.getUniqueName()}`,
    id: channel.id
  })

  const url = `${endpoint}?${params}`

  function _onClick() {
    onClick()
    window.open(url, '_blank')
  }
</script>

<Button onClick={_onClick} label="Remove">
  <Icon.Remove slot="left" class="text-gray-400" size={20} />
  <Icon.ExternalLink slot="right" class="text-gray-400 dark:text-gray-500" size={17} />
</Button>
