import type { ChannelSearchable, ChannelSerializedData, ChannelData } from '../types/channel'
import type { BlocklistRecordSerializedData } from '~/types/blocklistRecord'
import { Collection, type Dictionary } from '@freearhey/core/browser'
import type { HTMLPreviewField } from '../types/htmlPreviewField'
import type { CategorySerializedData } from '~/types/category'
import type { FeedSerializedData } from '~/types/feed'
import type { LogoSerializedData } from '~/types/logo'
import dayjs, { type Dayjs } from 'dayjs'
import { normalize } from '~/utils'
import {
  BlocklistRecord,
  BroadcastArea,
  Category,
  Language,
  Country,
  Stream,
  Guide,
  Feed,
  Logo
} from '.'

export class Channel {
  id: string
  name: string
  altNames: Collection = new Collection()
  networkName?: string
  ownerNames: Collection = new Collection()
  countryCode: string
  country?: Country
  categoryIds: Collection = new Collection()
  categories: Collection = new Collection()
  isNSFW: boolean
  launchedDateString?: string
  launchedDate?: Dayjs
  closedDateString?: string
  closedDate?: Dayjs
  replacedByStreamId?: string
  replacedByChannelId?: string
  websiteUrl?: string
  blocklistRecords: Collection = new Collection()
  feeds: Collection = new Collection()
  logos: Collection = new Collection()
  hasUniqueName: boolean = true

  constructor(data?: ChannelData) {
    if (!data) return

    this.id = data.id
    this.name = data.name
    this.altNames = new Collection(data.alt_names)
    this.networkName = data.network
    this.ownerNames = new Collection(data.owners)
    this.countryCode = data.country
    this.categoryIds = new Collection(data.categories)
    this.isNSFW = data.is_nsfw
    this.launchedDateString = data.launched
    this.launchedDate = data.launched ? dayjs(data.launched) : undefined
    this.closedDateString = data.closed
    this.closedDate = data.closed ? dayjs(data.closed) : undefined
    this.replacedByStreamId = data.replaced_by || undefined
    const [replacedByChannelId] = data.replaced_by ? data.replaced_by.split('@') : [undefined]
    this.replacedByChannelId = replacedByChannelId
    this.websiteUrl = data.website
  }

  withCountry(countriesKeyByCode: Dictionary): this {
    this.country = countriesKeyByCode.get(this.countryCode)

    return this
  }

  withCategories(categoriesKeyById: Dictionary): this {
    this.categories = this.categoryIds.map((id: string) => categoriesKeyById.get(id))

    return this
  }

  withBlocklistRecords(blocklistGroupedByChannelId: Dictionary): this {
    this.blocklistRecords = new Collection(blocklistGroupedByChannelId.get(this.id))

    return this
  }

  withFeeds(feedsGroupedByChannelId: Dictionary): this {
    this.feeds = new Collection(feedsGroupedByChannelId.get(this.id))

    return this
  }

  withLogos(logosGroupedByChannelId: Dictionary): this {
    this.logos = new Collection(logosGroupedByChannelId.get(this.id))

    return this
  }

  setHasUniqueName(channelsGroupedByName: Dictionary): this {
    this.hasUniqueName = new Collection(channelsGroupedByName.get(this.name)).count() === 1

    return this
  }

  getUniqueName(): string {
    if (this.hasUniqueName) return this.name
    if (!this.country) return this.name

    return `${this.name} (${this.country.name})`
  }

  getCategories(): Collection {
    if (!this.categories) return new Collection()

    return this.categories
  }

  getStreams(): Collection {
    let streams = new Collection()

    this.getFeeds().forEach((feed: Feed) => {
      streams = streams.concat(feed.getStreams())
    })

    return streams
  }

  getGuides(): Collection {
    let guides = new Collection()

    this.getFeeds().forEach((feed: Feed) => {
      guides = guides.concat(feed.getGuides())
    })

    return guides
  }

  getLanguages(): Collection {
    let languages = new Collection()

    this.getFeeds().forEach((feed: Feed) => {
      languages = languages.concat(feed.getLanguages())
    })

    return languages.uniqBy((language: Language) => language.code)
  }

  getLanguageCodes(): Collection {
    return this.getLanguages().map((language: Language) => language.code)
  }

  getLanguageNames(): Collection {
    return this.getLanguages().map((language: Language) => language.name)
  }

