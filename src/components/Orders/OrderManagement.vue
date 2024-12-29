<script setup lang='ts'>
import { type DataTableColumns, NButton, NSpace, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  Open24Regular as ArrowIcon,
} from '@vicons/fluent'
import { OrderStatus } from '~/models/Order'

const { renderIcon, renderTag, renderPrice } = useRender()
const { getStatusColor } = useOrders()
const store = useOrderStore()
const { proxy } = getCurrentInstance()
const { t } = useI18n()

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
    render: row => renderPrice(row.totalPrice, t('currencySign')),
  },
  {
    title: 'Status',
    key: 'status',
    render: row => renderTag(row.status, getStatusColor(row.status), OrderStatus),
  },
  {
    title: t('common.actions'),
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
const { options } = useOptions()

function getItems() {
  store.getOrders(options.value)
}

function handlePageChange(page: number) {
  options.value.page = page
  getItems()
}

let searchTimerId: any = null
function searchInListDebounced(value: string) {
  clearTimeout(searchTimerId)
  options.value.query = value
  searchTimerId = setTimeout(() => {
    getItems()
  }, 500) /* 500ms throttle */
}
</script>

<template>
  <n-layout>
    <n-layout-content>
      <div class="px-3">
        <NSpace justify="space-between" class="mb-3">
          <n-input v-model="options.query" :placeholder="t('common.search')" @input="searchInListDebounced" />
        </NSpace>
        <n-data-table
          remote :columns="columns" :data="store.orders.items" :loading="store.isLoading" :pagination="store.orders"
          :row-key="(row) => row.id" :scroll-x="1000" @update:sorter="getItems" @update:filters="getItems"
          @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
