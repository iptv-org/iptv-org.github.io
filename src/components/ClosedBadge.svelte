<script lang="ts">
  import Badge from '~/components/Badge.svelte'
  import tippy from 'sveltejs-tippy'
  import { Channel } from '~/models'

  export let channel: Channel
</script>

<Badge>
  <div
    use:tippy={{
      content: `closed: ${channel.closedDateString}`,
      allowHTML: true,
      interactive: true
    }}
  >
    Closed
  </div>
</Badge>
