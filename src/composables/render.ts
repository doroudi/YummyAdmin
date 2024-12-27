import { NBadge, NIcon, NImage, NSpace, NTag, NText } from 'naive-ui'
import { Star24Filled as StarIcon } from '@vicons/fluent'
import { RouterLink } from 'vue-router'

export function useRender() {
  function renderIcon(icon: any, showBadge = false) {
    if (showBadge)
      return () => h(NBadge, { processing: true, dot: true, type: 'success', offset: [-2, 2] }, { default: () => h(NIcon, {}, { default: () => h(icon) }) })

    return () => h(NIcon, null, { default: () => h(icon, {}) })
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

  function renderRate(rate: number) {
    return [
      h(NIcon, { color: 'gold' }, { default: () => h(StarIcon) }),
      h(NText, { class: 'mx-2' }, { default: () => rate }),
    ]
  }

  function renderProductImage(image: string, name: string) {
    return h(NSpace, { align: 'center' }, {
      default: () => [
        h(NImage, { src: image, width: 38, height: 38, objectFit: 'contain', showToolbar: false, lazy: true, alt: name, style: { 'border-radius': '3px' } }, { }),
        h(NText, {}, { default: () => name }),
      ],
    })
  }

  function renderMenuLabel(title: string, path: string) {
    return h(
      RouterLink,
      {
        to: {
          path,
        },
      },
      { default: () => title },
    )
  }

  return {
    renderIcon,
    renderTag,
    renderPrice,
    renderRate,
    renderProductImage,
    renderMenuLabel,
  }
}
