import { describe, beforeAll, test, expect } from 'vitest'
import type { CountryEncoded } from '$lib/types/country'
import { Channel, Country } from '$lib/models'
import { loadDataFromDisk } from '$lib/api'

let country: Country

describe('Country', () => {
  beforeAll(async () => {
    const data = await loadDataFromDisk({ dataDir: './tests/__data__/input/data' })

    country = data.countries[0]
  })

  test('code', () => {
    expect(country.code).toBe('AF')
  })

  test('getChannels()', () => {
    expect(country.getChannels().count()).toBe(1)
    expect(country.getChannels().first()).instanceOf(Channel)
  })

  test('getChannelsWithStreams()', () => {
    expect(country.getChannelsWithStreams().count()).toBe(1)
    expect(country.getChannelsWithStreams().first()).instanceOf(Channel)
  })

  test('encode()', () => {
    const countryEncoded = country.encode()

    expect(countryEncoded.channels[0]).instanceof(Channel)
  })

  test('decode()', () => {
    const countryEncoded: CountryEncoded = {
      code: 'AF',
      name: 'Afghanistan',
      languages: ['pus', 'prd', 'tuk'],
      flag: '🇦🇫',
      channels: [
        new Channel({
          id: 'TVN.pl',
          name: 'TVN',
          alt_names: [],
          network: null,
          owners: [],
          country: 'AF',
          categories: [],
          is_nsfw: false,
          launched: null,
          closed: null,
          replaced_by: null,
          website: null
        })
      ]
    }

    expect(Country.decode(countryEncoded)).instanceOf(Country)
  })
})
