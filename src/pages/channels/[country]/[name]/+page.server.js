import { error } from '@sveltejs/kit'
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

const data = {}
data.countries = _.keyBy(countries, 'code')
data.regions = _.keyBy(regions, 'code')
data.subdivisions = _.keyBy(subdivisions, 'code')
data.languages = _.keyBy(languages, 'code')
data.categories = _.keyBy(categories, 'id')
data.streams = _.groupBy(streams, 'channel')
data.blocklist = _.groupBy(blocklist, 'channel')
data.channels = _.keyBy(channels, channel => channel.id.toLowerCase())

export async function entries() {
  return channels.map(channel => {
    const [name, country] = channel.id.split('.')

    return {
      country,
      name
    }
  })
}

export function load({ params }) {
  const country = params.country
  const name = params.name
  const id = `${name}.${country}`.toLowerCase()

  let channel = data.channels[id]
  if (!channel) {
    throw error(404, 'Not Found')
  }

  return {
    channel: transformChannel(channel, data)
  }
}
