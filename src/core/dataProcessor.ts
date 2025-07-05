import { Collection } from '@freearhey/core/browser'
import {
  Country,
  Language,
  Subdivision,
  Region,
  Category,
  Stream,
  Channel,
  Guide,
  BlocklistRecord,
  Feed,
  Logo
} from '../models'

export class DataProcessor {
  constructor() {}

  process(data) {
    const categories = new Collection(data.categories).map(data => new Category(data))
    const categoriesKeyById = categories.keyBy((category: Category) => category.id)

    let countries = new Collection(data.countries).map(data => new Country(data))
    const countriesKeyByCode = countries.keyBy((country: Country) => country.code)

    const subdivisions = new Collection(data.subdivisions).map(data => new Subdivision(data))
    const subdivisionsKeyByCode = subdivisions.keyBy((subdivision: Subdivision) => subdivision.code)

    const regions = new Collection(data.regions).map(data => new Region(data))
    const regionsKeyByCode = regions.keyBy((region: Region) => region.code)

    const blocklistRecords = new Collection(data.blocklist).map(data => new BlocklistRecord(data))
    const blocklistRecordsGroupedByChannelId = blocklistRecords.groupBy(
      (blocklistRecord: BlocklistRecord) => blocklistRecord.channelId
    )

    let streams = new Collection(data.streams).map(data => new Stream(data))
    const streamsGroupedByStreamId = streams.groupBy((stream: Stream) => stream.getId())

    const guides = new Collection(data.guides).map(data => new Guide(data))
    const guidesGroupedByStreamId = guides.groupBy((guide: Guide) => guide.getId())

    const languages = new Collection(data.languages).map(data => new Language(data))
    const languagesKeyByCode = languages.keyBy((language: Language) => language.code)

    let logos = new Collection(data.logos).map(data => new Logo(data))

    let feeds = new Collection(data.feeds).map(data =>
      new Feed(data)
        .withStreams(streamsGroupedByStreamId)
        .withGuides(guidesGroupedByStreamId)
        .withLanguages(languagesKeyByCode)
        .withBroadcastArea(countriesKeyByCode, subdivisionsKeyByCode, regionsKeyByCode, regions)
    )
    const feedsGroupedByChannelId = feeds.groupBy((feed: Feed) => feed.channelId)
    const feedsKeyById = feeds.keyBy((feed: Feed) => feed.id)

    let channels = new Collection(data.channels).map(data =>
      new Channel(data)
        .withCountry(countriesKeyByCode)
        .withSubdivision(subdivisionsKeyByCode)
        .withCategories(categoriesKeyById)
        .withFeeds(feedsGroupedByChannelId)
        .withBlocklistRecords(blocklistRecordsGroupedByChannelId)
    )
    const channelsGroupedByCountryCode = channels.groupBy((channel: Channel) => channel.countryCode)
    const channelsKeyById = channels.keyBy((channel: Channel) => channel.id)
    const channelsGroupedByName = channels.groupBy((channel: Channel) => channel.name)

    logos = logos.map((logo: Logo) => logo.withChannel(channelsKeyById).withFeed(feedsKeyById))

    const logosGroupedByChannelId = logos.groupBy((logo: Logo) => logo.channelId)
    const logosGroupedByStreamId = logos.groupBy((logo: Logo) => logo.getStreamId())

    channels = channels.map((channel: Channel) =>
      channel.setHasUniqueName(channelsGroupedByName).withLogos(logosGroupedByChannelId)
    )

    feeds = feeds.map((feed: Feed) =>
      feed.withChannel(channelsKeyById).withLogos(logosGroupedByStreamId)
    )

    streams = streams.map((stream: Stream) =>
      stream.withChannel(channelsKeyById).withFeed(feedsKeyById)
    )

    countries = countries.map((country: Country) =>
      country.withChannels(channelsGroupedByCountryCode)
    )

    return {
      countries,
      regions,
      subdivisions,
      languages,
      categories,
      streams,
      blocklistRecords,
      channels,
      guides,
      logos
    }
  }
}
