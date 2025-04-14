import { PlaylistCreator } from '../../src/core/playlistCreator'
import { expect, it, describe } from 'vitest'
import path from 'path'
import fs from 'fs'
import { DataProcessor } from '../../src/core'

describe('PlaylistCreator', () => {
  it('can create playlist', () => {
    const dataProcessor = new DataProcessor()
    const { streams } = dataProcessor.process({
      streams: loadJson('streams.json'),
      channels: loadJson('channels.json'),
      feeds: loadJson('feeds.json'),
      categories: loadJson('categories.json')
    })

    const creator = new PlaylistCreator()
    const playlist = creator.create(streams)

    expect(playlist.toString()).toBe(`#EXTM3U
#EXTINF:-1 tvg-id="XtremaCartoons.ar@SD" tvg-logo="https://i.imgur.com/X2d8y4e.png" group-title="Animation;Kids" user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36" referrer="https://xtrematv.com/?p=1390",Xtrema Cartoons SD
#EXTVLCOPT:http-user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36
#EXTVLCOPT:http-referrer=https://xtrematv.com/?p=1390
https://stmv6.voxtvhd.com.br/xtremacartoons/xtremacartoons/playlist.m3u8`)
  })
})

function loadJson(filepath) {
  return JSON.parse(fs.readFileSync(path.resolve('tests/__data__/input/', filepath), 'utf8'))
}
