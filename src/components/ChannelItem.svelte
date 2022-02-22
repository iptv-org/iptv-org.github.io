<script>
  export let channel
</script>

<tr>
  <td class="is-vcentered" style="min-width: 150px; text-align: center">
    {#if channel && channel.logo}
    <img
      loading="lazy"
      referrerpolicy="no-referrer"
      src="{channel.logo}"
      alt="{channel.name}"
      style="max-width: 100px; max-height: 50px; vertical-align: middle"
    />
    {/if}
  </td>
  <td class="is-vcentered" nowrap>
    <p>{channel.name}</p>
  </td>
  <td class="is-vcentered" nowrap>
    <code style="user-select: all">{channel.id}</code>
  </td>
  <td class="is-vcentered">
    {#each channel.guides as guide}
    <p>
      <code style="white-space: nowrap; user-select: all">{guide.url}</code>
    </p>
    {/each}
  </td>
</tr>
