<script setup lang='ts'>
import { type DataTableColumns, NButton, NIcon, NSpace, NTag, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  Open24Regular as ArrowIcon,
  Delete24Regular as DeleteIcon,
  Add24Filled as PlusIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'
import { useDialog, useMessage } from 'naive-ui'
import { OrderStatus } from '~/models/Order'

const { t } = useI18n()
const store = useOrderStore()
const dialog = useDialog()
const message = useMessage()
const router = useRouter()
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
            onClick: () => {},
          },
        ),
        h(
          NButton,
          {
            size: 'medium',
            quaternary: true,
            circle: true,
            renderIcon: renderIcon(DeleteIcon),
            onClick: () => handleDeleteItem(row),
          },
        ),
      ]
    },
  },
]
const { options } = storeToRefs(store)

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function getStatusColor(status: OrderStatus) {
  switch (status) {
    case OrderStatus.Submitted:
      return 'info'
    case OrderStatus.Processing:
      return 'success'
    case OrderStatus.ReadyToSend:
      return 'warning'
    case OrderStatus.Sent:
      return 'success'
    case OrderStatus.Delivered:
      return 'success'
  }
}

function handleDeleteItem() {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure?',
    positiveText: 'Yes, Delete',
    negativeText: 'Cancel',
    onPositiveClick: () => {
      // store.deleteProduct(row.id)
      message.success('Product was deleted!')
    },
  })
}

function rowKey(row: RowData) {
  return row.id
}
function getItems() {
  store.getOrders(options.value)
}

function handlePageChange(page: number) {
  options.value.page = page
  getItems()
}

function handleSorterChange() {
  getItems()
}

function handleFiltersChange() {
  getItems()
}
</script>

<template>
  <n-layout>
    <n-layout-content>
      <div class="px-3">
        <NSpace justify="space-between" class="mb-3">
          <n-input placeholder="Search" />
          <NButton type="primary" @click="router.push('/Orders/Create')">
            <template #icon>
              <NIcon>
                <PlusIcon />
              </NIcon>
            </template>
            {{ t('categories.createButton') }}
          </NButton>
        </NSpace>
        <n-data-table
          :columns="columns" :data="store.orders" :loading="store.isLoading" :pagination="options" :row-key="rowKey"
          :scroll-x="1000" @update:sorter="handleSorterChange" @update:filters="handleFiltersChange"
          @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
