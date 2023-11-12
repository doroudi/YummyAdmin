<script setup lang="ts">
import { type DataTableColumns, NButton, NIcon } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  DismissCircle24Regular as DeleteIcon,
  Edit32Regular as EditIcon,
  AddCircle20Regular as PlusIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const collapsed = ref(false)
const store = useCategoryStore()
const { categories, isLoading } = storeToRefs(store)
onMounted(getItems)
const columns: DataTableColumns<RowData> = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Products Count',
    key: 'productsCount',
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 200,
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            renderIcon: renderIcon(EditIcon),
            ghost: true,
            class: 'mr-2',
            onClick: () => edit(row),
          },
          { default: () => 'Edit' },
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            ghost: true,
            renderIcon: renderIcon(DeleteIcon),
            onClick: () => deleteItem(row),
          },
          { default: () => 'Delete' },
        ),
      ]
    },
  },
]
const { options } = storeToRefs(store)

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function edit(row: RowData) {

}
function deleteItem(row: RowData) {

}
function rowKey(row: RowData) {
  return row.index
}
function getItems() {
  store.getCategories(options.value)
}

function query(page: number, pageSize = 10, order = 'ascend', filterValues = []) {
  console.log('🚀 ~ file: index.vue:77 ~ query ~ filterValues:', filterValues)
  console.log('🚀 ~ file: index.vue:77 ~ query ~ order:', order)
  console.log('🚀 ~ file: index.vue:77 ~ query ~ pageSize:', pageSize)
  console.log('🚀 ~ file: index.vue:77 ~ query ~ page:', page)
}

function handlePageChange() {
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
  <n-layout has-sider>
    <n-layout-content>
      <div>
        <div class="flex justify-between">
          <h1 class="page-title">
            {{ t('category.title') }}
          </h1>
          <NButton type="primary" quaternary round>
            <template #icon>
              <NIcon>
                <PlusIcon />
              </NIcon>
            </template>
            Create
          </NButton>
        </div>
        <n-data-table
          remote :columns="columns" :data="categories" :loading="isLoading" :pagination="options"
          :row-key="rowKey" @update="query" @update:sorter="handleSorterChange" @update:filters="handleFiltersChange"
          @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>
    <n-layout-sider
      bordered collapse-mode="width" :collapsed-width="0" :width="300" :collapsed="collapsed" show-trigger
      @collapse="collapsed = true" @expand="collapsed = false"
    >
      <CategoryStatics />
    </n-layout-sider>
  </n-layout>
</template>

<style scoped></style>
