<script lang="ts">
  import type { Channel, Feed, Logo } from '$lib/models'
  import type { Context } from 'svelte-simple-modal'
  import type { Collection } from '@freearhey/core'
  import { LogosPopup } from '$lib/components'
  import { getContext } from 'svelte'
  import * as Icon from '$lib/icons'

  interface Props {
    channel: Channel
    feed?: Feed
  }

  const { channel, feed = undefined }: Props = $props()

  const logos: Collection<Logo> = feed ? feed.getLogos() : channel.getLogos()
  const displayName = feed ? feed.getFullName() : channel.name
  const firstLogo = logos.first()

  const { open } = getContext<Context>('simple-modal')

  function showLogos() {
    open(
      LogosPopup,
      { channel, feed, variant: 'nested' },
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } }
    )
  }
</script>

{#if logos.isNotEmpty()}
  <div class="w-full justify-center items-center flex h-34 relative">
    <button
      onclick={showLogos}
      class="cursor-pointer h-34 w-full relative flex justify-center items-center"
      title="Logos"
    >
      <img
        src={firstLogo.url}
        alt={`${displayName} logo`}
        title={firstLogo.url}
        referrerpolicy="no-referrer"
        class="bg-gray-100 text-sm text-gray-400 dark:text-gray-600 rounded-sm overflow-hidden max-h-full"
        style:max-width={firstLogo.width ? `${firstLogo.width}px` : ''}
      />
    </button>
    <div class="absolute bottom-1 right-1 pointer-events-none">
      <Icon.Open size={20} class="text-gray-400" />
    </div>
  </div>
{/if}
