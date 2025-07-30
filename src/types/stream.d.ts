export type StreamSerializedData = {
  channelId?: string
  feedId?: string
  title: string
  url: string
  referrer?: string
  userAgent?: string
  quality?: string
}

export type StreamData = {
  channel: string
  feed: string
  title: string
  url: string
  referrer: string
  user_agent: string
  quality: string
}
