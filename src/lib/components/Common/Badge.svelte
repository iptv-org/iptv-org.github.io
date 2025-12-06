<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children?: Snippet
  }

  let { children }: Props = $props()
</script>

<div
  class="text-gray-500 dark:text-gray-300 border-[1px] border-gray-200 text-xs inline-flex items-center h-5.5 px-2 py-0.5 rounded-full"
>
  {@render children?.()}
</div>
