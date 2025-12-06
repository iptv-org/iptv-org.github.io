import type { HTMLPreviewField, HTMLPreviewLink } from '$lib/components/HTMLPreview/types'
import { BlocklistRecord, BroadcastAreaLocation, Country, Feed, Guide, Logo, Stream } from './'
import type { ChannelEncoded, ChannelStructuredData } from '$lib/types/channel'
import { SITE_ORIGIN } from '../../constants'
import { Collection } from '@freearhey/core'
import { normalize } from '$lib/utils'
import * as sdk from '@iptv-org/sdk'
import dayjs from 'dayjs'

export class Channel extends sdk.Models.Channel {
  declare id: string
  uuid: string
  hasUniqueName: boolean = true

  logos: Logo[] = []
  feeds: Feed[] = []
  blocklistRecords: BlocklistRecord[] = []
  _categories: sdk.Models.Category[] = []
  _country?: Country

  constructor(data?: sdk.Types.ChannelData) {
    super(data)

    this.uuid = crypto.randomUUID()
  }

  encode(): ChannelEncoded {
    return {
      ...this.toObject(),
      logos: this.logos,
      feeds: this.feeds,
      _categories: this._categories,
      _country: this._country,
      blocklistRecords: this.blocklistRecords
    }
  }

  static decode(data: ChannelEncoded): Channel {
    const channel = new Channel(data)

    channel
      .withLogos(data.logos)
      .withFeeds(data.feeds)
      .withCategories(data._categories)
      .withBlocklistRecords(data.blocklistRecords)

    if (data._country) channel.withCountry(data._country)

    return channel
  }

  withBlocklistRecords(records: BlocklistRecord[]): this {
    this.blocklistRecords = records

    return this
  }

  withCountry(country: Country): this {
    this._country = country

    return this
  }

  override getCountry(): Country | undefined {
    return this._country
  }

  withCategories(categories: sdk.Models.Category[]): this {
    this._categories = categories

    return this
  }

  override getCategories(): Collection<sdk.Models.Category> {
    return new Collection(this._categories)
  }

  withFeeds(feeds: Feed[]): this {
    this.feeds = feeds

    return this
  }

  override getFeeds(): Collection<Feed> {
    return new Collection(this.feeds)
  }

  override getLanguages(): Collection<sdk.Models.Language> {
    const languages = new Collection<sdk.Models.Language>()
    this.getFeeds().forEach((feed: Feed) => {
      languages.concat(feed.getLanguages())
    })

    return languages.uniqBy((language: sdk.Models.Language) => language.code)
  }

  override getTimezones(): Collection<sdk.Models.Timezone> {
    const timezones = new Collection<sdk.Models.Timezone>()
    this.getFeeds().forEach((feed: Feed) => {
      timezones.concat(feed.getTimezones())
    })

    return timezones.uniqBy((timezone: sdk.Models.Timezone) => timezone.id)
  }

  withLogos(logos: Logo[]): this {
    this.logos = logos

    return this
  }

  override getLogos(): Collection<Logo> {
    function feed(logo: Logo): number {
      const feed = logo.getFeed()

      if (!feed) return 1
      if (feed.is_main) return 1

      return 0
    }

    function format(logo: Logo): number {
      const levelByFormat = { SVG: 2, PNG: 1, APNG: 1, WebP: 1, AVIF: 1, JPEG: 0, GIF: 0 }

      return levelByFormat[logo.format] || 0
    }

    function size(logo: Logo): number {
      return Math.abs(512 - logo.width) + Math.abs(512 - logo.height)
    }

    return new Collection(this.logos).sortBy([feed, format, size], ['desc', 'desc', 'asc'], false)
  }

  override getBroadcastAreaLocations(): Collection<BroadcastAreaLocation> {
    const broadcastAreaLocations = new Collection<BroadcastAreaLocation>()
    this.getFeeds().forEach((feed: Feed) => {
      broadcastAreaLocations.concat(feed.getBroadcastAreaLocations())
    })

    return broadcastAreaLocations.uniqBy((location: BroadcastAreaLocation) => location.code)
  }

  override getStreams(): Collection<Stream> {
    const streams = new Collection<Stream>()

    this.getFeeds().forEach((feed: Feed) => {
      streams.concat(feed.getStreams())
    })

    return streams
  }

  hasStreams(): boolean {
    return this.getStreams().isNotEmpty()
  }

  override getGuides(): Collection<Guide> {
    const guides = new Collection<Guide>()

    this.getFeeds().forEach((feed: Feed) => {
      guides.concat(feed.getGuides())
    })

    return guides
  }

  override getBlocklistRecords(): Collection<BlocklistRecord> {
    return new Collection(this.blocklistRecords)
  }

  getUniqueName(): string {
    if (this.hasUniqueName) return this.name

    const country = this.getCountry()
    if (!country) return this.name

    return `${this.name} (${country.name})`
  }

  getPagePath() {
    const [slug, country] = this.id.split('.')

    return `/channels/${country}/${slug}`
  }

  getPageUrl(): string {
    return new URL(this.getPagePath(), SITE_ORIGIN).toString()
  }

