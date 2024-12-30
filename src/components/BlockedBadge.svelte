<script>
  import tippy from 'sveltejs-tippy'

  export let channel

  const blocklistRefs = channel.blocklist_records
    .map(record => {
      const parts = record.ref.split('/')
      const issueId = parts.pop()
      const prefix = record.ref.includes('/issues/') ? '#' : ''

      return `<a class="underline" target="_blank" rel="noreferrer" href="${record.ref}">${prefix}${issueId}</a>`
    })
    .join(', ')
</script>

<div
  class="text-gray-500 border-[1px] border-gray-200 text-xs inline-flex items-center px-2.5 py-0.5 dark:text-gray-300 rounded-full"
  use:tippy={{
    content: `The channel has been added to our blocklist due to the claims of the copyright holder: ${blocklistRefs}`,
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
