<script>
  import HTMLPreview from '~/components/HTMLPreview.svelte'
  import EditButton from '~/components/EditButton.svelte'
  import Divider from '~/components/Divider.svelte'
  import SquareButton from '~/components/SquareButton.svelte'
  import { getContext } from 'svelte'

  export let channel

  const { close } = getContext('simple-modal')

  window.onpopstate = event => {
    if (event.target.location.pathname === '/') {
      close()
    }
  }

  const closePopup = () => {
    close()
  }
</script>

<div class="relative px-2 py-24 flex justify-center" on:keypress on:click|self={closePopup}>
  <div class="relative bg-white rounded-md shadow dark:bg-gray-800 w-full max-w-[820px]">
    <div
      class="flex justify-between items-center py-3 pl-5 pr-4 rounded-t border-b dark:border-gray-700"
    >
      <div class="w-2/3 overflow-hidden">
        <h3 class="text-l font-medium text-gray-900 dark:text-white">{channel.name}</h3>
      </div>

      <div class="inline-flex w-1/3 justify-end space-x-3 items-center">
        <EditButton {channel} />
        <Divider />
        <SquareButton on:click={closePopup}>
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
        </SquareButton>
      </div>
    </div>
    <div class="overflow-y-auto overflow-x-hidden w-full">
      <div class="p-12 pt-10">
        <HTMLPreview data={channel} close={closePopup} />
      </div>
    </div>
  </div>
</div>
