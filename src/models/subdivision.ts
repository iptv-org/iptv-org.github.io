import type { SubdivisionData, SubdivisionSerializedData } from '~/types/subdivision'

export class Subdivision {
  code: string
  name: string
  countryCode: string

  constructor(data?: SubdivisionData) {
    if (!data) return

    this.code = data.code
    this.name = data.name
    this.countryCode = data.country
  }

  serialize(): SubdivisionSerializedData {
    return {
      code: this.code,
      name: this.name,
      countryCode: this.countryCode
    }
  }

  deserialize(data: SubdivisionSerializedData): this {
    this.code = data.code
    this.name = data.name
    this.countryCode = data.countryCode

    return this
  }
}
