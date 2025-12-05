<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { Snippet } from 'svelte'

  type Props = {
    label: string
    right?: Snippet
    left?: Snippet
    onClick?: (event: MouseEvent) => void
  } & HTMLButtonAttributes

  const { label = 'Button', right, left, onClick, ...restProps }: Props = $props()
</script>

<button
  {...restProps}
  type="button"
  class="w-full text-left rounded-md text-sm h-10 flex items-center text-gray-500 dark:text-gray-400 font-normal hover:bg-gray-100 dark:hover:bg-primary-750 space-x-3 px-2 border border-transparent cursor-pointer"
  onclick={onClick}
>
  <div class="w-5 flex shrink-0 items-center justify-center">
    {@render left?.()}
  </div>
  <div class="w-full">{label}</div>
  <div class="w-4 flex shrink-0">
    {@render right?.()}
  </div>
</button>