  getBroadcastAreaCodes(): Collection {
    let broadcastAreaCodes = new Collection()

    this.getFeeds().forEach((feed: Feed) => {
      broadcastAreaCodes = broadcastAreaCodes.concat(feed.broadcastAreaCodes)
    })

    return broadcastAreaCodes.uniq()
  }

  hasGuides(): boolean {
    return this.getGuides().notEmpty()
  }

  hasFeeds(): boolean {
    return this.getFeeds().notEmpty()
  }

  hasStreams(): boolean {
    return this.getStreams().notEmpty()
  }

  getDisplayName(): string {
    return this.name
  }

  getPagePath(): string {
    const [channelSlug, countryCode] = this.id.split('.')
    if (!channelSlug || !countryCode) return ''

    return `/channels/${countryCode}/${channelSlug}`
  }

  getPageUrl(): string {
    const [channelSlug, countryCode] = this.id.split('.') || [null, null]
    if (!channelSlug || !countryCode || typeof window === 'undefined') return ''

    return `${window.location.protocol}//${window.location.host}/channels/${countryCode}/${channelSlug}`
  }

  isClosed(): boolean {
    return !!this.closedDateString || !!this.replacedByStreamId
  }

  isBlocked(): boolean {
    return this.blocklistRecords ? this.blocklistRecords.notEmpty() : false
  }

  getCountryName(): string {
    return this.country ? this.country.name : ''
  }

  getGuideSiteNames(): Collection {
    return this.getGuides().map((guide: Guide) => guide.siteName)
  }

  getStreamTitles(): Collection {
    return this.getStreams().map((stream: Stream) => stream.title)
  }

  getStreamUrls(): Collection {
    return this.getStreams().map((stream: Stream) => stream.url)
  }

  getFeeds(): Collection {
    return this.feeds
  }

  getBroadcastLocationCodes(): Collection {
    let broadcastLocationCodes = new Collection()

    this.getFeeds().forEach((feed: Feed) => {
      broadcastLocationCodes = broadcastLocationCodes.concat(feed.getBroadcastLocationCodes())
    })

    return broadcastLocationCodes.uniq()
  }

  getBroadcastLocationNames(): Collection {
    let broadcastLocationNames = new Collection()

    this.getFeeds().forEach((feed: Feed) => {
      broadcastLocationNames = broadcastLocationNames.concat(feed.getBroadcastLocationNames())
    })

    return broadcastLocationNames.uniq()
  }

  getFormats(): Collection {
    let formats = new Collection()

    this.getFeeds().forEach((feed: Feed) => {
      formats.add(feed.format)
    })

    return formats.uniq()
  }

  getTimezoneIds(): Collection {
    let timezoneIds = new Collection()

    this.getFeeds().forEach((feed: Feed) => {
      timezoneIds = timezoneIds.concat(feed.timezoneIds)
    })

    return timezoneIds.uniq()
  }

  getBroadcastArea(): Collection {
    let broadcastArea = new Collection()

    this.getFeeds().forEach((feed: Feed) => {
      broadcastArea = broadcastArea.concat(feed.getBroadcastArea())
    })

    return broadcastArea.uniqBy((broadcastArea: BroadcastArea) => broadcastArea.code)
  }

  getFeedNames(): Collection {
    return this.getFeeds().map((feed: Feed) => feed.name)
  }

  getFeedAltNames(): Collection {
    let altNames = new Collection()

    this.getFeeds().forEach((feed: Feed) => {
      altNames = altNames.concat(feed.altNames)
    })

    return altNames.uniq()
  }

  getStreamIds(): Collection {
    return this.getFeeds().map((feed: Feed) => feed.getStreamId())
  }

  getLogos(): Collection {
    function feed(logo: Logo): number {
      if (!logo.feed) return 1
      if (logo.feed.isMain) return 1

      return 0
    }

    function format(logo: Logo): number {
      const levelByFormat = { SVG: 2, PNG: 1, APNG: 1, WebP: 1, AVIF: 1, JPEG: 0, GIF: 0 }

      return levelByFormat[logo.format] || 0
    }

    function size(logo: Logo): number {
      return Math.abs(512 - logo.width) + Math.abs(512 - logo.height)
    }

    return this.logos.orderBy([feed, format, size], ['desc', 'desc', 'asc'], false)
  }

