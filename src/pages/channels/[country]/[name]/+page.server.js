import { transformChannel } from '~/store'
import _ from 'lodash'
import channels from '~/data/channels.json'
import countries from '~/data/countries.json'
import regions from '~/data/regions.json'
import subdivisions from '~/data/subdivisions.json'
import categories from '~/data/categories.json'
import blocklist from '~/data/blocklist.json'
import languages from '~/data/languages.json'
import streams from '~/data/streams.json'

export async function entries() {
  return channels.map(channel => {
    const [name, country] = channel.id.split('.')

    return {
      country,
      name
    }
  })
}

export async function load({ params }) {
  const data = await loadData()

  const country = params.country
  const name = params.name
  const id = `${name}.${country}`.toLowerCase()

  const _channels = data.channels

  let streams = []
  let channel = _channels.find(channel => channel.id.toLowerCase() === id)
  if (channel) {
    channel = transformChannel(channel, data)
    streams = channel._streams
  }

  return {
    channel,
    streams
  }
}

async function loadData() {
  const data = {}

  data.countries = _.keyBy(
    countries.map(country => {
      country.expanded = false

      return country
    }),
    'code'
  )

  data.regions = _.keyBy(regions, 'code')
  data.subdivisions = _.keyBy(subdivisions, 'code')
  data.languages = _.keyBy(languages, 'code')
  data.categories = _.keyBy(categories, 'id')
  data.streams = _.keyBy(streams, 'channel')
  data.blocklist = _.keyBy(blocklist, 'channel')
  data.channels = channels

  return data
}
