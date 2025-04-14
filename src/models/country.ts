import type { CountryData, CountrySerializedData } from '~/types/country'
import { Collection, type Dictionary } from '@freearhey/core/browser'
import { Channel } from './channel'

export class Country {
  code: string
  name: string
  flagEmoji: string
  languageCode: string
  channels: Collection = new Collection()

  constructor(data?: CountryData) {
    if (!data) return

    this.code = data.code
    this.name = data.name
    this.flagEmoji = data.flag
    this.languageCode = data.lang
  }

  withChannels(channelsGroupedByCountryCode: Dictionary): this {
    this.channels = new Collection(channelsGroupedByCountryCode.get(this.code))

    return this
  }

  getChannels(): Collection {
    if (!this.channels) return new Collection()

    return this.channels
  }

  getChannelsWithStreams(): Collection {
    return this.getChannels().filter((channel: Channel) => channel.hasStreams())
  }

  serialize(): CountrySerializedData {
    return {
      code: this.code,
      name: this.name,
      flagEmoji: this.flagEmoji,
      languageCode: this.languageCode
    }
  }

  deserialize(data: CountrySerializedData): this {
    this.code = data.code
    this.name = data.name
    this.flagEmoji = data.flagEmoji
    this.languageCode = data.languageCode

    return this
  }
}
