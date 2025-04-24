import type { RegionData, RegionSerializedData } from '~/types/region'
import { Collection } from '@freearhey/core/browser'

export class Region {
  code: string
  name: string
  countryCodes: Collection

  constructor(data?: RegionData) {
    if (!data) return

    this.code = data.code
    this.name = data.name
    this.countryCodes = new Collection(data.countries)
  }

  serialize(): RegionSerializedData {
    return {
      code: this.code,
      name: this.name,
      countryCodes: this.countryCodes.all()
    }
  }

  deserialize(data: RegionSerializedData): this {
    this.code = data.code
    this.name = data.name
    this.countryCodes = new Collection(data.countryCodes)

    return this
  }
}
