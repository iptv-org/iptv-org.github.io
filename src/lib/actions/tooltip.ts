import { computePosition, flip, shift, offset } from '@floating-ui/dom'
import type { Placement } from '@floating-ui/dom'

// Simple plain-text tooltip (non-interactive)
export function tooltip(node: HTMLElement, { content, placement = 'top' }: { content: string, placement?: Placement }) {
  let tip: HTMLDivElement | null = null

  function show() {
    tip = document.createElement('div')
    tip.textContent = content
    tip.style.cssText = 'position:absolute;z-index:50;pointer-events:none'
    tip.className = 'bg-gray-900 text-white text-sm rounded px-2 py-1 shadow-lg whitespace-nowrap'
    document.body.appendChild(tip)

    computePosition(node, tip, {
      placement,
      middleware: [offset(6), flip(), shift({ padding: 6 })]
    }).then(({ x, y }) => {
      if (!tip) return
      tip.style.left = `${x}px`
      tip.style.top  = `${y}px`
    })
  }

  function hide() {
    tip?.remove()
    tip = null
  }

  node.addEventListener('mouseenter', show)
  node.addEventListener('mouseleave', hide)

  return {
    update({ content: newContent }: { content: string, placement?: Placement }) {
      content = newContent
      if (tip) tip.textContent = newContent
    },
    destroy() {
      node.removeEventListener('mouseenter', show)
      node.removeEventListener('mouseleave', hide)
      tip?.remove()
    }
  }
}

// Interactive HTML tooltip (for clickable content like links)
export function interactiveTooltip(node: HTMLElement, { content, placement = 'top' }: { content: string, placement?: Placement }) {
  let tip: HTMLDivElement | null = null
  let overRef = false
  let overTip = false

  function show() {
    tip = document.createElement('div')
    tip.innerHTML = content
    tip.style.cssText = 'position:absolute;z-index:50;max-width:280px'
    tip.className = 'bg-gray-900 text-white text-sm rounded px-3 py-2 shadow-lg'
    document.body.appendChild(tip)

    tip.addEventListener('mouseenter', onTipEnter)
    tip.addEventListener('mouseleave', onTipLeave)

    computePosition(node, tip, {
      placement,
      middleware: [offset(8), flip(), shift({ padding: 8 })]
    }).then(({ x, y }) => {
      if (!tip) return
      tip.style.left = `${x}px`
      tip.style.top  = `${y}px`
    })
  }

  function hide() {
    if (overRef || overTip) return
    tip?.removeEventListener('mouseenter', onTipEnter)
    tip?.removeEventListener('mouseleave', onTipLeave)
    tip?.remove()
    tip = null
  }

  function onRefEnter() { overRef = true;  if (!tip) show() }
  function onRefLeave() { overRef = false; setTimeout(hide, 80) }
  function onTipEnter() { overTip = true }
  function onTipLeave() { overTip = false; hide() }

  node.addEventListener('mouseenter', onRefEnter)
  node.addEventListener('mouseleave', onRefLeave)

  return {
    update({ content: newContent }: { content: string, placement?: Placement }) {
      content = newContent
      if (tip) tip.innerHTML = newContent
    },
    destroy() {
      node.removeEventListener('mouseenter', onRefEnter)
      node.removeEventListener('mouseleave', onRefLeave)
      tip?.remove()
    }
  }
}