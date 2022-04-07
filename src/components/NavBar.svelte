<script>
  import { query, hasQuery, search } from '../store.js'
  import { onMount } from 'svelte'
  import SearchFieldMini from './SearchFieldMini.svelte'

  export let withSearch = false

  let dark = false
  function toggleDarkMode() {
    let mode = localStorage.theme || 'light'
    if (mode === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dark = false
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      dark = true
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }
  }

  function reset() {
    document.body.scrollIntoView()
    query.set('')
    hasQuery.set(false)
    search('')
  }

  onMount(() => {
    let mode = localStorage.theme || 'light'
    if (mode === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dark = true
    } else {
      dark = false
    }
  })
</script>

<nav
  class="bg-white border-b border-gray-200 px-2 sm:px-4 py-2.5 dark:border-gray-600 dark:bg-gray-800"
>
  <div class="container flex justify-between items-center max-w-6xl mx-auto px-4 sm:px-2">
    <div class="flex flex-start items-center basis-[24rem] shrink">
      <a href="/" on:click="{() => {reset()}}" class="flex mr-6">
        <span
          class="text-[1.15rem] text-[#24292f] self-center font-semibold whitespace-nowrap dark:text-white font-mono"
          >/iptv-org</span
        >
      </a>
      {#if withSearch}
      <SearchFieldMini />
      {/if}
    </div>

    <div class="flex flex-end items-center">
      <div class="md:inline-block md:w-auto pr-4">
        <ul class="hidden lg:flex space-x-7">
          <li>
            <a
              href="https://github.com/iptv-org/iptv"
              class="block py-2 pr-4 pl-3 text-sm text-gray-700 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              target="_blank"
              >Playlists<span
                class="inline-flex items-center p-1 mr-2 text-sm font-semibold text-gray-400 rounded-full"
              >
                <svg
                  class="w-3 h-3 fill-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"></path>
                </svg> </span
            ></a>
          </li>
          <li>
            <a
              href="https://github.com/iptv-org/epg"
              class="block py-2 pr-4 pl-3 text-sm text-gray-700 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              target="_blank"
              >EPG<span
                class="inline-flex items-center p-1 mr-2 text-sm font-semibold text-gray-400 rounded-full"
              >
                <svg
                  class="w-3 h-3 fill-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"></path>
                </svg> </span
            ></a>
          </li>
          <li>
            <a
              href="https://github.com/iptv-org/database"
              class="block py-2 pr-4 pl-3 text-sm text-gray-700 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              target="_blank"
              >Database<span
                class="inline-flex items-center p-1 mr-2 text-sm font-semibold text-gray-400 rounded-full"
              >
                <svg
                  class="w-3 h-3 fill-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"></path>
                </svg> </span
            ></a>
          </li>
          <li>
            <a
              href="https://github.com/iptv-org/api"
              class="block py-2 pr-4 pl-3 text-sm text-gray-700 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              target="_blank"
              >API<span
                class="inline-flex items-center p-1 mr-2 text-sm font-semibold text-gray-400 rounded-full"
              >
                <svg
                  class="w-3 h-3 fill-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"></path>
                </svg> </span
            ></a>
          </li>
        </ul>
      </div>
      <button
        type="button"
        on:click="{toggleDarkMode}"
        class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-sm p-2.5"
        aria-label="Toggle Dark Mode"
      >
        <svg
          class="w-5 h-5"
          class:hidden="{dark}"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg
          class="w-5 h-5"
          class:hidden="{!dark}"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <a
        href="https://github.com/iptv-org/"
        class="inline-flex text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-sm p-2.5 ml-1"
        target="_blank"
        aria-label="GitHub"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
        >
          <path
            fill="currentColor"
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</nav>
