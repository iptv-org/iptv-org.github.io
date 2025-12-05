<script lang="ts">
  import { query, isSearching } from '$lib/store'
  import * as Icon from '$lib/icons'

  interface Props {
    version?: string
    onClear?: () => void
    onSubmit?: () => void
  }

  const { version = 'default', onClear = () => {}, onSubmit = () => {} }: Props = $props()

  let input: HTMLInputElement = $state()

  export function blur() {
    if (input) input.blur()
  }

  export function focus() {
    if (input) input.focus()
  }
</script>

<form
  onsubmit={event => {
    event.preventDefault()
    blur()
    onSubmit()
  }}
  autocomplete="off"
  class:w-full={version === 'mini'}
>
  <label for="search-input" class="sr-only">Search</label>
  <div class="relative" class:w-full={version === 'mini'}>
    <div
      class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400"
    >
      {#if $isSearching}
        <Icon.Spinner size={20} />
      {:else}
        <Icon.Search size={20} />
      {/if}
    </div>
    <input
      type="search"
      id="search-input"
      bind:this={input}
      bind:value={$query}
      class:h-10.5={version === 'default'}
      class:h-9.5={version === 'mini'}
      class="bg-white border border-gray-300 text-gray-900 outline-blue-500 text-sm rounded-md block w-full pl-10 py-2 px-1.5 dark:bg-primary-750 dark:border-primary-700 dark:placeholder-gray-400 dark:text-white placeholder-gray-400"
      placeholder="Search"
    />
    <div
      class="absolute right-0 top-0 pr-1 text-gray-400 flex items-center"
      class:h-10.5={version === 'default'}
      class:h-9.5={version === 'mini'}
    >
      {#if $query.length}
        <button
          type="reset"
          onmousedown={event => {
            event.preventDefault()
            onClear()
          }}
          class="cursor-pointer w-6 h-6"
          title="Clear"
        >
          <Icon.Clear size={16} />
        </button>
      {/if}
    </div>
  </div>
</form>
