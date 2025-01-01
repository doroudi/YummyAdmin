<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
import { type DataTableColumns, NButton, NIcon, NSpace, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  Delete24Regular as DeleteIcon,
  Edit24Regular as EditIcon,
  Add24Filled as PlusIcon,
} from '@vicons/fluent'
import { useDialog, useMessage } from 'naive-ui'

const { t } = useI18n()
const store = useCustomerStore()
const dialog = useDialog()
const message = useMessage()
const router = useRouter()
const { options } = useOptions()
const { renderIcon } = useRender()

const { proxy } = getCurrentInstance()

onMounted(getItems)
const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    fixed: 'left',
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
    title: t('common.actions'),
    key: 'actions',
    width: 110,
    render() {
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
            onClick: () => handleDeleteItem(),
          },
        ),
      ]
    },
  },
]

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

let searchTimerId: any = null
function searchInListDebounced(value: string) {
  options.value.query = value
  clearTimeout(searchTimerId)
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
          <NButton type="primary" @click="router.push('/Products/Create')">
            <template #icon>
              <NIcon>
                <PlusIcon />
              </NIcon>
            </template>
            {{ t('common.new') }}
          </NButton>
        </NSpace>
        <n-data-table
          remote :columns="columns" :data="store.customers.items" :loading="store.isLoading" :pagination="store.customers"
          selectable :row-key="rowKey" :scroll-x="1000" @update:sorter="handleSorterChange"
          @update:filters="handleFiltersChange" @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
