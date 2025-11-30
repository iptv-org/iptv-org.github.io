import type { BlocklistRecord, Country, Feed, Logo } from '$lib/models'
import * as sdk from '@iptv-org/sdk'

export type ChannelStructuredData = {
  '@context': string
  '@type': string
  image: string
  identifier: string
  name: string
  alternateName: { '@value': string }[]
  genre: { '@value': string }[]
  sameAs: string
}

export type ChannelEncoded = {
  id: string
  name: string
  alt_names: string[]
  network: string
  owners: string[]
  country: string
  categories: string[]
  is_nsfw: boolean
  launched: string
  closed: string
  replaced_by: string
  website: string
  logos: Logo[]
  feeds: Feed[]
  _country: Country
  _categories: sdk.Models.Category[]
  blocklistRecords: BlocklistRecord[]
}
