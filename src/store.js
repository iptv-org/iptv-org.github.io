import { writable, get } from 'svelte/store'
import { Playlist, Link } from 'iptv-playlist-generator'
import sj from '@freearhey/search-js'
import _ from 'lodash'
import { browser } from '$app/environment'

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

  let _channels = api.channels.map(c => transformChannel(c, api))

  channels.set(_channels)
  filteredChannels.set(_channels)
  searchIndex = sj.createIndex(_channels, {
    searchable: [
      'id',
      'name',
      'alt_names',
      'network',
      'owners',
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
  if (browser) {
    const title = value ? `${value} · iptv-org` : 'iptv-org'
    window.document.title = title
  }
}

async function loadAPI() {
  const api = {}

  api.countries = await fetch('https://iptv-org.github.io/api/countries.json')
    .then(r => r.json())
    .then(data => (data.length ? data : []))
    .then(data =>
      data.map(i => {
        i.expanded = false
        return i
      })
    )
    .then(data => _.keyBy(data, 'code'))
    .catch(console.error)

  api.regions = await fetch('https://iptv-org.github.io/api/regions.json')
    .then(r => r.json())
    .then(data => (data.length ? data : []))
    .then(data => _.keyBy(data, 'code'))
    .catch(console.error)

  api.subdivisions = await fetch('https://iptv-org.github.io/api/subdivisions.json')
    .then(r => r.json())
    .then(data => (data.length ? data : []))
    .then(data => _.keyBy(data, 'code'))
    .catch(console.error)

  api.languages = await fetch('https://iptv-org.github.io/api/languages.json')
    .then(r => r.json())
    .then(data => (data.length ? data : []))
    .then(data => _.keyBy(data, 'code'))
    .catch(console.error)

  api.categories = await fetch('https://iptv-org.github.io/api/categories.json')
    .then(r => r.json())
    .then(data => (data.length ? data : []))
    .then(data => _.keyBy(data, 'id'))
    .catch(console.error)

  api.streams = await fetch('https://iptv-org.github.io/api/streams.json')
    .then(r => r.json())
    .then(data => (data.length ? data : []))
    .then(data => _.groupBy(data, 'channel'))
    .catch(console.error)

  api.blocklist = await fetch('https://iptv-org.github.io/api/blocklist.json')
    .then(r => r.json())
    .then(data => (data.length ? data : []))
    .then(data => _.groupBy(data, 'channel'))
    .catch(console.error)

  api.channels = await fetch('https://iptv-org.github.io/api/channels.json')
    .then(r => r.json())
    .then(data => (data.length ? data : []))
    .catch(err => {
      console.error(err)
      return []
    })

  api.guides = await fetch('https://iptv-org.github.io/api/guides.json')
    .then(r => r.json())
    .then(data => (data.length ? data : []))
    .then(data => _.sortBy(data, 'lang'))
    .then(data => _.groupBy(data, 'channel'))
    .catch(err => {
      console.error(err)
      return []
    })

  api.nameIndex = _.groupBy(api.channels, channel => channel.name.toLowerCase())

  return api
}

export function transformChannel(channel, data) {
  channel._streams = data.streams[channel.id] || []
  channel._guides = data.guides[channel.id] || []
  channel._country = data.countries[channel.country]
  channel._subdivision = data.subdivisions[channel.subdivision]
  channel._languages = channel.languages.map(code => data.languages[code]).filter(i => i)
  channel._categories = channel.categories.map(id => data.categories[id]).filter(i => i)
  channel._broadcast_area = channel.broadcast_area.map(value => {
    const [type, code] = value.split('/')
    switch (type) {
      case 'c':
        return { type, ...data.countries[code] }
      case 'r':
        return { type, ...data.regions[code] }
      case 's':
        return { type, ...data.subdivisions[code] }
    }
  })
  channel.is_closed = !!channel.closed || !!channel.replaced_by
  channel.is_blocked = !!data.blocklist[channel.id]
  channel.streams = channel._streams.length
  channel.guides = channel._guides.length

  const isChannelNameRepeated = data.nameIndex[channel.name.toLowerCase()].length > 1
  channel.displayName = isChannelNameRepeated
    ? `${channel.name} (${channel._country.name})`
    : channel.name

  return channel
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
        .map(channel => channel.name)
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
