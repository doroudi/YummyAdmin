<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
import { type DataTableColumns, type DataTableRowKey, NButton, NIcon, NSpace, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  Delete20Regular as DeleteIcon,
  Edit24Regular as EditIcon,
  Add24Filled as PlusIcon,
} from '@vicons/fluent'
import { useMessage } from 'naive-ui'

const { t } = useI18n()
const store = useCustomerStore()
const message = useMessage()
const router = useRouter()
const { options } = useOptions()
const { renderActionButton, renderDeleteActionButton, renderUserAvatar } = useRender()

const { proxy } = getCurrentInstance()

onMounted(getItems)
const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    fixed: 'left',
  },

  {
    title: t('customers.customerName'),
    key: 'name',
    render: row => renderUserAvatar(row.avatar, `${row.firstName} ${row.lastName}`),
  },
  {
    title: t('customers.joinDate'),
    key: 'join-date',
    render(row) {
      return h(NText,
        {}, {
          default: () => proxy.$filters.friendlyTime(row.joinDate),
        })
    },
  },
  {
    title: t('customers.phone'),
    key: 'phone',
    render(row) {
      return [
        h(NText, {}, { default: () => row.mobile }),
      ]
    },
  },
  {
    title: t('customers.email'),
    key: 'email',
    render(row) {
      return h(NText,
        {}, {
          default: () => row.email.toLowerCase(),
        })
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
    render: () =>
      [
        renderActionButton(EditIcon, () => { }),
        renderDeleteActionButton(t('common.deleteConfirm'), () => handleDeleteItem()),
      ],
  },
]

function handleDeleteItem() {
  message.warning('Api not implemented yet :|')
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

const checkedRows = ref<DataTableRowKey[]>([])
function handleCheck(checkedRowKeys: DataTableRowKey[]) {
  checkedRows.value = checkedRowKeys
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
          <div>
            <n-tooltip v-if="checkedRows.length" trigger="hover">
              <template #trigger>
                <NButton mx-2 quaternary circle>
                  <template #icon>
                    <NIcon>
                      <DeleteIcon />
                    </NIcon>
                  </template>
                </NButton>
              </template>
              <span>{{ t('common.delete') }}</span>
            </n-tooltip>
            <NButton type="primary" @click="router.push('/Products/Create')">
              <template #icon>
                <NIcon>
                  <PlusIcon />
                </NIcon>
              </template>
              {{ t('common.new') }}
            </NButton>
          </div>
        </NSpace>
        <n-data-table
          remote :columns="columns" :data="store.customers" :loading="store.isLoading"
          :pagination="options" selectable :row-key="rowKey" :scroll-x="1000"
          @update:sorter="handleSorterChange" @update:filters="handleFiltersChange" @update:page="handlePageChange"
          @update:checked-row-keys="handleCheck"
        />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
