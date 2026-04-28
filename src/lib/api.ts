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

type ProcessedData = {
  countries: Country[]
  channels: Channel[]
  feeds: Feed[]
  streams: Stream[]
  channelsKeyById: Map<string, Channel>
}

export let processedData: ProcessedData

export async function loadData(config: Config = {}): Promise<ProcessedData> {
  const dataDir = config.dataDir || DATA_DIR

  const dataManager = new sdk.DataManager({ dataDir })
  await dataManager.downloadToMemory()
  dataManager.loadFromMemory()
  const rawData = dataManager.getRawData()
  processedData = processData(rawData)

  return processedData
}

export async function loadDataFromDisk(config: Config = {}): Promise<ProcessedData> {
  const dataDir = config.dataDir || DATA_DIR

  const dataManager = new sdk.DataManager({ dataDir })
  await dataManager.loadFromDisk()
  const rawData = dataManager.getRawData()
  processedData = processData(rawData)

  return processedData
}

function processData(rawData: sdk.Types.RawData): ProcessedData {
  const channelsGroupedByName = Map.groupBy(rawData.channels, (channel: Channel) => channel.name)
  const feedsKeyByStreamId: Map<string, Feed> = rawData.feeds.reduce(
    (acc, data: sdk.Types.FeedData) => {
      const feed = new Feed(data)
      acc.set(feed.getStreamId(), feed)
      return acc
    },
    new Map()
  )
  const channelsKeyById2: Map<string, Channel> = rawData.channels.reduce(
    (acc, data: sdk.Types.ChannelData) => {
      const channel = new Channel(data)
      channel.hasUniqueName = channelsGroupedByName.get(channel.name).length === 1
      acc.set(channel.id, channel)
      return acc
    },
    new Map()
  )
  const logosGroupedByChannel2: Map<string, Logo[]> = Map.groupBy(
    rawData.logos.map((data: sdk.Types.LogoData) =>
      new Logo(data).withChannel(channelsKeyById2.get(data.channel))
    ),
    (logo: Logo) => logo.channel
  )
  const categoriesKeyById: Map<string, sdk.Models.Category> = rawData.categories.reduce(
    (acc, data: sdk.Types.CategoryData) => {
      const category = new sdk.Models.Category(data)
      acc.set(category.id, category)
      return acc
    },
    new Map()
  )
  const countriesKeyByCode: Map<string, Country> = rawData.countries.reduce(
    (acc, data: sdk.Types.CountryData) => {
      const country = new Country(data)
      acc.set(country.code, country)
      return acc
    },
    new Map()
  )
  const channelsKeyById: Map<string, Channel> = rawData.channels.reduce(
    (acc, data: sdk.Types.ChannelData) => {
      const channel = new Channel(data)
      const logos = logosGroupedByChannel2.get(channel.id)
      const categories = channel.categories.map((id: string) => categoriesKeyById.get(id))
      const country = countriesKeyByCode.get(channel.country)
      channel.withLogos(logos).withCategories(categories).withCountry(country)
      channel.hasUniqueName = channelsGroupedByName.get(channel.name).length === 1
      acc.set(channel.id, channel)
      return acc
    },
    new Map()
  )

  const logos = rawData.logos.map((data: sdk.Types.LogoData) => {
    const logo = new Logo(data)
    const feed = feedsKeyByStreamId.get(logo.getStreamId())
    const channel = channelsKeyById.get(logo.channel)

    if (feed && channel) feed.withChannel(channel)

    if (feed) logo.withFeed(feed)
    if (channel) logo.withChannel(channel)

    return logo
  })

  const logosGroupedByStreamId = Map.groupBy(logos, (logo: Logo) => logo.getStreamId())
  const languagesKeyByCode = rawData.languages.reduce((acc, data: sdk.Types.LanguageData) => {
    const language = new sdk.Models.Language(data)
    acc.set(language.code, language)
    return acc
  }, new Map())
  const streams = rawData.streams
    .map(data => {
      const stream = new Stream(data)

      stream
        .withChannel(channelsKeyById.get(stream.channel))
        .withFeed(feedsKeyByStreamId.get(stream.getId()))

      return stream
    })
    .filter((stream: Stream) => stream.hasFeed())
  const streamsGroupedById = Map.groupBy(streams, (stream: Stream) => stream.getId())
  const guides = rawData.guides.map(data => new Guide(data))
  const guidesGroupedByStreamId = Map.groupBy(guides, (guide: Guide) => guide.getStreamId())
  const citiesKeyByCode = rawData.cities.reduce((acc, data: sdk.Types.CityData) => {
    const city = new sdk.Models.City(data)
    acc.set(city.code, city)
    return acc
  }, new Map())
  const subdivisionsKeyByCode: Map<string, sdk.Models.Subdivision> = rawData.subdivisions.reduce(
    (acc, data: sdk.Types.SubdivisionData) => {
      const subdivision = new sdk.Models.Subdivision(data)
      acc.set(subdivision.code, subdivision)
      return acc
    },
    new Map()
  )

  const regionsKeyByCode: Map<string, sdk.Models.Region> = rawData.regions.reduce(
    (acc, data: sdk.Types.RegionData) => {
      const region = new sdk.Models.Region(data)
      acc.set(region.code, region)
      return acc
    },
    new Map()
  )
  const timezonesKeyById: Map<string, sdk.Models.Timezone> = rawData.timezones.reduce(
    (acc, data: sdk.Types.TimezoneData) => {
      const timezone = new sdk.Models.Timezone(data)
      acc.set(timezone.id, timezone)
      return acc
    },
    new Map()
  )
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
      let name: string | undefined
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

  const graph = buildGraph(rawData.channels)

  const edgesTo = new Map<string, string[]>()
  const edgesFrom = new Map<string, string>()
  for (const edge of graph.edges) {
    if (!edgesTo.has(edge.to)) edgesTo.set(edge.to, [])
    edgesTo.get(edge.to)!.push(edge.from)
    edgesFrom.set(edge.from, edge.to)
  }

  const logosGroupedByChannel = Map.groupBy(logos, (logo: Logo) => logo.channel)
  const feedsGroupedByChannel = Map.groupBy(feeds, (feed: Feed) => feed.channel)
  const blocklistRecords = rawData.blocklist.map(
    (data: sdk.Types.BlocklistRecordData) => new BlocklistRecord(data)
  )
  const blocklistRecordsGroupedByChannel = Map.groupBy(
    blocklistRecords,
    (record: BlocklistRecord) => record.channel
  )

  const finalChannelsKeyById = new Map<string, Channel>()
  const channels = rawData.channels.map((channelData: sdk.Types.ChannelData) => {
    const channel = new Channel(channelData)
    const categories = channel.categories.map((id: string) => categoriesKeyById.get(id))
    const history = getChannelHistory(channel.id, edgesTo, edgesFrom, channelsKeyById)

    channel
      .withLogos(logosGroupedByChannel.get(channel.id))
      .withFeeds(feedsGroupedByChannel.get(channel.id))
      .withCategories(categories)
      .withCountry(countriesKeyByCode.get(channel.country))
      .withBlocklistRecords(blocklistRecordsGroupedByChannel.get(channel.id))

    if (history.length > 1) {
      channel.withHistory(history)
    }

    channel.hasUniqueName = channelsGroupedByName.get(channel.name).length === 1

    finalChannelsKeyById.set(channel.id, channel)
    return channel
  })

  const channelsGroupedByCountry = Map.groupBy(channels, (channel: Channel) => channel.country)
  const countries = rawData.countries.map((data: sdk.Types.CountryData) => {
    const country = new Country(data)
    return country.withChannels(channelsGroupedByCountry.get(country.code))
  })

  return {
    countries,
    channels,
    feeds,
    streams,
    channelsKeyById: finalChannelsKeyById
  }
}

