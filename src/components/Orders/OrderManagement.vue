<script setup lang='ts'>
import {
  Eye20Regular as ViewIcon,
  ArrowSync20Regular as RefreshIcon,
} from '@vicons/fluent'
import {
  type DataTableColumns,
  NButton,
  NIcon,
  NPopconfirm,
  NSelect,
  NSpace,
  NTag,
  NText,
  NTooltip,
} from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { OrderStatus } from '~/models/Order'
import OrderDetailDrawer from './OrderDetailDrawer.vue'

const {
  renderActionButton,
  renderTag,
  renderPrice,
  renderUserAvatar,
  renderDeleteActionButton,
} = useRender()
const { getStatusColor } = useOrders()
const store = useOrderStore()
const { proxy } = getCurrentInstance()
const { t } = useI18n()

onMounted(getItems)

const checkedRowKeys = ref<(string | number)[]>([])
const showDetailDrawer = ref(false)
const selectedOrder = ref<any>(null)
const selectedBatchStatus = ref<OrderStatus | null>(null)
const isBatchUpdating = ref(false)

const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    key: 'selection',
    width: 50,
  },
  {
    title: t('orders.customer'),
    key: 'customer',
    fixed: 'left',
    render: (row) => renderUserAvatar(row.customer.avatar, row.customer.name),
  },
  {
    title: t('common.date'),
    key: 'createdDate',
    render: (row) =>
      h(
        NText,
        {},
        { default: () => proxy.$filters.friendlyTime(row.createdDate) },
      ),
  },
  {
    title: t('orders.itemsCount'),
    key: 'itemsCount',
  },
  {
    title: t('common.price'),
    key: 'category',
    render: (row) => renderPrice(row.totalPrice, t('currencySign')),
  },
  {
    title: t('common.status'),
    key: 'status',
    render: (row) =>
      renderTag(
        row.status,
        getStatusColor(row.status),
        OrderStatus,
        'OrderStatus',
      ),
  },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 150,
    render: (row) => [
      h(
        NTooltip,
        { trigger: 'hover' },
        {
          default: () => t('common.view'),
          trigger: () =>
            renderActionButton(ViewIcon, () => handleViewDetail(row)),
        },
      ),
      renderDeleteActionButton(t('common.deleteConfirm'), () =>
        handleDeleteItem(row),
      ),
    ],
  },
]
const { options } = useOptions()

const hasSelection = computed(() => checkedRowKeys.value.length > 0)

const batchStatusOptions = computed(() => [
  { label: t(`enums.OrderStatus.${OrderStatus[OrderStatus.Processing]}`), value: OrderStatus.Processing },
  { label: t(`enums.OrderStatus.${OrderStatus[OrderStatus.ReadyToSend]}`), value: OrderStatus.ReadyToSend },
  { label: t(`enums.OrderStatus.${OrderStatus[OrderStatus.Sent]}`), value: OrderStatus.Sent },
  { label: t(`enums.OrderStatus.${OrderStatus[OrderStatus.Delivered]}`), value: OrderStatus.Delivered },
])

function getItems() {
  store.getOrders(options.value)
}

function handlePageChange(page: number) {
  options.value.page = page
  getItems()
}

function rowKey(row: RowData) {
  return row.id
}

async function handleDeleteItem(row: RowData) {
  await store.deleteItem(row.id)
  useNotifyStore().success('Order was deleted!')
}

function handleViewDetail(row: RowData) {
  selectedOrder.value = { ...row }
  showDetailDrawer.value = true
}

function handleDetailStatusChanged(orderId: string, newStatus: OrderStatus) {
  store.updateOrderStatusLocal(orderId, newStatus)
  checkedRowKeys.value = checkedRowKeys.value.filter((id) => id !== orderId)
}

function getSelectedOrders() {
  return store.orders.filter((order) =>
    checkedRowKeys.value.includes(order.id),
  )
}

