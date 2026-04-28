import * as sdk from '@iptv-org/sdk'
import type { BroadcastAreaLocationEncoded } from './broadcastAreaLocation'

export type BroadcastAreaEncoded = sdk.Types.BroadcastAreaData & {
  locations: BroadcastAreaLocationEncoded[]
}
