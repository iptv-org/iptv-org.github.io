<script lang="ts">
  export let wrapperClass = 'flex justify-center p-2 pb-20 sm:py-28 z-50'
  export let onClose = () => {}
</script>

<div class={wrapperClass} role="presentation" on:keypress on:click|self={() => onClose()}>
  <div class="w-full max-w-3xl"><slot /></div>
</div>
