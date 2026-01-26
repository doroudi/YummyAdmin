<script setup lang='ts'>
import {
  Add24Filled as PlusIcon,
  FilterDismiss24Regular as FilterIcon
} from '@vicons/fluent'
import type { DataTableColumns, DataTableRowKey, DataTableSortState } from 'naive-ui/es/components'
import { NButton, NIcon, NSpace, NSwitch, NText } from 'naive-ui/es/components'
import type { FilterOptionValue, RowData } from 'naive-ui/es/data-table/src/interface'
import { ProductStatus } from '~/models/Product'
import YummyDataTable from '../shared/YummyDataTable.vue'

const { enumToFilter } = useFilter()
const { t } = useI18n()
const store = useProductStore()
const router = useRouter()
const { renderDeleteActionButton } = useRender()
const { options, bindOptionsToDataTable, filterApplied, resetFilters } = useOptions()

const { renderPrice, renderRate, renderTag, renderProductImage } = useRender()

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
    sorter: true,
    render: (row) => renderRate(row.rate),
  },
  {
    title: t('common.price'),
    key: 'price',
    sorter: true,
    render: (row) => renderPrice(row.price, t('currencySign')),
  },
  {
    title: t('common.status'),
    key: 'status',
    filter: true,
    filterOptionValues: [],
    filterOptions: enumToFilter(ProductStatus, 'ProductStatus'),
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

onMounted(() => {
  bindOptionsToDataTable(columns)
  getItems()
})

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

  // if (sorter.order === 'descend')
  //   options.value.sortDesc = 'true'

  bindOptionsToDataTable(columns)
  getItems()
}

function handleFiltersChange(filterValues: FilterOptionValue[] | null) {
  options.value = { ...options.value, ...filterValues }
  bindOptionsToDataTable(columns)
  getItems()
}

function resetFilter() {
  resetFilters()
  bindOptionsToDataTable(columns)
  getItems()
}

function fetchProducts(options: any) {
  store.getProducts(options)
}

</script>

<template>
  <n-layout>
    <n-layout-content>
      <div class="px-3">
        <YummyDataTable reload-on-mount :columns="columns" :rows="store.products" :row-key="(row: any) => row.id"
          :data="store.products" :loading="store.isLoading" :fetch="(opt: any) => fetchProducts(opt)"
          v-model:checkedRowKeys="checkedRows">
          <template #toolbar="{ filterApplied, resetFilters }">
            <!-- <n-button :disabled="!filterApplied" @click="resetFilters()">Reset</n-button>
            <n-button :disabled="!checkedRows.length" @click="deleteSelected()">Delete</n-button> -->

            <NSpace justify="space-between" class="mb-3">
              <div>
                <SearchInput v-model="options.query" @search="getItems" />
                <NButton v-if="filterApplied" @click="resetFilters()" secondary type="primary" class="ms-2">
                  <template #icon>
                    <NIcon>
                      <FilterIcon />
                    </NIcon>
                  </template>
                  {{ t('common.clearFilter') }}
                </NButton>
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
          </template>

          <template #empty>
            No products found.
          </template>
        </YummyDataTable>

        <!-- <YummyDataTable :fetch ="(opts)=> store.getProducts(mapToApi(opts))" /> -->
        <!-- <SkeletonTable v-if="store.isLoading" :columns="columns" />
        <n-data-table v-else remote :columns="columns" :data="store.products" :pagination="options" selectable
          :row-key="rowKey" :scroll-x="1000" @update:sorter="handleSorterChange" @update:pageSize="onUpdatePageSize"
          @update:filters="handleFiltersChange" @update:checked-row-keys="handleCheck"
          @update:page="handlePageChange" /> -->
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