function filterOperableOrders(orders: any[]) {
  const operable: any[] = []
  const inoperable: any[] = []

  orders.forEach((order) => {
    if (order.status !== OrderStatus.Delivered) {
      operable.push(order)
    } else {
      inoperable.push(order)
    }
  })

  return { operable, inoperable }
}

async function handleBatchStatusChange() {
  if (!selectedBatchStatus.value || !hasSelection.value) return

  const selectedOrders = getSelectedOrders()
  const { operable, inoperable } = filterOperableOrders(selectedOrders)

  if (inoperable.length > 0) {
    useNotifyStore().warning(
      `${inoperable.length} order(s) are already delivered and cannot be modified. They have been excluded from the operation.`,
    )
  }

  if (operable.length === 0) {
    useNotifyStore().info('No orders can be modified.')
    return
  }

  isBatchUpdating.value = true
  try {
    const results = await store.batchUpdateOrderStatus(
      operable.map((o) => o.id),
      selectedBatchStatus.value,
    )

    const successCount = results.success.length
    const failCount = results.failed.length

    if (successCount > 0) {
      useNotifyStore().success(
        `Successfully updated ${successCount} order(s) to ${t(`enums.OrderStatus.${OrderStatus[selectedBatchStatus.value!]}`)}.`,
      )
    }

    if (failCount > 0) {
      useNotifyStore().error(
        `Failed to update ${failCount} order(s).`,
      )
    }

    checkedRowKeys.value = []
    selectedBatchStatus.value = null
  } catch (error) {
    useNotifyStore().error('Failed to perform batch status update.')
  } finally {
    isBatchUpdating.value = false
  }
}

function handleClearSelection() {
  checkedRowKeys.value = []
}
</script>

<template>
  <n-layout>
    <n-layout-content>
      <div class="px-3">
        <NSpace justify="space-between" class="mb-3">
          <SearchInput v-model="options.query" @search="getItems" />
          <NSpace v-if="hasSelection" align="center">
            <NText>{{ checkedRowKeys.length }} selected</NText>
            <NSelect
              v-model:value="selectedBatchStatus"
              :options="batchStatusOptions"
              placeholder="Change status to..."
              :disabled="isBatchUpdating"
              style="width: 180px"
            />
            <NPopconfirm
              :disabled="!selectedBatchStatus"
              :positive-text="t('common.confirm')"
              :negative-text="t('common.cancel')"
              @positive-click="handleBatchStatusChange"
            >
              <template #trigger>
                <NButton
                  type="primary"
                  :loading="isBatchUpdating"
                  :disabled="!selectedBatchStatus"
                >
                  Apply
                </NButton>
              </template>
              Change status of selected orders to
              <NTag strong>{{ selectedBatchStatus !== null ? t(`enums.OrderStatus.${OrderStatus[selectedBatchStatus]}`) : '' }}</NTag>
              ?
            </NPopconfirm>
            <NButton quaternary @click="handleClearSelection">
              Clear
            </NButton>
          </NSpace>
          <NTooltip v-else trigger="hover">
            <template #trigger>
              <NButton quaternary circle @click="getItems">
                <template #icon>
                  <NIcon>
                    <RefreshIcon />
                  </NIcon>
                </template>
              </NButton>
            </template>
            {{ t('common.refresh') }}
          </NTooltip>
        </NSpace>

        <SkeletonTable v-if="store.isLoading" :columns="columns" />
        <n-data-table
          v-else
          remote
          selectable
          :columns="columns"
          :data="store.orders"
          :pagination="options"
          :row-key="rowKey"
          :scroll-x="1000"
          :checked-row-keys="checkedRowKeys"
          @update:sorter="getItems"
          @update:filters="getItems"
          @update:page="handlePageChange"
          @update:checked-row-keys="checkedRowKeys = $event"
        />
      </div>
    </n-layout-content>

    <OrderDetailDrawer
      v-model:show="showDetailDrawer"
      :order="selectedOrder"
      @status-changed="handleDetailStatusChanged"
    />
  </n-layout>
</template>

<style scoped lang='scss'></style>
