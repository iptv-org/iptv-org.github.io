import type { ChannelSearchable, ChannelSerializedData, ChannelData } from '../types/channel'
import type { BlocklistRecordSerializedData } from '~/types/blocklistRecord'
import type { HTMLPreviewField } from '../types/htmlPreviewField'
import type { CategorySerializedData } from '~/types/category'
import type { FeedSerializedData } from '~/types/feed'
import { Collection, type Dictionary } from '@freearhey/core/browser'
import dayjs, { type Dayjs } from 'dayjs'
import {
  BlocklistRecord,
  BroadcastArea,
  Subdivision,
  Category,
  Language,
  Country,
  Stream,
  Guide,
  Feed
} from '.'

export class Channel {
  id: string
  name: string
  altNames: Collection = new Collection()
  networkName?: string
  ownerNames: Collection = new Collection()
  countryCode: string
  country?: Country
  subdivisionCode?: string
  subdivision?: Subdivision
  cityName?: string
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
  logoUrl: string
  blocklistRecords: Collection = new Collection()
  feeds: Collection = new Collection()
  hasUniqueName: boolean = true

  constructor(data?: ChannelData) {
    if (!data) return

    this.id = data.id
    this.name = data.name
    this.altNames = new Collection(data.alt_names)
    this.networkName = data.network
    this.ownerNames = new Collection(data.owners)
    this.countryCode = data.country
    this.subdivisionCode = data.subdivision
    this.cityName = data.city
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
    this.logoUrl = data.logo
  }

  withCountry(countriesKeyByCode: Dictionary): this {
    this.country = countriesKeyByCode.get(this.countryCode)

    return this
  }

  withSubdivision(subdivisionsKeyByCode: Dictionary): this {
    if (!this.subdivisionCode) return this

    this.subdivision = subdivisionsKeyByCode.get(this.subdivisionCode)

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

  getStreamUrls(): Collection {
    return this.getStreams().map((stream: Stream) => stream.url)
  }

  getFeeds(): Collection {
    if (!this.feeds) return new Collection()

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

  getVideoFormats(): Collection {
    let videoFormats = new Collection()

    this.getFeeds().forEach((feed: Feed) => {
      videoFormats.add(feed.videoFormat)
    })

    return videoFormats.uniq()
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
      subdivision: this.subdivisionCode,
      city: this.cityName,
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
      streams: this.getStreams().count(),
      guides: this.getGuides().count(),
      language: this.getLanguageCodes().all(),
      languages: this.getLanguageCodes().all(),
      broadcast_area: this.getBroadcastAreaCodes().all(),
      video_format: this.getVideoFormats().all(),
      video_formats: this.getVideoFormats().all(),
      timezone: this.getTimezoneIds().all(),
      timezones: this.getTimezoneIds().all(),
      _languageNames: this.getLanguageNames().all(),
      _broadcastLocationCodes: this.getBroadcastLocationCodes().all(),
      _broadcastLocationNames: this.getBroadcastLocationNames().all(),
      _countryName: this.getCountryName(),
      _guideSiteNames: this.getGuideSiteNames().all(),
      _streamUrls: this.getStreamUrls().all()
    }
  }

  serialize(props = { withFeeds: true }): ChannelSerializedData {
    return {
      id: this.id,
      name: this.name,
      altNames: this.altNames.all(),
      networkName: this.networkName,
      ownerNames: this.ownerNames.all(),
      countryCode: this.countryCode,
      country: this.country ? this.country.serialize() : null,
      subdivisionCode: this.subdivisionCode,
      subdivision: this.subdivision ? this.subdivision.serialize() : null,
      cityName: this.cityName,
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
      logoUrl: this.logoUrl,
      blocklistRecords: this.blocklistRecords
        .map((blocklistRecord: BlocklistRecord) => blocklistRecord.serialize())
        .all(),
      feeds: props.withFeeds
        ? this.getFeeds()
            .map((feed: Feed) => feed.serialize())
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
    this.subdivisionCode = data.subdivisionCode
    this.cityName = data.cityName
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
    this.logoUrl = data.logoUrl
    this.blocklistRecords = new Collection(data.blocklistRecords).map(
      (data: BlocklistRecordSerializedData) => new BlocklistRecord().deserialize(data)
    )
    this.feeds = new Collection(data.feeds).map((data: FeedSerializedData) =>
      new Feed().deserialize(data)
    )
    this.hasUniqueName = data.hasUniqueName

    return this
  }

  getFieldset(): HTMLPreviewField[] {
    return [
      {
        name: 'logo',
        type: 'image',
        value: { src: this.logoUrl, alt: `${this.name} logo`, title: this.logoUrl }
      },
      { name: 'id', type: 'string', value: this.id, title: this.id },
      { name: 'name', type: 'string', value: this.name, title: this.name },
      { name: 'alt_names', type: 'string[]', value: this.altNames.all() },
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
        name: 'subdivision',
        type: 'link',
        value: this.subdivision
          ? { label: this.subdivision.name, query: `subdivision:${this.subdivision.code}` }
          : null
      },
      {
        name: 'city',
        type: 'link',
        value: this.cityName ? { label: this.cityName, query: `city:${this.cityName}` } : null
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
        name: 'video_formats',
        type: 'link[]',
        value: this.getVideoFormats()
          .map((format: string) => ({
            label: format,
            query: `video_format:${format}`
          }))
          .all()
      },
      {
        name: 'launched',
        type: 'string',
        value: this.launchedDate ? this.launchedDate.format('D MMMM YYYY') : null,
        title: this.launchedDateString
      },
      {
        name: 'closed',
        type: 'string',
        value: this.closedDate ? this.closedDate.format('D MMMM YYYY') : null,
        title: this.closedDateString
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
      image: this.logoUrl,
      identifier: this.id,
      name: this.name,
      alternateName: this.altNames.map((name: string) => ({ '@value': name })),
      genre: this.categories.map((category: Category) => ({ '@value': category.name })),
      sameAs: this.websiteUrl
    }
  }
}

function normalize(value: string) {
  value = value.includes(' ') ? `"${value}"` : value

  return encodeURIComponent(value)
}
