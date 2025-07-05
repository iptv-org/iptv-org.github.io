import type { ApiClient } from '../core/apiClient'
import type { DataProcessor } from '../core/dataProcessor'
import type { Collection } from '@freearhey/core/browser'

export type DataLoaderProps = {
  client: ApiClient
  processor: DataProcessor
  storage?: any
  progressBar?: any
}

export type DataLoaderData = {
  channels: Collection
  countries: Collection
  regions: Collection
  logos: Collection
  languages: Collection
  subdivisions: Collection
  categories: Collection
  streams: Collection
  guides: Collection
  blocklistRecords: Collection
}
