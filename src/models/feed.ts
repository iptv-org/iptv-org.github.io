import { Collection, type Dictionary } from '@freearhey/core/browser'
import type { FeedData, FeedSerializedData } from '~/types/feed'
import { Guide, Stream, Language, BroadcastArea, Channel } from './'
import type { HTMLPreviewField } from '~/types/htmlPreviewField'

export class Feed {
  channelId: string
  channel: Channel
  id: string
  name: string
  isMain: boolean
  broadcastAreaCodes: Collection
  broadcastArea?: Collection
  timezoneIds: Collection
  languageCodes: Collection
  languages?: Collection
  videoFormat: string
  streams?: Collection
  guides?: Collection

  constructor(data?: FeedData) {
    if (!data) return

    this.channelId = data.channel
    this.id = data.id
    this.name = data.name
    this.isMain = data.is_main
    this.broadcastAreaCodes = new Collection(data.broadcast_area)
    this.timezoneIds = new Collection(data.timezones)
    this.languageCodes = new Collection(data.languages)
    this.videoFormat = data.video_format
  }

  withChannel(channelsKeyById: Dictionary): this {
    if (!this.channelId) return this

    this.channel = channelsKeyById.get(this.channelId)

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
    regions: Collection
  ): this {
    this.broadcastArea = this.broadcastAreaCodes
      .map((code: string) =>
        new BroadcastArea({ code })
          .withName(countriesKeyByCode, subdivisionsKeyByCode, regionsKeyByCode)
          .withLocations(countriesKeyByCode, subdivisionsKeyByCode, regionsKeyByCode, regions)
      )
      .filter(Boolean)

    return this
  }

  getUUID(): string {
    return this.channelId + this.id
  }

  getBroadcastArea(): Collection {
    if (!this.broadcastArea) return new Collection()

    return this.broadcastArea
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
      { name: 'id', type: 'string', value: this.id, title: this.id },
      { name: 'name', type: 'string', value: this.name, title: this.name },
      {
        name: 'is_main',
        type: 'string',
        value: this.isMain.toString(),
        title: this.isMain.toString()
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
        name: 'video_format',
        type: 'link',
        value: { label: this.videoFormat, query: `video_format:${this.videoFormat}` }
      }
    ]
  }

  serialize(): FeedSerializedData {
    return {
      channelId: this.channelId,
      channel: this.channel ? this.channel.serialize({ withFeeds: false }) : null,
      id: this.id,
      name: this.name,
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
      videoFormat: this.videoFormat,
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
    this.isMain = data.isMain
    this.broadcastAreaCodes = new Collection(data.broadcastAreaCodes)
    this.broadcastArea = new Collection(data.broadcastArea).map(data =>
      new BroadcastArea().deserialize(data)
    )
    this.timezoneIds = new Collection(data.timezoneIds)
    this.languageCodes = new Collection(data.languageCodes)
    this.languages = new Collection(data.languages).map(data => new Language().deserialize(data))
    this.videoFormat = data.videoFormat
    this.streams = new Collection(data.streams).map(data => new Stream().deserialize(data))
    this.guides = new Collection(data.guides).map(data => new Guide().deserialize(data))

    return this
  }
}
