<script setup lang='ts'>
import { Edit24Regular as EditIcon } from '@vicons/fluent'
import { useMessage } from 'naive-ui'
import { type DataTableColumns, NSpace, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import CustomerDetail from './CustomerDetail.vue'

const { t } = useI18n()
const store = useCustomerStore()
const message = useMessage()
const { options } = useOptions()
const { renderActionButton, renderDeleteActionButton, renderUserAvatar } =
  useRender()

onMounted(() => {
  getItems()
})
const columns: DataTableColumns<RowData> = [
  {
    type: 'expand',
    renderExpand: (rowData) => renderCustomerDetails(rowData),
  },
  {
    title: t('customers.customerName'),
    key: 'name',
    render: (row) =>
      renderUserAvatar(row.avatar, `${row.firstName} ${row.lastName}`),
  },
  {
    title: t('customers.joinDate'),
    key: 'join-date',
    render(row) {
      return h(
        NText,
        {},
        {
          default: () => new Date(row.joinDate).toLocaleDateString(),
        },
      )
    },
  },
  {
    title: t('customers.phone'),
    key: 'phone',
    render(row) {
      return [h(NText, {}, { default: () => row.mobile })]
    },
  },
  {
    title: t('customers.email'),
    key: 'email',
    render(row) {
      return h(
        NText,
        {},
        {
          default: () => row.email.toLowerCase(),
        },
      )
    },
  },
  {
    title: t('customers.ordersCount'),
    key: 'ordersCount',
  },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 110,
    render: (row) => [
      renderActionButton(EditIcon, () => {}),
      renderDeleteActionButton(t('common.deleteConfirm'), () =>
        handleDeleteItem(row),
      ),
    ],
  },
]

function renderCustomerDetails(data: any) {
  return h(
    NSpace,
    {},
    {
      default: () => h(CustomerDetail, { customer: data }, {}),
    },
  )
}

function handleDeleteItem(item: RowData) {
  store.delete(item.id)
  message.success('Deleted')
}

function rowKey(row: RowData) {
  return row.id
}
function getItems() {
  store.getCustomers(options.value)
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
          <SearchInput v-model="options.query" @search="getItems" />
        </NSpace>
        <SkeletonTable v-if="store.isLoading" :columns="columns" />
        <n-data-table v-else remote selectable :columns="columns" :data="store.customers"
          :pagination="options" :row-key="rowKey" :scroll-x="1000" @update:sorter="getItems" @update:filters="getItems"
          @update:page="handlePageChange" @update:checked-row-keys="handleCheck" />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
