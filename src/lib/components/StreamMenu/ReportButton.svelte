<script lang="ts">
  import type { Stream } from '$lib/models'
  import { Button } from '$lib/components'
  import * as Icon from '$lib/icons'
  import qs from 'qs'

  interface Props {
    stream: Stream
    onClick: () => void
  }

  const { stream, onClick }: Props = $props()

  const endpoint = 'https://github.com/iptv-org/iptv/issues/new'
  const params = qs.stringify({
    labels: 'streams:remove',
    template: '3_streams_report.yml',
    title: `Report: ${stream.getDisplayName()}`,
    stream_url: stream.url
  })

  const editUrl = `${endpoint}?${params}`

  function _onClick() {
    window.open(editUrl, '_blank')
    onClick()
  }
</script>

<Button onClick={_onClick} label="Report">
  {#snippet left()}
    <Icon.Alert class="text-gray-400" size={17} />
  {/snippet}
  {#snippet right()}
    <Icon.ExternalLink class="text-gray-400 dark:text-gray-500" size={17} />
  {/snippet}
</Button>
