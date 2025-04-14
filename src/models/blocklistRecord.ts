import type { BlocklistRecordData, BlocklistRecordSerializedData } from '~/types/blocklistRecord'

export class BlocklistRecord {
  channelId: string
  reason: string
  refUrl: string

  constructor(data?: BlocklistRecordData) {
    if (!data) return

    this.channelId = data.channel
    this.reason = data.reason
    this.refUrl = data.ref
  }

  getRefLabel(): string {
    let refLabel = ''

    const isIssue = /issues|pull/.test(this.refUrl)
    const isAttachment = /github\.zendesk\.com\/attachments\/token/.test(this.refUrl)
    if (isIssue) {
      const parts = this.refUrl.split('/')
      const issueId = parts.pop()
      refLabel = `#${issueId}`
    } else if (isAttachment) {
      const [, filename] = this.refUrl.match(/\?name=(.*)/) || [null, undefined]
      refLabel = filename
    } else {
      refLabel = this.refUrl.split('/').pop()
    }

    return refLabel
  }

  serialize(): BlocklistRecordSerializedData {
    return {
      channelId: this.channelId,
      reason: this.reason,
      refUrl: this.refUrl
    }
  }

  deserialize(data: BlocklistRecordSerializedData): this {
    this.channelId = data.channelId
    this.reason = data.reason
    this.refUrl = data.refUrl

    return this
  }
}
