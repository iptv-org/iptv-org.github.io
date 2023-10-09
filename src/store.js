import { writable, get } from 'svelte/store'
import { Playlist, Link } from 'iptv-playlist-generator'
import sj from '@freearhey/search-js'
import _ from 'lodash'

export const query = writable('')
export const hasQuery = writable(false)
export const channels = writable([])
export const countries = writable({})
export const filteredChannels = writable([])
export const selected = writable([])
export const downloadMode = writable(false)

let searchIndex = {}
export function search(q) {
  console.log('.')
  if (!q) {
    filteredChannels.set(get(channels))
    hasQuery.set(false)
    return
  }

  if (searchIndex.search) {
    let results = searchIndex.search(q)
    filteredChannels.set(results)
    hasQuery.set(true)
  }
}

export async function fetchChannels() {
  const api = await loadAPI()

  countries.set(api.countries)

  let _channels = api.channels.map(c => {
    c._streams = api.streams[c.id] || []
    c._guides = api.guides[c.id] || []
    c._country = api.countries[c.country]
    c._subdivision = api.subdivisions[c.subdivision]
    c._languages = c.languages.map(code => api.languages[code]).filter(i => i)
    c._categories = c.categories.map(id => api.categories[id]).filter(i => i)
    c._broadcast_area = c.broadcast_area.map(value => {
      const [type, code] = value.split('/')
      switch (type) {
        case 'c':
          return { type, ...api.countries[code] }
        case 'r':
          return { type, ...api.regions[code] }
        case 's':
          return { type, ...api.subdivisions[code] }
      }
    })
    c.is_closed = !!c.closed || !!c.replaced_by
    c.is_blocked = !!api.blocklist[c.id]
    c.streams = c._streams.length
    c.guides = c._guides.length

    return c
  })

  channels.set(_channels)
  filteredChannels.set(_channels)
  searchIndex = sj.createIndex(_channels, {
    searchable: [
      'id',
      'name',
      'alt_names',
      'network',
      'country',
      'subdivision',
      'city',
      'broadcast_area',
      'languages',
      'categories',
      'launched',
      'closed',
      'replaced_by',
      'streams',
      'guides',
      'is_nsfw',
      'is_closed',
      'is_blocked'
    ]
  })
}

export function setSearchParam(key, value) {
  if (window.history.pushState) {
    let query = key && value ? `?${key}=${value}` : ''
    query = query.replace(/\+/g, '%2B')
    const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}${query}`
    const state = {}
    state[key] = value
    window.history.pushState(state, '', url)
    setPageTitle(value)
  }
}

export function setPageTitle(value) {
  const title = value ? `${value} · iptv-org` : 'iptv-org'
  document.title = title
}

async function loadAPI() {
  const api = {}

  api.countries = await import('~/data/countries.json')
    .then(m => m.default)
    .then(data =>
      data.map(i => {
        i.expanded = false
        return i
      })
    )
    .then(data => _.keyBy(data, 'code'))
    .catch(console.error)

  api.regions = await import('~/data/regions.json')
    .then(m => m.default)
    .then(data => _.keyBy(data, 'code'))
    .catch(console.error)

  api.subdivisions = await import('~/data/subdivisions.json')
    .then(m => m.default)
    .then(data => _.keyBy(data, 'code'))
    .catch(console.error)

  api.languages = await import('~/data/languages.json')
    .then(m => m.default)
    .then(data => _.keyBy(data, 'code'))
    .catch(console.error)

  api.categories = await import('~/data/categories.json')
    .then(m => m.default)
    .then(data => _.keyBy(data, 'id'))
    .catch(console.error)

  api.streams = await import('~/data/streams.json')
    .then(m => m.default)
    .then(data => _.groupBy(data, 'channel'))
    .catch(console.error)

  api.blocklist = await import('~/data/blocklist.json')
    .then(m => m.default)
    .then(data => _.groupBy(data, 'channel'))
    .catch(console.error)

  api.guides = {}

  api.channels = await import('~/data/channels.json')
    .then(m => m.default)
    .catch(err => {
      console.error(err)
      return []
    })

  return api
}

function getStreams() {
  let streams = []
  get(selected).forEach(channel => {
    channel._streams.forEach(stream => {
      if (stream.status === 'error') return

      stream.channel = channel
      streams.push(stream)
    })
  })

  const levels = { online: 1, blocked: 2, timeout: 3, error: 4, default: 5 }
  streams = _.orderBy(
    streams,
    [
      s => s.channel.id.toLowerCase(),
      s => levels[s.status] || levels['default'],
      'height',
      'frame_rate',
      'url'
    ],
    ['asc', 'asc', 'desc', 'desc', 'asc']
  )
  streams = _.uniqBy(streams, stream => stream.channel.id || _.uniqueId())

  return streams
}

export function createPlaylist() {
  const playlist = new Playlist()

  let streams = getStreams()
  streams.forEach(stream => {
    const link = new Link(stream.url)
    link.title = stream.channel.name
    link.attrs = {
      'tvg-id': stream.channel.id,
      'tvg-logo': stream.channel.logo,
      'group-title': stream.channel._categories
        .map(c => c.name)
        .sort()
        .join(';')
    }

    if (stream.user_agent) {
      link.attrs['user-agent'] = stream.user_agent
      link.vlcOpts['http-user-agent'] = stream.user_agent
    }

    if (stream.http_referrer) {
      link.vlcOpts['http-referrer'] = stream.http_referrer
    }

    playlist.links.push(link)
  })

  return playlist
}
