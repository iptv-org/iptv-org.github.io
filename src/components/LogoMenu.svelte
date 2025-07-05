<script lang="ts">
  import type { Logo } from '~/models'
  import { LogoEditButton, LogoRemoveButton, Menu } from '~/components'

  export let logo: Logo

  let isMenuOpened = false
  function closeMenu() {
    isMenuOpened = false
  }
</script>

<Menu bind:isOpened={isMenuOpened} variant="overlay">
  <LogoEditButton {logo} onClick={closeMenu} />
  <LogoRemoveButton {logo} onClick={closeMenu} />
</Menu>
