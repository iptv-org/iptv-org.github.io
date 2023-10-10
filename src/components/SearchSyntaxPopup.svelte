<script>
  import CloseButton from '~/components/CloseButton.svelte'
  import { getContext } from 'svelte'

  export let title = 'Search syntax'

  const { close } = getContext('simple-modal')

  let examples = [
    { query: 'cat', result: 'Finds channels that have "cat" in their descriptions.' },
    { query: 'cat dog', result: 'Finds channels that have "cat" AND "dog" in their descriptions.' },
    { query: 'cat,dog', result: 'Finds channels that have "cat" OR "dog" in their descriptions.' },
    {
      query: 'name:"Nat Geo"',
      result: 'Find channels that have "Nat Geo" in the name.'
    },
    {
      query: 'alt_names:חינוכית',
      result: 'Finds channels whose alternative name contains "חינוכית".'
    },
    { query: 'network:ABC', result: 'Finds all channels operated by the ABC Network.' },
    {
      query: 'owners:^$',
      result: 'Finds channels that have no owner listed.'
    },
    { query: 'country:GY', result: 'Finds all channels that are broadcast from Guyana.' },
    {
      query: 'subdivision:FR-OCC',
      result: 'Finds all channels that are broadcast from the French region of Occitanie.'
    },
    { query: 'city:"San Francisco"', result: 'Finds all channels broadcast from San Francisco.' },
    { query: 'broadcast_area:c/CV', result: 'Finds channels that are broadcast in Cape Verde.' },
    { query: 'languages:fra', result: 'Find channels that are broadcast in French.' },
    { query: 'categories:news', result: 'Finds all the news channels.' },
    { query: 'website:.', result: 'Finds channels that have a link to the official website.' },
    { query: 'is_nsfw:true', result: 'Finds channels marked as NSFW.' },
    {
      query: 'is_closed:true',
      result: 'Finds channels that have been closed.'
    },
    {
      query: 'is_blocked:true',
      result:
        'Finds channels that have been added to our blocklist due to the claim of the copyright holder.'
    },
    { query: 'streams:<2', result: 'Finds channels with less than 2 streams.' }
  ]
</script>

<div class="relative px-2 py-20 flex justify-center" on:keypress on:click|self={close}>
  <div class="relative bg-white rounded-md shadow dark:bg-gray-800 w-full max-w-2xl">
    <div
      class="flex justify-between items-center py-3 pl-5 pr-4 rounded-t border-b dark:border-gray-700"
    >
      <h3 class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center">
        {title}
      </h3>
      <CloseButton on:click={close} />
    </div>
    <div class="overflow-y-auto overflow-x-hidden w-full">
      <div class="p-6 text-gray-800 dark:text-white">
        <table class="w-full">
          <thead>
            <tr>
              <th class="border p-2 dark:border-gray-700 font-semibold">Query</th>
              <th class="border p-2 dark:border-gray-700 font-semibold">Result</th>
            </tr>
          </thead>
          <tbody class="text-left">
            {#each examples as example}
              <tr class="even:bg-gray-50 even:dark:bg-gray-700">
                <td class="border dark:border-gray-700 px-3 py-3 whitespace-nowrap">
                  <code
                    class="break-words text-sm text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700 px-2 py-1 rounded-sm select-all cursor-text font-mono"
                    >{example.query}</code
                  >
                </td>
                <td class="border dark:border-gray-700 px-4 py-3">{example.result}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
