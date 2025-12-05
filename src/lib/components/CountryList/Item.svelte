<script lang="ts">
  import { searchResults, downloadMode, query, isSearchResultsReady } from '$lib/store'
  import * as Flag from 'country-flag-icons/string/3x2'
  import { ChannelList } from '$lib/components'
  import { Channel, Country } from '$lib/models'
  import { fade } from 'svelte/transition'
  import * as sdk from '@iptv-org/sdk'
  import * as Icon from '$lib/icons'
  import * as CountryList from './'

  interface Props {
    country: Country
  }

  const { country }: Props = $props()

  function getChannels() {
    return country.getChannels()
  }

  function getFlag() {
    return country.code === 'UK' ? Flag['GB'] : Flag[country.code]
  }

  const channels = getChannels()

  let channelsToDisplay = $state(channels.all())

  searchResults.subscribe(results => {
    if ($query) {
      if (!results || !results.length) {
        channelsToDisplay = []
      } else {
        const resultsKeyById = results.reduce(
          (
            acc: Map<string, sdk.Types.ChannelSearchableData>,
            result: sdk.Types.ChannelSearchableData
          ) => {
            acc.set(result.id, result)
            return acc
          },
          new Map<string, sdk.Types.ChannelSearchableData>()
        )
        channelsToDisplay = channels
          .filter((channel: Channel) => !!resultsKeyById.has(channel.id))
          .all()
      }
    } else {
      channelsToDisplay = channels.all()
    }
  })

  let isExpanded = $state(false)
  function toggleExpanded() {
    isExpanded = !isExpanded
  }

  isSearchResultsReady.subscribe((value: boolean) => {
    isExpanded = $query && value
  })
</script>

{#if channelsToDisplay.length}
  <div class="mb-2 md:mb-3" class:pl-14={$downloadMode} style="transition: padding-left 100ms">
    <div id="accordion-heading-{country.code}" class="flex relative">
      {#if $downloadMode}
        <div
          transition:fade={{ duration: 200 }}
          class="w-12 h-13 shrink-0 flex items-center absolute -left-14"
        >
          <CountryList.SelectButton {country} />
        </div>
      {/if}
      <button
        onclick={toggleExpanded}
        type="button"
        class="flex items-center focus:ring-0 focus:outline-none dark:focus:ring-gray-800 justify-between h-13 pl-3.5 pr-4 w-full font-medium text-left border border-gray-200 dark:border-primary-750 text-gray-500 dark:text-white bg-white dark:bg-primary-810 cursor-pointer"
        class:rounded-t-md={isExpanded}
        class:rounded-md={!isExpanded}
        class:border-b-transparent={isExpanded}
        class:dark:border-b-transparent={isExpanded}
        aria-expanded={isExpanded}
      >
        <span class="flex items-center space-x-2"
          ><span class="w-4">{@html getFlag()}</span><span>{country.name}</span></span
        >
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
          <ChannelList channels={channelsToDisplay} />
        </div>
      </div>
    {/if}
  </div>
{/if}
