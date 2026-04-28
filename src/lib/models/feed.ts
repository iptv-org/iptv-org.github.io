import { Stream, Logo, Guide, BroadcastArea, BroadcastAreaLocation, Channel } from './'
import type { HTMLPreviewField } from '$lib/components/HTMLPreview/types'
import type { FeedEncoded } from '$lib/types/feed'
import { Collection } from '@freearhey/core'
import * as sdk from '@iptv-org/sdk'

export class Feed extends sdk.Models.Feed {
  uuid: string

  logos: Logo[] = []
  streams: Stream[] = []
  guides: Guide[] = []
  _languages: sdk.Models.Language[] = []
  broadcastArea: BroadcastArea
  _timezones: sdk.Models.Timezone[] = []
  _channel?: Channel

  constructor(data?: sdk.Types.FeedData) {
    super(data)

    this.uuid = crypto.randomUUID()
  }

  encode(): FeedEncoded {
    return {
      ...this.toObject(),
      _languages: this._languages.map(language => language.toObject()),
      _timezones: this._timezones.map(timezone => timezone.toObject()),
      _channel: this._channel?.encode(),
      broadcastArea: this.broadcastArea?.encode(),
      logos: this.logos.map(logo => logo.encode()),
      streams: this.streams.map(stream => stream.encode()),
      guides: this.guides.map(guide => guide.encode())
    }
  }

  static decode(data: FeedEncoded): Feed {
    const feed = new Feed(data)
    const logos = data.logos.map(data => Logo.decode(data))
    const streams = data.streams.map(data => Stream.decode(data))
    const guides = data.guides.map(data => Guide.decode(data))
    const broadcastArea = data.broadcastArea ? BroadcastArea.decode(data.broadcastArea) : null
    const languages = data._languages.map(data => new sdk.Models.Language(data))
    const timezones = data._timezones.map(data => new sdk.Models.Timezone(data))

    feed
      .withLogos(logos)
      .withLanguages(languages)
      .withTimezones(timezones)
      .withGuides(guides)
      .withStreams(streams)
      .withBroadcastArea(broadcastArea)

    if (data._channel) {
      const channel = Channel.decode(data._channel)

      feed.withChannel(channel)
    }

    return feed
  }

  hasStreams(): boolean {
    return this.streams && this.streams.length > 0
  }

  withChannel(channel: Channel | undefined): this {
    this._channel = channel

    return this
  }

  override getChannel(): Channel | undefined {
    return this._channel
  }

  withTimezones(timezones: sdk.Models.Timezone[]): this {
    this._timezones = timezones || []

    return this
  }

  override getTimezones(): Collection<sdk.Models.Timezone> {
    return new Collection(this._timezones)
  }

  withLanguages(languages: sdk.Models.Language[]): this {
    this._languages = languages || []

    return this
  }

  withGuides(guides: Guide[]): this {
    this.guides = guides || []

    return this
  }

  override getGuides(): Collection<Guide> {
    return new Collection(this.guides)
  }

  withBroadcastArea(broadcastArea: BroadcastArea): this {
    this.broadcastArea = broadcastArea

    return this
  }

  override getBroadcastAreaLocations(): Collection<BroadcastAreaLocation> {
    return this.getBroadcastArea().getLocations()
  }

  override getBroadcastArea(): BroadcastArea {
    return this.broadcastArea
  }

  override getLanguages(): Collection<sdk.Models.Language> {
    return new Collection(this._languages)
  }

  withStreams(streams: Stream[]): this {
    this.streams = streams || []

    return this
  }

  override getStreams(): Collection<Stream> {
    return new Collection(this.streams)
  }

  withLogos(logos: Logo[]): this {
    this.logos = logos || []

    return this
  }

