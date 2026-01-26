import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#00ad4c',
    errorColor: '#FF0055',
    warningColor: '#FF8000',
    borderRadius: '5px',
    borderRadiusSmall: '3px',
    borderColor: '#e4e7ec',
  },
  Card: {
    borderRadius: '7px',
  },
  Tag: {
    borderRadius: '4px',
  },
  List: {
    borderRadius: '0',
    borderColorPopover: '#e4e7ec',
  },
  Notification: {
    padding: '15px',
  },
}

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#00ad4c',
    errorColor: '#FF0055',
    warningColor: '#FF8000',
    borderRadius: '5px',
    borderRadiusSmall: '3px',
    borderColor: '#4b556eff',
    cardColor: '#202c4633',
    popoverColor: '#0f172a',
    modalColor: '#1c202c',
  },
  Card: {
    borderRadius: '7px',
    color: '#1c202c',
  },
  Dropdown: {
    color: '#1c2334',
  },
  Drawer: {
    color: '#1c202c',
  },
  DataTable: {
    thColor: '#1c202c',
    tdColor: '#1c2334',
    hoverColor: '#1c202c',
    tdColorHover: '#1c202c',
  },
  Tag: {
    borderRadius: '4px',
  },
  List: {
    borderRadius: '0',
    borderColorPopover: '#1c2334',
    colorHoverPopover: '#1c202c',
  },
  Menu: {},
}

export default themeOverrides
