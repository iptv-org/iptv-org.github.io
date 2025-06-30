import type { BroadcastAreaSerializedData } from './broadcastArea'
import type { LanguageSerializedData } from './language'
import type { StreamSerializedData } from './stream'
import type { GuideSerializedData } from './guide'
import type { ChannelSerializedData } from './channel'

export type FeedSerializedData = {
  channelId: string
  channel: ChannelSerializedData
  id: string
  name: string
  isMain: boolean
  broadcastAreaCodes: string[]
  broadcastArea: BroadcastAreaSerializedData[]
  timezoneIds: string[]
  languageCodes: string[]
  languages: LanguageSerializedData[]
  format: string
  streams: StreamSerializedData[]
  guides: GuideSerializedData[]
}

export type FeedData = {
  channel: string
  id: string
  name: string
  is_main: boolean
  broadcast_area: string[]
  timezones: string[]
  languages: string[]
  format?: string
}
