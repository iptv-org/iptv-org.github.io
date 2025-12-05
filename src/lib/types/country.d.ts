import type { Channel } from '$lib/models/channel'

export type CountryEncoded = {
  code: string
  name: string
  languages: string[]
  flag: string
  channels: Channel[]
}
