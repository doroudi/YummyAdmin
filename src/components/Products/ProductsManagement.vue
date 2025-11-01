<script setup lang='ts'>
import { NButton, NIcon, NSpace, NSwitch, NText, NSlider, NSelect, NDivider, NPopover } from 'naive-ui/es/components'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui/es/components'

import {
  Delete20Regular as DeleteIcon,
  Add24Filled as PlusIcon,
  Filter24Filled as FilterIcon,
  Refresh24Filled as RefreshIcon,
} from '@vicons/fluent'
import { useMessage } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { ProductStatus } from '~/models/Product'
import type { Category } from '~/models/Category'

const { t } = useI18n()
const store = useProductStore()
const categoryStore = useCategoryStore()
const message = useMessage()
const router = useRouter()
const { renderDeleteActionButton } = useRender()
const { options } = useOptions()

const { renderPrice, renderRate, renderTag, renderProductImage } = useRender()

// 筛选参数
const minRate = ref<number>(0)
const maxRate = ref<number>(5)
const minPrice = ref<number>(0)
const maxPrice = ref<number>(10000)
const selectedCategories = ref<string[]>([])
const categories = ref<Category[]>([])
const filterVisible = ref<boolean>(false)

// 初始化筛选参数（从localStorage获取）
onMounted(() => {
  // 加载保存的筛选参数
  const savedFilters = localStorage.getItem('productFilters')
  if (savedFilters) {
    const { minRate: savedMinRate, maxRate: savedMaxRate, minPrice: savedMinPrice, maxPrice: savedMaxPrice, categories: savedCategories } = JSON.parse(savedFilters)
    minRate.value = savedMinRate || 0
    maxRate.value = savedMaxRate || 5
    minPrice.value = savedMinPrice || 0
    maxPrice.value = savedMaxPrice || 10000
    selectedCategories.value = savedCategories || []
  }
  
  // 获取分类列表
  getCategories()
  
  // 应用筛选并获取产品列表
  applyFilters()
})

const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    fixed: 'left',
  },
  {
    title: t('products.name'),
    key: 'name',
    render: (row) => renderProductImage(row.image, row.name),
  },
  {
    title: t('products.category'),
    key: 'category',
    render(row) {
      return h(
        NText,
        {},
        {
          default: () => row.category.name,
        },
      )
    },
  },
  {
    title: t('products.rate'),
    key: 'rate',
    render: (row) => renderRate(row.rate),
  },
  {
    title: t('common.price'),
    key: 'price',
    render: (row) => renderPrice(row.price, t('currencySign')),
  },
  {
    title: t('common.status'),
    key: 'status',
    render: (row) =>
      renderTag(
        row.status,
        getStatusColor(row.status),
        ProductStatus,
        'ProductStatus',
      ),
  },
  {
    title: t('products.stoke'),
    key: 'stock',
    render: (row) => h(NSwitch, { value: row.stock, size: 'small' }, {}),
  },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 110,
    render: (row) => [
      renderDeleteActionButton(t('common.deleteConfirm'), () =>
        handleDeleteItem(row),
      ),
    ],
  },
]
function getStatusColor(status: ProductStatus) {
  switch (status) {
    case ProductStatus.Draft:
      return 'info'
    case ProductStatus.Active:
      return 'success'
    case ProductStatus.NotActive:
      return 'warning'
  }
}

async function handleDeleteItem(row: RowData) {
  await store.deleteProduct(row.id)
  message.success('Product was deleted!')
  // 删除后重新获取产品列表以保持筛选状态
  getItems()
}

function rowKey(row: RowData) {
  return row.id
}

// 获取分类列表
async function getCategories() {
  await categoryStore.getCategories()
  categories.value = categoryStore.categories
}

