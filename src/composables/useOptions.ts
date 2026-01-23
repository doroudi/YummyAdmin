import type { DataTableColumns } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import type { LocationQuery, LocationQueryValue } from 'vue-router'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'

import i18n from '~/modules/i18n'

const { t } = i18n.global

type Options = Partial<PagedAndSortedRequest> & {
  page: number
  pageSize: number
  showSizePicker: boolean
  pageSizes?: Array<{ label: string; value: number }>
}

const DEFAULTS = {
  page: 1,
  pageSize: 10,
} as const

const IGNORE_KEYS = new Set([
  'pageCount',
  'onUpdatePageSize',
  'showSizePicker',
  'pageSizes',
])

function asSingle(v: LocationQueryValue | LocationQueryValue[] | undefined) {
  return Array.isArray(v) ? v[0] : v
}

function toBool(v: string) {
  if (v === 'true') return true
  if (v === 'false') return false
  return undefined
}

function toInt(v: string) {
  // strict int parsing (no "12abc" -> 12)
  if (!/^-?\d+$/.test(v)) return undefined
  const n = Number.parseInt(v, 10)
  return Number.isNaN(n) ? undefined : n
}

function isEmptyValue(v: unknown) {
  if (v === null || v === undefined) return true
  if (typeof v === 'string' && v.trim() === '') return true
  if (Array.isArray(v) && v.length === 0) return true
  return false
}

function isDefaultProperty(prop: string, value: unknown) {
  if (IGNORE_KEYS.has(prop)) return true
  if (prop === 'page' && Number(value) === DEFAULTS.page) return true
  if (prop === 'pageSize' && Number(value) === DEFAULTS.pageSize) return true
  return false
}

export function useOptions(autoBind = true) {
  const route = useRoute()
  const router = useRouter()

  const pageSizes = [
    { label: `5 ${t('common.perPage')}`, value: 5 },
    { label: `10 ${t('common.perPage')}`, value: 10 },
    { label: `15 ${t('common.perPage')}`, value: 15 },
    { label: `20 ${t('common.perPage')}`, value: 20 },
  ]

  const options = ref<Options>({
    page: DEFAULTS.page,
    pageSize: DEFAULTS.pageSize,
    showSizePicker: true,
    pageSizes,
  })

  // --- Query <-> Options sync ---
  function optionsToQuery(): LocationQuery {
    const q: LocationQuery = {}

    for (const [key, value] of Object.entries(options.value)) {
      if (isEmptyValue(value)) continue
      if (isDefaultProperty(key, value)) continue

      // arrays become repeated query params
      if (Array.isArray(value)) {
        q[key] = value.map(String)
      } else {
        q[key] = String(value)
      }
    }

    return q
  }

  function queryToOptions(query: LocationQuery) {
    const next: Options = {
      ...options.value,
      page: DEFAULTS.page,
      pageSize: DEFAULTS.pageSize,
      showSizePicker: true,
      pageSizes,
    }

    for (const [prop, raw] of Object.entries(query)) {
      const v = raw

      // handle multi-value query (string[])
      if (Array.isArray(v)) {
        // keep arrays as string[]
        // you can add per-prop coercion here if you have number arrays etc.
        ;(next as any)[prop] = v
        continue
      }

      const single = asSingle(v)
      if (single == null) continue

      // booleans
      const b = toBool(single)
      if (b !== undefined) {
        ;(next as any)[prop] = b
        continue
      }

      // numbers
      const n = toInt(single)
      if (n !== undefined) {
        ;(next as any)[prop] = n
        continue
      }
      // strings
      ;(next as any)[prop] = single
    }

    options.value = next
  }

  function bindOptionsToQueryString() {
    queryToOptions(route.query)
  }

  async function writeOptionsToQueryString() {
    await router.replace({ query: optionsToQuery() })
  }

  onMounted(() => {
    if (autoBind) bindOptionsToQueryString()
  })

  // if route query changes (back/forward or external nav), re-bind options
  watch(
    () => route.query,
    () => {
      if (autoBind) queryToOptions(route.query)
    },
  )

  // if options change, write to query
  watch(
    options,
    async () => {
      if (autoBind) await writeOptionsToQueryString()
    },
    { deep: true },
  )

  // --- Naive UI binding ---

  function bindOptionsToDataTable(columns: DataTableColumns<RowData>) {
    // reset sort + filters first
    columns.forEach((col: any) => {
      if (col.sorter === true) delete col.sortOrder
      if (col.filterOptionValues !== undefined) col.filterOptionValues = []
    })

    const { sortBy, sortDirection } = options.value as any

    // sorting: prefer explicit direction if you store it, else default to 'ascend'
    if (sortBy) {
      const sortCol: any = columns.find((c: any) => c.key === sortBy)
      if (sortCol) {
        const dir =
          sortDirection === 'desc' || sortDirection === 'descend'
            ? 'descend'
            : 'ascend'
        sortCol.sortOrder = dir
      }
    }

    // bind filters by key name (expects arrays)
    for (const [prop, value] of Object.entries(options.value)) {
      if (prop === 'sortBy' || prop === 'sortDirection') continue
      if (isEmptyValue(value)) continue
      if (isDefaultProperty(prop, value)) continue

      const col: any = columns.find((c: any) => c.key === prop)
      if (col && col.filterOptionValues !== undefined && Array.isArray(value)) {
        col.filterOptionValues = [...value]
      }
    }
  }

  function getFilterQueryString() {
    // Keep if you still need the raw string anywhere
    const q = optionsToQuery()
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries(q)) {
      if (Array.isArray(v))
        v.forEach((x) => {
          params.append(k, String(x))
        })
      else params.set(k, String(v))
    }
    return params.toString()
  }

  const filterApplied = computed(() => {
    return Object.entries(options.value).some(([k, v]) => {
      if (k === 'page') return false
      if (isDefaultProperty(k, v)) return false
      return !isEmptyValue(v)
    })
  })

  function resetFilters() {
    // Reset everything except pagination defaults + static keys
    const keep = new Set(['page', 'pageSize', 'showSizePicker', 'pageSizes'])
    const next: Options = {
      page: DEFAULTS.page,
      pageSize: DEFAULTS.pageSize,
      showSizePicker: true,
      // pageSizes,
    }

    // If you want to preserve some other keys, add them here:
    for (const [k, v] of Object.entries(options.value)) {
      if (keep.has(k)) continue
      // if you have specific keys to preserve, do it here
      // e.g. if (k === 'someMode') next[k] = v
    }

    options.value = next
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
