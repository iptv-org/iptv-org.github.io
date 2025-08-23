import type { CityData, CitySerializedData } from '~/types/city'

export class City {
  code: string
  name: string
  countryCode: string
  subdivisionCode?: string
  wikidataId: string

  constructor(data?: CityData) {
    if (!data) return

    this.code = data.code
    this.name = data.name
    this.countryCode = data.country
    this.subdivisionCode = data.subdivision || undefined
    this.wikidataId = data.wikidata_id
  }

  serialize(): CitySerializedData {
    return {
      code: this.code,
      name: this.name,
      countryCode: this.countryCode,
      subdivisionCode: this.subdivisionCode || null,
      wikidataId: this.wikidataId
    }
  }

  deserialize(data: CitySerializedData): this {
    this.code = data.code
    this.name = data.name
    this.countryCode = data.countryCode
    this.subdivisionCode = data.subdivisionCode || undefined
    this.wikidataId = data.wikidataId

    return this
  }
}
