<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { OrderStatus } from '~/models/Order'

const { t } = useI18n()
const store = useOrderStore()
const { getStatusColor } = useOrders()
const { renderPrice, renderTag, renderUserAvatar } = useRender()

onMounted(getItems)

function getItems() {
  store.getRecentOrders(6)
}

const columns: DataTableColumns<RowData> = [
  {
    title: t('customers.customerName'),
    key: 'customer',
    render: (row) => renderUserAvatar(row.customer.avatar, row.customer.name),
  },
  {
    title: t('common.price'),
    key: 'price',
    render: (row) => renderPrice(row.totalPrice, t('currencySign')),
  },
  {
    title: t('common.status'),
    key: 'status',
    fixed: 'right',
    width: 80,
    render: (row) =>
      renderTag(
        row.status,
        getStatusColor(row.status),
        OrderStatus,
        'OrderStatus',
      ),
  },
]
</script>

<template>
  <div>
    <SkeletonTable v-if="store.isLoading" :columns="columns" />
    <n-data-table v-else :bordered="false" :columns="columns" :data="store.orders"
      :scroll-x="500" />
  </div>
</template>
