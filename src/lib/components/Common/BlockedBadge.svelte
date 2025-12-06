<script lang="ts">
  import { Channel, BlocklistRecord } from '$lib/models'
  import { Badge } from '$lib/components'
  import { tippy } from '$lib/actions'

  interface Props {
    channel: Channel
  }

  let { channel }: Props = $props()

  function getBlocklistRecords() {
    return channel.getBlocklistRecords()
  }

  const blocklistRecords = getBlocklistRecords()

  function getReason() {
    let reason = 'dmca'
    blocklistRecords.forEach(record => {
      reason = record.reason
    })

    return reason
  }

  function getMessage() {
    const messages = {
      dmca: 'The channel has been added to our blocklist due to the claims of the copyright holder',
      nsfw: 'The channel has been added to our blocklist due to NSFW content'
    }

    return messages[getReason()]
  }

  function getBlocklistRecordUrls() {
    return blocklistRecords
      .map((record: BlocklistRecord) => {
        return `<a class="underline" target="_blank" rel="noreferrer" href="${
          record.ref
        }">${record.getRefLabel()}</a>`
      })
      .join(', ')
  }
</script>

<Badge>
  <div
    use:tippy={{
      content: `${getMessage()}: ${getBlocklistRecordUrls()}`,
      allowHTML: true,
      interactive: true
    }}
  >
    Blocked
  </div>
</Badge>
