<script>
  import { query, search, setSearchParam } from '../store.js'

  export let found = 0
  export let isLoading = true

  function onSubmit() {
    setSearchParam('q', $query)
    search($query)
  }
</script>

<form class="mb-5" on:submit|preventDefault="{onSubmit}">
  <div>
    <label for="search-input" class="sr-only">Search</label>
    <div class="relative mt-1">
      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="search"
        id="search-input"
        bind:value="{$query}"
        class="bg-white border border-gray-300 text-gray-900 outline-blue-500 text-sm rounded-md block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Search for channels"
      />
    </div>
    <p class="mt-2">
      <span class="inline-flex text-sm text-gray-500 dark:text-gray-400 font-mono"
        >Found&nbsp;
        <span class:animate-spin="{isLoading}">{ !isLoading ? found.toLocaleString() : '/' }</span>
        &nbsp;channels</span
      >
    </p>
  </div>
</form>