  getLogo(): Logo | undefined {
    return this.getLogos().first()
  }

  getLogoUrls(): Collection {
    return this.getLogos().map((logo: Logo) => logo.url)
  }

  hasLogo(): boolean {
    return this.getLogos().notEmpty()
  }

  getLogoUrl(): string {
    return this.hasLogo() ? this.getLogo().url : ''
  }

  getSearchable(): ChannelSearchable {
    return {
      id: this.id,
      name: this.name,
      alt_names: this.altNames.all(),
      alt_name: this.altNames.all(),
      network: this.networkName,
      owner: this.ownerNames.all(),
      owners: this.ownerNames.all(),
      country: this.countryCode,
      category: this.categoryIds.all(),
      categories: this.categoryIds.all(),
      launched: this.launchedDateString,
      closed: this.closedDateString,
      replaced_by: this.replacedByStreamId,
      website: this.websiteUrl,
      is_nsfw: this.isNSFW,
      is_closed: this.isClosed(),
      is_blocked: this.isBlocked(),
      feeds: this.getFeeds().count(),
      logos: this.getLogos().count(),
      streams: this.getStreams().count(),
      guides: this.getGuides().count(),
      language: this.getLanguageCodes().all(),
      languages: this.getLanguageCodes().all(),
      broadcast_area: this.getBroadcastAreaCodes().all(),
      format: this.getFormats().all(),
      formats: this.getFormats().all(),
      timezone: this.getTimezoneIds().all(),
      timezones: this.getTimezoneIds().all(),
      _languageNames: this.getLanguageNames().all(),
      _broadcastLocationCodes: this.getBroadcastLocationCodes().all(),
      _broadcastLocationNames: this.getBroadcastLocationNames().all(),
      _countryName: this.getCountryName(),
      _guideSiteNames: this.getGuideSiteNames().all(),
      _streamTitles: this.getStreamTitles().all(),
      _streamUrls: this.getStreamUrls().all(),
      _feedNames: this.getFeedNames().all(),
      _feedAltNames: this.getFeedAltNames().all(),
      _streamIds: this.getStreamIds().all(),
      _logoUrls: this.getLogoUrls().all()
    }
  }

  serialize(props: { [key: string]: boolean } = {}): ChannelSerializedData {
    props = { withFeeds: true, withLogos: true, ...props }

    return {
      id: this.id,
      name: this.name,
      altNames: this.altNames.all(),
      networkName: this.networkName,
      ownerNames: this.ownerNames.all(),
      countryCode: this.countryCode,
      country: this.country ? this.country.serialize() : null,
      categoryIds: this.categoryIds.all(),
      categories: this.categories.map((category: Category) => category.serialize()).all(),
      isNSFW: this.isNSFW,
      launchedDateString: this.launchedDateString,
      launchedDate: this.launchedDate ? this.launchedDate.toJSON() : null,
      closedDateString: this.closedDateString,
      closedDate: this.closedDate ? this.closedDate.toJSON() : null,
      replacedByStreamId: this.replacedByStreamId,
      replacedByChannelId: this.replacedByChannelId,
      websiteUrl: this.websiteUrl,
      blocklistRecords: this.blocklistRecords
        .map((blocklistRecord: BlocklistRecord) => blocklistRecord.serialize())
        .all(),
      feeds: props.withFeeds
        ? this.getFeeds()
            .map((feed: Feed) => feed.serialize())
            .all()
        : [],
      logos: props.withLogos
        ? this.getLogos()
            .map((logo: Logo) => logo.serialize({ withChannel: false, withFeed: false }))
            .all()
        : [],
      hasUniqueName: this.hasUniqueName
    }
  }

