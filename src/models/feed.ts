import { Collection, type Dictionary } from '@freearhey/core/browser'
import type { FeedData, FeedSerializedData } from '~/types/feed'
import { Guide, Stream, Language, BroadcastArea, Channel, Logo } from './'
import type { HTMLPreviewField } from '~/types/htmlPreviewField'

export class Feed {
  channelId: string
  channel: Channel
  id: string
  name: string
  altNames: Collection
  isMain: boolean
  broadcastAreaCodes: Collection
  broadcastArea?: Collection
  timezoneIds: Collection
  languageCodes: Collection
  languages?: Collection
  format: string
  streams?: Collection
  guides?: Collection
  logos: Collection = new Collection()

  constructor(data?: FeedData) {
    if (!data) return

    this.channelId = data.channel
    this.id = data.id
    this.name = data.name
    this.altNames = new Collection(data.alt_names)
    this.isMain = data.is_main
    this.broadcastAreaCodes = new Collection(data.broadcast_area)
    this.timezoneIds = new Collection(data.timezones)
    this.languageCodes = new Collection(data.languages)
    this.format = data.format
  }

  withChannel(channelsKeyById: Dictionary): this {
    if (!this.channelId) return this

    this.channel = channelsKeyById.get(this.channelId)

    return this
  }

  withLogos(logosGroupedByStreamId: Dictionary): this {
    this.logos = new Collection(logosGroupedByStreamId.get(`${this.channelId}@${this.id}`))

    return this
  }

  withStreams(streamsGroupedByStreamId: Dictionary): this {
    this.streams = new Collection(streamsGroupedByStreamId.get(`${this.channelId}@${this.id}`))

    if (this.isMain) {
      this.streams = this.streams.concat(
        new Collection(streamsGroupedByStreamId.get(this.channelId))
      )
    }

    return this
  }

  withGuides(guidesGroupedByStreamId: Dictionary): this {
    this.guides = new Collection(guidesGroupedByStreamId.get(`${this.channelId}@${this.id}`))

    if (this.isMain) {
      this.guides = this.guides.concat(new Collection(guidesGroupedByStreamId.get(this.channelId)))
    }

    return this
  }

  withLanguages(languagesKeyByCode: Dictionary): this {
    this.languages = this.languageCodes
      .map((code: string) => languagesKeyByCode.get(code))
      .filter(Boolean)

    return this
  }

  withBroadcastArea(
    countriesKeyByCode: Dictionary,
    subdivisionsKeyByCode: Dictionary,
    regionsKeyByCode: Dictionary,
    regions: Collection,
    citiesKeyByCode: Dictionary
  ): this {
    this.broadcastArea = this.broadcastAreaCodes
      .map((code: string) =>
        new BroadcastArea({ code })
          .withName(countriesKeyByCode, subdivisionsKeyByCode, regionsKeyByCode, citiesKeyByCode)
          .withLocations(
            countriesKeyByCode,
            subdivisionsKeyByCode,
            regionsKeyByCode,
            regions,
            citiesKeyByCode
          )
      )
      .filter(Boolean)

    return this
  }

  getStreamId(): string {
    return `${this.channelId}@${this.id}`
  }

  getUUID(): string {
    return this.channelId + this.id
  }

  getBroadcastArea(): Collection {
    if (!this.broadcastArea) return new Collection()

    return this.broadcastArea
  }

