<script lang="ts">
  import Button from '~/components/Button.svelte'
  import type { Stream } from '~/models'
  import * as Icon from '~/icons'
  import qs from 'qs'

  export let stream: Stream
  export let onClick = () => {}

  const endpoint = 'https://github.com/iptv-org/iptv/issues/new'
  const params = qs.stringify({
    labels: 'streams:edit',
    template: '2_streams_edit.yml',
    title: `Edit: ${stream.getDisplayName()}`,
    stream_url: stream.url
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
