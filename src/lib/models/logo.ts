import type { HTMLPreviewField } from '$lib/components/HTMLPreview/types'
import * as sdk from '@iptv-org/sdk'
import { Feed } from './feed'
import { Channel } from './channel'

export class Logo extends sdk.Models.Logo {
  uuid: string
  _feed?: Feed
  _channel?: Channel

  constructor(data: sdk.Types.LogoData) {
    super(data)

    this.uuid = crypto.randomUUID()
  }

  withFeed(feed: Feed): this {
    this._feed = feed

    return this
  }

  override getFeed(): Feed {
    return this._feed
  }

  withChannel(channel: Channel): this {
    this._channel = channel

    return this
  }

  override getChannel(): Channel {
    return this._channel
  }

  encode() {
    return {
      ...this.toObject(),
      _feed: this._feed ? this._feed.toObject() : null,
      _channel: this._channel ? this._channel.toObject() : null
    }
  }

  static decode(data): Logo {
    const logo = new Logo(data)

    if (data._feed) logo.withFeed(new Feed(data._feed))
    if (data._channel) logo.withChannel(new Channel(data._channel))

    return logo
  }

  getDisplayName(): string {
    const feed = this.getFeed()
    if (feed) return feed.getFullName()

    const channel = this.getChannel()
    if (channel) return channel.name

    return ''
  }

  getFieldset(): HTMLPreviewField[] {
    return [
      {
        name: 'url',
        type: 'string',
        value: { text: this.url, title: this.url }
      },
      {
        name: 'feed',
        type: 'string',
        value: this.feed ? { text: this.feed, title: this.feed } : null
      },
      {
        name: 'tags',
        type: 'string[]',
        value: this.tags.length ? this.tags.map(tag => ({ text: tag, title: tag })) : null
      },
      {
        name: 'width',
        type: 'string',
        value: this.width
          ? {
              text: this.width.toString(),
              title: this.width.toString()
            }
          : null
      },
      {
        name: 'height',
        type: 'string',
        value: this.height
          ? {
              text: this.height.toString(),
              title: this.height.toString()
            }
          : null
      },
      {
        name: 'format',
        type: 'string',
        value: this.format
          ? {
              text: this.format,
              title: this.format
            }
          : null
      }
    ].filter((field: HTMLPreviewField) => field.value)
  }
}
