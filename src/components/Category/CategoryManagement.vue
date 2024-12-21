<script setup lang='ts'>
import { type DataTableColumns, NButton, NIcon } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  Delete24Regular as DeleteIcon,
  Edit32Regular as EditIcon,
  Add20Regular as PlusIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'
import { useDialog, useMessage } from 'naive-ui'

const layout = useLayoutStore()
const { dialogPlacement } = storeToRefs(layout)

const { t } = useI18n()
const collapsed = ref(false)
const store = useCategoryStore()
const dialog = useDialog()
const message = useMessage()
onMounted(getItems)
const columns: DataTableColumns<RowData> = [
  {
    title: 'Category',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Products Count',
    key: 'productsCount',
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
            renderIcon: renderIcon(EditIcon),
            quaternary: true,
            circle: true,
            class: 'mr-2',
            onClick: () => {},
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
const showAddDialog = ref(false)

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
      store.deleteCategory(row.id)
      message.success('Category was deleted!')
    },
  })
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
          <n-input :placeholder="t('common.search')" />
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
          remote :columns="columns" :data="store.categories" :loading="store.isLoading" :pagination="options" selectable
          :scroll-x="1000" :row-key="rowKey" @update:sorter="handleSorterChange" @update:filters="handleFiltersChange"
          @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>
    <n-layout-sider
      bordered collapse-mode="width" :collapsed-width="0" :width="300" :collapsed="collapsed"
      @collapse="collapsed = true" @expand="collapsed = false"
    >
      <CategoryStatics />
    </n-layout-sider>

    <n-drawer v-model:show="showAddDialog" :width="502" :placement="dialogPlacement">
      <n-drawer-content class="rtl" closable :title="t('categories.create.title')">
        <CreateCategory @close="showAddDialog = false" />
      </n-drawer-content>
    </n-drawer>
  </n-layout>
</template>

<style scoped lang='scss'>
</style>
