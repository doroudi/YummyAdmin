import { NBadge, NButton, NIcon, NImage, NPopconfirm, NSpace, NTag, NText } from 'naive-ui'
import { RouterLink } from 'vue-router'

import {
  Delete20Regular as DeleteIcon,
  Warning20Filled as FailedIcon,
  Star24Filled as StarIcon,
  CheckmarkCircle20Filled as SuccessIcon,
} from '@vicons/fluent'

export function useRender() {
  function renderLabel(title: string, path: string) {
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
        h(NImage, {
          src: image,
          fallbackSrc: 'assets/images/fallback.png',
          width: 38,
          height: 38,
          objectFit: 'contain',
          showToolbar: false,
          alt: name,
          style: { 'border-radius': '3px' },
        }, { }),
        h(NText, {}, { default: () => name }),
      ],
    })
  }

  function renderConfirmStatus(status: boolean, label: string) {
    const icon = status ? SuccessIcon : FailedIcon
    const iconColor = status ? 'green' : 'orange'
    return h(NSpace, { align: 'center' }, {
      default: () => [
        h(NIcon, { color: iconColor, size: 'large' }, { default: () => h(icon, {}) }),
        h(NText, {}, { default: () => label }),
      ],
    })
  }

  function renderText(text: string) {
    return h(NText, {}, { default: () => text })
  }

  function renderDate(date: string) {
    return h(NText, {}, { default: () => `${new Date(date).toLocaleDateString()}` })
  }

  function renderActionButton(icon: any, onClickAction: any) {
    return h(
      NButton,
      {
        size: 'medium',
        quaternary: true,
        circle: true,
        renderIcon: renderIcon(icon),
        onClick: onClickAction,
      },
    )
  }

  function renderDeleteActionButton(confirmMessage: string, confirmAction: any) {
    return h(
      NPopconfirm, {
        onPositiveClick: confirmAction,
      },
      {
        trigger: () => renderActionButton(DeleteIcon, () => null),
        default: () => confirmMessage,
      },
    )
  }

  function renderActionLabel(text: string, onClickAction: any) {
    return h(NText, { onClick: onClickAction }, { default: () => text })
  }

  return {
    renderIcon,
    renderTag,
    renderPrice,
    renderRate,
    renderProductImage,
    renderLabel,
    renderText,
    renderDate,
    renderActionButton,
    renderConfirmStatus,
    renderActionLabel,
    renderDeleteActionButton,
  }
}
