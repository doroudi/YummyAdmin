<script setup lang='ts'>
import { type DataTableColumns, NButton, NIcon, NRate, NSpace, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import {
  Delete24Regular as DeleteIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'
import { useDialog, useMessage } from 'naive-ui'

const store = useReviewStore()
const dialog = useDialog()
const message = useMessage()

onMounted(getItems)
const columns: DataTableColumns<RowData> = [
  {
    title: 'RATE',
    key: 'rate',
    render(row) {
      return [
        h(NRate, { color: 'gold', readonly: true, defaultValue: row.rate, allowHalf: true }),
      ]
    },
    fixed: 'left',
  },
  {
    title: 'COMMENT',
    key: 'comment',
    render(row) {
      return h(NText,
        {}, {
          default: () => row.comment.message,
        })
    },
  },
  {
    title: 'PRODUCT',
    key: 'name',
    render: row =>
      h(NSpace, {}, {
        default: () => [
          h(NText, {}, { default: () => `${row.product.name}` }),
        ],
      }),
  },

  {
    title: 'CUSTOMER',
    key: 'phone',
    render(row) {
      return [
        h(NText, {}, { default: () => `${row.customer.firstName} ${row.customer.lastName}` }),
      ]
    },
  },
  {
    title: 'DATE',
    key: 'date',
    render(row) {
      return h(NText,
        {}, {
          default: () => row.date,
        })
    },
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

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function handleDeleteItem() {
  dialog.error({
    title: 'Confirm',
    content: 'Are you sure?',
    positiveText: 'Yes, Delete',
    negativeText: 'Cancel',
    onPositiveClick: () => {
      /// store.deleteProduct(row.id)
      message.success('Product was deleted!')
    },
  })
}

function rowKey(row: RowData) {
  return row.id
}
function getItems() {
  store.getReviews(options.value)
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
</script>

<template>
  <n-layout>
    <n-layout-content>
      <div class="px-3">
        <n-data-table
          remote :columns="columns" :data="store.reviews" :loading="store.isLoading" :pagination="options" selectable
          :row-key="rowKey" :scroll-x="1000" @update:sorter="handleSorterChange"
          @update:filters="handleFiltersChange" @update:page="handlePageChange"
        />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
