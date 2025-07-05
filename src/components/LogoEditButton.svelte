<script lang="ts">
  import Button from '~/components/Button.svelte'
  import type { Logo } from '~/models'
  import * as Icon from '~/icons'
  import qs from 'qs'

  export let logo: Logo
  export let onClick = () => {}

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'logos:edit',
    template: '08_logos_edit.yml',
    title: `Edit: ${logo.getDisplayName()} Logo`,
    feed_id: logo.feedId,
    channel_id: logo.channelId,
    logo_url: logo.url
  })

  const editUrl = `${endpoint}?${params}`

  function _onClick() {
    window.open(editUrl, '_blank')
    onClick()
  }
</script>

<Button onClick={_onClick} label="Edit">
  <Icon.Edit slot="left" class="text-gray-400" size={16} />
  <Icon.ExternalLink slot="right" class="text-gray-400 dark:text-gray-500" size={17} />
</Button>
