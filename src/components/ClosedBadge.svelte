<script>
  import tippy from 'sveltejs-tippy'

  export let channel
</script>

<div
  class="text-gray-500 border-[1px] border-gray-200 text-xs inline-flex items-center px-2.5 py-0.5 dark:text-gray-300 cursor-default rounded-full"
  use:tippy={{
    content: `closed: ${channel.closed}`,
    allowHTML: true,
    placement: 'right',
    interactive: true
  }}
>
  Closed
</div>
