import { ApiClient, DataLoader, DataProcessor } from '../../core'
import { DataStorage } from '../../core/dataStorage'
import cliProgress from 'cli-progress'
import numeral from 'numeral'

async function main() {
  const progressBar = new cliProgress.MultiBar({
    stopOnComplete: true,
    hideCursor: true,
    forceRedraw: true,
    barsize: 36,
    format(options, params, payload) {
      const filename = payload.filename.padEnd(18, ' ')
      const barsize = options.barsize || 40
      const percent = (params.progress * 100).toFixed(2)
      const speed = payload.speed ? numeral(payload.speed).format('0.0 b') + '/s' : 'N/A'
      const total = numeral(params.total).format('0.0 b')
      const completeSize = Math.round(params.progress * barsize)
      const incompleteSize = barsize - completeSize
      const bar =
        options.barCompleteString && options.barIncompleteString
          ? options.barCompleteString.substr(0, completeSize) +
            options.barGlue +
            options.barIncompleteString.substr(0, incompleteSize)
          : '-'.repeat(barsize)

      return `${filename} [${bar}] ${percent}% | ETA: ${params.eta}s | ${total} | ${speed}`
    }
  })
  const storage = new DataStorage()
  const processor = new DataProcessor()
  const client = new ApiClient()
  const dataLoader = new DataLoader({ storage, client, processor, progressBar })

  const requests = [
    dataLoader.download('channels.json'),
    dataLoader.download('feeds.json'),
    dataLoader.download('logos.json'),
    dataLoader.download('categories.json'),
    dataLoader.download('countries.json'),
    dataLoader.download('regions.json'),
    dataLoader.download('subdivisions.json'),
    dataLoader.download('timezones.json'),
    dataLoader.download('languages.json'),
    dataLoader.download('streams.json'),
    dataLoader.download('guides.json'),
    dataLoader.download('blocklist.json'),
    dataLoader.download('cities.json')
  ]

  await Promise.all(requests)
}

main()
