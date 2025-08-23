import type { SubdivisionSerializedData } from './subdivision'
import type { CountrySerializedData } from './country'
import type { RegionSerializedData } from './region'
import type { CitySerializedData } from './city'

export type BroadcastAreaSerializedData = {
  code: string
  name: string
  countries: CountrySerializedData[]
  subdivisions: SubdivisionSerializedData[]
  regions: RegionSerializedData[]
  cities: CitySerializedData[]
}

export type BroadcastAreaData = {
  code: string
}
