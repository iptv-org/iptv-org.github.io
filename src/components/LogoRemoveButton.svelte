<script lang="ts">
  import Button from '~/components/Button.svelte'
  import type { Logo } from '~/models'
  import * as Icon from '~/icons'
  import qs from 'qs'

  export let logo: Logo
  export let onClick = () => {}

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'logos:remove',
    template: '09_logos_remove.yml',
    title: `Remove: ${logo.getDisplayName()} Logo`,
    feed_id: logo.feedId,
    channel_id: logo.channelId,
    logo_url: logo.url
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
