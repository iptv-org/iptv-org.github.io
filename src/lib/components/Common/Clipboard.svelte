<script lang="ts">
  import { tick } from 'svelte'

  const { text, onCopy = () => {}, children } = $props()

  let textarea: HTMLTextAreaElement = $state()

  async function copy() {
    textarea.select()
    document.execCommand('Copy')
    await tick()
    textarea.blur()
    onCopy()
  }
</script>

{@render children?.({ copy })}
<textarea bind:this={textarea} value={text} aria-hidden="true" tabindex="-1"></textarea>

<style>
  textarea {
    left: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
    width: 1px;
    height: 1px;
    border: none;
    display: block;
    position: absolute;
  }
</style>
