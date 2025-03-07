export class Channel {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.alt_names = this.alt_name = data.altNames
    this.network = data.network
    this.owners = this.owner = data.owners
    this.city = data.city
    this.country = [data.country?.code, data.country?.name].filter(Boolean)
    this.subdivision = data.subdivision?.code || null
    this.languages = this.language = [
      ...data.languages.map(language => language.code),
      ...data.languages.map(language => language.name)
    ]
    this.categories = this.category = data.categories.map(category => category.name)
    this.broadcast_area = [
      ...data.broadcastArea.map(area => `${area.type}/${area.code}`).filter(Boolean),
      ...data.broadcastArea.map(area => area.name).filter(Boolean),
      ...data.regionCountries.map(country => country.code).filter(Boolean),
      ...data.regionCountries.map(country => country.name).filter(Boolean)
    ]
    this.is_nsfw = data.isNSFW
    this.launched = data.launched
    this.closed = data.closed
    this.is_closed = !!data.closed || !!data.replacedBy
    this.replaced_by = data.replacedBy
    this.website = data.website
    this.logo = data.logo
    this.streams = Array.isArray(data.streams) ? data.streams.length : 0
    this.guides = Array.isArray(data.guides) ? data.guides.length : 0
    this.is_blocked = Array.isArray(data.blocklistRecords) && data.blocklistRecords.length > 0

    this._hasUniqueName = data._hasUniqueName
    this._displayName = data._hasUniqueName ? data.name : `${data.name} (${data.country?.name})`
    this._country = data.country
    this._subdivision = data.subdivision || null
    this._languages = data.languages
    this._categories = data.categories
    this._broadcastArea = data.broadcastArea
    this._streams = data.streams || []
    this._guides = data.guides || []
    this._blocklistRecords = data.blocklistRecords || []
  }

  toObject() {
    const { ...object } = this

    return object
  }
}
