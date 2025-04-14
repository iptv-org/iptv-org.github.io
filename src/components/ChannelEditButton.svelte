<script lang="ts">
  import Button from '~/components/Button.svelte'
  import type { Channel } from '~/models'
  import * as Icon from '~/icons'
  import qs from 'qs'

  export let channel: Channel
  export let onClick = () => {}

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const params = qs.stringify({
    labels: 'channels:edit',
    template: '2_channels_edit.yml',
    title: `Edit: ${channel.getUniqueName()}`,
    id: channel.id
  })

  const editUrl = `${endpoint}?${params}`

  function _onClick() {
    onClick()
    window.open(editUrl, '_blank')
  }
</script>

<Button onClick={_onClick} label="Edit">
  <Icon.Edit slot="left" class="text-gray-400" size={16} />
  <Icon.ExternalLink slot="right" class="text-gray-400 dark:text-gray-500" size={17} />
</Button>
