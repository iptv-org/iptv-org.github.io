import type { SubdivisionData, SubdivisionSerializedData } from '~/types/subdivision'

export class Subdivision {
  code: string
  name: string
  countryCode: string
  parentCode?: string

  constructor(data?: SubdivisionData) {
    if (!data) return

    this.code = data.code
    this.name = data.name
    this.countryCode = data.country
    this.parentCode = data.parent || undefined
  }

  serialize(): SubdivisionSerializedData {
    return {
      code: this.code,
      name: this.name,
      countryCode: this.countryCode,
      parentCode: this.parentCode || null
    }
  }

  deserialize(data: SubdivisionSerializedData): this {
    this.code = data.code
    this.name = data.name
    this.countryCode = data.countryCode
    this.parentCode = data.parentCode || undefined

    return this
  }
}
