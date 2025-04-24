import { loadData, search, searchResults } from '../src/store'
import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest'
import { get } from 'svelte/store'
import path from 'path'
import fs from 'fs'
import AxiosMockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { ApiClient, DataProcessor } from '../src/core'

beforeEach(async () => {
  const client = new ApiClient()
  const processor = new DataProcessor()

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

  await loadData({ client, processor })
})

describe('search', () => {
  it('return all channels by default', () => {
    const results = get(searchResults).all()
    expect(results.length).toBe(15)
  })

  it('returns empty list if there is no such channel', () => {
    search('lorem')

    const results = get(searchResults).all()
    expect(results.length).toBe(0)
  })

  it('can find channel by name', () => {
    search('name:002')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels by multiple words', () => {
    search('Xtrema Cartoons')

    const results = get(searchResults).all()
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

    const results = get(searchResults).all()
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

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'XtremaCartoons.ar'
    })
  })

  it('can find channels by id', () => {
    search('id:002RadioTV.do')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels by alternative names', () => {
    search('alt_names:التلفزيون')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'TV1.dz'
    })
  })

  it('can find channels by network', () => {
    search('network:Hope')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'K11UUD1.as'
    })
  })

  it('can find channels without the owner', () => {
    search('owners:^$')

    const results = get(searchResults).all()
    expect(results.length).toBe(7)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels by country code', () => {
    search('country:DO')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels that are broadcast from the same region', () => {
    search('subdivision:AR-W')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '13MaxTelevision.ar'
    })
  })

  it('can find channels that are broadcast from the same city', () => {
    search('city:Corrientes')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '13MaxTelevision.ar'
    })
  })

  it('can find channels that have the same category', () => {
    search('categories:lifestyle')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'FashionTVJohannesburg.fr'
    })
  })

  it('can find channels with website', () => {
    search('website:.')

    const results = get(searchResults).all()
    expect(results.length).toBe(14)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channels marked as NSFW', () => {
    search('is_nsfw:true')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find closed channels', () => {
    search('is_closed:true')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'AynaTV.af'
    })
  })

  it('can find blocked channels', () => {
    search('is_blocked:true')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find channels by query in lower case', () => {
    search('tv2')

    const results = get(searchResults).all()
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

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'SEN502.us'
    })
  })

  it('can find channels that have streams', () => {
    search('streams:>0')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'XtremaCartoons.ar'
    })
  })

  it('can find channels that have guides', () => {
    search('guides:>0')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'LaLiganaZap.ao'
    })
  })

  it('can find channel by country name', () => {
    search('"dominican republic"')

    const results = get(searchResults).all()
    expect(results.length).toBe(3)
    expect(results[0]).toMatchObject({
      id: '002RadioTV.do'
    })
  })

  it('can find channel by display name from the guides', () => {
    search('La Liga HD')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'LaLiganaZap.ao'
    })
  })

  it('can find channel by stream url', () => {
    search('https://stmv6.voxtvhd.com.br/xtremacartoons/xtremacartoons/playlist.m3u8')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'XtremaCartoons.ar'
    })
  })

  it('can find channels by broadcast area code', () => {
    search('broadcast_area:s/AR-W')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: '13MaxTelevision.ar'
    })
  })

  it('can find channel by broadcast location code', () => {
    search('eur')

    const results = get(searchResults).all()
    expect(results.length).toBe(2)
    expect(results[0]).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find channel by broadcast location name', () => {
    search('europe')

    const results = get(searchResults).all()
    expect(results.length).toBe(2)
    expect(results[0]).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find channels by exact language code', () => {
    search('language:fra')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'SEN502.us'
    })
  })

  it('can find channels by language name', () => {
    search('french')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'SEN502.us'
    })
  })

  it('can find channels by video format', () => {
    search('video_format:576i')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'Bizarre.al'
    })
  })

  it('can find channels by timezone id', () => {
    search('timezone:Europe/London')

    const results = get(searchResults).all()
    expect(results.length).toBe(1)
    expect(results[0]).toMatchObject({
      id: 'Bizarre.al'
    })
  })
})

function loadJson(filepath) {
  return JSON.parse(fs.readFileSync(path.resolve('tests/__data__/input/', filepath), 'utf8'))
}
