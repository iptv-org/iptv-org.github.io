<script lang="ts">
  import { Clipboard } from '$lib/components'
  import * as Icon from '$lib/icons'

  interface Props {
    text: string
    title?: string
  }

  const { text, title = 'Copy to Clipboard' }: Props = $props()

  let isCompleted = $state(false)
  function onSuccess() {
    isCompleted = true
    setTimeout(() => {
      isCompleted = false
    }, 2000)
  }
</script>

<Clipboard {text} onCopy={onSuccess}>
  {#snippet children({ copy })}
    <button
      type="button"
      onclick={copy}
      disabled={isCompleted}
      class="relative flex items-center justify-center text-xs w-7 h-7"
      class:cursor-pointer={!isCompleted}
      aria-label={title}
      {title}
    >
      <div class="text-gray-400">
        {#if isCompleted}
          <Icon.Check size={20} />
        {:else}
          <Icon.Copy size={20} />
        {/if}
      </div>
      <span class="hidden">Copy to Clipboard</span>
      {#if isCompleted}
        <div
          role="tooltip"
          class="tooltip absolute right-10 top-0 py-2 px-3 text-xs text-gray-100 rounded-md bg-black"
        >
          Copied!
        </div>
      {/if}
    </button>
  {/snippet}
</Clipboard>

<style>
  .tooltip::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    border-width: 7px;
    border-style: solid;
    transform: translate3d(0, -7px, 0px);
    border-color: transparent transparent transparent black;
  }
</style>
