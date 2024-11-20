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
const store = useColorStore()
const dialog = useDialog()
const message = useMessage()
onMounted(getItems)
const columns: DataTableColumns<RowData> = [
  {
    title: 'Color',
    key: 'color',
    width: 250,
    fixed: 'left',
    render(row) {
      return h(
        'span',
        {
          style: { 'background-color': row.color },
          class: 'color-preview',
        },
      )
    },
  },
  {
    title: 'Name',
    key: 'name',
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
      store.deleteColor(row.id)
      message.success('Brand was deleted!')
    },
  })
}

function rowKey(row: RowData) {
  return row.id
}
function getItems() {
  store.getColors(options.value)
}

function handlePageChange(page: number) {
  options.value.page = page
  getItems()
}

function handleFiltersChange() {
  getItems()
}

function createColor() {
  showAddDialog.value = true
}
</script>

<template>
  <n-layout>
    <n-layout-content>
      <div>
        <n-space justify="space-between" class="mb-3">
          <n-input placeholder="Search" />
          <NButton type="primary" @click="createColor">
            <template #icon>
              <NIcon>
                <PlusIcon />
              </NIcon>
            </template>
            {{ t('categories.createButton') }}
          </NButton>
        </n-space>
        <n-data-table
          remote :columns="columns" :data="store.colors" :loading="store.isLoading" :pagination="options"
          :row-key="rowKey" :scroll-x="1000" @update:filters="handleFiltersChange" @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>

    <n-drawer v-model:show="showAddDialog" :width="502" placement="right">
      <n-drawer-content closable :title="t('colors.create.title')">
        <CreateColor @close="showAddDialog = false" />
      </n-drawer-content>
    </n-drawer>
  </n-layout>
</template>

<style lang='scss'>
.color-preview {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    border: solid 3px #FFF;
    box-shadow: 0 0 3px 0 #989898;
    border-radius: 50%;
}
</style>
