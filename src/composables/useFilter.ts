import i18n from '~/modules/i18n'

const { t } = i18n.global

export default function useFilter() {
  function enumToFilter(type: any, typeName: string): any[] {
    return Object.keys(type)
      .filter((key) => !Number.isNaN(parseInt(key, 10)))
      .map((key) => ({
        label: t(`enums.${typeName}.${type[key]}`),
        value: key.replace(' ', '').toLowerCase(),
      }))
  }

  return {
    enumToFilter,
  }
}
