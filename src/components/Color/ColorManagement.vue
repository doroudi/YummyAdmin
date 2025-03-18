<script setup lang='ts'>
import { type DataTableColumns, NButton, NIcon } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  Edit32Regular as EditIcon,
  Add20Regular as PlusIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'
import { useMessage } from 'naive-ui'

const layout = useLayoutStore()
const { dialogPlacement } = storeToRefs(layout)
const showAddDialog = ref(false)

const { t } = useI18n()
const store = useColorStore()
const message = useMessage()
const { options } = useOptions()
const { renderDeleteActionButton, renderActionButton } = useRender()

onMounted(getItems)
const columns: DataTableColumns<RowData> = [
  {
    title: t('colors.color'),
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
    title: t('colors.name'),
    key: 'name',
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

function handleDeleteItem(row: RowData) {
  store.deleteColor(row.id)
  message.success('Color was deleted successfully!')
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

let searchTimerId: any = null
function searchInListDebounced(value: string) {
  clearTimeout(searchTimerId)
  options.value.query = value
  searchTimerId = setTimeout(() => {
    getItems()
  }, 500) /* 500ms throttle */
}
</script>

<template>
  <n-layout>
    <n-layout-content>
      <div>
        <n-space justify="space-between" class="mb-3">
          <n-input v-model="options.query" :value="options.query" :placeholder="t('common.search')" @input="searchInListDebounced" />
          <NButton type="primary" @click="createColor">
            <template #icon>
              <NIcon>
                <PlusIcon />
              </NIcon>
            </template>
            {{ t('common.new') }}
          </NButton>
        </n-space>
        <n-data-table
          remote :columns="columns" :data="store.colors" :loading="store.isLoading" :pagination="options"
          :row-key="rowKey" :scroll-x="1000" @update:filters="handleFiltersChange" @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>

    <n-drawer v-model:show="showAddDialog" :width="380" :placement="dialogPlacement">
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
