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

  encode() {
    return {
      ...this.toObject(),
      name: this.name
    }
  }

  static decode(data): BroadcastAreaLocation {
    const location = new BroadcastAreaLocation(data)

    location.withName(data.name)

    return location
  }
}
