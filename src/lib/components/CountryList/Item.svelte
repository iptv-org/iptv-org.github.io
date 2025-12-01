<script lang="ts">
  import { searchResults, downloadMode, query, isSearchResultsReady } from '$lib/store'
  import { ChannelList } from '$lib/components'
  import { Channel, Country } from '$lib/models'
  import { fade } from 'svelte/transition'
  import * as sdk from '@iptv-org/sdk'
  import * as CountryList from './'
  import * as Icon from 'svelte-flag-icons';

  interface Props {
    country: Country
  }

  const { country }: Props = $props()
  const channels = country.getChannels().all()
  let channelsToDisplay = $state(channels)

  let isExpanded = $state(false)
  function toggleExpanded() {
    isExpanded = !isExpanded
  }

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
        channelsToDisplay = channels.filter((channel: Channel) => !!resultsKeyById.has(channel.id))
      }
    } else {
      channelsToDisplay = channels
    }
  })

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
        class="flex items-center focus:ring-0 dark:focus:ring-gray-800 justify-between h-13 pl-3.5 pr-4 w-full font-medium text-left border border-gray-200 dark:border-primary-750 text-gray-500 dark:text-white bg-white dark:bg-primary-810 cursor-pointer"
        class:rounded-t-md={isExpanded}
        class:rounded-md={!isExpanded}
        class:border-b-transparent={isExpanded}
        class:dark:border-b-transparent={isExpanded}
        aria-expanded={isExpanded}
      >
        <span class="flex items-center gap-2">{#if Icon[country.code.charAt(0).toUpperCase() + country.code.charAt(1).toLowerCase()]}{@const FlagIcon = Icon[country.code.charAt(0).toUpperCase() + country.code.charAt(1).toLowerCase()]}<FlagIcon size="20" />{/if}{country.name}</span>
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
