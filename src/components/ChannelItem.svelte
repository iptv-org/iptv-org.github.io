<script>
  import { getContext } from 'svelte'
  import StreamsPopup from './StreamsPopup.svelte'
  import GuidesPopup from './GuidesPopup.svelte'
  import ChannelPopup from './ChannelPopup.svelte'
  import Checkbox from './Checkbox.svelte'
  import { downloadMode, selected, query } from '~/store'
  import { fade } from 'svelte/transition'

  export let channel

  const guides = channel._guides
  const streams = channel._streams

  const [name, country] = channel.id.split('.')

  const { open } = getContext('simple-modal')
  let prevUrl = '/'
  const onOpened = () => {
    prevUrl = window.location.href
    window.history.pushState(
      {},
      `${channel.displayName} • iptv-org`,
      `/channels/${country}/${name}`
    )
  }
  const onClose = () => {
    window.history.pushState({}, `iptv-org`, prevUrl)
  }
  const showGuides = () =>
    open(
      GuidesPopup,
      { guides, title: channel.displayName },
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } }
    )
  const showStreams = () =>
    open(
      StreamsPopup,
      { streams, title: channel.displayName },
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } }
    )
  const showChannelData = () => {
    open(
      ChannelPopup,
      { channel },
      { transitionBgProps: { duration: 0 }, transitionWindowProps: { duration: 0 } },
      { onOpened, onClose }
    )
  }

  function pluralize(number, word) {
    return number > 1 ? word + 's' : word
  }

  function onCheckboxChange(event) {
    selected.update(arr => {
      if (event.detail.state) {
        arr.push(channel)
      } else {
        arr = arr.filter(c => c.id !== channel.id)
      }

      return arr
    })
  }

  $: isSelected = !!$selected.find(c => c.id === channel.id)
</script>

{#if $downloadMode}
  <div
    transition:fade={{ duration: 200 }}
    class="w-14 h-14 shrink-0 flex items-center absolute -left-14"
  >
    <Checkbox selected={isSelected} on:change={onCheckboxChange} />
  </div>
{/if}
<div
  class="border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 hover:dark:bg-gray-700 h-16 flex items-center relative"
>
  <div class="px-4 sm:pl-10 sm:pr-16 w-36 sm:w-52 flex shrink-0 items-center justify-center">
    <div class="inline-flex items-center justify-center whitespace-nowrap overflow-hidden">
      {#if channel.logo}
        <img
          class="block align-middle mx-auto max-w-[6rem] max-h-[2.75rem] text-sm text-gray-400 dark:text-gray-600 cursor-defaults"
          loading="lazy"
          referrerpolicy="no-referrer"
          src={channel.logo}
          alt={channel.displayName}
        />
      {/if}
    </div>
  </div>
  <div class="w-52 px-2 sm:w-80 shrink-0">
    <div>
      <div class="text-left">
        <div class="flex space-x-2 items-center">
          <a
            on:click|preventDefault={showChannelData}
            href="/channels/{country}/{name}"
            tabindex="0"
            class="font-normal text-gray-600 dark:text-white hover:underline hover:text-blue-500 line-clamp-1"
            title={channel.displayName}
          >
            {channel.displayName}
          </a>
          <div class="flex space-x-2">
            {#if channel.is_closed}
              <div
                class="text-gray-500 border-[1px] border-gray-200 text-xs inline-flex items-center px-2.5 py-0.5 dark:text-gray-300 cursor-default rounded-full"
                title="closed: {channel.closed}"
              >
                Closed
              </div>
            {/if}
            {#if channel.is_blocked}
              <div
                class="text-gray-500 border-[1px] border-gray-200 text-xs inline-flex items-center px-2.5 py-0.5 dark:text-gray-300 cursor-default rounded-full"
                title="The channel has been added to our blocklist due to the claim of the copyright holder"
              >
                Blocked
              </div>
            {/if}
          </div>
        </div>
        {#if channel.alt_names.length}
          <div
            class="text-sm text-gray-400 dark:text-gray-400 line-clamp-1"
            title={channel.alt_names.join(', ')}
          >
            {channel.alt_names.join(', ')}
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div class="w-52 px-2 sm:w-80">
    <div>
      <code
        class="break-words text-sm text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700 px-2 py-1 rounded-sm select-all cursor-text font-mono"
        >{channel.id}</code
      >
    </div>
  </div>
  <div class="w-40 px-6 sm:w-[150px]">
    <div class="text-right flex justify-end space-x-3 items-center">
      {#if guides.length}
        <button
          on:click={showGuides}
          class="text-sm text-gray-500 dark:text-gray-100 inline-flex space-x-1 flex items-center hover:text-blue-500 dark:hover:text-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"
            />
            <path
              fill-rule="evenodd"
              d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
              clip-rule="evenodd"
            />
          </svg>
          <div>{guides.length}</div>
          <div>{pluralize(guides.length, 'guide')}</div>
        </button>
      {/if}{#if streams.length}
        <button
          on:click={showStreams}
          class="text-sm text-gray-500 dark:text-gray-100 inline-flex space-x-1 flex items-center hover:text-blue-500 dark:hover:text-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>

          <div>{streams.length}</div>
          <div>{pluralize(streams.length, 'stream')}</div>
        </button>
      {/if}
    </div>
  </div>
</div>
