<script lang="ts">
  import type { HTMLPreviewString } from './types'

  interface Props {
    value: HTMLPreviewString
  }

  const { value }: Props = $props()
</script>

<span class="break-words" title={value.title}>{value.text}</span>
