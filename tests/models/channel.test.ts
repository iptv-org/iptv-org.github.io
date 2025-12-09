import { Channel, Logo, Stream, Feed, Guide, Country, BlocklistRecord } from '$lib/models'
import { fieldset } from '../__data__/input/channel.fieldset'
import { describe, beforeAll, test, expect } from 'vitest'
import type { ChannelEncoded } from '$lib/types/channel'
import { loadDataFromDisk } from '$lib/api'
import * as sdk from '@iptv-org/sdk'

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

  test('getPagePath()', () => {
    expect(channel.getPagePath()).toBe('/channels/ad/AndorraTV')
  })

  test('getPageUrl()', () => {
    expect(channel.getPageUrl()).toBe('https://iptv-org.github.io/channels/ad/AndorraTV')
  })

  test('getStreams()', () => {
    expect(channel.getStreams().count()).toBe(1)
    expect(channel.getStreams().first()).instanceOf(Stream)
    expect(channel.getStreams().first().getDisplayName()).toBe('Andorra TV SD')
  })

  test('getGuides()', () => {
    expect(channel.getGuides().count()).toBe(1)
    expect(channel.getGuides().first()).instanceOf(Guide)
    expect(channel.getGuides().first().getUrl()).toBe('https://9tv.co.il')
  })

  test('getFeeds()', () => {
    expect(channel.getFeeds().count()).toBe(1)
    expect(channel.getFeeds().first()).instanceOf(Feed)
    expect(channel.getFeeds().first().getFullName()).toBe('Andorra TV SD')
  })

  test('getLogos()', () => {
    expect(channel.getLogos().count()).toBe(3)
    expect(channel.getLogos().first()).instanceOf(Logo)
    expect(channel.getLogos().first().url).toBe('https://i.imgur.com/CnhTn8i.png')
    expect(channel.getLogos().first().getEditUrl()).toBe(
      'https://github.com/iptv-org/database/issues/new?labels=logos%3Aedit&template=08_logos_edit.yml&title=Edit%3A+Andorra+TV+Logo&feed_id=&channel_id=AndorraTV.ad&logo_url=https%3A%2F%2Fi.imgur.com%2FCnhTn8i.png'
    )
    expect(channel.getLogos().first().getRemoveUrl()).toBe(
      'https://github.com/iptv-org/database/issues/new?labels=logos%3Aremove&template=09_logos_remove.yml&title=Remove%3A+Andorra+TV+Logo&feed_id=&channel_id=AndorraTV.ad&logo_url=https%3A%2F%2Fi.imgur.com%2FCnhTn8i.png'
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
    const encoded = channel.encode()

    expect(encoded._country).instanceOf(Country)
    expect(encoded.logos[0]).instanceOf(Logo)
    expect(encoded.feeds[0]).instanceOf(Feed)
    expect(encoded._categories[0]).instanceOf(sdk.Models.Category)
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
      logos: [
        new Logo({
          channel: 'AndorraTV.ad',
          feed: 'SD',
          tags: [],
          width: 512,
          height: 512,
          format: 'PNG',
          url: 'https://i.imgur.com/BnhTn8i.png'
        }),
        new Logo({
          channel: 'AndorraTV.ad',
          feed: null,
          tags: [],
          width: 1000,
          height: 1000,
          format: 'JPEG',
          url: 'https://i.imgur.com/AnhTn8i.png'
        }),
        new Logo({
          channel: 'AndorraTV.ad',
          feed: null,
          tags: [],
          width: 512,
          height: 512,
          format: 'SVG',
          url: 'https://i.imgur.com/CnhTn8i.png'
        })
      ],
      feeds: [
        new Feed({
          channel: 'AndorraTV.ad',
          id: 'SD',
          name: 'SD',
          alt_names: ['Web'],
          is_main: true,
          broadcast_area: ['ct/ADCAN'],
          languages: ['cat'],
          timezones: ['America/Port_of_Spain'],
          format: '576i'
        })
      ],
      _country: new Country({ name: 'Andorra', code: 'AD', languages: ['cat'], flag: '🇦🇩' }),
      _categories: [
        new sdk.Models.Category({
          id: 'animation',
          name: 'Animation',
          description: 'Programming is mostly 2D or 3D animation'
        }),
        new sdk.Models.Category({
          id: 'kids',
          name: 'Kids',
          description: 'Programming targeted to children'
        })
      ],
      blocklistRecords: [
        new BlocklistRecord({
          channel: 'AndorraTV.ad',
          reason: 'dmca',
          ref: 'https://github.com/iptv-org/iptv/issues/16839'
        })
      ]
    }

    expect(Channel.decode(channelEncoded)).instanceOf(Channel)
  })
})
