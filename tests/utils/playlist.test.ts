import { expect, it, describe, beforeAll } from 'vitest'
import { createPlaylist } from '$lib/utils/playlist'
import { Channel } from '$lib/models'
import { loadDataFromDisk } from '$lib/api'

let channel: Channel

describe('playlist', () => {
  beforeAll(async () => {
    const data = await loadDataFromDisk({ dataDir: './tests/__data__/input/data' })

    channel = data.channels[0]
  })

  it('createPlaylist()', () => {
    const streams = channel.getStreams()

    const playlist = createPlaylist(streams)

    expect(playlist.toString()).toBe(`#EXTM3U
#EXTINF:-1 tvg-id="AndorraTV.ad@SD" tvg-logo="https://i.imgur.com/BnhTn8i.png" group-title="Animation;Kids" user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36" referrer="https://xtrematv.com/?p=1390",Iman TV (480p)
#EXTVLCOPT:http-user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36
#EXTVLCOPT:http-referrer=https://xtrematv.com/?p=1390
https://live.relentlessinnovations.net:1936/imantv/imantv/playlist.m3u8`)
  })
})