function buildGraph(channels: sdk.Types.ChannelData[]) {
  const graph = {
    edges: [],
    nodes: []
  }

  channels.forEach((channel: sdk.Types.ChannelData) => {
    graph.nodes.push({ id: channel.id, label: channel.name })

    if (channel.replaced_by) {
      const target = channel.replaced_by.split('@')[0]
      graph.edges.push({ from: channel.id, to: target })
    }
  })

  return graph
}

function getChannelHistory(
  targetId: string,
  edgesTo: Map<string, string[]>,
  edgesFrom: Map<string, string>,
  channelsKeyById: Map<string, Channel>
): Channel[] | Channel[][] {
  const visited = new Set<string>()

  // eslint-disable-next-line
  const getAncestors = (id: string): any[] => {
    if (visited.has(id)) return []
    visited.add(id)

    const parentIds = edgesTo.get(id)
    if (!parentIds || parentIds.length === 0) return []

    const parents = parentIds.map(fromId => {
      const parentNode = channelsKeyById.get(fromId)
      const grandparents = getAncestors(fromId)

      if (grandparents.length > 0) {
        grandparents.push(parentNode)
        return grandparents
      }
      return parentNode
    })

    return parents.length > 1 ? [parents] : parents.flat()
  }

  const successors = []
  const visitedSuccessors = new Set<string>([targetId])
  let current = targetId

  while (true) {
    const nextTo = edgesFrom.get(current)
    if (!nextTo || nextTo === current || visitedSuccessors.has(nextTo)) break

    successors.push(channelsKeyById.get(nextTo))
    visitedSuccessors.add(nextTo)
    current = nextTo
  }

  const ancestors = getAncestors(targetId)
  const history = [...ancestors, channelsKeyById.get(targetId), ...successors].filter(Boolean)

  return history
}
