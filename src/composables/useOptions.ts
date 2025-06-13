import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'

export function useOptions(autoBind = true) {
  const options = ref<PagedAndSortedRequest>({
    page: 1,
    itemsPerPage: 10,
  })

  onMounted(() => {
    if (autoBind) bindOptionsToQueryString()
  })

  watch(
    () => options.value,
    () => {
      if (autoBind) writeOptionsQueryString()
    },
    { immediate: true, deep: true },
  )

  function getFilterQueryString() {
    const str = []
    for (const prop of Object.keys(options.value)) {
      const value = options.value[prop as keyof PagedAndSortedRequest]
      if (
        Object.prototype.hasOwnProperty.call(options.value, prop) &&
        value !== null &&
        value !== ''
      ) {
        if (isDefaultProperty(prop, value)) continue
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
          )
        }
      }
    }
  }

  function isNumber(value: string | number): boolean {
    // eslint-disable-next-line unicorn/prefer-number-properties
    return typeof value === 'number' && !Number.isNaN(value)
  }

  function writeOptionsQueryString() {
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

  function isDefaultProperty(prop: string, value: number) {
    if (['itemsPerPage', 'sortBy', 'sortDesc', 'pageCount'].includes(prop))
      return true

    if (prop === 'page' && value === 1) return true

    return false
  }

  return {
    options,
    getFilterQueryString,
    bindOptionsToQueryString,
    writeOptionsQueryString,
  }
}
