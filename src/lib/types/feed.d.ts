import * as sdk from '@iptv-org/sdk'
import type { ChannelEncoded } from './channel'
import type { LogoEncoded } from './logo'
import type { StreamEncoded } from './stream'
import type { BroadcastAreaEncoded } from './broadcastArea'

export type FeedEncoded = {
  channel: string
  id: string
  name: string
  alt_names: string[]
  is_main: boolean
  broadcast_area: string[]
  languages: string[]
  timezones: string[]
  format: string
  logos: LogoEncoded[]
  streams: StreamEncoded[]
  guides: sdk.Types.GuideData[]
  _languages: sdk.Types.LanguageData[]
  broadcastArea?: BroadcastAreaEncoded
  _timezones: sdk.Types.TimezoneData[]
  _channel?: ChannelEncoded
}
