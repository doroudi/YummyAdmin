<script setup lang='ts'>
import { type DataTableColumns, NButton, NIcon } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  DismissCircle24Regular as DeleteIcon,
  Edit32Regular as EditIcon,
  AddCircle20Regular as PlusIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'
import { useDialog, useMessage } from 'naive-ui'

const { t } = useI18n()
const store = useBrandStore()
const { brands, isLoading } = storeToRefs(store)
const dialog = useDialog()
const message = useMessage()
onMounted(getItems)
const columns: DataTableColumns<RowData> = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Url Slog',
    key: 'url',
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
            onClick: () => handleDeleteItem(row),
          },
          { default: () => 'Delete' },
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
      <div>
        <div class="flex items-center mb-5">
          <h1 class="page-title mx-2">
            {{ t('brands.title') }}
          </h1>
          <NButton type="primary" quaternary round @click="createBrand">
            <template #icon>
              <NIcon>
                <PlusIcon />
              </NIcon>
            </template>
            {{ t('brands.createButton') }}
          </NButton>
        </div>
        <n-data-table
          remote :columns="columns" :data="brands" :loading="isLoading" :pagination="options"
          :row-key="rowKey" @update:sorter="handleSorterChange" @update:filters="handleFiltersChange"
          @update:page="handlePageChange"
        />
      </div>
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
