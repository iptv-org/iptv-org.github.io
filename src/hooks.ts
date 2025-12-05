import {
  Channel,
  Feed,
  Country,
  Stream,
  Guide,
  Logo,
  BroadcastArea,
  BroadcastAreaLocation,
  BlocklistRecord
} from '$lib/models'
import type { Transport } from '@sveltejs/kit'
import * as sdk from '@iptv-org/sdk'

export const transport: Transport = {
  Country: {
    encode: value => value instanceof Country && value.encode(),
    decode: data => Country.decode(data)
  },
  Channel: {
    encode: value => value instanceof Channel && value.encode(),
    decode: data => Channel.decode(data)
  },
  Feed: {
    encode: value => value instanceof Feed && value.encode(),
    decode: data => Feed.decode(data)
  },
  Stream: {
    encode: value => value instanceof Stream && value.encode(),
    decode: data => Stream.decode(data)
  },
  Guide: {
    encode: value => value instanceof Guide && value.toObject(),
    decode: data => new Guide(data)
  },
  Logo: {
    encode: value => value instanceof Logo && value.encode(),
    decode: data => Logo.decode(data)
  },
  Language: {
    encode: value => value instanceof sdk.Models.Language && value.toObject(),
    decode: data => new sdk.Models.Language(data)
  },
  Category: {
    encode: value => value instanceof sdk.Models.Category && value.toObject(),
    decode: data => new sdk.Models.Category(data)
  },
  BroadcastArea: {
    encode: value => value instanceof BroadcastArea && value.encode(),
    decode: data => BroadcastArea.decode(data)
  },
  BroadcastAreaLocation: {
    encode: value => value instanceof BroadcastAreaLocation && value.encode(),
    decode: data => BroadcastAreaLocation.decode(data)
  },
  Timezone: {
    encode: value => value instanceof sdk.Models.Timezone && value.toObject(),
    decode: data => new sdk.Models.Timezone(data)
  },
  BlocklistRecord: {
    encode: value => value instanceof BlocklistRecord && value.toObject(),
    decode: data => new BlocklistRecord(data)
  }
}
