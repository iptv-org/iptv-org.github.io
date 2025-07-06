import { ApiClient, DataProcessor, DataLoader, SearchEngine } from '../../src/core'
import { expect, it, describe, beforeEach } from 'vitest'
import AxiosMockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import path from 'path'
import fs from 'fs'

const searchEngine = new SearchEngine()

beforeEach(async () => {
  const client = new ApiClient()
  const processor = new DataProcessor()
  const dataLoader = new DataLoader({ client, processor })

  client.instance = axios.create({
    baseURL: 'https://iptv-org.github.io/api'
  })

  const mockAxios = new AxiosMockAdapter(client.instance)

  mockAxios.onGet(`categories.json`).reply(200, loadJson('categories.json'))
  mockAxios.onGet(`countries.json`).reply(200, loadJson('countries.json'))
  mockAxios.onGet(`languages.json`).reply(200, loadJson('languages.json'))
  mockAxios.onGet(`blocklist.json`).reply(200, loadJson('blocklist.json'))
  mockAxios.onGet(`timezones.json`).reply(200, loadJson('timezones.json'))
  mockAxios.onGet(`channels.json`).reply(200, loadJson('channels.json'))
  mockAxios.onGet(`regions.json`).reply(200, loadJson('regions.json'))
  mockAxios.onGet(`streams.json`).reply(200, loadJson('streams.json'))
  mockAxios.onGet(`guides.json`).reply(200, loadJson('guides.json'))
  mockAxios.onGet(`feeds.json`).reply(200, loadJson('feeds.json'))
  mockAxios.onGet(`subdivisions.json`).reply(200, loadJson('subdivisions.json'))

  const data = await dataLoader.load()
  const searchableData = data.channels.map(channel => channel.getSearchable())

  searchEngine.createIndex(searchableData)
})

describe('search', () => {
  it('returns empty list if there is no such channel', () => {
    let results = searchEngine.search('lorem')

    expect(results.count()).toBe(0)
  })

  it('can find channel by name', () => {
    let results = searchEngine.search('name:002')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels by multiple words', () => {
    let results = searchEngine.search('Xtrema Cartoons')

    expect(results.count()).toBe(2)
    expect(results.first()).toMatchObject({
      id: 'XtremaCartoons.ar'
    })
    expect(results.all()[1]).toMatchObject({
      id: 'XtremaRetroCartoons.ar'
    })
  })

  it('can search for one of two words', () => {
    let results = searchEngine.search('Johannesburg,002')

    expect(results.count()).toBe(2)
    expect(results.first()).toMatchObject({
      id: '002RadioTV.do'
    })
    expect(results.all()[1]).toMatchObject({
      id: 'FashionTVJohannesburg.fr'
    })
  })

  it('can search for exact word matches', () => {
    let results = searchEngine.search('"Xtrema Cartoons"')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'XtremaCartoons.ar'
    })
  })

  it('can find channels by id', () => {
    let results = searchEngine.search('id:002RadioTV.do')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels by feed name', () => {
    let results = searchEngine.search('Panregional')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: '13MaxTelevision.ar'
    })
  })

  it('can find channels by alternative names', () => {
    let results = searchEngine.search('alt_names:التلفزيون')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'TV1.dz'
    })
  })

  it('can find channels by network', () => {
    let results = searchEngine.search('network:Hope')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'K11UUD1.as'
    })
  })

  it('can find channels without the owner', () => {
    let results = searchEngine.search('owners:^$')

    expect(results.count()).toBe(7)
    expect(results.first()).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels by country code', () => {
    let results = searchEngine.search('country:DO')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels that are broadcast from the same region', () => {
    let results = searchEngine.search('subdivision:AR-W')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: '13MaxTelevision.ar'
    })
  })

  it('can find channels that are broadcast from the same city', () => {
    let results = searchEngine.search('city:Corrientes')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: '13MaxTelevision.ar'
    })
  })

  it('can find channels that have the same category', () => {
    let results = searchEngine.search('categories:lifestyle')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'FashionTVJohannesburg.fr'
    })
  })

  it('can find channels with website', () => {
    let results = searchEngine.search('website:.')

    expect(results.count()).toBe(14)
    expect(results.first()).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels marked as NSFW', () => {
    let results = searchEngine.search('is_nsfw:true')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find closed channels', () => {
    let results = searchEngine.search('is_closed:true')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'AynaTV.af'
    })
  })

  it('can find blocked channels', () => {
    let results = searchEngine.search('is_blocked:true')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find channels by query in lower case', () => {
    let results = searchEngine.search('tv2')

    expect(results.count()).toBe(2)
    expect(results.first()).toMatchObject({
      id: 'SEN502.us'
    })
    expect(results.all()[1]).toMatchObject({
      id: 'CFCNTV2.ca'
    })
  })

  it('can find channel by alternative name after another query', () => {
    searchEngine.search('tv2')
    let results = searchEngine.search('alt_names:tv2')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'SEN502.us'
    })
  })

  it('can find channels that have streams', () => {
    let results = searchEngine.search('streams:>0')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'XtremaCartoons.ar'
    })
  })

  it('can find channels that have guides', () => {
    let results = searchEngine.search('guides:>0')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'LaLiganaZap.ao'
    })
  })

  it('can find channel by country name', () => {
    let results = searchEngine.search('"dominican republic"')

    expect(results.count()).toBe(3)
    expect(results.first()).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channel by display name from the guides', () => {
    let results = searchEngine.search('La Liga HD')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'LaLiganaZap.ao'
    })
  })

  it('can find channel by stream url', () => {
    let results = searchEngine.search(
      'https://stmv6.voxtvhd.com.br/xtremacartoons/xtremacartoons/playlist.m3u8'
    )

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'XtremaCartoons.ar'
    })
  })

  it('can find channels by broadcast area code', () => {
    let results = searchEngine.search('broadcast_area:s/AR-W')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: '13MaxTelevision.ar'
    })
  })

  it('can find channel by broadcast location code', () => {
    let results = searchEngine.search('eur')

    expect(results.count()).toBe(2)
    expect(results.first()).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find channel by broadcast location name', () => {
    let results = searchEngine.search('europe')

    expect(results.count()).toBe(2)
    expect(results.first()).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find channels by exact language code', () => {
    let results = searchEngine.search('language:fra')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'SEN502.us'
    })
  })

  it('can find channels by language name', () => {
    let results = searchEngine.search('french')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'SEN502.us'
    })
  })

  it('can find channels by video format', () => {
    let results = searchEngine.search('format:576i')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find channels by timezone id', () => {
    let results = searchEngine.search('timezone:Europe/London')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find channels by stream id', () => {
    let results = searchEngine.search('13MaxTelevision.ar@Panregional')

    expect(results.count()).toBe(1)
    expect(results.first()).toMatchObject({
      id: '13MaxTelevision.ar'
    })
  })
})

function loadJson(filepath) {
  return JSON.parse(fs.readFileSync(path.resolve('tests/__data__/input/', filepath), 'utf8'))
}