  override getLogos(): Collection<Logo> {
    function inUse(logo: Logo): number {
      return logo.in_use ? 1 : -1
    }

    function format(logo: Logo): number {
      const levelByFormat = { SVG: 2, PNG: 1, APNG: 1, WebP: 1, AVIF: 1, JPEG: 0, GIF: 0 }

      return logo.format ? levelByFormat[logo.format] : 0
    }

    function size(logo: Logo): number {
      return Math.abs(512 - logo.width) + Math.abs(512 - logo.height)
    }

    return new Collection(this.logos).sortBy([inUse, format, size], ['desc', 'desc', 'asc'], false)
  }

  getPageUrl(): string {
    const [channelSlug, countryCode] = this.channel.split('.') || [null, null]
    if (!channelSlug || !countryCode || typeof window === 'undefined') return ''

    return `${window.location.protocol}//${window.location.host}/channels/${countryCode}/${channelSlug}#${this.id}`
  }

  override getFullName(): string {
    const uniqueName = this.getChannel()?.getUniqueName()
    if (!uniqueName) return ''

    return `${uniqueName} ${this.name}`
  }

  getEditUrl(): string {
    const endpoint = 'https://github.com/iptv-org/database/issues/new'
    const params = new URLSearchParams({
      labels: 'feeds:edit',
      template: '05_feeds_edit.yml',
      title: `Edit: ${this.getFullName()}`,
      feed_id: this.id,
      channel_id: this.channel
    })

    return `${endpoint}?${params.toString()}`
  }

  getRemoveUrl(): string {
    const endpoint = 'https://github.com/iptv-org/database/issues/new'
    const params = new URLSearchParams({
      labels: 'feeds:remove',
      template: '06_feeds_remove.yml',
      title: `Remove: ${this.getFullName()}`,
      feed_id: this.id,
      channel_id: this.channel
    })

    return `${endpoint}?${params.toString()}`
  }

  getAddLogoUrl(): string {
    const endpoint = 'https://github.com/iptv-org/database/issues/new'
    const params = new URLSearchParams({
      labels: 'logos:add',
      template: '07_logos_add.yml',
      title: `Add: ${this.getFullName()} Logo`,
      channel_id: this.channel,
      feed_id: this.id
    })

    return `${endpoint}?${params}`
  }

  getAddStreamUrl(): string {
    const endpoint = 'https://github.com/iptv-org/iptv/issues/new'
    const params = new URLSearchParams({
      labels: 'streams:add',
      template: '1_streams_add.yml',
      title: `Add: ${this.getFullName()}`,
      stream_id: this.getStreamId()
    })

    return `${endpoint}?${params.toString()}`
  }

  getRequestLinkUrl(): string {
    const endpoint = 'https://github.com/iptv-org/iptv/discussions/new'
    const params = new URLSearchParams({
      category: 'channel-search',
      title: this.getFullName(),
      stream_id: this.getStreamId()
    })

    return `${endpoint}?${params.toString()}`
  }

  getFieldset(): HTMLPreviewField[] {
    return [
      { name: 'id', type: 'string', value: { text: this.id, title: this.id } },
      { name: 'name', type: 'string', value: { text: this.name, title: this.name } },
      {
        name: 'alt_names',
        type: 'string[]',
        value: this.alt_names.map(altName => ({ text: altName, title: altName }))
      },
      {
        name: 'is_main',
        type: 'string',
        value: { text: this.is_main.toString(), title: this.is_main.toString() }
      },
      {
        name: 'broadcast_area',
        type: 'link[]',
        value: this.getBroadcastArea()
          .getLocations()
          .map((location: sdk.Models.BroadcastAreaLocation) => ({
            label: location.getName(),
            query: `broadcast_area:${location.rawCode}`
          }))
          .all()
      },
      {
        name: 'timezones',
        type: 'link[]',
        value: this.timezones.map((id: string) => ({
          label: id,
          query: `timezone:${id}`
        }))
      },
      {
        name: 'languages',
        type: 'link[]',
        value: this.getLanguages()
          .map((language: sdk.Models.Language) => ({
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
}
