import { writable, type Writable, get, derived } from 'svelte/store'
import { Channel, Stream } from '$lib/models'
import * as sdk from '@iptv-org/sdk'

const channels: Writable<Channel[]> = writable([])
export const streams: Writable<Stream[]> = writable([])

export const searchResults: Writable<sdk.Types.ChannelSearchableData[]> = writable([])
export const isSearching = writable(false)
export const query = writable('')
export const downloadMode = writable(false)
export const selectedStreams = writable(new Set<Stream>())
export const isSearchResultsReady = writable(false)

let searchIndex = undefined

export const searchResultsKeyByChannel = derived(searchResults, $searchResults => {
  return $searchResults.reduce((set, result) => {
    set.add(result.id)
    return set
  }, new Set())
})

export const selectedStreamsKeyByChannel = derived(selectedStreams, $selectedStreams => {
  return Array.from($selectedStreams).reduce((set, stream) => {
    set.add(stream.channel)
    return set
  }, new Set())
})

export function updateSearchResults() {
  isSearching.set(true)
  setTimeout(() => {
    if (get(query)) {
      if (searchIndex) {
        const results = searchIndex.search(get(query))
        searchResults.set(results)
        isSearchResultsReady.set(true)
      } else {
        isSearchResultsReady.set(false)
        searchResults.set([])
      }
    } else {
      isSearchResultsReady.set(false)
      const searchableData = get(channels).map((channel: Channel) => channel.getSearchable())
      searchResults.set(searchableData)
    }
    isSearching.set(false)
  }, 0)
}

export function selectStreams(streams: Stream[]) {
  selectedStreams.update((set: Set<Stream>) => {
    streams.forEach((stream: Stream) => {
      set.add(stream)
    })
    return set
  })
}

export function deselectStreams(streams: Stream[]) {
  selectedStreams.update((set: Set<Stream>) => {
    streams.forEach((stream: Stream) => {
      set.delete(stream)
    })
    return set
  })
}

export function deselectAllStreams() {
  selectedStreams.update((set: Set<Stream>) => {
    set.clear()
    return set
  })
}

function init(data) {
  channels.set(data.channels)
  streams.set(data.streams)

  const searchableData = data.channels.map((channel: Channel) => channel.getSearchable())
  searchIndex = sdk.SearchEngine.createIndex<sdk.Types.ChannelSearchableData>(searchableData)
  searchResults.set(searchableData)
}

export default {
  init
}
