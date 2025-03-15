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
const { t } = useI18n()
const store = useBrandStore()
const message = useMessage()

onMounted(getItems)
const { renderActionButton, renderDeleteActionButton } = useRender()

const columns: DataTableColumns<RowData> = [
  {
    title: t('brands.name'),
    key: 'name',
    fixed: 'left',
  },
  {
    title: t('brands.shortName'),
    key: 'url',
  },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 110,
    render: row =>
      [
        renderActionButton(EditIcon, () => {}),
        renderDeleteActionButton(t('common.deleteConfirm'), () => handleDeleteItem(row)),
      ],
  },
]
const { options } = useOptions()
const showAddDialog = ref(false)

function handleDeleteItem(row: RowData) {
  store.deleteBrand(row.id)
  message.success('Brand was deleted!')
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
  <n-layout>
    <n-layout-content>
      <n-space justify="space-between" class="mb-3">
        <n-input
          v-model="options.query" :value="options.query" :placeholder="t('common.search')"
          @input="searchInListDebounced"
        />
        <NButton type="primary" @click="createBrand">
          <template #icon>
            <NIcon>
              <PlusIcon />
            </NIcon>
          </template>
          {{ t('common.new') }}
        </NButton>
      </n-space>
      <n-data-table
        remote :columns="columns" :data="store.brands" :loading="store.isLoading"
        :pagination="options" :row-key="rowKey" :scroll-x="1000" @update:filters="handleFiltersChange"
        @update:page="handlePageChange"
      />
    </n-layout-content>

    <n-drawer v-model:show="showAddDialog" :width="380" :placement="dialogPlacement">
      <n-drawer-content closable title="Create Brand">
        <CreateBrand @close="showAddDialog = false" />
      </n-drawer-content>
    </n-drawer>
  </n-layout>
</template>

<style scoped lang='scss'></style>
