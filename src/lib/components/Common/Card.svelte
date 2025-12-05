<script lang="ts">
  import { type Snippet } from 'svelte'

  interface Props {
    border?: boolean
    headerLeft?: Snippet
    headerRight?: Snippet
    body?: Snippet
  }

  let { border = false, headerLeft, headerRight, body }: Props = $props()

  function getClasses() {
    let classes = 'rounded-md bg-white dark:bg-primary-810'
    if (border) classes += ' border border-gray-200 dark:border-gray-700'

    return classes
  }
</script>

<div class={getClasses()}>
  <div class="flex justify-between items-center pt-2 sm:pt-2.5 pl-4 pr-2.5 rounded-t w-full">
    {@render headerLeft?.()}
    {@render headerRight?.()}
  </div>
  <div>
    {@render body?.()}
  </div>
</div>
