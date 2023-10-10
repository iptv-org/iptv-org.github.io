<script>
  import ActionButton from './ActionButton.svelte'
  import { selected, createPlaylist } from '~/store'

  function onClick() {
    const playlist = createPlaylist()
    const a = createDownloadLink(playlist.toString())
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  function createDownloadLink(string) {
    const blob = new Blob([string], { type: 'text/plain' })
    const url = window.URL || window.webkitURL
    const link = url.createObjectURL(blob)

    const a = document.createElement('a')
    a.setAttribute('download', `playlist.m3u`)
    a.setAttribute('href', link)

    return a
  }
</script>

<ActionButton on:click={onClick} disabled={!$selected.length} aria-label="Download Playlist">
  <span class="inline">
    <svg
      fill="currentColor"
      class="w-4 h-4"
      viewBox="0 0 411 411"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_4_46)">
        <path
          d="M205.5 297.333C202.075 297.333 198.864 296.802 195.867 295.74C192.87 294.678 190.087 292.855 187.519 290.269L95.0438 197.794C90.3344 193.084 87.9797 187.091 87.9797 179.813C87.9797 172.534 90.3344 166.541 95.0438 161.831C99.7531 157.122 105.858 154.664 113.359 154.459C120.86 154.253 126.956 156.497 131.648 161.189L179.812 209.353V25.6876C179.812 18.4095 182.278 12.3044 187.21 7.3724C192.142 2.4404 198.239 -0.0170361 205.5 8.88839e-05C212.778 8.88839e-05 218.883 2.46609 223.815 7.39809C228.747 12.3301 231.205 18.4266 231.187 25.6876V209.353L279.352 161.189C284.061 156.48 290.166 154.228 297.667 154.433C305.167 154.639 311.264 157.105 315.956 161.831C320.666 166.541 323.02 172.534 323.02 179.813C323.02 187.091 320.666 193.084 315.956 197.794L223.481 290.269C220.912 292.837 218.13 294.661 215.133 295.74C212.136 296.819 208.925 297.35 205.5 297.333ZM51.375 411C37.2469 411 25.1481 405.965 15.0786 395.896C5.0091 385.826 -0.0170814 373.736 4.36121e-05 359.625V308.25C4.36121e-05 300.972 2.46605 294.867 7.39804 289.935C12.33 285.003 18.4265 282.545 25.6875 282.562C32.9657 282.562 39.0707 285.028 44.0027 289.96C48.9347 294.892 51.3921 300.989 51.375 308.25V359.625H359.625V308.25C359.625 300.972 362.091 294.867 367.023 289.935C371.955 285.003 378.051 282.545 385.312 282.562C392.591 282.562 398.696 285.028 403.628 289.96C408.56 294.892 411.017 300.989 411 308.25V359.625C411 373.753 405.965 385.852 395.896 395.921C385.826 405.991 373.736 411.017 359.625 411H51.375Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_4_46">
          <rect width="411" height="411" />
        </clipPath>
      </defs>
    </svg>
  </span>

  <span class="hidden md:inline">Download Playlist</span>
</ActionButton>
