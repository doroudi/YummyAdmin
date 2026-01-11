<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
export interface Props {
    loading?: boolean
    columns: DataTableColumns<RowData>
    data: any
}
const props = defineProps<Props>()
</script>


<template>
    <SkeletonTable v-if="loading" :columns="columns" />
    <n-data-table v-else :bordered="false" :columns="columns" :data="data"  />
</template>


<style scoped></style>