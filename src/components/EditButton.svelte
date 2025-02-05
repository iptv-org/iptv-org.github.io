<script>
  import DefaultButton from '~/components/DefaultButton.svelte'
  import SquareButton from '~/components/SquareButton.svelte'
  import qs from 'qs'

  export let channel

  const endpoint = 'https://github.com/iptv-org/database/issues/new'
  const title = `Edit: ${channel.displayName}`
  const labels = 'channels:edit'
  const template = '__channels_edit.yml'

  let is_nsfw = null
  if (channel.is_nsfw === true) is_nsfw = 'TRUE'
  else if (channel.is_nsfw === false) is_nsfw = 'FALSE'

  // let params = {
  //   labels,
  //   template,
  //   title,
  //   id: channel.id,
  //   name: channel.name,
  //   alt_names: channel.alt_names.join(';'),
  //   network: channel.network,
  //   owners: channel.owners.join(';'),
  //   country: channel.country,
  //   subdivision: channel.subdivision,
  //   city: channel.city,
  //   broadcast_area: channel.broadcast_area.join(';'),
  //   languages: channel.languages.join(';'),
  //   categories: channel.categories.join(';'),
  //   is_nsfw,
  //   launched: channel.launched,
  //   closed: channel.closed,
  //   replaced_by: channel.replaced_by,
  //   website: channel.website,
  //   logo: channel.logo
  // }

  let params = {
    labels,
    template,
    title,
    id: channel.id
  }

  params = qs.stringify(params)

  const editUrl = `${endpoint}?${params}`
  function goToEdit() {
    window.open(editUrl, '_blank')
  }
</script>

<div class="hidden md:block">
  <DefaultButton on:click={goToEdit}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
      <path
        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
      />
    </svg>
    <span>Edit</span>
  </DefaultButton>
</div>

<div class="block md:hidden">
  <SquareButton on:click={goToEdit} aria-label="Edit">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
      <path
        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
      />
    </svg>
  </SquareButton>
</div>
