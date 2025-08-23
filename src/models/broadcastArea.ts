import type { BroadcastAreaData, BroadcastAreaSerializedData } from '~/types/broadcastArea'
import { type Dictionary, Collection } from '@freearhey/core/browser'
import type { SubdivisionSerializedData } from '~/types/subdivision'
import type { CountrySerializedData } from '~/types/country'
import type { RegionSerializedData } from '~/types/region'
import { Region, Country, Subdivision, City } from './'
import type { CitySerializedData } from '~/types/city'

export class BroadcastArea {
  code: string
  name?: string
  countries?: Collection
  subdivisions?: Collection
  regions?: Collection
  cities?: Collection

  constructor(data?: BroadcastAreaData) {
    if (!data) return

    this.code = data.code
  }

  withName(
    countriesKeyByCode: Dictionary,
    subdivisionsKeyByCode: Dictionary,
    regionsKeyByCode: Dictionary,
    citiesKeyByCode: Dictionary
  ): this {
    const [type, code] = this.code.split('/')

    switch (type) {
      case 's': {
        const subdivision: Subdivision = subdivisionsKeyByCode.get(code)
        if (subdivision) this.name = subdivision.name
        break
      }
      case 'c': {
        const country: Country = countriesKeyByCode.get(code)
        if (country) this.name = country.name
        break
      }
      case 'r': {
        const region: Region = regionsKeyByCode.get(code)
        if (region) this.name = region.name
        break
      }
      case 'ct': {
        const city: City = citiesKeyByCode.get(code)
        if (city) this.name = city.name
        break
      }
    }

    return this
  }

  withLocations(
    countriesKeyByCode: Dictionary,
    subdivisionsKeyByCode: Dictionary,
    regionsKeyByCode: Dictionary,
    regions: Collection,
    citiesKeyByCode: Dictionary
  ): this {
    const [type, code] = this.code.split('/')

    let _countries = new Collection()
    let _regions = new Collection()
    let _subdivisions = new Collection()
    let _cities = new Collection()

    regions = regions.filter((region: Region) => region.code !== 'INT')

    switch (type) {
      case 's': {
        const subdivision: Subdivision = subdivisionsKeyByCode.get(code)
        if (!subdivision) break
        _subdivisions.add(subdivision)
        const country: Country = countriesKeyByCode.get(subdivision.countryCode)
        if (!country) break
        _countries.add(country)
        const countryRegions = regions.filter((region: Region) =>
          region.countryCodes.includes(country.code)
        )
        countryRegions.forEach((region: Region) => {
          _regions.add(region)
        })
        break
      }
      case 'c': {
        const country = countriesKeyByCode.get(code)
        if (!country) break
        _countries.add(country)
        const countryRegions = regions.filter((region: Region) =>
          region.countryCodes.includes(country.code)
        )
        countryRegions.forEach((region: Region) => {
          _regions.add(region)
        })
        break
      }
      case 'r': {
        const region: Region = regionsKeyByCode.get(code)
        if (!region) break
        _regions.add(region)
        break
      }
      case 'ct': {
        const city: City = citiesKeyByCode.get(code)
        if (!city) break
        _cities.add(city)
        break
      }
    }

    this.countries = _countries.uniqBy((country: Country) => country.code)
    this.regions = _regions.uniqBy((region: Region) => region.code)
    this.subdivisions = _subdivisions.uniqBy((subdivision: Subdivision) => subdivision.code)
    this.cities = _cities.uniqBy((city: City) => city.code)

    return this
  }

  getName(): string {
    return this.name || ''
  }

  getCountries(): Collection {
    if (!this.countries) return new Collection()

    return this.countries
  }

  getRegions(): Collection {
    if (!this.regions) return new Collection()

    return this.regions
  }

  getSubdivisions(): Collection {
    if (!this.subdivisions) return new Collection()

    return this.subdivisions
  }

  getCities(): Collection {
    if (!this.cities) return new Collection()

    return this.cities
  }

  getLocationCodes(): Collection {
    let locationCodes = new Collection()

    this.getCountries().forEach((country: Country) => {
      locationCodes.add(country.code)
    })

    this.getRegions().forEach((region: Region) => {
      locationCodes.add(region.code)
    })

    this.getSubdivisions().forEach((subdivision: Subdivision) => {
      locationCodes.add(subdivision.code)
    })

    this.getCities().forEach((city: City) => {
      locationCodes.add(city.code)
    })

    return locationCodes
  }

  getLocationNames(): Collection {
    let locationNames = new Collection()

    this.getCountries().forEach((country: Country) => {
      locationNames.add(country.name)
    })

    this.getRegions().forEach((region: Region) => {
      locationNames.add(region.name)
    })

    this.getSubdivisions().forEach((subdivision: Subdivision) => {
      locationNames.add(subdivision.name)
    })

    this.getCities().forEach((city: City) => {
      locationNames.add(city.name)
    })

    return locationNames
  }

  serialize(): BroadcastAreaSerializedData {
    return {
      code: this.code,
      name: this.getName(),
      countries: this.getCountries()
        .map((country: Country) => country.serialize())
        .all(),
      subdivisions: this.getSubdivisions()
        .map((subdivision: Subdivision) => subdivision.serialize())
        .all(),
      regions: this.getRegions()
        .map((region: Region) => region.serialize())
        .all(),
      cities: this.getCities()
        .map((city: City) => city.serialize())
        .all()
    }
  }

  deserialize(data: BroadcastAreaSerializedData): this {
    this.code = data.code
    this.name = data.name
    this.countries = new Collection(data.countries).map((data: CountrySerializedData) =>
      new Country().deserialize(data)
    )
    this.subdivisions = new Collection(data.subdivisions).map((data: SubdivisionSerializedData) =>
      new Subdivision().deserialize(data)
    )
    this.regions = new Collection(data.regions).map((data: RegionSerializedData) =>
      new Region().deserialize(data)
    )
    this.cities = new Collection(data.cities).map((data: CitySerializedData) =>
      new City().deserialize(data)
    )

    return this
  }
}
