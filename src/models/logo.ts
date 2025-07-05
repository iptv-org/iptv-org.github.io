import { Collection, type Dictionary } from '@freearhey/core/browser'
import type { HTMLPreviewField } from '~/types/htmlPreviewField'
import type { LogoData, LogoSerializedData } from '~/types/logo'
import { Channel, Feed } from './'

export class Logo {
  channelId: string
  channel: Channel
  feedId?: string
  feed?: Feed
  tags: Collection
  width: number
  height: number
  format?: string
  url: string

  constructor(data?: LogoData) {
    if (!data) return

    this.channelId = data.channel
    this.feedId = data.feed || undefined
    this.tags = new Collection(data.tags)
    this.width = data.width
    this.height = data.height
    this.format = data.format || undefined
    this.url = data.url
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
    return this.channelId + this.feedId + this.url
  }

  getStreamId(): string {
    if (!this.feedId) return this.channelId

    return `${this.channelId}@${this.feedId}`
  }

  getDisplayName(): string {
    if (this.feed) return this.feed.getDisplayName()
    if (this.channel) return this.channel.getDisplayName()

    return ''
  }

  serialize(props: { [key: string]: boolean } = {}): LogoSerializedData {
    props = { ...props }

    return {
      channelId: this.channelId,
      channel: this.channel.serialize({ withFeeds: false, withLogos: false }),
      feedId: this.feedId,
      feed: this.feed ? this.feed.serialize({ withLogos: false }) : null,
      tags: this.tags.all(),
      width: this.width,
      height: this.height,
      format: this.format,
      url: this.url
    }
  }

  deserialize(data: LogoSerializedData): this {
    this.channelId = data.channelId
    this.channel = new Channel().deserialize(data.channel)
    this.feedId = data.feedId
    this.feed = data.feed ? new Feed().deserialize(data.feed) : undefined
    this.tags = new Collection(data.tags)
    this.width = data.width
    this.height = data.height
    this.format = data.format
    this.url = data.url

    return this
  }

  getFieldset(): HTMLPreviewField[] {
    return [
      {
        name: 'url',
        type: 'string',
        value: { text: this.url, title: this.url }
      },
      this.feedId
        ? {
            name: 'feed',
            type: 'string',
            value: { text: this.feedId, title: this.feedId }
          }
        : null,
      this.tags.notEmpty()
        ? {
            name: 'tags',
            type: 'string[]',
            value: this.tags.map(tag => ({ text: tag, title: tag })).all()
          }
        : null,
      {
        name: 'width',
        type: 'string',
        value: {
          text: this.width.toString(),
          title: this.width.toString()
        }
      },
      {
        name: 'height',
        type: 'string',
        value: {
          text: this.height.toString(),
          title: this.height.toString()
        }
      },
      this.format
        ? {
            name: 'format',
            type: 'string',
            value: {
              text: this.format,
              title: this.format
            }
          }
        : null
    ]
  }
}
