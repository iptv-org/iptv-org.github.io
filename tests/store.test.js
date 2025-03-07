import { search, fetchChannels, filteredChannels } from '../src/store'
import { get } from 'svelte/store'
import fs from 'fs'
import path from 'path'
import { jest } from '@jest/globals'

const API_ENDPOINT = 'https://iptv-org.github.io/api'

beforeEach(async () => {
  global.fetch = mockFetch()
  await fetchChannels()
})

describe('search', () => {
  it('return all channels by default', () => {
    const results = get(filteredChannels)
    expect(results.length).toBe(15)
  })

  it('returns empty list if there is no such channel', () => {
    search('lorem')

    const results = get(filteredChannels)
    expect(results.length).toBe(0)
  })

  it('can find channel by name', () => {
    search('name:002')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels by multiple words', () => {
    search('Xtrema Cartoons')

    const results = get(filteredChannels)
    expect(results.length).toBe(2)
    expect(results[0]).toMatchObject({
      id: 'XtremaCartoons.ar'
    })
    expect(results[1]).toMatchObject({
      id: 'XtremaRetroCartoons.ar'
    })
  })

  it('can search for one of two words', () => {
    search('Johannesburg,002')

    const results = get(filteredChannels)
    expect(results.length).toBe(2)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
    expect(results[1]).toMatchObject({
      id: 'FashionTVJohannesburg.fr'
    })
  })

  it('can search for exact word matches', () => {
    search('"Xtrema Cartoons"')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'XtremaCartoons.ar'
    })
  })

  it('can find channels by id', () => {
    search('id:002RadioTV.do')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels by alternative names', () => {
    search('alt_names:التلفزيون')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'TV1.dz'
    })
  })

  it('can find channels by network', () => {
    search('network:Hope')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'K11UUD1.as'
    })
  })

  it('can find channels without the owner', () => {
    search('owners:^$')

    const results = get(filteredChannels)
    expect(results.length).toBe(7)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels by country code', () => {
    search('country:DO')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find all channels that are broadcast from the same region', () => {
    search('subdivision:AR-W')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '13MaxTelevision.ar'
    })
  })

  it('can find all channels that are broadcast from the same city', () => {
    search('city:Corrientes')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '13MaxTelevision.ar'
    })
  })

  it('can find all channels that are broadcast in the same region', () => {
    search('broadcast_area:s/AR-W')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '13MaxTelevision.ar'
    })
  })

  it('can find all channels that are broadcast in the same language', () => {
    search('languages:spa')

    const results = get(filteredChannels)
    expect(results.length).toBe(4)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find all channels that have the same category', () => {
    search('categories:lifestyle')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'FashionTVJohannesburg.fr'
    })
  })

  it('can find all channels with website', () => {
    search('website:.')

    const results = get(filteredChannels)
    expect(results.length).toBe(14)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find all channels marked as NSFW', () => {
    search('is_nsfw:true')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find all closed channels', () => {
    search('is_closed:true')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'AynaTV.af'
    })
  })

  it('can find all blocked channels', () => {
    search('is_blocked:true')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find all the channels that have streams', () => {
    search('streams:>0')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'XtremaCartoons.ar'
    })
  })

  it('can find all the channels that have guides', () => {
    search('guides:>0')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'LaLiganaZap.ao'
    })
  })

  it('can find channels by query in lower case', () => {
    search('tv2')

    const results = get(filteredChannels)
    expect(results.length).toBe(2)
    expect(results[0]).toMatchObject({
      id: 'SEN502.us'
    })
    expect(results[1]).toMatchObject({
      id: 'CFCNTV2.ca'
    })
  })

  it('can find channel by alternative name after another query', () => {
    search('tv2')
    search('alt_names:tv2')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'SEN502.us'
    })
  })

  it('can find channel by broadcast area name', () => {
    search('broadcast_area:"dominican republic"')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channel by country name', () => {
    search('country:"dominican republic"')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channel by region code', () => {
    search('broadcast_area:r/EUR')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'ORF2Europe.at'
    })
  })

  it('can find channel by region name', () => {
    search('broadcast_area:europe')

    const results = get(filteredChannels)
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'ORF2Europe.at'
    })
  })

  it('can find channel by country name from broadcast region', () => {
    search('broadcast_area:france')

    const results = get(filteredChannels)
    expect(results.length).toBe(3)
    expect(results[2]).toMatchObject({
      id: 'ORF2Europe.at'
    })
  })
})

function mockFetch() {
  return jest.fn().mockImplementation(url =>
    Promise.resolve({
      ok: true,
      json: () => {
        if (url === `${API_ENDPOINT}/channels.json`)
          return loadJson('tests/__data__/input/channels.json')
        if (url === `${API_ENDPOINT}/countries.json`)
          return loadJson('tests/__data__/input/countries.json')
        if (url === `${API_ENDPOINT}/languages.json`)
          return loadJson('tests/__data__/input/languages.json')
        if (url === `${API_ENDPOINT}/guides.json`)
          return loadJson('tests/__data__/input/guides.json')
        if (url === `${API_ENDPOINT}/regions.json`)
          return loadJson('tests/__data__/input/regions.json')
        if (url === `${API_ENDPOINT}/blocklist.json`)
          return loadJson('tests/__data__/input/blocklist.json')
        if (url === `${API_ENDPOINT}/subdivisions.json`)
          return loadJson('tests/__data__/input/subdivisions.json')
        if (url === `${API_ENDPOINT}/categories.json`)
          return loadJson('tests/__data__/input/categories.json')
        if (url === `${API_ENDPOINT}/streams.json`)
          return loadJson('tests/__data__/input/streams.json')
        return []
      }
    })
  )
}

function loadJson(filepath) {
  return JSON.parse(fs.readFileSync(path.resolve(filepath), 'utf8'))
}
