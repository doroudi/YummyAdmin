<script setup lang="ts">
import { type DataTableColumns } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { OrderStatus } from '~/models/Order'
import useRender from '~/composables/render'

const { t } = useI18n()
const store = useOrderStore()
const { getStatusColor } = useOrders()
const { renderPrice, renderTag } = useRender()

onMounted(getItems)

function getItems() {
  store.getRecentOrders(7)
}

const columns: DataTableColumns<RowData> = [
  {
    title: 'Customer',
    key: 'customer',
  },
  {
    title: 'Price',
    key: 'price',
    render: row => renderPrice(row.totalPrice, t('currencySign')),
  },
  {
    title: 'Status',
    key: 'status',
    fixed: 'right',
    width: 80,
    render: row => renderTag(row.status, getStatusColor(row.status), OrderStatus),
  },
]
</script>

<template>
  <div>
    <n-data-table
      :bordered="false" :columns="columns" :data="store.orders" :loading="store.isLoading"
      :scroll-x="500"
    />
  </div>
</template>
