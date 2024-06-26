<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
import { type DataTableColumns, NButton, NIcon, NSpace, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  Delete24Regular as DeleteIcon,
  Edit24Regular as EditIcon,
  Add24Filled as PlusIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'
import { useDialog, useMessage } from 'naive-ui'

const { t } = useI18n()
const store = useCustomerStore()
const { customers, isLoading } = storeToRefs(store)
const dialog = useDialog()
const message = useMessage()
const router = useRouter()

const { proxy } = getCurrentInstance()

onMounted(getItems)
const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
  },
  {
    title: 'NAME',
    key: 'name',
    render: row =>
      h(NSpace, {}, {
        default: () => [
          h(NText, {}, { default: () => `${row.firstName} ${row.lastName}` }),
        ],
      }),
  },
  {
    title: 'Join Date',
    key: 'join-date',
    render(row) {
      return h(NText,
        {}, {
          default: () => proxy.$filters.friendlyTime(row.joinDate),
        })
    },
  },
  {
    title: 'Phone',
    key: 'phone',
    render(row) {
      return [
        h(NText, {}, { default: () => row.mobile }),
      ]
    },
  },
  {
    title: 'Email',
    key: 'email',
    render(row) {
      return h(NText,
        {}, {
          default: () => row.email,
        })
    },
  },
  {
    title: 'Orders Count',
    key: 'ordersCount',
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
            renderIcon: renderIcon(EditIcon),
            quaternary: true,
            circle: true,
            class: 'mr-2',
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

function handleDeleteItem(row: RowData) {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure?',
    positiveText: 'Yes, Delete',
    negativeText: 'Cancel',
    onPositiveClick: () => {
      store.deleteProduct(row.id)
      message.success('Product was deleted!')
    },
  })
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
          <NButton type="primary" @click="router.push('/Products/Create')">
            <template #icon>
              <NIcon>
                <PlusIcon />
              </NIcon>
            </template>
            {{ t('categories.createButton') }}
          </NButton>
        </NSpace>
        <n-data-table
          remote :columns="columns" :data="customers" :loading="isLoading" :pagination="options"
          selectable :row-key="rowKey" @update:sorter="handleSorterChange" @update:filters="handleFiltersChange"
          @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
