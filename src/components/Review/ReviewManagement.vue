<script setup lang='ts'>
import { Delete20Regular as DeleteIcon } from '@vicons/fluent'
import { NRate, NSpace, NText } from 'naive-ui/es/components'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'

const { t } = useI18n()
const store = useReviewStore()
const { renderDeleteActionButton, renderDate } = useRender()
const { options } = useOptions()

onMounted(getItems)

const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    fixed: 'left',
  },
  {
    title: t('reviews.rate'),
    key: 'rate',
    render(row) {
      return [
        h(NRate, {
          color: 'gold',
          readonly: true,
          defaultValue: row.rate,
          allowHalf: false,
        }),
      ]
    },
    fixed: 'left',
  },
  {
    title: t('reviews.comment'),
    key: 'comment',
    render(row) {
      return h(
        NText,
        {},
        {
          default: () => row.comment.message,
        },
      )
    },
  },
  {
    title: t('reviews.product'),
    key: 'name',
    render: (row) =>
      h(
        NSpace,
        {},
        {
          default: () => [
            h(NText, {}, { default: () => `${row.product.name}` }),
          ],
        },
      ),
  },

  {
    title: t('reviews.customer'),
    key: 'phone',
    render(row) {
      return [
        h(
          NText,
          {},
          {
            default: () => `${row.customer.firstName} ${row.customer.lastName}`,
          },
        ),
      ]
    },
  },
  {
    title: t('common.date'),
    key: 'date',
    render: (row) => renderDate(row.date),
  },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 110,
    render() {
      return [renderDeleteActionButton(t('common.deleteConfirm'), () => {})]
    },
  },
]

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

const checkedRows = ref<DataTableRowKey[]>([])
function handleCheck(checkedRowKeys: DataTableRowKey[]) {
  checkedRows.value = checkedRowKeys
}
</script>

<template>
  <n-layout>
    <n-layout-content>
      <div class="px-3">
        <NSpace justify="end" class="mb-3">
          <n-tooltip v-if="checkedRows.length" trigger="hover">
            <template #trigger>
              <NButton mx-2 quaternary circle>
                <template #icon>
                  <NIcon>
                    <DeleteIcon />
                  </NIcon>
                </template>
              </NButton>
            </template>
            <span>{{ t('common.delete') }}</span>
          </n-tooltip>
        </NSpace>

        <SkeletonTable v-if="store.isLoading" :columns="columns" />
        <n-data-table v-else remote :columns="columns" :data="store.reviews" :pagination="options"
          selectable :row-key="rowKey" :scroll-x="1000" @update:sorter="handleSorterChange"
          @update:filters="handleFiltersChange" @update:page="handlePageChange"
          @update:checked-row-keys="handleCheck" />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'></style>
