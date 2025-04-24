<script lang="ts">
  import IconButton from '~/components/IconButton.svelte'
  import type { Channel } from '~/models'
  import * as Icon from '~/icons'

  export let channel: Channel

  async function onClick() {
    if (navigator.canShare) {
      try {
        navigator.share({
          title: channel.getUniqueName(),
          url: channel.getPageUrl()
        })
      } catch (err) {
        console.log(err.message)
      }
    }
  }
</script>

<IconButton {onClick}>
  <Icon.Share class="text-gray-400" size={18} />
</IconButton>
