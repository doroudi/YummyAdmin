<script setup lang="ts">
import { type DataTableColumns, NButton, NIcon } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  DismissCircle24Regular as DeleteIcon,
  Edit32Regular as EditIcon,
  AddCircle20Regular as PlusIcon,
} from '@vicons/fluent'

const { t } = useI18n()
const collapsed = ref(false)
const data: RowData[] = [
  {
    name: 'Mobile',
    count: 33,
    children: [
      {
        name: 'Feature Phone',
        count: 10,
      },
      {
        name: 'Apple',
        count: 3,
      },
      {
        name: 'Samsung',
        index: '08',
        count: 20,
      },
    ],
  },
  {
    name: 'Laptop',
    index: '11',
    count: 22,
  },
  {
    name: 'Home Appliances',
    count: 30,
  },
]
const columns: DataTableColumns<RowData> = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Products Count',
    key: 'count',
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
        <n-data-table :columns="columns" :data="data" :row-key="rowKey" />
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
