<script setup lang='ts'>
import { type DataTableColumns, NButton, NIcon } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  Edit32Regular as EditIcon,
  Add20Regular as PlusIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'
import { useMessage } from 'naive-ui'

const { renderDeleteActionButton, renderActionButton } = useRender()
const layout = useLayoutStore()
const { dialogPlacement } = storeToRefs(layout)
const { t } = useI18n()
const collapsed = ref(useWindowSize().width.value < 600)
const store = useCategoryStore()
const message = useMessage()

onMounted(getItems)

const columns: DataTableColumns<RowData> = [
  {
    title: t('category.name'),
    key: 'name',
    fixed: 'left',
  },
  {
    title: t('category.productsCount'),
    key: 'productsCount',
  },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 110,
    render: row =>
      [
        renderActionButton(EditIcon, () => { }),
        renderDeleteActionButton(t('common.deleteConfirm'), () => handleDeleteItem(row)),
      ],
  },
]
const { options } = useOptions()
const showAddDialog = ref(false)

function handleDeleteItem(row: RowData) {
  store.deleteCategory(row.id)
  message.success('Category was deleted!')
}

function rowKey(row: RowData) {
  return row.id
}
function getItems() {
  store.getCategories(options.value)
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

function createCategory() {
  showAddDialog.value = true
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
  <n-layout has-sider sider-placement="right">
    <n-layout-content>
      <div class="px-3">
        <n-space justify="space-between" class="mb-3">
          <n-input v-model="options.query" :value="options.query" :placeholder="t('common.search')" @input="searchInListDebounced" />
          <NButton type="primary" @click="createCategory">
            <template #icon>
              <NIcon>
                <PlusIcon />
              </NIcon>
            </template>
            {{ t('common.new') }}
          </NButton>
        </n-space>
        <n-data-table
          remote :columns="columns" :data="store.categories" :loading="store.isLoading"
          :pagination="options" :scroll-x="1000" :row-key="rowKey" @update:sorter="handleSorterChange"
          @update:filters="handleFiltersChange" @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>
    <n-layout-sider
      bordered collapse-mode="width" :collapsed-width="0" :width="300" :collapsed="collapsed"
      @collapse="collapsed = true" @expand="collapsed = false"
    >
      <CategoryStatics />
    </n-layout-sider>

    <n-drawer v-model:show="showAddDialog" :width="380" :placement="dialogPlacement">
      <n-drawer-content class="rtl" closable :title="t('categories.create.title')">
        <CreateCategory @close="showAddDialog = false" />
      </n-drawer-content>
    </n-drawer>
  </n-layout>
</template>

<style scoped lang='scss'>
</style>
