<script lang="ts">
  import { Button } from '$lib/components'
  import type { Logo } from '$lib/models'
  import * as Icon from '$lib/icons'
  import qs from 'qs'

  interface Props {
    logo: Logo
    onClick?: () => void
  }

  const { logo, onClick = () => {} }: Props = $props()

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'logos:edit',
    template: '08_logos_edit.yml',
    title: `Edit: ${logo.getDisplayName()} Logo`,
    feed_id: logo.feed,
    channel_id: logo.channel,
    logo_url: logo.url
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
