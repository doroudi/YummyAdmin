import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#00ad4c',
    // hoverColor: 'var(--primary-color-shade1)',
    errorColor: '#FF0055',
    warningColor: '#FF8000',
    borderRadius: '5px',
  },
  Button: {
    colorHover: 'var(--primary-color-shade1)',
    colorPressed: 'var(--primary-color-shade2)',
    colorFocus: 'var(--primary-color-shade3)',
  },
  Tag: {
    borderRadius: '4px',
  },
}

export const darkThemeOverrides: GlobalThemeOverrides = {
  DataTable: {
    thColor: '#1c202c',
    tdColor: '#1c2334',
    hoverColor: '#1c202c',
  },
}

export default themeOverrides
