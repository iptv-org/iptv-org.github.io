<script>
  import IconButton from '~/components/IconButton.svelte'
  import * as Icon from '~/icons'

  export let variant = 'default'
  export let onClick
</script>

<IconButton {onClick} aria-label="Close" title="Close" {variant}>
  <Icon.Close size={20} />
</IconButton>
