<script lang="ts">
  import type { Logo } from '$lib/models'
  import { Menu } from '$lib/components'
  import * as LogoMenu from './'

  interface Props {
    logo: Logo
  }

  const { logo }: Props = $props()

  let menu: Menu
  function closeMenu() {
    if (menu) menu.close()
  }
</script>

<Menu bind:this={menu} variant="overlay">
  <LogoMenu.EditButton {logo} onClick={closeMenu} />
  <LogoMenu.RemoveButton {logo} onClick={closeMenu} />
</Menu>
