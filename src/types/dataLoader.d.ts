import type { ApiClient } from '../core/apiClient'
import type { DataProcessor } from '../core/dataProcessor'

export type DataLoaderProps = {
  client: ApiClient
  processor: DataProcessor
  storage?: any
  progressBar?: any
}

export type DataLoaderData = {
  channels: Record<string, any>[]
  countries: Record<string, any>[]
  regions: Record<string, any>[]
  logos: Record<string, any>[]
  languages: Record<string, any>[]
  subdivisions: Record<string, any>[]
  categories: Record<string, any>[]
  streams: Record<string, any>[]
  guides: Record<string, any>[]
  feeds: Record<string, any>[]
  timezones: Record<string, any>[]
  blocklist: Record<string, any>[]
  cities: Record<string, any>[]
}
