import type { ChannelSerializedData } from './channel'
import type { FeedSerializedData } from './feed'

export type LogoSerializedData = {
  channelId: string
  channel: ChannelSerializedData
  feedId?: string
  feed: FeedSerializedData
  tags: string[]
  width: number
  height: number
  format?: string
  url: string
}

export type LogoData = {
  channel: string
  feed: string | null
  tags: string[]
  width: number
  height: number
  format: string | null
  url: string
}
