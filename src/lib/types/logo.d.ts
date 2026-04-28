import * as sdk from '@iptv-org/sdk'
import type { FeedEncoded } from './feed'
import type { ChannelEncoded } from './channel'

export type LogoEncoded = sdk.Types.LogoData & {
  _feed?: FeedEncoded
  _channel?: ChannelEncoded
}
