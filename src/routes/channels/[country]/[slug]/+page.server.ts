import type { Channel } from '$lib/models/channel'
import * as api from '$lib/api'

const data = await api.loadDataFromDisk()

export async function entries() {
  return data.channels.map((channel: Channel) => {
    const [slug, country] = channel.id.split('.')

    return {
      country,
      slug
    }
  })
}

export async function load({ params }) {
  const channelId = `${params.slug}.${params.country}`

  const channel = data.channels.find((channel: Channel) => channel.id === channelId)

  return {
    channel
  }
}
