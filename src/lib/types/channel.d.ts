import * as sdk from '@iptv-org/sdk'
import type { CountryEncoded } from './country'
import type { LogoEncoded } from './logo'
import type { FeedEncoded } from './feed'

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
  logos: LogoEncoded[]
  feeds: FeedEncoded[]
  _country: CountryEncoded
  _categories: sdk.Types.CategoryData[]
  blocklistRecords: sdk.Types.BlocklistRecordData[]
  _history: ChannelEncoded[] | ChannelEncoded[][]
  hasUniqueName: boolean
}
