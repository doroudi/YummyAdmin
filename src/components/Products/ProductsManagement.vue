<script setup lang='ts'>
import {
  Add24Filled as PlusIcon,
  Filter24Regular as FilterIcon
} from '@vicons/fluent'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui/es/components'
import { NButton, NIcon, NSpace, NSwitch, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { ProductStatus } from '~/models/Product'

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
    render: (row) => renderRate(row.rate),
  },
  {
    title: t('common.price'),
    key: 'price',
    render: (row) => renderPrice(row.price, t('currencySign')),
  },
  {
    title: t('common.status'),
    key: 'status',
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

function handleSorterChange() {
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
let searchTimerId: any = null
function searchInListDebounced(value: string) {
  clearTimeout(searchTimerId)
  options.value.query = value
  searchTimerId = setTimeout(() => {
    getItems()
  }, 500) /* 500ms throttle */
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

</script>

<template>
  <n-layout>
    <n-layout-content>
      <div class="px-3">
        <NSpace justify="space-between" class="mb-3">
          <div>

            <SearchInput v-model="options.query" @search="getItems" />

            <Filter>
              hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde libero iure minus consequatur sunt distinctio corrupti, quae delectus pariatur facilis blanditiis nemo deserunt reiciendis earum nesciunt? Quos laudantium repellendus voluptatem?
            </Filter>
            <!-- <NButton secondary type="success" class="ms-2">
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
        <SkeletonTable v-if="store.isLoading" :columns="columns" />
        <n-data-table v-else remote :columns="columns" :data="store.products" :pagination="options" selectable
          :row-key="rowKey" :scroll-x="1000" @update:sorter="handleSorterChange" @update:pageSize="onUpdatePageSize"
          @update:filters="handleFiltersChange" @update:checked-row-keys="handleCheck"
          @update:page="handlePageChange" />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