  deserialize(data: ChannelSerializedData): this {
    this.id = data.id || ''
    this.name = data.name
    this.altNames = new Collection(data.altNames)
    this.networkName = data.networkName
    this.ownerNames = new Collection(data.ownerNames)
    this.countryCode = data.countryCode
    this.country = new Country().deserialize(data.country)
    this.categoryIds = new Collection(data.categoryIds)
    this.categories = new Collection(data.categories).map((data: CategorySerializedData) =>
      new Category().deserialize(data)
    )
    this.isNSFW = data.isNSFW
    this.launchedDateString = data.launchedDateString
    this.launchedDate = data.launchedDate ? dayjs(data.launchedDate) : undefined
    this.closedDateString = data.closedDateString
    this.closedDate = data.closedDate ? dayjs(data.closedDate) : undefined
    this.replacedByStreamId = data.replacedByStreamId
    this.replacedByChannelId = data.replacedByChannelId
    this.websiteUrl = data.websiteUrl
    this.blocklistRecords = new Collection(data.blocklistRecords).map(
      (data: BlocklistRecordSerializedData) => new BlocklistRecord().deserialize(data)
    )
    this.feeds = new Collection(data.feeds).map((data: FeedSerializedData) =>
      new Feed().deserialize(data)
    )
    this.logos = new Collection(data.logos).map((data: LogoSerializedData) =>
      new Logo().deserialize(data)
    )
    this.hasUniqueName = data.hasUniqueName

    return this
  }

  getFieldset(): HTMLPreviewField[] {
    return [
      { name: 'id', type: 'string', value: { text: this.id, title: this.id } },
      { name: 'name', type: 'string', value: { text: this.name, title: this.name } },
      {
        name: 'alt_names',
        type: 'string[]',
        value: this.altNames.map(altName => ({ text: altName, title: altName })).all()
      },
      {
        name: 'network',
        type: 'link',
        value: this.networkName
          ? { label: this.networkName, query: `network:${normalize(this.networkName)}` }
          : null
      },
      {
        name: 'owners',
        type: 'link[]',
        value: this.ownerNames
          .map((name: string) => ({
            label: name,
            query: `owner:${normalize(name)}`
          }))
          .all()
      },
      {
        name: 'country',
        type: 'link',
        value: this.country
          ? { label: this.country.name, query: `country:${this.country.code}` }
          : null
      },
      {
        name: 'broadcast_area',
        type: 'link[]',
        value: this.getBroadcastArea()
          .map((broadcastArea: BroadcastArea) => ({
            label: broadcastArea.getName(),
            query: `broadcast_area:${broadcastArea.code}`
          }))
          .all()
      },
      {
        name: 'timezones',
        type: 'link[]',
        value: this.getTimezoneIds()
          .map((id: string) => ({
            label: id,
            query: `timezone:${id}`
          }))
          .all()
      },
      {
        name: 'languages',
        type: 'link[]',
        value: this.getLanguages()
          .map((language: Language) => ({
            label: language.name,
            query: `language:${language.code}`
          }))
          .all()
      },
      {
        name: 'categories',
        type: 'link[]',
        value: this.categories
          .map((category: Category) => ({
            label: category.name,
            query: `category:${category.id}`
          }))
          .all()
      },
      {
        name: 'is_nsfw',
        type: 'link',
        value: { label: this.isNSFW.toString(), query: `is_nsfw:${this.isNSFW.toString()}` }
      },
      {
        name: 'formats',
        type: 'link[]',
        value: this.getFormats()
          .map((format: string) => ({
            label: format,
            query: `format:${format}`
          }))
          .all()
      },
      {
        name: 'launched',
        type: 'string',
        value: this.launchedDate
          ? {
              text: this.launchedDate.format('D MMMM YYYY'),
              title: this.launchedDateString
            }
          : null
      },
      {
        name: 'closed',
        type: 'string',
        value: this.closedDate
          ? {
              text: this.closedDate.format('D MMMM YYYY'),
              title: this.closedDateString
            }
          : null
      },
      {
        name: 'replaced_by',
        type: 'link',
        value: this.replacedByStreamId
          ? {
              label: this.replacedByStreamId,
              query: `id:${this.replacedByChannelId.replace('.', '\\.')}`
            }
          : null
      },
      {
        name: 'website',
        type: 'external_link',
        value: this.websiteUrl
          ? { href: this.websiteUrl, title: this.websiteUrl, label: this.websiteUrl }
          : null
      }
    ].filter((field: HTMLPreviewField) =>
      Array.isArray(field.value) ? field.value.length : field.value
    )
  }

  getStructuredData() {
    return {
      '@context': 'https://schema.org/',
      '@type': 'TelevisionChannel',
      image: this.getLogoUrl(),
      identifier: this.id,
      name: this.name,
      alternateName: this.altNames.map((name: string) => ({ '@value': name })),
      genre: this.categories.map((category: Category) => ({ '@value': category.name })),
      sameAs: this.websiteUrl
    }
  }
}
