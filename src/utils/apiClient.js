import axios from 'axios'
import cliProgress from 'cli-progress'
import numeral from 'numeral'

export class ApiClient {
  constructor({ storage }) {
    this.storage = storage
    this.client = axios.create({
      responseType: 'stream'
    })
    this.progressBar = new cliProgress.MultiBar({
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
  }

  async download(filename) {
    const stream = await this.storage.createStream(filename)

    const bar = this.progressBar.create(0, 0, { filename })

    this.client
      .get(`https://iptv-org.github.io/api/${filename}`, {
        onDownloadProgress({ total, loaded, rate }) {
          if (total) bar.setTotal(total)
          bar.update(loaded, { speed: rate })
        }
      })
      .then(response => {
        response.data.pipe(stream)
      })
  }
}
