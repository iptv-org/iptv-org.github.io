<script lang="ts">
  import { getSelectedStreams, selectedFeeds } from '$lib/store'
  import { createPlaylist } from '$lib/utils/playlist'
  import { IconButton } from '$lib/components'
  import { Stream } from '$lib/models'
  import * as Icon from '$lib/icons'

  interface Props {
    variant?: string
  }

  const { variant = 'default' }: Props = $props()

  function _onClick() {
    const streams = getSelectedStreams()
      .sortBy(
        [
          (stream: Stream) => stream.channel.toLowerCase(),
          (stream: Stream) => stream.getVerticalResolution(),
          (stream: Stream) => stream.url
        ],
        ['asc', 'desc', 'asc']
      )
      .uniqBy((stream: Stream) => stream.channel + stream.feed)

    const playlist = createPlaylist(streams)
    const downloadLink = createDownloadLink(playlist.toString())
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  function createDownloadLink(string) {
    const blob = new Blob([string], { type: 'text/plain' })
    const url = window.URL || window.webkitURL
    const objUrl = url.createObjectURL(blob)

    const a = document.createElement('a')
    a.setAttribute('download', `playlist.m3u`)
    a.setAttribute('href', objUrl)

    return a
  }
</script>

<IconButton
  onClick={_onClick}
  disabled={$selectedFeeds.size === 0}
  aria-label="Download Playlist"
  title="Download Playlist"
  {variant}
>
  <Icon.Download size={16} />
</IconButton>
