import type { Collection } from '@freearhey/core'
import { Playlist } from 'iptv-playlist-generator'
import { Stream } from '$lib/models'

export function createPlaylist(streams: Collection<Stream>): Playlist {
  const playlist = new Playlist()
  streams.forEach((stream: Stream) => {
    const link = stream.getPlaylistLink()
    playlist.links.push(link)
  })

  return playlist
}
