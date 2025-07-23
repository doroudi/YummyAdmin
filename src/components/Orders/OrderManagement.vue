<script setup lang='ts'>
import {
  Delete24Regular as DeleteIcon,
  MoreHorizontal28Regular as MoreIcon,
} from '@vicons/fluent'
import { type DataTableColumns, NSpace, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { OrderStatus } from '~/models/Order'

const {
  renderActionButton,
  renderTag,
  renderPrice,
  renderUserAvatar,
  renderDeleteActionButton,
} = useRender()
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
    render: (row) => renderUserAvatar(row.customer.avatar, row.customer.name),
  },
  {
    title: t('common.date'),
    key: 'createdDate',
    render: (row) =>
      h(
        NText,
        {},
        { default: () => proxy.$filters.friendlyTime(row.createdDate) },
      ),
  },
  {
    title: t('orders.itemsCount'),
    key: 'itemsCount',
  },
  {
    title: t('common.price'),
    key: 'category',
    render: (row) => renderPrice(row.totalPrice, t('currencySign')),
  },
  {
    title: t('common.status'),
    key: 'status',
    render: (row) =>
      renderTag(
        row.status,
        getStatusColor(row.status),
        OrderStatus,
        'OrderStatus',
      ),
  },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 110,
    render: (row) => [
      // renderActionButton(MoreIcon, () => {}),
      renderDeleteActionButton(t('common.deleteConfirm'), () =>
        handleDeleteItem(row),
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

function rowKey(row: RowData) {
  return row.id
}

async function handleDeleteItem(row: RowData) {
  await store.deleteItem(row.id)
  useNotifyStore().success('Order was deleted!')
}
</script>

<template>
  <n-layout>
    <n-layout-content>
      <div class="px-3">
        <NSpace justify="space-between" class="mb-3">
          <SearchInput v-model="options.query" @search="getItems" />
        </NSpace>
        <SkeletonTable v-if="store.isLoading" :columns="columns" />
        <n-data-table v-else remote :columns="columns" :data="store.orders" :pagination="options"
          :row-key="rowKey" :scroll-x="1000" @update:sorter="getItems" @update:filters="getItems"
          @update:page="handlePageChange" />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
