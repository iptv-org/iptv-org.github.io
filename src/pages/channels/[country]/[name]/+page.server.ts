import { Channel } from '~/models'
import { ApiClient, DataLoader, DataProcessor } from '~/core'
import { DataStorage } from '~/core/dataStorage'

export const csr = true
export const ssr = true

const processor = new DataProcessor()
const client = new ApiClient()
const storage = new DataStorage()
const dataLoader = new DataLoader({ processor, client, storage })
const data = await dataLoader.loadFromDisk()

export async function entries() {
  return data.channels
    .map((channel: Channel) => {
      const [name, country] = channel.id.split('.')

      return {
        country,
        name
      }
    })
    .all()
}

export async function load({ params }) {
  const channelId = `${params.name}.${params.country}`

  const channel: Channel = data.channels.find((channel: Channel) => channel.id === channelId)

  return {
    channel: channel ? channel.serialize() : null
  }
}
