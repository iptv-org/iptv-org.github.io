import sjs from '@freearhey/search-js'
import { Collection } from '@freearhey/core/browser'

export class SearchEngine {
  searchIndex: any

  constructor() {}

  createIndex(searchable: Collection) {
    this.searchIndex = sjs.createIndex(searchable.all())
  }

  search(query: string): Collection {
    if (!this.searchIndex || !query) return new Collection()

    const results = this.searchIndex.search(query)

    return new Collection(results)
  }
}
