export type CitySerializedData = {
  code: string
  name: string
  countryCode: string
  subdivisionCode?: string
  wikidataId: string
}

export type CityData = {
  code: string
  name: string
  country: string
  subdivision: string | null
  wikidata_id: string
}
