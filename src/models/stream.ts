import type { JsonDataViewerField } from '~/types/jsonDataViewerField'
import type { StreamData, StreamSerializedData } from '~/types/stream'
import type { Dictionary } from '@freearhey/core/browser'
import { Link } from 'iptv-playlist-generator'
import type { Channel } from './channel'
import type { Feed } from './feed'
import type { Category } from './category'

export class Stream {
  channelId?: string
  feedId?: string
  url: string
  referrer?: string
  userAgent?: string
  quality?: string
  channel?: Channel
  feed?: Feed

  constructor(data?: StreamData) {
    if (!data) return

    this.channelId = data.channel
    this.feedId = data.feed
    this.url = data.url
    this.referrer = data.referrer
    this.userAgent = data.user_agent
    this.quality = data.quality
  }

  withChannel(channelsKeyById: Dictionary): this {
    if (!this.channelId) return this

    this.channel = channelsKeyById.get(this.channelId)

    return this
  }

  withFeed(feedsKeyById: Dictionary): this {
    if (!this.feedId) return this

    this.feed = feedsKeyById.get(this.feedId)

    return this
  }

  getUUID(): string {
    return this.url
  }

  getId(): string | undefined {
    if (!this.channelId) return undefined
    if (!this.feedId) return this.channelId

    return `${this.channelId}@${this.feedId}`
  }

  toJSON() {
    return {
      channel: this.channelId,
      feed: this.feedId,
      url: this.url,
      referrer: this.referrer,
      user_agent: this.userAgent,
      quality: this.quality
    }
  }

  getFieldset(): JsonDataViewerField[] {
    let fieldset = []

    const data = this.toJSON()
    for (let key in data) {
      fieldset.push({
        name: key,
        value: data[key]
      })
    }

    return fieldset
  }

  getQuality(): string {
    if (!this.quality) return ''

    return this.quality
  }

  getVerticalResolution(): number {
    return parseInt(this.getQuality().replace(/p|i/, ''))
  }

  getTitle(): string {
    if (!this.channel) return ''
    if (!this.feed) return this.channel.name

    return `${this.channel.name} ${this.feed.name}`
  }

  getPlaylistLink(): Link {
    if (!this.channel) return ''

    const link = new Link(this.url)

    link.title = this.getTitle()
    link.attrs = {
      'tvg-id': this.getId(),
      'tvg-logo': this.channel.logoUrl,
      'group-title': this.channel
        .getCategories()
        .map((category: Category) => category.name)
        .sort()
        .join(';')
    }

    if (this.userAgent) {
      link.attrs['user-agent'] = this.userAgent
      link.vlcOpts['http-user-agent'] = this.userAgent
    }

    if (this.referrer) {
      link.attrs['referrer'] = this.referrer
      link.vlcOpts['http-referrer'] = this.referrer
    }

    return link
  }

  serialize(): StreamSerializedData {
    return {
      channelId: this.channelId,
      feedId: this.feedId,
      url: this.url,
      referrer: this.referrer,
      userAgent: this.userAgent,
      quality: this.quality
    }
  }

  deserialize(data: StreamSerializedData): this {
    this.channelId = data.channelId
    this.feedId = data.feedId
    this.url = data.url
    this.referrer = data.referrer
    this.userAgent = data.userAgent
    this.quality = data.quality

    return this
  }
}
