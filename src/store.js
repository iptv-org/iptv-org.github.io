import { writable, get } from 'svelte/store'
import { Playlist, Link } from 'iptv-playlist-generator'
import sj from '@freearhey/search-js'
import _ from 'lodash'
import { browser } from '$app/environment'
import { Channel } from './models'
import { pushState } from '$app/navigation'

export const query = writable('')
export const hasQuery = writable(false)
export const channels = writable([])
export const countries = writable({})
export const filteredChannels = writable([])
export const selected = writable([])
export const downloadMode = writable(false)

let searchIndex = {}
export function search(q) {
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

  let _channels = api.channels.map(c => createChannel(c, api))

  channels.set(_channels)
  filteredChannels.set(_channels)
  searchIndex = sj.createIndex(_channels, {
    searchable: [
      'id',
      'name',
      'alt_names',
      'alt_name',
      'network',
      'owner',
      'owners',
      'country',
      'subdivision',
      'city',
      'broadcast_area',
      'language',
      'languages',
      'category',
      'categories',
      'launched',
      'closed',
      'replaced_by',
      'website',
      'streams',
      'guides',
      'is_nsfw',
      'is_closed',
      'is_blocked',
      '_guideNames',
      '_streamUrls'
    ]
  })
}

export function setSearchParam(key, value) {
  let query = key && value ? `?${key}=${value}` : ''
  query = query.replace(/\+/g, '%2B')
  const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}${query}`
  const state = {}
  state[key] = value
  pushState(url, state)
  setPageTitle(value)
}

export function setPageTitle(value) {
  if (browser) {
    const title = value ? `${value} · iptv-org` : 'iptv-org'
    window.document.title = title
  }
}

export function createChannel(data, api) {
  let broadcastArea = []
  let regionCountries = []

  data.broadcast_area.forEach(areaCode => {
    const [type, code] = areaCode.split('/')
    switch (type) {
      case 'c':
        const country = api.countries[code]
        if (country) broadcastArea.push({ type, code: country.code, name: country.name })
        break
      case 'r':
        const region = api.regions[code]
        if (region) {
          broadcastArea.push({ type, code: region.code, name: region.name })
          regionCountries = [
            ...regionCountries,
            ...region.countries.map(code => api.countries[code]).filter(Boolean)
          ]
        }
        break
      case 's':
        const subdivision = api.subdivisions[code]
        if (subdivision)
          broadcastArea.push({ type, code: subdivision.code, name: subdivision.name })
        break
    }
  })

  return new Channel({
    id: data.id,
    name: data.name,
    altNames: data.alt_names,
    network: data.network,
    owners: data.owners,
    city: data.city,
    country: api.countries[data.country],
    subdivision: api.subdivisions[data.subdivision],
    languages: data.languages.map(code => api.languages[code]).filter(Boolean),
    categories: data.categories.map(id => api.categories[id]).filter(Boolean),
    isNSFW: data.is_nsfw,
    launched: data.launched,
    closed: data.closed,
    replacedBy: data.replaced_by,
    website: data.website,
    logo: data.logo,
    streams: api.streams[data.id],
    guides: api.guides[data.id],
    blocklistRecords: api.blocklist[data.id],
    hasUniqueName: api.nameIndex[data.name.toLowerCase()].length === 1,
    broadcastArea,
    regionCountries
  })
}

async function loadAPI() {
  const api = {}

  const [
    countries,
    regions,
    subdivisions,
    languages,
    categories,
    streams,
    blocklist,
    channels,
    guides
  ] = await Promise.all([
    fetch('https://iptv-org.github.io/api/countries.json')
      .then(r => r.json())
      .then(data => (data.length ? data : []))
      .then(data =>
        data.map(i => {
          i.expanded = false
          return i
        })
      )
      .then(data => _.keyBy(data, 'code')),
    fetch('https://iptv-org.github.io/api/regions.json')
      .then(r => r.json())
      .then(data => (data.length ? data : []))
      .then(data => _.keyBy(data, 'code')),
    fetch('https://iptv-org.github.io/api/subdivisions.json')
      .then(r => r.json())
      .then(data => (data.length ? data : []))
      .then(data => _.keyBy(data, 'code')),
    fetch('https://iptv-org.github.io/api/languages.json')
      .then(r => r.json())
      .then(data => (data.length ? data : []))
      .then(data => _.keyBy(data, 'code')),
    fetch('https://iptv-org.github.io/api/categories.json')
      .then(r => r.json())
      .then(data => (data.length ? data : []))
      .then(data => _.keyBy(data, 'id')),
    fetch('https://iptv-org.github.io/api/streams.json')
      .then(r => r.json())
      .then(data => (data.length ? data : []))
      .then(data => _.groupBy(data, 'channel')),
    fetch('https://iptv-org.github.io/api/blocklist.json')
      .then(r => r.json())
      .then(data => (data.length ? data : []))
      .then(data => _.groupBy(data, 'channel')),
    fetch('https://iptv-org.github.io/api/channels.json')
      .then(r => r.json())
      .then(data => (data.length ? data : [])),
    fetch('https://iptv-org.github.io/api/guides.json')
      .then(r => r.json())
      .then(data => (data.length ? data : []))
      .then(data => data.filter(guide => guide.channel))
      .then(data => _.sortBy(data, 'lang'))
      .then(data => _.groupBy(data, 'channel'))
  ])

  api.countries = countries
  api.regions = regions
  api.subdivisions = subdivisions
  api.languages = languages
  api.categories = categories
  api.streams = streams
  api.blocklist = blocklist
  api.channels = channels
  api.guides = guides

  api.nameIndex = _.groupBy(api.channels, channel => channel.name.toLowerCase())

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
