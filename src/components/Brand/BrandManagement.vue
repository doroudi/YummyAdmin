<script setup lang='ts'>
import {
  Edit32Regular as EditIcon,
  Add20Regular as PlusIcon,
} from '@vicons/fluent'
import { type DataTableColumns, NButton, NIcon } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { storeToRefs } from 'pinia'
import type { Brand } from '~/models/Brand'

const layout = useLayoutStore()
const { dialogPlacement } = storeToRefs(layout)
const { t } = useI18n()
const store = useBrandStore()

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
  store.deleteBrand(row.id)
  getItems()
  useNotifyStore().success(`Brand ${row.name} was deleted!`)
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

function createBrand() {
  showAddDialog.value = true
}
</script>

<template>
  <n-layout>
    <n-layout-content>
      <n-space justify="space-between" class="mb-3">
        <SearchInput v-model="options.query" @search="getItems" />
        <NButton type="primary" @click="createBrand">
          <template #icon>
            <NIcon>
              <PlusIcon />
            </NIcon>
          </template>
          {{ t('common.new') }}
        </NButton>
      </n-space>

      <SkeletonTable v-if="store.isLoading" :columns="columns" />
      <n-data-table v-else remote :columns="columns" :data="store.brands"
        :pagination="options" :row-key="rowKey" :scroll-x="1000" @update:filters="getItems"
        @update:page="handlePageChange" />



    </n-layout-content>

    <n-drawer v-model:show="showAddDialog" :width="380" :placement="dialogPlacement">
      <n-drawer-content closable title="Create Brand">
        <CreateBrand @close="showAddDialog = false" />
      </n-drawer-content>
    </n-drawer>
  </n-layout>
</template>
