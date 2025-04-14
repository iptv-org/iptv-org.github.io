<script lang="ts">
  import { downloadMode, selected, hasQuery, searchResults, isReady } from '~/store'
  import { ChannelGrid, Checkbox } from '~/components'
  import { Collection } from '@freearhey/core/browser'
  import { Channel, Country } from '~/models'
  import { fade } from 'svelte/transition'
  import * as Icon from '~/icons'

  export let country: Country

  let isDisabled = false
  let isSelected = false
  let isIndeterminate = false
  let isExpanded = false

  const channels: Collection = country.getChannels()
  const channelsWithStreams: Collection = country.getChannelsWithStreams()
  let filteredChannelsWithStreams: Collection = channelsWithStreams
  let filteredChannels: Collection = channels
  let selectedChannels: Collection = $selected

  searchResults.subscribe((_searchResults: Collection) => {
    onSearchResultsChange(_searchResults)
  })

  function onSearchResultsChange(_searchResults: Collection) {
    isExpanded = false
    if ($hasQuery) {
      if ($isReady) isExpanded = true

      if (_searchResults.isEmpty()) {
        filteredChannels = new Collection()
      } else {
        filteredChannels = channels.intersectsBy(_searchResults, (channel: Channel) => channel.id)
      }
    } else {
      filteredChannels = channels
    }

    filteredChannelsWithStreams = filteredChannels.filter((channel: Channel) =>
      channel.hasStreams()
    )

    updateState()
  }

  selected.subscribe((_selected: Collection) => {
    selectedChannels = _selected
    updateState()
  })

  function updateState() {
    const selectedCountryChannels = filteredChannels.intersectsBy(
      selectedChannels,
      (channel: Channel) => channel.id
    )
    isDisabled = filteredChannelsWithStreams.isEmpty()
    isSelected =
      selectedCountryChannels.count() === filteredChannelsWithStreams.count() &&
      filteredChannelsWithStreams.notEmpty()
    isIndeterminate = selectedCountryChannels.count() > 0
  }

  function selectAll(state: boolean) {
    if (state) {
      const _selected = $selected.concat(filteredChannelsWithStreams)
      selected.set(_selected)
    } else {
      const _selected = $selected.filter((channel: Channel) => channel.countryCode !== country.code)
      selected.set(_selected)
    }
  }

  function toggleExpanded() {
    isExpanded = !isExpanded
  }
</script>

{#if filteredChannels.notEmpty()}
  <div class="mb-2 md:mb-3" class:pl-14={$downloadMode} style="transition: padding-left 100ms">
    <div id="accordion-heading-{country.code}" class="flex relative">
      {#if $downloadMode}
        <div
          transition:fade={{ duration: 200 }}
          class="w-12 h-13 shrink-0 flex items-center absolute -left-14"
        >
          <Checkbox
            selected={isSelected}
            disabled={isDisabled}
            indeterminate={isIndeterminate}
            onChange={selectAll}
          />
        </div>
      {/if}
      <button
        onclick={toggleExpanded}
        type="button"
        class="flex items-center focus:ring-0 dark:focus:ring-gray-800 justify-between h-13 pl-3.5 pr-4 w-full font-medium text-left border border-gray-200 dark:border-primary-750 text-gray-500 dark:text-white bg-white dark:bg-primary-810 cursor-pointer"
        class:rounded-t-md={isExpanded}
        class:rounded-md={!isExpanded}
        class:border-b-transparent={isExpanded}
        class:dark:border-b-transparent={isExpanded}
        aria-expanded={isExpanded}
        aria-controls="accordion-body-{country.code}"
      >
        <span>{country.flagEmoji}&nbsp;{country.name}</span>
        <div class="text-gray-400" class:rotate-180={isExpanded}>
          <Icon.Expand size={20} />
        </div>
      </button>
    </div>
    {#if isExpanded}
      <div
        class="relative"
        id="accordion-body-{country.code}"
        aria-labelledby="accordion-heading-{country.code}"
      >
        <div class="border border-gray-200 dark:border-primary-750 rounded-b-md">
          <ChannelGrid channels={filteredChannels} />
        </div>
      </div>
    {/if}
  </div>
{/if}
