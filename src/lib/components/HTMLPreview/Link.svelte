<script lang="ts">
  import { SvelteURLSearchParams } from 'svelte/reactivity'
  import type { HTMLPreviewLink } from './types'
  import { resolve } from '$app/paths'

  interface Props {
    value: HTMLPreviewLink
    onClick?: (event: MouseEvent) => void
  }

  const { value, onClick }: Props = $props()

  function getUrl(): string {
    const searchParams = new SvelteURLSearchParams()
    searchParams.set('q', value.query)

    return `${resolve('/')}?${searchParams.toString()}`
  }
</script>

<a href={getUrl()} onclick={onClick} class="underline hover:text-blue-400" title={value.label}>
  {value.label}
</a>
