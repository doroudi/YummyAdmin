<script setup lang='ts'>
import { type DataTableColumns, NButton, NIcon, NSpace, NSwitch, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  Delete24Regular as DeleteIcon,
  Add24Filled as PlusIcon,
} from '@vicons/fluent'
import { useDialog, useMessage } from 'naive-ui'
import { ProductStatus } from '~/models/Product'

const { t } = useI18n()
const store = useProductStore()
const dialog = useDialog()
const message = useMessage()
const router = useRouter()
const { renderIcon } = useRender()
const { options } = useOptions()

const { renderPrice, renderRate, renderTag, renderProductImage } = useRender()

onMounted(getItems)
const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    fixed: 'left',
  },
  {
    title: 'Product',
    key: 'name',
    render: row => renderProductImage(row.image, row.name),
  },
  {
    title: 'Category',
    key: 'category',
    render(row) {
      return h(NText,
        {}, {
          default: () => row.category.name,
        })
    },
  },
  {
    title: 'Rate',
    key: 'rate',
    render: row => renderRate(row.rate),
  },
  {
    title: 'Price',
    key: 'price',
    render: row => renderPrice(row.price, t('currencySign')),
  },
  {
    title: 'Status',
    key: 'status',
    render: row => renderTag(row.status, getStatusColor(row.status), ProductStatus),
  },
  {
    title: 'Stock',
    key: 'stock',
    render: row => h(NSwitch, { value: row.stock, size: 'small' }, {}),
  },
  {
    title: t('common.actions'),
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
            renderIcon: renderIcon(DeleteIcon),
            onClick: () => handleDeleteItem(row),
          },
        ),
      ]
    },
  },
]
function getStatusColor(status: ProductStatus) {
  switch (status) {
    case ProductStatus.Draft:
      return 'info'
    case ProductStatus.Active:
      return 'success'
    case ProductStatus.NotActive:
      return 'warning'
  }
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
  store.getProducts(options.value)
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
function searchInListDebounced() {
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
          remote :columns="columns" :data="store.products.items" :loading="store.isLoading" :pagination="options" selectable
          :row-key="rowKey" :scroll-x="1000" @update:sorter="handleSorterChange"
          @update:filters="handleFiltersChange" @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
