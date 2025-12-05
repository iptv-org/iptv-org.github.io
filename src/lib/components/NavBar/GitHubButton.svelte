<script lang="ts">
  import { IconButton } from '$lib/components'
  import * as Icon from '$lib/icons'

  function _onClick() {
    window.open('https://github.com/iptv-org/', '_blank', 'noreferrer')
  }
</script>

<IconButton onClick={_onClick} aria-label="GitHub">
  <Icon.GitHub size={20} />
</IconButton>
