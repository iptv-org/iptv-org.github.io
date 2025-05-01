<script lang="ts">
  import IconButton from '~/components/IconButton.svelte'
  import { Collection } from '@freearhey/core/browser'
  import { Channel, Stream } from '~/models'
  import { PlaylistCreator } from '~/core'
  import { selected } from '~/store'
  import * as Icon from '~/icons'

  export let variant = 'default'

  const playlistCreator = new PlaylistCreator()

  function onClick() {
    let streams = new Collection()
    $selected.forEach((channel: Channel) => {
      channel.getStreams().forEach((stream: Stream) => {
        streams.add(stream)
      })
    })

    streams = streams
      .orderBy(
        [
          (stream: Stream) => stream.channelId.toLowerCase(),
          (stream: Stream) => stream.getVerticalResolution(),
          (stream: Stream) => stream.url
        ],
        ['asc', 'desc', 'asc']
      )
      .uniqBy((stream: Stream) => stream.channelId || stream.getUUID())

    const playlist = playlistCreator.create(streams)
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
  {onClick}
  disabled={!$selected.count()}
  aria-label="Download Playlist"
  title="Download Playlist"
  {variant}
>
  <Icon.Download size={16} />
</IconButton>
