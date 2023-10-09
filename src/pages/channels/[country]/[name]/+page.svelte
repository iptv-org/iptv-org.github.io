<script>
  import GuideItem from '~/components/GuideItem.svelte'
  import StreamItem from '~/components/StreamItem.svelte'
  import HTMLPreview from '~/components/HTMLPreview.svelte'
  import EditButton from '~/components/EditButton.svelte'
  import NavBar from '~/components/NavBar.svelte'

  export let data

  let isLoading = false
  let channel = data.channel
  let streams = channel ? channel._streams : []
</script>

<svelte:head>
  <title>{channel && channel.name ? `${channel.name} • iptv-org` : 'iptv-org'}</title>
</svelte:head>

<header class="fixed z-40 w-full min-w-[360px] top-0">
  <NavBar withSearch />
</header>

<main class="bg-slate-50 dark:bg-[#1d232e] min-h-screen min-w-[360px] pt-16">
  <section class="container max-w-[820px] mx-auto px-2 pt-6 pb-20 flex-col space-y-4">
    {#if isLoading}
      <div
        class="flex items-center justify-center w-full pt-1 pb-6 tracking-tight text-sm text-gray-500 dark:text-gray-400 font-mono"
      >
        loading...
      </div>
    {/if}
    {#if channel}
      <div class="border rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white">
        <div
          class="flex justify-between items-center py-3 pl-5 pr-4 rounded-t border-b dark:border-gray-700"
        >
          <div class="w-1/3 overflow-hidden">
            <h1 class="text-l font-medium text-gray-900 dark:text-white">{channel.name}</h1>
          </div>
          <div class="inline-flex w-1/3 justify-end space-x-3">
            <EditButton {channel} />
          </div>
        </div>
        <div class="overflow-y-auto overflow-x-hidden w-full p-10">
          <HTMLPreview data={channel} />
        </div>
      </div>
    {/if}
    {#if streams.length}
      <div class="border rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white">
        <div
          class="flex justify-between items-center py-3 pl-5 pr-4 rounded-t border-b dark:border-gray-700"
        >
          <div class="w-1/3 overflow-hidden">
            <h3 class="text-l font-medium text-gray-900 dark:text-white">Streams</h3>
          </div>
        </div>
        <div class="overflow-y-auto overflow-x-hidden w-full p-6">
          <div class="space-y-2">
            {#each streams as stream}
              <StreamItem {stream} />
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </section>
</main>
