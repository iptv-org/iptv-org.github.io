<script>
  import { getContext } from 'svelte'
  const { close } = getContext('simple-modal')

  export let title = 'Search syntax'
  let examples = [
    { query: 'cat', result: 'Finds channels that have "cat" in their descriptions.' },
    { query: '^dog', result: 'Finds channels whose name starts with "dog".' },
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
    { query: 'is_nsfw:true', result: 'Finds channels marked as NSFW.' },
    { query: 'website:.', result: 'Finds channels that have a link to the official website.' },
    {
      query: 'is:closed',
      result: 'Finds channels that have been closed.'
    },
    { query: 'guides:>5', result: 'Finds channels with more than 5 guides.' },
    { query: 'streams:<2', result: 'Finds channels with less than 2 streams.' }
  ]
</script>

<div class="relative px-2 py-[7rem] flex justify-center" on:click|self="{close}">
  <div class="relative bg-white rounded-md shadow dark:bg-gray-800 w-full max-w-2xl">
    <div
      class="flex justify-between items-center py-4 pl-5 pr-4 rounded-t border-b dark:border-gray-700"
    >
      <h3 class="text-l font-medium text-gray-800 dark:text-white inline-flex items-center">
        {title}
      </h3>
      <button
        on:click="{close}"
        type="button"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
    <div class="overflow-y-scroll overflow-x-hidden w-full">
      <div class="p-6 text-gray-800 dark:text-white">
        <table class="w-full">
          <thead>
            <tr>
              <th class="border p-2 dark:border-gray-700">Query</th>
              <th class="border p-2 dark:border-gray-700">Result</th>
            </tr>
          </thead>
          <tbody class="text-left">
            {#each examples as example}
            <tr class="even:bg-gray-50 even:dark:bg-gray-700">
              <td class="border dark:border-gray-700 px-4 py-3 whitespace-nowrap">
                {example.query}
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
