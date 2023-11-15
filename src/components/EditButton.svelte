<script>
  import DefaultButton from '~/components/DefaultButton.svelte'

  export let channel

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const title = `Edit: ${channel.displayName}`
  const labels = 'channels:edit'
  const template = '__channels_edit.yml'

  const editUrl = encodeURI(
    `${endpoint}?labels=${labels}&template=${template}&title=${title}&id=${channel.id}`
  )

  function goToEdit() {
    window.open(editUrl, '_blank')
  }
</script>

<DefaultButton on:click={goToEdit}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
    <path
      d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
    />
  </svg>
  <span>Edit</span>
</DefaultButton>