// 应用筛选
async function applyFilters() {
  // 更新筛选参数到options
  options.value.minRate = minRate.value
  options.value.maxRate = maxRate.value
  options.value.minPrice = minPrice.value
  options.value.maxPrice = maxPrice.value
  options.value.categories = selectedCategories.value.join(',')
  options.value.page = 1 // 筛选后回到第一页
  
  // 保存筛选参数到localStorage
  localStorage.setItem('productFilters', JSON.stringify({
    minRate: minRate.value,
    maxRate: maxRate.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    categories: selectedCategories.value
  }))
  
  await getItems()
  message.success(`筛选完成，共找到 ${store.products.length} 项`)
  filterVisible.value = false
}

// 重置筛选
function resetFilters() {
  minRate.value = 0
  maxRate.value = 5
  minPrice.value = 0
  maxPrice.value = 10000
  selectedCategories.value = []
  localStorage.removeItem('productFilters')
}

// 获取产品列表
function getItems() {
  store.getProducts(options.value)
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

let searchTimerId: any = null
function searchInListDebounced(value: string) {
  clearTimeout(searchTimerId)
  options.value.query = value
  searchTimerId = setTimeout(() => {
    getItems()
  }, 500) /* 500ms throttle */
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
        <NSpace justify="space-between" class="mb-3" align="center">
          <SearchInput v-model="options.query" @search="getItems" />
          
          <!-- 筛选组件 -->
          <NPopover v-model:show="filterVisible" trigger="click" placement="bottom">
            <template #trigger>
              <NButton quaternary circle>
                <template #icon>
                  <NIcon>
                    <FilterIcon />
                  </NIcon>
                </template>
              </NButton>
            </template>
            
            <div class="filter-panel p-4" style="width: 400px;">
              <h3 class="text-lg font-bold mb-4">{{ t('common.filters') }}</h3>
              
              <!-- 评分筛选 -->
              <div class="mb-6">
                <label class="block text-sm font-medium mb-2">{{ t('products.rate') }}: {{ minRate }} - {{ maxRate }}</label>
                <NSlider
                  v-model:value="[minRate, maxRate]"
                  :min="0"
                  :max="5"
                  :step="0.5"
                  range
                />
              </div>
              
              <!-- 价格筛选 -->
              <div class="mb-6">
                <label class="block text-sm font-medium mb-2">{{ t('common.price') }}: {{ minPrice }} - {{ maxPrice }} {{ t('currencySign') }}</label>
                <NSlider
                  v-model:value="[minPrice, maxPrice]"
                  :min="0"
                  :max="10000"
                  :step="100"
                  range
                />
              </div>
              
              <!-- 分类筛选 -->
              <div class="mb-6">
                <label class="block text-sm font-medium mb-2">{{ t('products.category') }}</label>
                <NSelect
                  v-model:value="selectedCategories"
                  multiple
                  placeholder="{{ t('common.selectCategories') }}"
                  style="width: 100%"
                >
                  <NSelectOption
                    v-for="category in categories"
                    :key="category.id"
                    :label="category.name"
                    :value="category.id"
                  />
                </NSelect>
              </div>
              
              <NDivider />
              
              <!-- 操作按钮 -->
              <NSpace justify="end">
                <NButton type="default" @click="resetFilters">{{ t('common.reset') }}</NButton>
                <NButton type="primary" @click="applyFilters">{{ t('common.apply') }}</NButton>
              </NSpace>
            </div>
          </NPopover>
          
          <div>
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
            <NButton type="primary" @click="router.push('/Products/Create')">
              <template #icon>
                <NIcon>
                  <PlusIcon />
                </NIcon>
              </template>
              {{ t('common.new') }}
            </NButton>
          </div>
        </NSpace>
        
        <!-- 筛选结果提示 -->
        <div v-if="store.products.length > 0" class="mb-3 text-sm text-gray-600">
          {{ t('common.showing') }} {{ store.products.length }} {{ t('common.items') }}
        </div>
        
        <SkeletonTable v-if="store.isLoading" :columns="columns" />
        <n-data-table v-else remote :columns="columns" :data="store.products" :pagination="options" selectable
          :row-key="rowKey" :scroll-x="1000" @update:sorter="handleSorterChange" @update:filters="handleFiltersChange"
          @update:checked-row-keys="handleCheck" @update:page="handlePageChange" />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang='scss'>
.filter-panel {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
