<script lang="ts">
  import { BlocklistRecord, Channel } from '~/models'
  import Badge from '~/components/Badge.svelte'
  import tippy from 'sveltejs-tippy'

  export let channel: Channel

  let reason = 'dmca'
  const messages = {
    dmca: 'The channel has been added to our blocklist due to the claims of the copyright holder',
    nsfw: 'The channel has been added to our blocklist due to NSFW content'
  }

  const blocklistRecordUrls = channel.blocklistRecords
    .map((record: BlocklistRecord) => {
      reason = record.reason

      return `<a class="underline" target="_blank" rel="noreferrer" href="${
        record.refUrl
      }">${record.getRefLabel()}</a>`
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
