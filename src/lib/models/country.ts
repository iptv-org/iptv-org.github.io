import type { CountryEncoded } from '$lib/types/country'
import { Collection } from '@freearhey/core'
import { Channel, Feed, Stream } from './'
import * as sdk from '@iptv-org/sdk'

export class Country extends sdk.Models.Country {
  channels: Channel[] = []

  withChannels(channels: Channel[]): this {
    this.channels = channels

    return this
  }

  override getChannels(): Collection<Channel> {
    return new Collection(this.channels).sortBy((channel: Channel) => channel.name)
  }

  getFeeds(): Collection<Feed> {
    const feeds = new Collection<Feed>()

    this.getChannels().forEach((channel: Channel) => {
      feeds.concat(channel.getFeeds())
    })

    return feeds
  }

  getStreams(): Collection<Stream> {
    const streams = new Collection<Stream>()

    this.getFeeds().forEach((feed: Feed) => {
      streams.concat(feed.getStreams())
    })

    return streams
  }

  hasStreams(): boolean {
    return this.getStreams().isNotEmpty()
  }

  getChannelsWithStreams(): Collection<Channel> {
    return this.getChannels().filter((channel: Channel) => channel.getStreams().isNotEmpty())
  }

  encode(): CountryEncoded {
    return {
      ...this.toObject(),
      channels: this.channels.map(channel => channel.encode())
    }
  }

  static decode(data: CountryEncoded): Country {
    const country = new Country(data)
    const channels = data.channels.map(data => Channel.decode(data))

    country.withChannels(channels)

    return country
  }
}
