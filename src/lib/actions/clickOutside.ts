export function clickOutside(node, callback) {
  function handleClick(event: PointerEvent) {
    if (!node.contains(event.target)) {
      callback()
    }
  }

  document.addEventListener('click', handleClick)

  return {
    destroy() {
      document.removeEventListener('click', handleClick)
    }
  }
}
