<script setup lang='ts'>
import { type DataTableColumns, NButton, NSpace, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  Open24Regular as ArrowIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'
import useRender from '@/composables/render'
import { OrderStatus } from '~/models/Order'

const { renderIcon, renderTag, renderPrice } = useRender()
const { getStatusColor } = useOrders()
const store = useOrderStore()
const { proxy } = getCurrentInstance()

onMounted(getItems)

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
    render: row => renderPrice(row.totalPrice),
  },
  {
    title: 'Status',
    key: 'status',
    render: row => renderTag(row.status, getStatusColor(row.status), OrderStatus),
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 110,
    render: () =>
      [
        h(
          NButton,
          {
            size: 'medium',
            quaternary: true,
            circle: true,
            renderIcon: renderIcon(ArrowIcon),
            onClick: () => {},
          },
        ),
      ],
  },
]
const { options } = storeToRefs(store)

function getItems() {
  store.getOrders()
}

function handlePageChange(page: number) {
  options.value.page = page
  getItems()
}
</script>

<template>
  <n-layout>
    <n-layout-content>
      <div class="px-3">
        <NSpace justify="space-between" class="mb-3">
          <n-input placeholder="Search" />
        </NSpace>
        <n-data-table
          :columns="columns" :data="store.orders"
          :loading="store.isLoading"
          :pagination="store.options"
          :row-key="(row) => row.id"
          :scroll-x="1000"
          @update:sorter="getItems"
          @update:filters="getItems"
          @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>

    {{ store.options }}
  </n-layout>
</template>

<style scoped lang='scss'></style>
