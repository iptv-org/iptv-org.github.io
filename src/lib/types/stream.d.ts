import * as sdk from '@iptv-org/sdk'
import type { FeedEncoded } from './feed'
import type { ChannelEncoded } from './channel'

export type StreamEncoded = sdk.Types.StreamData & {
  _feed?: FeedEncoded
  _channel?: ChannelEncoded
}
