<script>
  import IconButton from '~/components/IconButton.svelte'
  import * as Icon from '~/icons'

  function onClick() {
    window.open('https://github.com/iptv-org/', '_blank', 'noreferrer')
  }
</script>

<IconButton {onClick} aria-label="GitHub">
  <Icon.GitHub size={20} />
</IconButton>
