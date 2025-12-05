<script lang="ts">
  import { type Snippet } from 'svelte'

  interface Props {
    children?: Snippet
  }

  const { children }: Props = $props()
</script>

<div>
  <code
    class="break-words text-sm text-gray-500 bg-gray-100 dark:text-gray-300 dark:bg-primary-750 px-2 py-1 rounded-sm select-all cursor-text font-mono"
  >
    {@render children?.()}
  </code>
</div>
