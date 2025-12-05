import * as sdk from '@iptv-org/sdk'

export class Guide extends sdk.Models.Guide {
  uuid: string

  constructor(data: sdk.Types.GuideData) {
    super(data)

    this.uuid = crypto.randomUUID()
  }

  getUrl() {
    return `https://${this.site}`
  }
}
