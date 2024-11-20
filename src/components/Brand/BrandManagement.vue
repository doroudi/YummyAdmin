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

const { t } = useI18n()
const store = useBrandStore()
const dialog = useDialog()
const message = useMessage()
onMounted(getItems)
const columns: DataTableColumns<RowData> = [
  {
    title: 'Brand',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Slog',
    key: 'url',
  },
  {
    title: 'Actions',
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
      store.deleteBrand(row.id)
      message.success('Brand was deleted!')
    },
  })
}

function rowKey(row: RowData) {
  return row.id
}
function getItems() {
  store.getBrands(options.value)
}

function handlePageChange(page: number) {
  options.value.page = page
  getItems()
}

function handleFiltersChange() {
  getItems()
}

function createBrand() {
  showAddDialog.value = true
}
</script>

<template>
  <n-layout>
    <n-layout-content>
      <n-space justify="space-between" class="mb-3">
        <n-input placeholder="Search" />
        <NButton type="primary" @click="createBrand">
          <template #icon>
            <NIcon>
              <PlusIcon />
            </NIcon>
          </template>
          {{ t('categories.createButton') }}
        </NButton>
      </n-space>
      <n-data-table
        remote :columns="columns" :data="store.brands" :loading="store.isLoading" :pagination="options"
        :row-key="rowKey" :scroll-x="1000" @update:filters="handleFiltersChange" @update:page="handlePageChange"
      />
    </n-layout-content>

    <n-drawer v-model:show="showAddDialog" :width="502" placement="right">
      <n-drawer-content closable title="Create Brand">
        <CreateBrand @close="showAddDialog = false" />
      </n-drawer-content>
    </n-drawer>
  </n-layout>
</template>

<style scoped lang='scss'>
</style>
