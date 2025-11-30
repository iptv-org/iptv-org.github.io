import type { Logo, Channel, Stream, Guide, BroadcastArea } from '$lib/models'
import * as sdk from '@iptv-org/sdk'

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
  logos: Logo[]
  streams: Stream[]
  guides: Guide[]
  _languages: sdk.Models.Language[]
  broadcastArea: BroadcastArea
  _timezones: sdk.Models.Timezone[]
  _channel?: Channel
}
