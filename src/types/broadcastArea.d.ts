import type { SubdivisionSerializedData } from './subdivision'
import type { CountrySerializedData } from './country'
import type { RegionSerializedData } from './region'

export type BroadcastAreaSerializedData = {
  code: string
  name: string
  countries: CountrySerializedData[]
  subdivisions: SubdivisionSerializedData[]
  regions: RegionSerializedData[]
}

export type BroadcastAreaData = {
  code: string
}
