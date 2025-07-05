import type { ApiClient } from './apiClient'
import type { DataProcessor } from './dataProcessor'
import type { DataLoaderData, DataLoaderProps } from '../types/dataLoader'

export class DataLoader {
  client: ApiClient
  processor: DataProcessor
  storage: any
  progressBar: any

  constructor(props: DataLoaderProps) {
    this.client = props.client
    this.storage = props.storage
    this.progressBar = props.progressBar
    this.processor = props.processor
  }

  async load(): Promise<DataLoaderData> {
    const [
      countries,
      regions,
      logos,
      subdivisions,
      languages,
      categories,
      streams,
      blocklist,
      channels,
      feeds,
      timezones,
      guides
    ] = await Promise.all([
      this.fetch('countries.json'),
      this.fetch('regions.json'),
      this.fetch('logos.json'),
      this.fetch('subdivisions.json'),
      this.fetch('languages.json'),
      this.fetch('categories.json'),
      this.fetch('streams.json'),
      this.fetch('blocklist.json'),
      this.fetch('channels.json'),
      this.fetch('feeds.json'),
      this.fetch('timezones.json'),
      this.fetch('guides.json')
    ])

    return this.processor.process({
      countries,
      regions,
      logos,
      subdivisions,
      languages,
      categories,
      streams,
      blocklist,
      channels,
      feeds,
      timezones,
      guides
    })
  }

  async loadFromDisk(): Promise<DataLoaderData> {
    const [
      countries,
      regions,
      logos,
      subdivisions,
      languages,
      categories,
      streams,
      blocklist,
      channels,
      feeds,
      timezones,
      guides
    ] = await Promise.all([
      this.storage.load('countries.json'),
      this.storage.load('regions.json'),
      this.storage.load('logos.json'),
      this.storage.load('subdivisions.json'),
      this.storage.load('languages.json'),
      this.storage.load('categories.json'),
      this.storage.load('streams.json'),
      this.storage.load('blocklist.json'),
      this.storage.load('channels.json'),
      this.storage.load('feeds.json'),
      this.storage.load('timezones.json'),
      this.storage.load('guides.json')
    ])

    return this.processor.process({
      countries,
      regions,
      logos,
      subdivisions,
      languages,
      categories,
      streams,
      blocklist,
      channels,
      feeds,
      timezones,
      guides
    })
  }

  async fetch(filename: string): Promise<any[]> {
    return this.client.get(filename).then(response => response.data)
  }

  async download(filename: string) {
    if (!this.storage || !this.progressBar) return

    const stream = await this.storage.createStream(filename)
    const progressBar = this.progressBar.create(0, 0, { filename })

    this.client
      .get(filename, {
        responseType: 'stream',
        onDownloadProgress({ total, loaded, rate }) {
          if (total) progressBar.setTotal(total)
          progressBar.update(loaded, { speed: rate })
        }
      })
      .then(response => {
        response.data.pipe(stream)
      })
  }
}
