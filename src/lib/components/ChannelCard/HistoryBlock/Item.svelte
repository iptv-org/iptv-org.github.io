<script lang="ts">
  import { pushState } from '$app/navigation'
  import { page } from '$app/state'
  import type { Channel } from '$lib/models'
  import { scrollToSelected } from '$lib/actions'
  import dayjs from 'dayjs'

  interface Props {
    channel: Channel
    isSelected?: boolean
  }

  const { channel, isSelected = false }: Props = $props()

  function getLogoUrl() {
    return channel.getLogoUrl()
  }

  function getLaunchedYear() {
    return channel.launched ? dayjs(channel.launched).format('YYYY') : null
  }

  function getClosedYear() {
    return channel.closed ? dayjs(channel.closed).format('YYYY') : null
  }

  function getChannelName() {
    return channel.getUniqueName()
  }

  const logoUrl = getLogoUrl()
  const channelName = getChannelName()
  const launchedYear = getLaunchedYear()
  const closedYear = getClosedYear()

  function _onClick(event: MouseEvent) {
    if (page.url.pathname !== '/') return

    event.preventDefault()

    if (!isSelected) {
      pushState(channel.getPagePath(), { showModal: true, channelId: channel.id })
    }
  }
</script>

<a
  class="p-2.5 rounded-md cursor-pointer"
  class:selected={isSelected}
  onclick={_onClick}
  href={channel.getPagePath()}
  data-sveltekit-reload={page.url.pathname !== '/'}
  tabindex="0"
  title={channelName}
  id={channel.id}
  use:scrollToSelected={isSelected}
>
  <div class="flex-col space-y-2 justify-start h-full">
    <div
      class="flex w-25 h-25 rounded-md justify-center items-center bg-gray-100 text-sm text-gray-400 dark:text-gray-600 overflow-hidden"
    >
      <img
        class="max-w-20 max-h-20 mx-auto text-sm text-gray-400 dark:text-gray-600 rounded-xs"
        src={logoUrl}
        alt={channelName}
        loading="lazy"
        referrerpolicy="no-referrer"
      />
    </div>
    <div class="text-sm overflow-hidden w-25 text-left">
      <div class="truncate text-gray-900 dark:text-gray-100">
        {channelName}
      </div>
      {#if launchedYear || closedYear}
        <div class="flex space-x-[2px] truncate text-gray-400">
          {#if launchedYear}
            <div>{launchedYear}</div>
          {:else}
            <div>...</div>
          {/if}
          {#if closedYear}
            <div>-</div>
            <div>{closedYear}</div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</a>

<style lang="postcss">
  @reference "../../../routes/+layout.css";

  .selected {
    @apply bg-gray-100 dark:bg-primary-750 cursor-default;
  }
</style>
