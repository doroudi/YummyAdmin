import { NIcon, NTag, NText } from 'naive-ui'

export default function useRender() {
  function renderIcon(icon: any) {
    return () => h(NIcon, null, { default: () => h(icon) })
  }

  function renderTag(text: string, type: 'error' | 'default' | 'success' | 'warning' | 'primary' | 'info', stateEnum: any, round = false, bordered = false) {
    return h(NTag,
      { type, bordered, round },
      { default: () => stateEnum[text] })
  }

  function renderPrice(value: number, postfix = '') {
    return h(NText,
      {}, {
        default: () => value.toLocaleString() + postfix,
      })
  }

  return {
    renderIcon,
    renderTag,
    renderPrice,
  }
}
