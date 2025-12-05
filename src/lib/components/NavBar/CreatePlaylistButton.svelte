<script lang="ts">
  import { IconButton } from '$lib/components'
  import { downloadMode } from '$lib/store'
  import * as Icon from '$lib/icons'

  interface Props {
    onClick?: () => void
  }

  const { onClick = () => {} }: Props = $props()

  function _onClick() {
    downloadMode.set(!$downloadMode)
    onClick()
  }
</script>

<IconButton onClick={_onClick} aria-label="Create playlist" title="Create playlist">
  <span class="inline">
    <Icon.CreatePlaylist size={20} />
  </span>
</IconButton>
