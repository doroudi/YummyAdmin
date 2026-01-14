<script setup lang='ts'>
import {
  Add24Filled as PlusIcon,
  // Filter24Regular as FilterIcon
} from '@vicons/fluent'
import type { DataTableColumns, DataTableRowKey, DataTableSortState } from 'naive-ui/es/components'
import { NButton, NIcon, NSpace, NSwitch, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { ProductStatus } from '~/models/Product'

const{ enumToFilter } = useFilter()
const { t } = useI18n()
const store = useProductStore()
const router = useRouter()
const { renderDeleteActionButton } = useRender()
const { options } = useOptions()

const { renderPrice, renderRate, renderTag, renderProductImage } = useRender()

onMounted(getItems)

const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    fixed: 'left',
  },
  {
    title: t('products.name'),
    key: 'name',
    render: (row) => renderProductImage(row.image, row.name),
  },
  {
    title: t('products.category'),
    key: 'category',
    render(row) {
      return h(
        NText,
        {},
        {
          default: () => row.category.name,
        },
      )
    },
  },
  {
    title: t('products.rate'),
    key: 'rate',
    sorter: (row1, row2) => row1.age - row2.age,
    render: (row) => renderRate(row.rate),
  },
  {
    title: t('common.price'),
    key: 'price',
    sorter: (row1, row2) => row1.age - row2.age,
    render: (row) => renderPrice(row.price, t('currencySign')),
  },
  {
    title: t('common.status'),
    key: 'status',
    filterOptions: enumToFilter(ProductStatus),
    filter(value, row) {
      return Boolean(~row.status.indexOf(value as string))
    },
    render: (row) =>
      renderTag(
        row.status,
        getStatusColor(row.status),
        ProductStatus,
        'ProductStatus',
      ),
  },
  {
    title: t('products.stoke'),
    key: 'stock',
    render: (row) => h(NSwitch, { value: row.stock, size: 'small' }, {}),
  },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 110,
    render: (row) => [
      renderDeleteActionButton(t('common.deleteConfirm'), () =>
        handleDeleteItem(row),
      ),
    ],
  },
]
const show = ref(false)
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

async function handleDeleteItem(row: RowData) {
  await store.deleteProduct(row.id)
  useNotifyStore().success(t('products.deleteMessage'))
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

function handleFiltersChange() {
  getItems()
}

function onUpdatePageSize(pageSize: number) {
  options.value.pageSize = pageSize
  options.value.page = 1
  getItems()
}

const checkedRows = ref<DataTableRowKey[]>([])
function handleCheck(checkedRowKeys: DataTableRowKey[]) {
  checkedRows.value = checkedRowKeys
}

async function handleDeleteSelected() {
  await store.deleteMultipleProducts(checkedRows.value)
  useNotifyStore().success(t('products.deleteMessage'))

  checkedRows.value = []
}

function handleSorterChange(sorter: DataTableSortState) {
  options.value.sortBy = sorter.columnKey
  if(sorter.order === 'descend')
    options.value.sortDesc = 'true'
  getItems()
s}

</script>

<template>
  <n-layout>
    <n-layout-content>
      <div class="px-3">
        <NSpace justify="space-between" class="mb-3">
          <div>

            <SearchInput v-model="options.query" @search="getItems" />
            <!-- <NButton secondary type="primary" @click="show = !show" class="ms-2">
              <template #icon>
                <NIcon>
                  <FilterIcon />
                </NIcon>
              </template>
              {{ t('common.filter') }}
            </NButton> -->
          </div>
          <div>
            <DeleteSelectedItems v-if="checkedRows.length" @delete="handleDeleteSelected" />

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

        <div>
          <n-collapse-transition :show="show">
            <div pt-2 pb-5>
            <SearchInput v-model="options.query" @search="getItems" />
            </div>
          </n-collapse-transition>
          </div>
        <SkeletonTable v-if="store.isLoading" :columns="columns" />
        <n-data-table v-else remote :columns="columns" :data="store.products" :pagination="options" selectable
          :row-key="rowKey" :scroll-x="1000" @update:sorter="handleSorterChange" @update:pageSize="onUpdatePageSize"
          @update:filters="handleFiltersChange" 
          @update:checked-row-keys="handleCheck"
          @update:page="handlePageChange" />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
