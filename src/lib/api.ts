import { DATA_DIR } from '../constants'
import * as sdk from '@iptv-org/sdk'
import {
  Channel,
  Country,
  Feed,
  Logo,
  Stream,
  Guide,
  BroadcastArea,
  BroadcastAreaLocation,
  BlocklistRecord
} from '$lib/models'

interface Config {
  dataDir?: string
}

export async function loadData(config: Config = {}) {
  const dataDir = config.dataDir || DATA_DIR

  const dataManager = new sdk.DataManager({ dataDir })
  await dataManager.downloadToMemory()
  dataManager.loadFromMemory()
  const rawData = dataManager.getRawData()

  return processData(rawData)
}

export async function loadDataFromDisk(config: Config = {}) {
  const dataDir = config.dataDir || DATA_DIR

  const dataManager = new sdk.DataManager({ dataDir })
  await dataManager.loadFromDisk()
  const rawData = dataManager.getRawData()

  return processData(rawData)
}

function processData(rawData: sdk.Types.RawData) {
  const feedsKeyByStreamId = rawData.feeds.reduce((acc, data: sdk.Types.FeedData) => {
    const feed = new Feed(data)
    acc.set(feed.getStreamId(), feed)
    return acc
  }, new Map())
  const logosGroupedByChannel2 = Map.groupBy(
    rawData.logos.map((data: sdk.Types.LogoData) => new Logo(data)),
    (logo: Logo) => logo.channel
  )
  const categoriesKeyById = rawData.categories.reduce((acc, data: sdk.Types.CategoryData) => {
    const category = new sdk.Models.Category(data)
    acc.set(category.id, category)
    return acc
  }, new Map())
  const countriesKeyByCode = rawData.countries.reduce((acc, data: sdk.Types.CountryData) => {
    const country = new Country(data)
    acc.set(country.code, country)
    return acc
  }, new Map())
  const channelsKeyById = rawData.channels.reduce((acc, data: sdk.Types.ChannelData) => {
    const channel = new Channel(data)
    const logos = logosGroupedByChannel2.get(channel.id)
    const categories = channel.categories.map((id: string) => categoriesKeyById.get(id))
    const country = countriesKeyByCode.get(channel.country)
    channel.withLogos(logos).withCategories(categories).withCountry(country)
    acc.set(channel.id, channel)
    return acc
  }, new Map())

  const logos = rawData.logos.map((data: sdk.Types.LogoData) => {
    const logo = new Logo(data)

    return logo
      .withFeed(feedsKeyByStreamId.get(logo.getStreamId()))
      .withChannel(channelsKeyById.get(logo.channel))
  })

  const logosGroupedByStreamId = Map.groupBy(logos, (logo: Logo) => logo.getStreamId())
  const languagesKeyByCode = rawData.languages.reduce((acc, data: sdk.Types.LanguageData) => {
    const language = new sdk.Models.Language(data)
    acc.set(language.code, language)
    return acc
  }, new Map())
  const streams = rawData.streams.map(data => {
    const stream = new Stream(data)

    stream
      .withChannel(channelsKeyById.get(stream.channel))
      .withFeed(feedsKeyByStreamId.get(stream.getId()))

    return stream
  })
  const streamsGroupedById = Map.groupBy(streams, (stream: Stream) => stream.getId())
  const guides = rawData.guides.map(data => new Guide(data))
  const guidesGroupedByStreamId = Map.groupBy(guides, (guide: Guide) => guide.getStreamId())
  const citiesKeyByCode = rawData.cities.reduce((acc, data: sdk.Types.CityData) => {
    const city = new sdk.Models.City(data)
    acc.set(city.code, city)
    return acc
  }, new Map())
  const subdivisionsKeyByCode = rawData.subdivisions.reduce(
    (acc, data: sdk.Types.SubdivisionData) => {
      const subdivision = new sdk.Models.Subdivision(data)
      acc.set(subdivision.code, subdivision)
      return acc
    },
    new Map()
  )

  const regionsKeyByCode = rawData.regions.reduce((acc, data: sdk.Types.RegionData) => {
    const region = new sdk.Models.Region(data)
    acc.set(region.code, region)
    return acc
  }, new Map())
  const timezonesKeyById = rawData.timezones.reduce((acc, data: sdk.Types.TimezoneData) => {
    const timezone = new sdk.Models.Timezone(data)
    acc.set(timezone.id, timezone)
    return acc
  }, new Map())
  const feeds = rawData.feeds.map((data: sdk.Types.FeedData) => {
    const feed = new Feed(data)

    const languages = feed.languages
      .map((code: string) => languagesKeyByCode.get(code))
      .filter(i => i)
    const timezones = feed.timezones.map((id: string) => timezonesKeyById.get(id)).filter(i => i)
    const logos = logosGroupedByStreamId.get(feed.getStreamId())
    const streams = streamsGroupedById.get(feed.getStreamId())
    const guides = guidesGroupedByStreamId.get(feed.getStreamId())
    const locations = feed.broadcast_area.map((rawCode: string) => {
      let name
      const [type, code] = rawCode.split('/')
      switch (type) {
        case 'ct': {
          const city = citiesKeyByCode.get(code)
          name = city ? city.name : undefined
          break
        }
        case 's': {
          const subdivision = subdivisionsKeyByCode.get(code)
          name = subdivision ? subdivision.name : undefined
          break
        }
        case 'c': {
          const country = countriesKeyByCode.get(code)
          name = country ? country.name : undefined
          break
        }
        case 'r': {
          const region = regionsKeyByCode.get(code)
          name = region ? region.name : undefined
          break
        }
      }

      return new BroadcastAreaLocation({ code: rawCode }).withName(name)
    })
    const broadcastArea = new BroadcastArea({ codes: feed.broadcast_area }).withLocations(locations)
    const channel = channelsKeyById.get(feed.channel)

    return feed
      .withLanguages(languages)
      .withTimezones(timezones)
      .withStreams(streams)
      .withGuides(guides)
      .withBroadcastArea(broadcastArea)
      .withLogos(logos)
      .withChannel(channel)
  })

  const logosGroupedByChannel = Map.groupBy(logos, (logo: Logo) => logo.channel)
  const feedsGroupedByChannel = Map.groupBy(feeds, (feed: Feed) => feed.channel)
  const blocklistRecords = rawData.blocklist.map(
    (data: sdk.Types.BlocklistRecordData) => new BlocklistRecord(data)
  )
  const blocklistRecordsGroupedByChannel = Map.groupBy(
    blocklistRecords,
    (record: BlocklistRecord) => record.channel
  )
  const channels = rawData.channels.map((data: sdk.Types.ChannelData) => {
    const channel = new Channel(data)
    const categories = channel.categories.map((id: string) => categoriesKeyById.get(id))
    return channel
      .withLogos(logosGroupedByChannel.get(channel.id))
      .withFeeds(feedsGroupedByChannel.get(channel.id))
      .withCategories(categories)
      .withCountry(countriesKeyByCode.get(channel.country))
      .withBlocklistRecords(blocklistRecordsGroupedByChannel.get(channel.id))
  })

  const channelsGroupedByCountry = Map.groupBy(channels, (channel: Channel) => channel.country)
  const countries = rawData.countries.map((data: sdk.Types.CountryData) => {
    const country = new Country(data)
    return country.withChannels(channelsGroupedByCountry.get(country.code))
  })

  return {
    countries,
    channels,
    feeds
  }
}
