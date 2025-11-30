<script lang="ts">
  import type { HTMLPreviewExternalLink } from './types'

  interface Props {
    value: HTMLPreviewExternalLink
  }

  const { value }: Props = $props()
</script>

<a
  href={value.href}
  class="underline hover:text-blue-400"
  target="_blank"
  rel="noopener noreferrer external"
  title={value.title}>{value.label}</a
>
