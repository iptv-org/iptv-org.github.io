import type { BlocklistRecordSerializedData } from './blocklistRecord'
import type { CategorySerializedData } from './category'
import type { CountrySerializedData } from './country'
import type { FeedSerializedData } from './feed'
import type { LogoSerializedData } from './logo'
import type { SubdivisionSerializedData } from './subdivision'

export type ChannelSearchable = {
  id: string
  name: string
  alt_names: string[]
  alt_name: string[]
  network: string
  owner: string[]
  owners: string[]
  country: string
  subdivision: string
  city: string
  category: string[]
  categories: string[]
  launched: string
  closed: string
  replaced_by: string
  website: string
  is_nsfw: boolean
  is_closed: boolean
  is_blocked: boolean
  languages: string[]
  language: string[]
  broadcast_area: string[]
  streams: number
  guides: number
  feeds: number
  logos: number
  format: string[]
  formats: string[]
  timezone: string[]
  timezones: string[]
  _languageNames: string[]
  _broadcastLocationCodes: string[]
  _broadcastLocationNames: string[]
  _countryName: string
  _guideSiteNames: string[]
  _streamTitles: string[]
  _streamUrls: string[]
  _feedNames: string[]
  _feedAltNames: string[]
  _streamIds: string[]
  _logoUrls: string[]
}

export type ChannelSerializedData = {
  id: string
  name: string
  altNames: string[]
  networkName?: string
  ownerNames: string[]
  countryCode: string
  country?: CountrySerializedData
  subdivisionCode?: string
  subdivision?: SubdivisionSerializedData
  cityName?: string
  categoryIds: string[]
  categories: CategorySerializedData[]
  isNSFW: boolean
  launchedDateString?: string
  launchedDate?: string
  closedDateString?: string
  closedDate?: string
  replacedByStreamId?: string
  replacedByChannelId?: string
  websiteUrl?: string
  blocklistRecords: BlocklistRecordSerializedData[]
  feeds: FeedSerializedData[]
  logos: LogoSerializedData[]
  hasUniqueName: boolean
}

export type ChannelData = {
  id: string
  name: string
  alt_names: string[]
  network: string
  owners: string[]
  country: string
  subdivision: string
  city: string
  categories: string[]
  is_nsfw: boolean
  launched: string
  closed: string
  replaced_by: string
  website: string
}
