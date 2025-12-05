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

  encode() {
    return {
      ...this.toObject(),
      locations: this.locations
    }
  }

  static decode(data): BroadcastArea {
    const broadcastArea = new BroadcastArea(data)

    broadcastArea.withLocations(data.locations)

    return broadcastArea
  }
}
