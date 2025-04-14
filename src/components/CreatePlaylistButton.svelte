<script>
  import IconButton from '~/components/IconButton.svelte'
  import { downloadMode } from '~/store'
  import * as Icon from '~/icons'

  export let onClick = () => {}
</script>

<IconButton
  active={$downloadMode}
  onClick={() => {
    downloadMode.set(!$downloadMode)
    onClick()
  }}
  aria-label="Create playlist"
  title="Create playlist"
>
  <span class="inline">
    <Icon.CreatePlaylist size={20} />
  </span>
</IconButton>
