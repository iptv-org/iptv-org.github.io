// This little helper replaces svelte-tippyjs, sort of deprecated.
import tippyJs, { type Props } from 'tippy.js'
import 'tippy.js/dist/tippy.css'

export function tippy(node: HTMLElement, options: Partial<Props>) {
  const instance = tippyJs(node, options)

  return {
    update(newOptions: Partial<Props>) {
      instance.setProps(newOptions)
    },
    destroy() {
      instance.destroy()
    }
  }
}
