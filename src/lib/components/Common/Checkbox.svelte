<script lang="ts">
  import { tippy } from '$lib/actions'
  import * as Icon from '$lib/icons'

  interface Props {
    loading?: boolean
    selected?: boolean
    indeterminate?: boolean
    disabled?: boolean
    onChange?: (status: boolean) => void
  }

  const {
    loading = false,
    selected = false,
    indeterminate = false,
    disabled = false,
    onChange = () => {}
  }: Props = $props()
</script>

{#if loading}
  <div class="h-12 w-12 flex items-center justify-center text-gray-100">
    <Icon.Spinner size={21} />
  </div>
{:else if disabled}
  <div
    class="w-12 h-12 rounded-full text-primary-200 dark:text-primary-700 transition-colors duration-200 flex items-center justify-center"
    aria-label="Disabled"
  >
    <div
      use:tippy={{
        content: 'No streams available',
        placement: 'right'
      }}
    >
      <Icon.CheckboxDisabled size={24} />
    </div>
  </div>
{:else if selected}
  <button
    class="w-12 h-12 rounded-full text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center justify-center cursor-pointer"
    aria-label="Unselect"
    onclick={() => onChange(false)}
  >
    <Icon.CheckboxChecked size={24} />
  </button>
{:else if indeterminate}
  <button
    class="w-12 h-12 rounded-full text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center justify-center cursor-pointer"
    aria-label="Unselect"
    onclick={() => onChange(false)}
  >
    <Icon.CheckboxIndeterminate size={24} />
  </button>
{:else}
  <button
    class="w-12 h-12 rounded-full text-primary-200 hover:text-primary-400 dark:text-primary-700 dark:hover:text-primary-600 transition-colors duration-200 flex items-center justify-center cursor-pointer"
    aria-label="Select"
    onclick={() => onChange(true)}
  >
    <Icon.CheckboxUnchecked size={24} />
  </button>
{/if}
