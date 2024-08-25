<script>
  export let text;
  export let name;

  let showTooltip = false;

  function onSuccess() {
    showTooltip = true;
    setTimeout(() => {
      showTooltip = false;
    }, 2000);
  }

  function openPlayerPage() {
    window.open(`https://iptv-org.github.io/iptv-player.html?url=${encodeURIComponent(text)}&channel=${encodeURIComponent(name)}`, "popup", "width=1280,height=720");
  }
</script>

<button
  type="button"
  on:click={openPlayerPage}
  class="relative flex items-center justify-center text-xs text-gray-500 dark:text-gray-100 w-7 h-7"
  aria-label="Open Video Player"
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
      d="M5 3l14 9-14 9V3z"
    />
  </svg>
  <span class="hidden">Open Video Player</span>
  <div
    role="tooltip"
    class:hidden={!showTooltip}
    class="tooltip inline-block absolute right-10 top-0 py-2 px-3 text-xs text-gray-100 rounded-md bg-black"
  >
    Opened!
  </div>
</button>

<style>
  .tooltip::after {
    content: "";
    position: absolute;
    left: 100%;
    top: 50%;
    border-width: 7px;
    border-style: solid;
    transform: translate3d(0, -7px, 0px);
    border-color: transparent transparent transparent black;
  }
</style>
