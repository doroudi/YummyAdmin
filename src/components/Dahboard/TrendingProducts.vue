<script setup lang="ts">
import { type DataTableColumns, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'

const { t } = useI18n()
const store = useProductStore()
const { renderPrice, renderRate, renderProductImage } = useRender()

onMounted(getItems)

function getItems() {
  store.getTrendingProducts(6)
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
    title: t('common.price'),
    key: 'price',
    render: row => renderPrice(row.price, t('currencySign')),
  },
]
</script>

<template>
  <div>
    <n-data-table
      remote
      :bordered="false" :columns="columns" :data="store.products.items" :loading="store.isLoading"
      :scroll-x="500"
    />
  </div>
</template>
