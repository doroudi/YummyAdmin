<script setup lang="ts">
import { type DataTableColumns, NButton, NTag, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { OrderStatus } from '~/models/Order'

const store = useOrderStore()
const { proxy } = getCurrentInstance()
const { getStatusColor } = useOrders()
onMounted(getItems)

function getItems() {
  store.getOrders()
}
const columns: DataTableColumns<RowData> = [
  {
    title: 'Customer',
    key: 'customer',
    fixed: 'left',
  },
  {
    title: 'Date',
    key: 'createdDate',
    render: row => h(NText, {}, { default: () => proxy.$filters.friendlyTime(row.createdDate) }),
  },
  {
    title: 'Items Count',
    key: 'itemsCount',
  },
  {
    title: 'Price',
    key: 'category',
    render(row) {
      return h(NText,
        {}, {
          default: () => row.totalPrice,
        })
    },
  },
  {
    title: 'Status',
    key: 'status',
    render: row => h(NTag,
      { type: getStatusColor(row.status) },
      { default: () => OrderStatus[row.status] }),
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 110,
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'medium',
            quaternary: true,
            circle: true,
            renderIcon: renderIcon(ArrowIcon),
            onClick: () => { },
          },
        ),
        h(
          NButton,
          {
            size: 'medium',
            quaternary: true,
            circle: true,
            renderIcon: renderIcon(DeleteIcon),
            onClick: () => handleDeleteItem(),
          },
        ),
      ]
    },
  },
]
</script>

<template>
  <div>
    <n-data-table
      :columns="columns" :data="store.orders" :loading="store.isLoading" :pagination="options"
      :row-key="rowKey" :scroll-x="1000" @update:sorter="handleSorterChange" @update:filters="handleFiltersChange"
      @update:page="handlePageChange"
    />
  </div>
</template>
