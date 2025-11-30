import { writable, type Writable, get, derived } from 'svelte/store'
import { Channel, Feed, Stream } from '$lib/models'
import { Collection } from '@freearhey/core'
import * as sdk from '@iptv-org/sdk'

const channels: Writable<Channel[]> = writable([])
export const feeds: Writable<Feed[]> = writable([])

export const searchResults: Writable<sdk.Types.ChannelSearchableData[]> = writable([])
export const isSearching = writable(false)
export const query = writable('')
export const downloadMode = writable(false)
export const selectedFeeds = writable(new Set<Feed>())
export const isSearchResultsReady = writable(false)

let searchIndex = undefined

export const searchResultsKeyByChannel = derived(searchResults, $searchResults => {
  return $searchResults.reduce((set, result) => {
    set.add(result.id)
    return set
  }, new Set())
})

export const selectedFeedsKeyByChannel = derived(selectedFeeds, $selectedFeeds => {
  return Array.from($selectedFeeds).reduce((set, feed) => {
    set.add(feed.channel)
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

export function selectFeeds(feeds: Feed[]) {
  selectedFeeds.update((set: Set<Feed>) => {
    feeds.forEach((feed: Feed) => {
      set.add(feed)
    })
    return set
  })
}

export function deselectFeeds(feeds: Feed[]) {
  selectedFeeds.update((set: Set<Feed>) => {
    feeds.forEach((feed: Feed) => {
      set.delete(feed)
    })
    return set
  })
}

export function deselectAllFeeds() {
  selectedFeeds.update((set: Set<Feed>) => {
    set.clear()
    return set
  })
}

export function getSelectedStreams() {
  const streams = new Collection<Stream>()
  Array.from(get(selectedFeeds)).forEach((feed: Feed) => {
    streams.concat(feed.getStreams())
  })

  return streams
}

function init(data) {
  channels.set(data.channels)
  feeds.set(data.feeds)

  const searchableData = data.channels.map((channel: Channel) => channel.getSearchable())
  searchIndex = sdk.SearchEngine.createIndex<sdk.Types.ChannelSearchableData>(searchableData)
  searchResults.set(searchableData)
}

export default {
  init
}
