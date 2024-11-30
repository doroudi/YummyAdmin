<script setup lang="ts">
import { type DataTableColumns, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'

import useRender from '~/composables/render'

const { t } = useI18n()

const store = useProductStore()
onMounted(getItems)
const { renderPrice, renderRate, renderProductImage } = useRender()

function getItems() {
  store.getTrendingProducts()
}

const columns: DataTableColumns<RowData> = [
  {
    title: 'Product',
    key: 'name',
    render: row => renderProductImage(row.image, row.name),
  },
  {
    title: 'Category',
    key: 'category',
    render(row) {
      return h(NText,
        {}, {
          default: () => row.category.name,
        })
    },
  },
  {
    title: 'Rate',
    key: 'rate',
    render: row => renderRate(row.rate),
  },
  {
    title: 'Price',
    key: 'price',
    render: row => renderPrice(row.price, t('currencySign')),
  },
]
</script>

<template>
  <div>
    <n-data-table
      remote
      :bordered="false" :columns="columns" :data="store.products" :loading="store.isLoading"
      :scroll-x="500"
    />
  </div>
</template>
