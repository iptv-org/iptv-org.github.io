import type { HTMLPreviewField } from '$lib/components/HTMLPreview/types'
import { Link } from 'iptv-playlist-generator'
import * as sdk from '@iptv-org/sdk'
import { Channel } from './channel'
import type { Logo } from './logo'
import type { Feed } from './feed'

export class Stream extends sdk.Models.Stream {
  uuid: string
  label?: string

  _channel?: Channel
  _feed?: Feed

  constructor(data: sdk.Types.StreamData) {
    super(data)

    this.uuid = crypto.randomUUID()
  }

  encode() {
    return {
      ...this.toObject(),
      _channel: this._channel,
      _feed: this._feed
    }
  }

  static decode(data): Stream {
    const stream = new Stream(data)

    if (data._channel) stream.withChannel(data._channel)
    if (data._feed) stream.withFeed(data._feed)

    return stream
  }

  withChannel(channel: Channel): this {
    this._channel = channel

    return this
  }

  withFeed(feed: Feed): this {
    this._feed = feed

    return this
  }

  override getChannel(): Channel {
    return this._channel
  }

  override getFeed(): Feed {
    return this._feed
  }

  getReportUrl(): string {
    const endpoint = 'https://github.com/iptv-org/iptv/issues/new'
    const params = new URLSearchParams({
      labels: 'streams:remove',
      template: '3_streams_report.yml',
      title: `Report: ${this.getDisplayName()}`,
      stream_url: this.url
    })

    return `${endpoint}?${params.toString()}`
  }

  getEditUrl(): string {
    const endpoint = 'https://github.com/iptv-org/iptv/issues/new'
    const params = new URLSearchParams({
      labels: 'streams:edit',
      template: '2_streams_edit.yml',
      title: `Edit: ${this.getDisplayName()}`,
      stream_url: this.url
    })

    return `${endpoint}?${params.toString()}`
  }

  getDisplayName(): string {
    const channel = this.getChannel()
    if (!channel) return ''

    const feed = this.getFeed()
    if (!feed) return channel.name

    return `${channel.name} ${feed.name}`
  }

  getVerticalResolution(): number {
    if (!this.quality) return 0

    return parseInt(this.quality.replace(/p|i/, ''))
  }

  getFullTitle(): string {
    let title = this.title

    if (this.quality) {
      title += ` (${this.quality})`
    }

    if (this.label) {
      title += ` [${this.label}]`
    }

    return title
  }

  getTvgLogo(): string {
    function format(logo: Logo): number {
      const levelByFormat = { SVG: 0, PNG: 3, APNG: 1, WebP: 1, AVIF: 1, JPEG: 2, GIF: 1 }

      return levelByFormat[logo.format] || 0
    }

    const channel = this.getChannel()
    if (!channel) return ''

    const logos = channel.getLogos()
    if (logos.isEmpty()) return ''

    const firstLogo = logos.sortBy([format], ['desc'], false).first()
    if (!firstLogo) return ''

    return firstLogo.url
  }

  getGroupTitle(): string {
    return this.getChannel()
      .getCategories()
      .map((category: sdk.Models.Category) => category.name)
      .sort()
      .join(';')
  }

  getFieldset(): HTMLPreviewField[] {
    return [
      { name: 'title', type: 'string', value: { text: this.title, title: this.title } },
      { name: 'url', type: 'string', value: { text: this.url, title: this.url } },
      {
        name: 'referrer',
        type: 'string',
        value: this.referrer ? { text: this.referrer, title: this.referrer } : null
      },
      {
        name: 'user_agent',
        type: 'string',
        value: this.user_agent ? { text: this.user_agent, title: this.user_agent } : null
      },
      {
        name: 'quality',
        type: 'string',
        value: this.quality ? { text: this.quality, title: this.quality } : null
      }
    ].filter((field: HTMLPreviewField) => field.value)
  }

  getPlaylistLink(): Link {
    if (!this.channel) return ''

    const link = new Link(this.url)

    link.title = this.getFullTitle()
    link.attrs = {
      'tvg-id': this.getId(),
      'tvg-logo': this.getTvgLogo(),
      'group-title': this.getGroupTitle()
    }

    if (this.user_agent) {
      link.attrs['user-agent'] = this.user_agent
      link.vlcOpts['http-user-agent'] = this.user_agent
    }

    if (this.referrer) {
      link.attrs['referrer'] = this.referrer
      link.vlcOpts['http-referrer'] = this.referrer
    }

    return link
  }
}
