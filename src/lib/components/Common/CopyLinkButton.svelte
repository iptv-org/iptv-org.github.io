<script lang="ts">
  import { Button, Clipboard } from '$lib/components'
  import * as Icon from '$lib/icons'

  interface Props {
    link: string
    onCopy?: () => void
  }

  const { link, onCopy = () => {} }: Props = $props()
</script>

<Clipboard text={link} {onCopy}>
  {#snippet children({ copy })}
    <Button onClick={copy} label="Copy Link">
      {#snippet left()}
        <Icon.Link class="text-gray-400" size={15} />
      {/snippet}
    </Button>
  {/snippet}
</Clipboard>
