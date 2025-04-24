import * as path from 'path'
import fs from 'fs-extra'

export class DataStorage {
  _rootDir: string

  constructor(rootDir?: string) {
    this._rootDir = 'temp/data'
  }

  async load(filename: string) {
    const { default: data } = await import(`../../temp/data/${filename.replace('.json', '')}.json`)

    return data
  }

  async createDir(dir: string): Promise<void> {
    const absFilepath = path.isAbsolute(dir) ? path.resolve(dir) : path.join(this._rootDir, dir)
    if (await fs.exists(absFilepath)) return

    await fs.mkdir(absFilepath, { recursive: true }).catch(console.error)
  }

  async createStream(filepath: string): Promise<NodeJS.WriteStream> {
    const absFilepath = path.isAbsolute(filepath)
      ? path.resolve(filepath)
      : path.join(this._rootDir, filepath)
    const dir = path.dirname(filepath)

    await this.createDir(dir)

    return fs.createWriteStream(absFilepath) as unknown as NodeJS.WriteStream
  }
}
