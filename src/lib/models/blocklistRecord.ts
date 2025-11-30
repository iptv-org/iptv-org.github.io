import * as sdk from '@iptv-org/sdk'

export class BlocklistRecord extends sdk.Models.BlocklistRecord {
  getRefLabel(): string {
    let refLabel = ''

    const isIssue = /issues|pull/.test(this.ref)
    const isAttachment = /github\.zendesk\.com\/attachments\/token/.test(this.ref)
    if (isIssue) {
      const parts = this.ref.split('/')
      const issueId = parts.pop()
      refLabel = `#${issueId}`
    } else if (isAttachment) {
      const [, filename] = this.ref.match(/\?name=(.*)/) || [null, undefined]
      refLabel = filename
    } else {
      refLabel = this.ref.split('/').pop()
    }

    return refLabel
  }
}
