import type { ChannelEncoded } from './channel'

export type CountryEncoded = {
  code: string
  name: string
  languages: string[]
  flag: string
  channels: ChannelEncoded[]
}
