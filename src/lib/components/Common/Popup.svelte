<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    wrapperClass?: string
    onClose?: () => void
    children?: Snippet
  }

  const {
    wrapperClass = 'flex justify-center p-2 pb-20 sm:py-28 z-50',
    onClose = () => {},
    children
  }: Props = $props()

  function _onClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }
</script>

<div class={wrapperClass} role="presentation" onclick={_onClick}>
  <div class="w-full max-w-3xl">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
