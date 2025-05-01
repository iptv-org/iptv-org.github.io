<script lang="ts">
  import { selected, channels, hasQuery, searchResults } from '~/store'
  import { Collection } from '@freearhey/core/browser'
  import IconButton from './IconButton.svelte'
  import { Channel } from '~/models'
  import * as Icon from '~/icons'

  export let variant = 'default'

  const channelsWithStreams: Collection = $channels.filter((channel: Channel) =>
    channel.hasStreams()
  )
  let filteredChannelsWithStreams: Collection = channelsWithStreams
  let filteredChannels: Collection = $channels

  let isLoading = false
  let isAllSelected = false

  searchResults.subscribe((_searchResults: Collection) => {
    onSearchResultsChange(_searchResults)
  })

  function onSearchResultsChange(_searchResults: Collection) {
    if ($hasQuery) {
      if (_searchResults.isEmpty()) {
        filteredChannels = new Collection()
      } else {
        filteredChannels = $channels.intersectsBy(_searchResults, (channel: Channel) => channel.id)
      }
    } else {
      filteredChannels = $channels
    }

    filteredChannelsWithStreams = filteredChannels.filter((channel: Channel) =>
      channel.hasStreams()
    )

    updateState()
  }

  selected.subscribe((_selected: Collection) => {
    updateState()
  })

  function updateState() {
    let _selected = $selected
    isAllSelected = true
    filteredChannelsWithStreams.forEach((channel: Channel) => {
      const isChannelSelected = _selected.includes(
        (selectedChannel: Channel) => selectedChannel.id === channel.id
      )
      if (!isChannelSelected) {
        isAllSelected = false
        return
      }
    })
  }

  function selectAll() {
    isLoading = true
    setTimeout(() => {
      let _selected = $selected
      filteredChannelsWithStreams.forEach((channel: Channel) => {
        const isChannelSelected = _selected.includes(
          (selectedChannel: Channel) => selectedChannel.id === channel.id
        )
        if (!isChannelSelected) {
          _selected.add(channel)
        }
      })

      selected.set(_selected)
      isLoading = false
    }, 0)
  }

  function deselectAll() {
    isLoading = true
    setTimeout(() => {
      let _selected = $selected
      filteredChannelsWithStreams.forEach((channel: Channel) => {
        _selected.remove((selectedChannel: Channel) => selectedChannel.id === channel.id)
      })

      selected.set(_selected)
      isLoading = false
    }, 0)
  }
</script>

{#if isLoading}
  <div class="h-10 w-10 flex items-center justify-center text-gray-100">
    <Icon.Spinner size={21} />
  </div>
{:else if isAllSelected}
  <IconButton onClick={deselectAll} aria-label="Deselect All" title="Deselect All" {variant}>
    <Icon.DeselectAll size={24} />
  </IconButton>
{:else}
  <IconButton onClick={selectAll} aria-label="Select All" title="Select All" {variant}>
    <Icon.SelectAll size={24} />
  </IconButton>
{/if}
