<script setup lang='ts'>
import {
  ArrowUp20Regular as ArrowUpIcon,
  ArrowDown20Regular as ArrowDownIcon,
  Dismiss20Regular as CloseIcon,
} from '@vicons/fluent'
import {
  NButton,
  NCard,
  NForm,
  NFormItem,
  NIcon,
  NSelect,
  NSpace,
  NText,
} from 'naive-ui'
import { OrderStatus } from '~/models/Order'

interface Props {
  show: boolean
  order: any
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  order: null,
})

const emits = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'statusChanged', orderId: string, newStatus: OrderStatus): void
}>()

const { t } = useI18n()
const store = useOrderStore()
const { getStatusColor } = useOrders()

const isLoading = ref(false)
const selectedStatus = ref<OrderStatus | null>(null)
const statusOptions = computed(() => {
  if (!props.order) return []
  const currentStatus = props.order.status
  const options: { label: string; value: OrderStatus }[] = []

  if (currentStatus < OrderStatus.Delivered) {
    for (let i = currentStatus + 1; i <= OrderStatus.Delivered; i++) {
      options.push({
        label: t(`enums.OrderStatus.${OrderStatus[i]}`),
        value: i as OrderStatus,
      })
    }
  }

  if (currentStatus > OrderStatus.Submitted) {
    for (let i = currentStatus - 1; i >= OrderStatus.Submitted; i--) {
      options.push({
        label: t(`enums.OrderStatus.${OrderStatus[i]}`),
        value: i as OrderStatus,
      })
    }
  }

  return options
})

const canChangeStatus = computed(() => {
  return props.order && props.order.status !== OrderStatus.Delivered
})

watch(
  () => props.show,
  (val) => {
    if (val && props.order) {
      selectedStatus.value = null
    }
  },
)

function closeDrawer() {
  emits('update:show', false)
}

async function handleStatusChange() {
  if (!selectedStatus.value || !props.order) return

  isLoading.value = true
  try {
    await store.updateOrderStatus(props.order.id, selectedStatus.value)
    emits('statusChanged', props.order.id, selectedStatus.value)
    useNotifyStore().success(
      `Order status changed to ${t(`enums.OrderStatus.${OrderStatus[selectedStatus.value]}`)}`,
    )
    closeDrawer()
  } catch (error) {
    useNotifyStore().error('Failed to update order status')
  } finally {
    isLoading.value = false
  }
}

function renderStatusTransition() {
  if (!props.order) return null

  const statuses = [
    OrderStatus.Submitted,
    OrderStatus.Processing,
    OrderStatus.ReadyToSend,
    OrderStatus.Sent,
    OrderStatus.Delivered,
  ]

  const currentStatusIndex = statuses.indexOf(props.order.status)

  return h(
    NSpace,
    { vertical: true, class: 'w-full' },
    {
      default: () =>
        statuses.map((status, index) => {
          const isActive = index === currentStatusIndex
          const isPast = index < currentStatusIndex
          const isFuture = index > currentStatusIndex

          return h(
            NSpace,
            { align: 'center', class: 'w-full' },
            {
              default: () => [
                h(
                  NIcon,
                  { size: 16, color: isActive || isPast ? 'green' : 'gray' },
                  {
                    default: () =>
                      h(isFuture ? ArrowDownIcon : isPast ? ArrowUpIcon : ArrowUpIcon),
                  },
                ),
                h(
                  NText,
                  {
                    strong: isActive,
                    style: { opacity: isFuture ? 0.5 : 1 },
                  },
                  { default: () => t(`enums.OrderStatus.${OrderStatus[status]}`) },
                ),
              ],
            },
          )
        }),
    },
  )
}
</script>

<template>
  <n-drawer
    v-model:show="show"
    :width="480"
    placement="right"
    :mask-closable="true"
  >
    <n-drawer-content closable title="Order Details">
      <template #header-extra>
        <n-button quaternary circle @click="closeDrawer">
          <template #icon>
            <n-icon>
              <CloseIcon />
            </n-icon>
          </template>
        </n-button>
      </template>

      <n-space vertical class="w-full">
        <n-card title="Customer Info" size="small">
          <n-space align="center">
            <n-image
              :src="order?.customer?.avatar || '/assets/images/avatar.png'"
              width="48"
              height="48"
              class="rounded-full"
            />
            <div>
              <n-text strong>{{ order?.customer?.name }}</n-text>
              <br />
              <n-text depth="3" class="text-sm"
                >{{ order?.customer?.email }}</n-text
              >
            </div>
          </n-space>
        </n-card>

        <n-card title="Order Info" size="small">
          <n-space vertical class="w-full">
            <n-space justify="space-between" class="w-full">
              <n-text>Order ID:</n-text>
              <n-text strong>{{ order?.id }}</n-text>
            </n-space>
            <n-space justify="space-between" class="w-full">
              <n-text>Date:</n-text>
              <n-text>{{ order?.createdDate }}</n-text>
            </n-space>
            <n-space justify="space-between" class="w-full">
              <n-text>Items:</n-text>
              <n-text>{{ order?.itemsCount }}</n-text>
            </n-space>
            <n-space justify="space-between" class="w-full">
              <n-text>Total:</n-text>
              <n-text strong>{{ order?.totalPrice }}{{ t('currencySign') }}</n-text>
            </n-space>
            <n-space justify="space-between" class="w-full">
              <n-text>Status:</n-text>
              <n-tag
                v-if="order"
                :type="getStatusColor(order.status)"
                size="small"
              >
                {{ t(`enums.OrderStatus.${OrderStatus[order.status]}`) }}
              </n-tag>
            </n-space>
          </n-space>
        </n-card>

        <n-card title="Status Transition" size="small">
          <div class="pl-2">{{ renderStatusTransition() }}</div>
        </n-card>

        <n-card v-if="canChangeStatus" title="Change Status" size="small">
          <n-form>
            <n-form-item label="New Status">
              <n-select
                v-model:value="selectedStatus"
                :options="statusOptions"
                placeholder="Select new status"
                :disabled="isLoading"
              />
            </n-form-item>
            <n-form-item>
              <n-button
                type="primary"
                :loading="isLoading"
                :disabled="!selectedStatus"
                @click="handleStatusChange"
              >
                Update Status
              </n-button>
            </n-form-item>
          </n-form>
        </n-card>

        <n-card v-else title="Status" size="small">
          <n-text type="warning">
            This order has been delivered and cannot be modified.
          </n-text>
        </n-card>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang="scss"></style>
