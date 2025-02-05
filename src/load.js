import { Storage } from '@freearhey/core'
import { ApiClient } from './utils/apiClient.js'

async function main() {
  const client = new ApiClient({ storage: new Storage('src/data') })

  const requests = [
    client.download('blocklist.json'),
    client.download('categories.json'),
    client.download('channels.json'),
    client.download('streams.json'),
    client.download('guides.json'),
    client.download('countries.json'),
    client.download('languages.json'),
    client.download('regions.json'),
    client.download('subdivisions.json')
  ]

  await Promise.all(requests)
}

main()
