<script lang="ts">
  import { Channel, BlocklistRecord } from '$lib/models'
  import { Badge } from '$lib/components'
  import { tippy } from '$lib/actions'

  export let channel: Channel

  let reason = 'dmca'
  const messages = {
    dmca: 'The channel has been added to our blocklist due to the claims of the copyright holder',
    nsfw: 'The channel has been added to our blocklist due to NSFW content'
  }

  const blocklistRecordUrls = channel
    .getBlocklistRecords()
    .map((blocklistRecord: BlocklistRecord) => {
      reason = blocklistRecord.reason

      return `<a class="underline" target="_blank" rel="noreferrer" href="${
        blocklistRecord.ref
      }">${blocklistRecord.getRefLabel()}</a>`
    })
    .join(', ')
</script>

<Badge>
  <div
    use:tippy={{
      content: `${messages[reason]}: ${blocklistRecordUrls}`,
      allowHTML: true,
      interactive: true
    }}
    target="_blank"
    rel="noreferrer"
  >
    Blocked
  </div>
</Badge>
