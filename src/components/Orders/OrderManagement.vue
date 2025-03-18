<script setup lang='ts'>
import { type DataTableColumns, NSpace, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  Delete24Regular as DeleteIcon,
  MoreHorizontal28Regular as MoreIcon,
} from '@vicons/fluent'
import { OrderStatus } from '~/models/Order'

const { renderActionButton, renderTag, renderPrice, renderUserAvatar } = useRender()
const { getStatusColor } = useOrders()
const store = useOrderStore()
const { proxy } = getCurrentInstance()
const { t } = useI18n()

onMounted(getItems)

const columns: DataTableColumns<RowData> = [
  {
    title: t('orders.customer'),
    key: 'customer',
    fixed: 'left',
    render: row => renderUserAvatar(row.customer.avatar, row.customer.name),
  },
  {
    title: t('common.date'),
    key: 'createdDate',
    render: row => h(NText, {}, { default: () => proxy.$filters.friendlyTime(row.createdDate) }),
  },
  {
    title: t('orders.itemsCount'),
    key: 'itemsCount',
  },
  {
    title: t('common.price'),
    key: 'category',
    render: row => renderPrice(row.totalPrice, t('currencySign')),
  },
  {
    title: t('common.status'),
    key: 'status',
    render: row => renderTag(row.status, getStatusColor(row.status), OrderStatus, 'OrderStatus'),
  },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 110,
    render: () =>
      [
        renderActionButton(MoreIcon, () => {}),
        renderActionButton(DeleteIcon, () => {}),
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
          <n-input
            v-model="options.query" :value="options.query" :placeholder="t('common.search')"
            @input="searchInListDebounced"
          />
        </NSpace>
        <n-data-table
          remote :columns="columns" :data="store.orders" :loading="store.isLoading"
          :pagination="options" :row-key="(row) => row.id" :scroll-x="1000" @update:sorter="getItems"
          @update:filters="getItems" @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
