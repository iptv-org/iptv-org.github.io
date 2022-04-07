<script>
  import Clipboard from 'svelte-clipboard'

  export let text
  let showTooltip = false

  function onSuccess() {
    showTooltip = true
    setTimeout(() => {
      showTooltip = false
    }, 2000)
  }
</script>

<style>
  .tooltip::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    border-width: 7px;
    border-style: solid;
    transform: translate3d(0, -7px, 0px);
    border-color: transparent transparent transparent black;
  }
</style>

<Clipboard text="{text}" on:copy="{onSuccess}" let:copy>
  <button
    type="button"
    on:click="{copy}"
    class="relative flex items-center p-1 text-xs text-gray-500 dark:text-gray-100"
  >
    <svg
      class="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      ></path>
    </svg>
    <span class="hidden">Copy to Clipboard</span>
    <div
      role="tooltip"
      class:hidden="{!showTooltip}"
      class="tooltip inline-block absolute right-10 top-0 py-2 px-3 text-xs text-gray-100 rounded-md bg-black"
    >
      Copied!
    </div>
  </button>
</Clipboard>
