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
    title: t('products.name'),
    key: 'name',
    render: (row) => renderProductImage(row.image, row.name),
  },
  {
    title: t('products.category'),
    key: 'category',
    render(row) {
      return h(
        NText,
        {},
        {
          default: () => row.category.name,
        },
      )
    },
  },
  {
    title: t('products.rate'),
    key: 'rate',
    render: (row) => renderRate(row.rate),
  },
  {
    title: t('common.price'),
    key: 'price',
    render: (row) => renderPrice(row.price, t('currencySign')),
  },
]
</script>

<template>
  <div>
    <SkeletonTable v-if="store.isLoading" :columns="columns" />
    <n-data-table v-else remote :bordered="false" :columns="columns" :data="store.trendingProducts"
      :scroll-x="500" />
  </div>
</template>
