<script setup lang='ts'>
import {
  Edit32Regular as EditIcon,
  Add20Regular as PlusIcon,
} from '@vicons/fluent'
import { useMessage } from 'naive-ui'
import { type DataTableColumns, NButton, NIcon } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { storeToRefs } from 'pinia'

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
    render: (row) => [
      renderActionButton(EditIcon, () => {}),
      renderDeleteActionButton(t('common.deleteConfirm'), () =>
        handleDeleteItem(row),
      ),
    ],
  },
]
const { options } = useOptions()
const showAddDialog = ref(false)

function handleDeleteItem(row: RowData) {
  store.deleteCategory(row.id)
  useNotifyStore().success(t('common.deletedMessage'))
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
</script>

<template>
  <n-layout has-sider sider-placement="right">
    <n-layout-content>
      <div class="px-3">
        <n-space justify="space-between" class="mb-3">
          <SearchInput v-model="options.query" @search="getItems" />
          <NButton type="primary" @click="createCategory">
            <template #icon>
              <NIcon>
                <PlusIcon />
              </NIcon>
            </template>
            {{ t('common.new') }}
          </NButton>
        </n-space>
        <SkeletonTable v-if="store.isLoading" :columns="columns" />
        <n-data-table v-else remote :columns="columns" :data="store.categories"
          :pagination="options" :scroll-x="1000" :row-key="rowKey" @update:sorter="handleSorterChange"
          @update:filters="handleFiltersChange" @update:page="handlePageChange" />
      </div>
    </n-layout-content>
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="0" :width="300" :collapsed="collapsed"
      @collapse="collapsed = true" @expand="collapsed = false">
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
