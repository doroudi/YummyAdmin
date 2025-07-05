<template>
    <n-data-table v-bind="$attrs" :columns="skeletonColumns" :data="skeletonData" class="skeleton-table" />
</template>

<script setup lang="ts">
import { NDataTable, NSkeleton } from 'naive-ui'
import type { DataTableColumn } from 'naive-ui'

interface Props {
  columns: DataTableColumn<any>[] | number
  rowCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  rowCount: 10,
})

// Generate skeleton columns
const skeletonColumns = computed(() => {
  if (typeof props.columns === 'number') {
    return Array(props.columns)
      .fill(null)
      .map((_, i) => ({
        key: `col-${i}`,
        title: '',
        render: () =>
          h(NSkeleton, {
            text: true,
            width: i % 2 ? '50%' : '60%',
            sharp: false,
          }),
      }))
  }

  return props.columns.map((col) => ({
    ...col,
    render: () =>
      h(NSkeleton, {
        text: true,
        width: Math.random() > 0.5 ? '50%' : '35%',
        sharp: false,
      }),
  }))
})

// Generate skeleton rows
const skeletonData = computed(() => {
  return Array(props.rowCount).fill({})
})
</script>

<style scoped>
.skeleton-table :deep(.n-data-table-th) {
    background-color: transparent;
}

.skeleton-table :deep(.n-data-table-td) {
    padding: 12px;
}
</style>