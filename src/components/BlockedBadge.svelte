<script>
  import tippy from 'sveltejs-tippy'

  export let channel

  let reason
  const messages = {
    dmca: 'The channel has been added to our blocklist due to the claims of the copyright holder',
    nsfw: 'The channel has been added to our blocklist due to NSFW content'
  }

  const blocklistRefs = channel._blocklistRecords
    .map(record => {
      let refName

      const isIssue = /issues|pull/.test(record.ref)
      const isAttachment = /github\.zendesk\.com\/attachments\/token/.test(record.ref)
      if (isIssue) {
        const parts = record.ref.split('/')
        const issueId = parts.pop()
        refName = `#${issueId}`
      } else if (isAttachment) {
        const [, filename] = record.ref.match(/\?name=(.*)/) || [null, undefined]
        refName = filename
      } else {
        refName = record.ref.split('/').pop()
      }

      reason = record.reason

      return `<a class="underline" target="_blank" rel="noreferrer" href="${record.ref}">${refName}</a>`
    })
    .join(', ')
</script>

<div
  class="text-gray-500 border-[1px] border-gray-200 text-xs inline-flex items-center px-2.5 py-0.5 dark:text-gray-300 rounded-full"
  use:tippy={{
    content: `${messages[reason]}: ${blocklistRefs}`,
    allowHTML: true,
    placement: 'right',
    interactive: true
  }}
  href={channel.blocklist_ref}
  target="_blank"
  rel="noreferrer"
>
  Blocked
</div>
