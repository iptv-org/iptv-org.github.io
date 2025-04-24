<script lang="ts">
  import Clipboard from '~/components/Clipboard.svelte'
  import Button from '~/components/Button.svelte'
  import * as Icon from '~/icons'

  export let link: string
  export let onCopy = () => {}
</script>

<Clipboard text={link} {onCopy} let:copy>
  <Button onClick={copy} label="Copy Link">
    <Icon.Link slot="left" class="text-gray-400" size={15} />
  </Button>
</Clipboard>
