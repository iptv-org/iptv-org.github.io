export function scrollToSelected(node, isSelected: boolean) {
  const scroll = (active: boolean) => {
    const container = node.parentElement
    if (active && container) {
      const containerRect = container.getBoundingClientRect()
      const nodeRect = node.getBoundingClientRect()

      const distanceFromContainerLeft = nodeRect.left - containerRect.left
      const halfContainerWidth = containerRect.width / 2
      const halfNodeWidth = nodeRect.width / 2
      const targetScrollLeft =
        container.scrollLeft + distanceFromContainerLeft - halfContainerWidth + halfNodeWidth

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'auto'
      })
    }
  }

  scroll(isSelected)

  return {
    update: scroll
  }
}
