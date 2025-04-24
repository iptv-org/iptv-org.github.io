<script>
  import IconButton from '~/components/IconButton.svelte'
  import * as Icon from '~/icons'

  export let onClick
</script>

<IconButton {onClick} aria-label="Go to search" title="Go to search">
  <span class="inline">
    <Icon.Search size={20} />
  </span>
</IconButton>
