import { Channel, Logo, Stream, Feed, Guide, BlocklistRecord } from '$lib/models'
import { fieldset } from '../__data__/input/channel.fieldset'
import { describe, beforeAll, test, expect } from 'vitest'
import type { ChannelEncoded } from '$lib/types/channel'
import { loadDataFromDisk } from '$lib/api'

let channel: Channel

describe('Channel', () => {
  beforeAll(async () => {
    const data = await loadDataFromDisk({ dataDir: './tests/__data__/input/data' })

    channel = data.channels[0]
  })

  test('id', () => {
    expect(channel.id).toBe('AndorraTV.ad')
  })

  test('uuid', () => {
    expect(channel.uuid).toBeTypeOf('string')
    expect(channel.uuid.length).toBe(36)
  })

  test('getUniqueName()', () => {
    expect(channel.getUniqueName()).toBe('Andorra TV (Andorra)')
  })

  test('getPagePath()', () => {
    expect(channel.getPagePath()).toBe('/channels/ad/AndorraTV')
  })

  test('getPageUrl()', () => {
    expect(channel.getPageUrl()).toBe('https://iptv-org.github.io/channels/ad/AndorraTV')
  })

  test('getStreams()', () => {
    expect(channel.getStreams().count()).toBe(1)
    expect(channel.getStreams().first()).instanceOf(Stream)
    expect(channel.getStreams().first().getDisplayName()).toBe('Andorra TV (Andorra) SD')
  })

  test('getGuides()', () => {
    expect(channel.getGuides().count()).toBe(1)
    expect(channel.getGuides().first()).instanceOf(Guide)
    expect(channel.getGuides().first().getUrl()).toBe('https://9tv.co.il')
  })

  test('getFeeds()', () => {
    expect(channel.getFeeds().count()).toBe(1)
    expect(channel.getFeeds().first()).instanceOf(Feed)
    expect(channel.getFeeds().first().getFullName()).toBe('Andorra TV (Andorra) SD')
  })

  test('getLogos()', () => {
    expect(channel.getLogos().count()).toBe(3)
    expect(channel.getLogos().first()).instanceOf(Logo)
    expect(channel.getLogos().first().url).toBe('https://i.imgur.com/CnhTn8i.png')
    expect(channel.getLogos().first().getEditUrl()).toBe(
      'https://github.com/iptv-org/database/issues/new?labels=logos%3Aedit&template=08_logos_edit.yml&title=Edit%3A+Andorra+TV+%28Andorra%29+Logo&feed_id=&channel_id=AndorraTV.ad&logo_url=https%3A%2F%2Fi.imgur.com%2FCnhTn8i.png'
    )
    expect(channel.getLogos().first().getRemoveUrl()).toBe(
      'https://github.com/iptv-org/database/issues/new?labels=logos%3Aremove&template=09_logos_remove.yml&title=Remove%3A+Andorra+TV+%28Andorra%29+Logo&feed_id=&channel_id=AndorraTV.ad&logo_url=https%3A%2F%2Fi.imgur.com%2FCnhTn8i.png'
    )
  })

  test('getBlocklistRecords()', () => {
    expect(channel.getBlocklistRecords().count()).toBe(1)
    expect(channel.getBlocklistRecords().first()).instanceOf(BlocklistRecord)
    expect(channel.getBlocklistRecords().first().reason).toBe('dmca')
  })

  test('getLogoUrl()', () => {
    expect(channel.getLogoUrl()).toBe('https://i.imgur.com/CnhTn8i.png')
  })

  test('getHistory()', () => {
    const history = channel.getHistory()
    expect(history.length).toBe(5)
    expect((history[0] as Channel).id).toBe('LibyasChannel.ly')
    expect((history[1] as Channel).id).toBe('AndorraTV.ad')
    expect((history[2] as Channel).id).toBe('BBCNews.uk')
    expect((history[3] as Channel).id).toBe('EverydayHeroes.us')
    expect((history[4] as Channel).id).toBe('Eve.us')
  })

  test('getFieldset()', () => {
    expect(channel.getFieldset()).toMatchObject(fieldset)
  })

  test('getStructuredData()', () => {
    expect(channel.getStructuredData()).toMatchObject({
      '@context': 'https://schema.org/',
      '@type': 'TelevisionChannel',
      image: 'https://i.imgur.com/CnhTn8i.png',
      identifier: 'AndorraTV.ad',
      name: 'Andorra TV',
      alternateName: [{ '@value': 'ATV' }],
      genre: [{ '@value': 'Animation' }, { '@value': 'Kids' }],
      sameAs: 'https://www.andorradifusio.ad/'
    })
  })

  test('encode()', () => {
    const channelEncoded = channel.encode()

    expect(channelEncoded.id).toBe('AndorraTV.ad')
  })

  test('decode()', () => {
    const channelEncoded: ChannelEncoded = {
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
      website: 'https://www.andorradifusio.ad/',
      hasUniqueName: false,
      logos: [
        {
          channel: 'AndorraTV.ad',
          feed: 'SD',
          in_use: true,
          tags: [],
          width: 512,
          height: 512,
          format: 'PNG',
          url: 'https://i.imgur.com/BnhTn8i.png'
        },
        {
          channel: 'AndorraTV.ad',
          feed: null,
          in_use: true,
          tags: [],
          width: 1000,
          height: 1000,
          format: 'JPEG',
          url: 'https://i.imgur.com/AnhTn8i.png'
        },
        {
          channel: 'AndorraTV.ad',
          feed: null,
          in_use: true,
          tags: [],
          width: 512,
          height: 512,
          format: 'SVG',
          url: 'https://i.imgur.com/CnhTn8i.png'
        }
      ],
      feeds: [
        {
          channel: 'AndorraTV.ad',
          id: 'SD',
          name: 'SD',
          alt_names: ['Web'],
          is_main: true,
          broadcast_area: ['ct/ADCAN'],
          languages: ['cat'],
          timezones: ['America/Port_of_Spain'],
          format: '576i',
          logos: [],
          streams: [],
          guides: [],
          _languages: [],
          broadcastArea: undefined,
          _timezones: []
        }
      ],
      _country: {
        name: 'Andorra',
        code: 'AD',
        languages: ['cat'],
        flag: '🇦🇩',
        channels: []
      },
      _categories: [
        {
          id: 'animation',
          name: 'Animation',
          description: 'Programming is mostly 2D or 3D animation'
        },
        {
          id: 'kids',
          name: 'Kids',
          description: 'Programming targeted to children'
        }
      ],
      blocklistRecords: [
        {
          channel: 'AndorraTV.ad',
          reason: 'dmca',
          ref: 'https://github.com/iptv-org/iptv/issues/16839'
        }
      ],
      _history: []
    }

    expect(Channel.decode(channelEncoded)).instanceOf(Channel)
  })
})
