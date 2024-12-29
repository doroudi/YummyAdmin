import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PagedListResult } from '~/models/PagedListResult'

export function useOptions(autoBind = true) {
  const options = ref<PagedAndSortedRequest>({
    page: 1,
    query: '',
  })

  onMounted(() => {
    if (autoBind)
      bindOptionsToQueryString()
  })

  watch(() => options.value, () => {
    if (autoBind)
      writeOptionsQueryString()
  }, { immediate: true, deep: true })

  function getFilterQueryString() {
    const str = []
    for (const prop of Object.keys(options.value)) {
      const value = options.value[prop as keyof PagedAndSortedRequest]
      if (Object.prototype.hasOwnProperty.call(options.value, prop) && value !== null && value !== '') {
        if (isDefaultProperty(prop, value))
          continue
        str.push(`${encodeURIComponent(prop)}=${encodeURIComponent(value)}`)
      }
    }
    return str.join('&')
  }

  function bindOptionsToQueryString() {
    const route = useRoute()
    const queryString = route.query
    for (const prop in queryString) {
      if (Object.prototype.hasOwnProperty.call(queryString, prop)) {
        const value = queryString[prop] as any
        if (Number.isNaN(value)) {
          if (value === 'true' || value === 'false') {
            options.value[prop as keyof PagedAndSortedRequest] = value === 'true'
            continue
          }
          options.value[prop as keyof PagedAndSortedRequest] = queryString[prop]
        }
        else {
          options.value[prop as keyof PagedAndSortedRequest] = Number.parseInt(queryString[prop] as any)
        }
      }
    }
  }

  function writeOptionsQueryString() {
    const queryString = getFilterQueryString()
    let existingQuery = ''
    if (window.location.href.includes('?'))
      existingQuery = window.location.href.slice(window.location.href.indexOf('?'))

    if (!queryString.length && existingQuery.length)
      window.history.pushState(null, '', window.location.href.replace(existingQuery, ''))

    else if (queryString.length)
      window.history.pushState(null, '', `?${queryString}`)
  }

  function isDefaultProperty(prop: string, value: number) {
    return prop === 'page' && value === 1
  }

  function updatePaging(response: PagedListResult<any>) {
    options.value.itemCount = response.totalCount
  }

  return {
    options,
    getFilterQueryString,
    bindOptionsToQueryString,
    writeOptionsQueryString,
    updatePaging,
  }
}