  getEditUrl(): string {
    const endpoint = 'https://github.com/iptv-org/database/issues/new'
    const params = new URLSearchParams({
      labels: 'channels:edit',
      template: '02_channels_edit.yml',
      title: `Edit: ${this.getUniqueName()}`,
      id: this.id
    })

    return `${endpoint}?${params.toString()}`
  }

  getRemoveUrl(): string {
    const endpoint = 'https://github.com/iptv-org/database/issues/new'
    const params = new URLSearchParams({
      labels: 'channels:remove',
      template: '03_channels_remove.yml',
      title: `Remove: ${this.getUniqueName()}`,
      id: this.id
    })

    return `${endpoint}?${params.toString()}`
  }

  getAddFeedUrl(): string {
    const endpoint = 'https://github.com/iptv-org/database/issues/new'
    const params = new URLSearchParams({
      labels: 'feeds:add',
      template: '04_feeds_add.yml',
      title: `Add: ${this.name} Feed`,
      channel_id: this.id
    })

    return `${endpoint}?${params.toString()}`
  }

  getAddLogoUrl(): string {
    const endpoint = 'https://github.com/iptv-org/database/issues/new'
    const params = new URLSearchParams({
      labels: 'logos:add',
      template: '07_logos_add.yml',
      title: `Add: ${this.name} Logo`,
      channel_id: this.id
    })

    return `${endpoint}?${params.toString()}`
  }

  getLogoUrl(): string {
    const logo = this.getLogos().first()
    if (!logo) return ''

    return logo.url || ''
  }

  getFieldset(): HTMLPreviewField[] {
    const country = this.getCountry()

    return [
      { name: 'id', type: 'string', value: { text: this.id, title: this.id } },
      { name: 'name', type: 'string', value: { text: this.name, title: this.name } },
      {
        name: 'alt_names',
        type: 'string[]',
        value: this.alt_names.map((name: string) => ({ text: name, title: name }))
      },
      {
        name: 'network',
        type: 'link',
        value: this.network
          ? { label: this.network, query: `network:${normalize(this.network)}` }
          : null
      },
      {
        name: 'owners',
        type: 'link[]',
        value: this.owners.map((name: string) => ({
          label: name,
          query: `owner:${normalize(name)}`
        }))
      },
      {
        name: 'country',
        type: 'link',
        value: country ? { label: country.name, query: `country:${country.code}` } : null
      },
      {
        name: 'broadcast_area',
        type: 'link[]',
        value: this.getBroadcastAreaLocations()
          .map<HTMLPreviewLink>((location: BroadcastAreaLocation) => ({
            label: location.getName(),
            query: `broadcast_area:${location.rawCode}`
          }))
          .all()
      },
      {
        name: 'timezones',
        type: 'link[]',
        value: this.getTimezones()
          .map<HTMLPreviewLink>((timezone: sdk.Models.Timezone) => ({
            label: timezone.id,
            query: `timezone:${timezone.id}`
          }))
          .all()
      },
      {
        name: 'languages',
        type: 'link[]',
        value: this.getLanguages()
          .map<HTMLPreviewLink>((language: sdk.Models.Language) => ({
            label: language.name,
            query: `language:${language.code}`
          }))
          .all()
      },
      {
        name: 'categories',
        type: 'link[]',
        value: this.getCategories()
          .map<HTMLPreviewLink>((category: sdk.Models.Category) => ({
            label: category.name,
            query: `category:${category.id}`
          }))
          .all()
      },
      {
        name: 'is_nsfw',
        type: 'link',
        value: { label: this.is_nsfw.toString(), query: `is_nsfw:${this.is_nsfw.toString()}` }
      },
      {
        name: 'formats',
        type: 'link[]',
        value: this.getVideoFormats()
          .map<HTMLPreviewLink>((format: string) => ({
            label: format,
            query: `format:${format}`
          }))
          .all()
      },
      {
        name: 'launched',
        type: 'string',
        value: this.launched
          ? {
              text: dayjs(this.launched).format('D MMMM YYYY'),
              title: this.launched
            }
          : null
      },
      {
        name: 'closed',
        type: 'string',
        value: this.closed
          ? {
              text: dayjs(this.closed).format('D MMMM YYYY'),
              title: this.closed
            }
          : null
      },
      {
        name: 'replaced_by',
        type: 'link',
        value: this.replaced_by
          ? {
              label: this.replaced_by,
              query: this.replaced_by
            }
          : null
      },
      {
        name: 'website',
        type: 'external_link',
        value: this.website
          ? { href: this.website, title: this.website, label: this.website }
          : null
      }
    ].filter((field: HTMLPreviewField) =>
      Array.isArray(field.value) ? field.value.length : field.value
    )
  }

  getStructuredData(): ChannelStructuredData {
    return {
      '@context': 'https://schema.org/',
      '@type': 'TelevisionChannel',
      image: this.getLogoUrl(),
      identifier: this.id,
      name: this.name,
      alternateName: this.alt_names.map((name: string) => ({ '@value': name })),
      genre: this.getCategories()
        .map((category: sdk.Models.Category) => ({ '@value': category.name }))
        .all(),
      sameAs: this.website
    }
  }
}
