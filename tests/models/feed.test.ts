import { describe, beforeAll, test, expect } from 'vitest'
import type { FeedEncoded } from '$lib/types/feed'
import { Channel, Feed, Logo } from '$lib/models'
import { loadDataFromDisk } from '$lib/api'

let feed: Feed

describe('Feed', () => {
  beforeAll(async () => {
    const data = await loadDataFromDisk({ dataDir: './tests/__data__/input/data' })

    feed = data.feeds[0]
  })

  test('getChannel()', () => {
    expect(feed.getChannel()).instanceOf(Channel)
  })

  test('getLogos()', () => {
    expect(feed.getLogos().first()).instanceof(Logo)
    expect(feed.getLogos().first().getEditUrl()).toBe(
      'https://github.com/iptv-org/database/issues/new?labels=logos%3Aedit&template=08_logos_edit.yml&title=Edit%3A+Andorra+TV+%28Andorra%29+SD+Logo&feed_id=SD&channel_id=AndorraTV.ad&logo_url=https%3A%2F%2Fi.imgur.com%2FBnhTn8i.png'
    )
  })

  test('encode()', () => {
    const feedEncoded = feed.encode()

    expect(feedEncoded._channel).instanceof(Channel)
  })

  test('decode()', () => {
    const feedEncoded: FeedEncoded = {
      channel: 'AndorraTV.ad',
      id: 'SD',
      name: 'SD',
      alt_names: ['Web'],
      is_main: true,
      broadcast_area: ['ct/ADCAN'],
      languages: ['cat'],
      timezones: ['America/Port_of_Spain'],
      format: '576i',
      logos: [
        new Logo({
          channel: 'AndorraTV.ad',
          feed: 'SD',
          in_use: true,
          tags: [],
          width: 512,
          height: 512,
          format: 'PNG',
          url: 'https://i.imgur.com/BnhTn8i.png'
        })
      ],
      streams: [],
      guides: [],
      _languages: [],
      broadcastArea: undefined,
      _timezones: [],
      _channel: new Channel({
        id: 'AndorraTV.ad',
        name: 'Andorra TV',
        alt_names: ['ATV'],
        network: 'Enlave',
        owners: ['Disney'],
        country: 'AD',
        categories: ['animation', 'kids'],
        is_nsfw: false,
        launched: '2022-09-01',
        closed: '2025-09-01',
        replaced_by: 'BBCNews.uk',
        website: 'https://www.andorradifusio.ad/'
      })
    }

    const feedDecoded = Feed.decode(feedEncoded)
    expect(feedDecoded).instanceOf(Feed)
    expect(feedDecoded._channel).instanceof(Channel)
  })
})
