<script lang="ts">
  import type { Channel } from '$lib/models'
  import * as HistoryBlock from './'

  interface Props {
    channel: Channel
  }

  const { channel }: Props = $props()

  function getChannelId() {
    return channel.id
  }
</script>

<div
  class="overflow-x-auto flex border-t border-gray-200 dark:border-primary-700 py-4 space-x-[2px]"
>
  {#each channel.getHistory() as item (Array.isArray(item) ? item.length : item.id)}
    {#if Array.isArray(item)}
      <HistoryBlock.Group channels={item} />
    {:else}
      <HistoryBlock.Item channel={item} isSelected={item.id === getChannelId()} />
    {/if}
  {/each}
</div>
