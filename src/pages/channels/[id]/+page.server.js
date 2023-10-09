import { get } from 'svelte/store'
import { fetchChannels, channels } from '~/store'
import apiChannels from '~/data/channels.json'

export async function entries() {
  return apiChannels
}

export async function load({ params }) {
  const id = params.id

  await fetchChannels()

  const channel = get(channels).find(c => c.id === id)
  let streams = []
  if (channel) {
    streams = channel._streams
  }

  return {
    channel,
    streams
  }
}
