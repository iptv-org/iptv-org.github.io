<script lang="ts">
  import { Channel } from '$lib/models'
  import * as HistoryBlock from './'

  interface Props {
    channels: Channel[]
  }

  const { channels }: Props = $props()
</script>

<div class="pr-1 h-[168px]">
  <div class="h-full rounded-md border border-gray-200 dark:border-primary-700 flex">
    {#each channels as channel (channel.id)}
      {#if channel instanceof Channel}
        <HistoryBlock.Item {channel} />
      {/if}
    {/each}
  </div>
</div>
