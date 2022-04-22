<script>
  import { query, search, setSearchParam } from '../store.js'

  function onSubmit() {
    setSearchParam('q', $query)
    search($query)
  }
</script>

<form on:submit|preventDefault="{onSubmit}" autocomplete="off" class="w-full">
  <div class="w-full">
    <label for="search-input" class="sr-only">Search</label>
    <div class="relative w-full">
      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
        class="bg-gray-50 border border-gray-300 text-gray-900 outline-blue-500 text-sm rounded-md block w-full pl-9 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Search"
      />
    </div>
  </div>
</form>
