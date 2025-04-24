import { writable, get, type Writable } from 'svelte/store'
import { Collection } from '@freearhey/core/browser'
import { DataLoader, SearchEngine } from './core'
import { Channel } from '~/models'

export const query = writable('')
export const hasQuery = writable(false)
export const countries: Writable<Collection> = writable(new Collection())
export const channels: Writable<Collection> = writable(new Collection())
export const searchResults: Writable<Collection> = writable(new Collection())
export const selected: Writable<Collection> = writable(new Collection())
export const downloadMode = writable(false)
export const isSearching = writable(false)
export const isLoading = writable(true)
export const isReady = writable(false)

const searchEngine = new SearchEngine()

export function search(query: string) {
  isSearching.set(true)
  hasQuery.set(!!query)
  if (!query) {
    searchResults.set(get(channels))
    isSearching.set(false)
    return
  }

  let results = searchEngine.search(query)
  searchResults.set(results)
  isSearching.set(false)
}

export async function loadData({ client, processor }) {
  const dataLoader = new DataLoader({ client, processor })
  const data = await dataLoader.load()

  countries.set(data.countries)
  channels.set(data.channels)
  searchResults.set(data.channels)

  const searchableData = data.channels.map((channel: Channel) => channel.getSearchable())
  searchEngine.createIndex(searchableData)
}
