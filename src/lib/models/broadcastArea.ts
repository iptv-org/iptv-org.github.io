import type { BroadcastAreaEncoded } from '$lib/types/broadcastArea'
import { BroadcastAreaLocation } from './broadcastAreaLocation'
import { Collection } from '@freearhey/core'
import * as sdk from '@iptv-org/sdk'

export class BroadcastArea extends sdk.Models.BroadcastArea {
  locations: BroadcastAreaLocation[] = []

  withLocations(locations: BroadcastAreaLocation[]): this {
    this.locations = locations

    return this
  }

  override getLocations(): Collection<BroadcastAreaLocation> {
    return new Collection(this.locations)
  }

  encode(): BroadcastAreaEncoded {
    return {
      ...this.toObject(),
      locations: this.locations.map(location => location.encode())
    }
  }

  static decode(data: BroadcastAreaEncoded): BroadcastArea {
    const broadcastArea = new BroadcastArea(data)

    if (Array.isArray(data.locations)) {
      const locations = data.locations.map(data => BroadcastAreaLocation.decode(data))
      broadcastArea.withLocations(locations)
    }

    return broadcastArea
  }
}
