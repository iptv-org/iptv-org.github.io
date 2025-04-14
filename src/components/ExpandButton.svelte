<script lang="ts">
  import IconButton from './IconButton.svelte'
  import * as Icon from '~/icons'

  export let expanded = false
  export let onClick = (state: boolean) => {}
</script>

<IconButton
  onClick={() => {
    expanded = !expanded
    onClick(expanded)
  }}
  size={32}
  aria-label={expanded ? 'Collapse' : 'Expand'}
>
  <div class:rotate-180={expanded}>
    <Icon.Expand size={20} />
  </div>
</IconButton>
