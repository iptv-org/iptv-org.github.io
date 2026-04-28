import type { BroadcastAreaLocationEncoded } from '$lib/types/broadcastAreaLocation'
import * as sdk from '@iptv-org/sdk'

export class BroadcastAreaLocation extends sdk.Models.BroadcastAreaLocation {
  name: string = ''

  withName(name: string): this {
    this.name = name

    return this
  }

  override getName(): string | undefined {
    return this.name
  }

  encode(): BroadcastAreaLocationEncoded {
    return {
      ...this.toObject(),
      name: this.name
    }
  }

  static decode(data: BroadcastAreaLocationEncoded): BroadcastAreaLocation {
    const location = new BroadcastAreaLocation(data)

    location.withName(data.name)

    return location
  }
}
