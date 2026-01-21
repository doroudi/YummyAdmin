import type { DataTableColumns } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'

import i18n from '~/modules/i18n'

const { t } = i18n.global

export function useOptions(autoBind = true) {
  const pageSizes = [
    {
      label: `5 ${t('common.perPage')}`,
      value: 5,
    },
    {
      label: `10 ${t('common.perPage')}`,
      value: 10,
    },
    {
      label: `15 ${t('common.perPage')}`,
      value: 15,
    },
    {
      label: `20 ${t('common.perPage')}`,
      value: 20,
    },
  ]
  const options = ref({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageSizes,
  })

  onMounted(() => {
    if (autoBind) bindOptionsToQueryString()
  })

  watch(
    () => options.value,
    () => {
      if (autoBind) writeOptionsToQueryString()
    },
    { immediate: true, deep: true },
  )

  function getFilterQueryString() {
    const str = []
    for (const prop of Object.keys(options.value)) {
      const value = options.value[prop as keyof PagedAndSortedRequest]
      if (Array.isArray(value) && value.length === 0) continue
      if (
        Object.hasOwn(options.value, prop) &&
        value !== null &&
        value !== ''
      ) {
        if (isDefaultProperty(prop, value)) continue
        str.push(`${encodeURIComponent(prop)}=${encodeURIComponent(value)}`)
      }
    }
    return str.join('&')
  }

  function bindOptionsToDataTable(columns: DataTableColumns<RowData>) {
    columns.filter(c => c['sorter'] === true).forEach(col => { delete col['sortOrder'] })

     columns
      .filter((c) => c['filterOptionValues'] !== undefined)
      .forEach((col) => {
        col['filterOptionValues'] = []
      })
    for (const prop of Object.keys(options.value)) {
      const value = options.value[prop as keyof PagedAndSortedRequest]
      if (
        Object.hasOwn(options.value, prop) &&
        value !== null &&
        value !== ''
      ) {
        if (isDefaultProperty(prop, value)) continue

        if (prop === 'sortBy') {
          const sortCol = columns.find((x: any) => x.key === value)
          if (sortCol !== undefined) {
            sortCol['sortOrder'] =
              sortCol['sortOrder'] === 'ascend' ? 'descend' : 'ascend'
          }
          continue
        }
        const col = columns.find((x:any) => x.key === prop)

        if (col !== undefined) {
          col['filterOptionValues'] = [...value]
        }
      }
    }
  }

  function bindOptionsToQueryString() {
    const route = useRoute()
    const queryString = route.query
    for (const prop in queryString) {
      if (Object.hasOwn(queryString, prop)) {
        const value = queryString[prop] as any
        if (!isNumber(value)) {
          if (value === 'true' || value === 'false') {
            options.value[prop as keyof PagedAndSortedRequest] =
              value === 'true'
            continue
          }
          options.value[prop as keyof PagedAndSortedRequest] = queryString[prop]
        } else {
          options.value[prop as keyof PagedAndSortedRequest] = Number.parseInt(
            queryString[prop] as any,
            10,
          )
        }
      }
    }
  }

  function isNumber(value: string | number): boolean {
    return typeof value === 'number' && !Number.isNaN(value)
  }

  function writeOptionsToQueryString() {
    const queryString = getFilterQueryString()
    let existingQuery = ''
    if (window.location.href.includes('?'))
      existingQuery = window.location.href.slice(
        window.location.href.indexOf('?'),
      )

    if (!queryString.length && existingQuery.length)
      window.history.pushState(
        null,
        '',
        window.location.href.replace(existingQuery, ''),
      )
    else if (queryString.length)
      window.history.pushState(null, '', `?${queryString}`)
  }

  function isDefaultProperty(prop: string, value: any) {
    if (
      ['pageCount', 'onUpdatePageSize', 'showSizePicker', 'pageSizes'].includes(
        prop,
      )
    )
      return true

    if (prop === 'page' && Number.parseInt(value,10) === 1) return true
    if (prop === 'pageSize' && Number.parseInt(value, 10) === 10) return true
    
    return false
  }

  const filterApplied = computed(() => {
    return (
      Object.keys(options.value).filter(
        (i: any) => !isDefaultProperty(i, options.value[i]) && i !== 'page',
      ).length > 0
    )
  })

  function resetFilters() {
    const filters = Object.keys(options.value).filter(
      (i: any) => !isDefaultProperty(i, options.value[i]),
    )
    filters.forEach((f) => {
        delete options.value[f]
    })
  }

  return {
    options,
    getFilterQueryString,
    bindOptionsToQueryString,
    writeOptionsToQueryString,
    filterApplied,
    resetFilters,
    bindOptionsToDataTable,
  }
}
