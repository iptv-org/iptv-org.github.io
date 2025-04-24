import type { Collection } from '@freearhey/core/browser'
import { Playlist } from 'iptv-playlist-generator'
import { Stream } from '../../src/models'

export class PlaylistCreator {
  constructor() {}

  create(streams: Collection): Playlist {
    const playlist = new Playlist()
    streams.forEach((stream: Stream) => {
      const link = stream.getPlaylistLink()
      playlist.links.push(link)
    })

    return playlist
  }
}