  getLogos(): Collection {
    function format(logo: Logo): number {
      const levelByFormat = { SVG: 2, PNG: 1, APNG: 1, WebP: 1, AVIF: 1, JPEG: 0, GIF: 0 }

      return levelByFormat[logo.format] || 0
    }

    function size(logo: Logo): number {
      return Math.abs(512 - logo.width) + Math.abs(512 - logo.height)
    }

    return this.logos.orderBy([format, size], ['desc', 'asc'], false)
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

  getBroadcastLocationCodes(): Collection {
    let broadcastLocationCodes = new Collection()

    this.getBroadcastArea().forEach((broadcastArea: BroadcastArea) => {
      broadcastLocationCodes = broadcastLocationCodes.concat(broadcastArea.getLocationCodes())
    })

    return broadcastLocationCodes.uniq()
  }

  getBroadcastLocationNames(): Collection {
    let broadcastLocationNames = new Collection()

    this.getBroadcastArea().forEach((broadcastArea: BroadcastArea) => {
      broadcastLocationNames = broadcastLocationNames.concat(broadcastArea.getLocationNames())
    })

    return broadcastLocationNames.uniq()
  }

  getStreams(): Collection {
    if (!this.streams) return new Collection()

    return this.streams
  }

  hasStreams(): boolean {
    return this.getStreams().notEmpty()
  }

  getGuides(): Collection {
    if (!this.guides) return new Collection()

    return this.guides
  }

  hasGuides(): boolean {
    return this.getGuides().notEmpty()
  }

  getLanguages(): Collection {
    if (!this.languages) return new Collection()

    return this.languages
  }

  getLanguageCodes(): Collection {
    return this.getLanguages().map((language: Language) => language.code)
  }

  getLanguageNames(): Collection {
    return this.getLanguages().map((language: Language) => language.name)
  }

  getDisplayName(): string {
    if (!this.channel) return this.name

    return [this.channel.name, this.name].join(' ')
  }

  getPageUrl(): string {
    const [channelSlug, countryCode] = this.channelId.split('.') || [null, null]
    if (!channelSlug || !countryCode || typeof window === 'undefined') return ''

    return `${window.location.protocol}//${window.location.host}/channels/${countryCode}/${channelSlug}#${this.id}`
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
        name: 'is_main',
        type: 'string',
        value: { text: this.isMain.toString(), title: this.isMain.toString() }
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
        value: this.timezoneIds
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
        name: 'format',
        type: 'link',
        value: { label: this.format, query: `format:${this.format}` }
      }
    ].filter((field: HTMLPreviewField) =>
      Array.isArray(field.value) ? field.value.length : field.value
    )
  }

  serialize(props: { [key: string]: boolean } = {}): FeedSerializedData {
    props = { withChannel: true, withLogos: true, ...props }

    return {
      channelId: this.channelId,
      channel:
        this.channel && props.withChannel
          ? this.channel.serialize({ withFeeds: false, withLogos: false })
          : null,
      id: this.id,
      name: this.name,
      altNames: this.altNames.all(),
      isMain: this.isMain,
      broadcastAreaCodes: this.broadcastAreaCodes.all(),
      broadcastArea: this.getBroadcastArea()
        .map((broadcastArea: BroadcastArea) => broadcastArea.serialize())
        .all(),
      timezoneIds: this.timezoneIds.all(),
      languageCodes: this.languageCodes.all(),
      languages: this.getLanguages()
        .map((language: Language) => language.serialize())
        .all(),
      format: this.format,
      logos: props.withLogos
        ? this.getLogos()
            .map((logo: Logo) => logo.serialize({ withFeed: false }))
            .all()
        : [],
      streams: this.getStreams()
        .map((stream: Stream) => stream.serialize())
        .all(),
      guides: this.getGuides()
        .map((guide: Guide) => guide.serialize())
        .all()
    }
  }

  deserialize(data: FeedSerializedData): this {
    this.channelId = data.channelId
    this.channel = data.channel ? new Channel().deserialize(data.channel) : undefined
    this.id = data.id
    this.name = data.name
    this.altNames = new Collection(data.altNames)
    this.isMain = data.isMain
    this.broadcastAreaCodes = new Collection(data.broadcastAreaCodes)
    this.broadcastArea = new Collection(data.broadcastArea).map(data =>
      new BroadcastArea().deserialize(data)
    )
    this.timezoneIds = new Collection(data.timezoneIds)
    this.languageCodes = new Collection(data.languageCodes)
    this.languages = new Collection(data.languages).map(data => new Language().deserialize(data))
    this.format = data.format
    this.logos = new Collection(data.logos).map(data => new Logo().deserialize(data))
    this.streams = new Collection(data.streams).map(data => new Stream().deserialize(data))
    this.guides = new Collection(data.guides).map(data => new Guide().deserialize(data))

    return this
  }
}
