<script setup lang="ts">
import type { DataTableColumns, DataTableSortState } from 'naive-ui/es/components'
import type { FilterOptionValue, RowData } from 'naive-ui/es/data-table/src/interface'
export interface Props {
    loading?: boolean
    columns: DataTableColumns<RowData>
    rows: any[]
    rowKey: any
    checkedRowKeys?: any[]
    noPagination?: boolean
    fetch: Function
}
const props = defineProps<Props>()
const initLoading = computed(() => (props.rows === null || props.rows.length === 0) && props.loading)
const checkedRowKeysModel = defineModel()
const { options, bindOptionsToDataTable, filterApplied, resetFilters } = useOptions()

const internalColumns = computed(() => props.columns)
const emit = defineEmits<{
    (e: 'error', err: unknown): void
}>()

async function reload() {
    try {
        bindOptionsToDataTable(internalColumns.value)
        await props.fetch(options.value)
    } catch (err) {
        emit('error', err)
    }
}

async function resetAndReload() {
    resetFilters()
    if (props.resetPageOnFilterChange) options.value.page = 1
    await reload()
}

function handlePageChange(page: number) {
    options.value.page = page
    reload()
}

function handlePageSizeChange(pageSize: number) {
    options.value.pageSize = pageSize
    options.value.page = 1
    reload()
}

function handleFiltersChange(filterValues: Record<string, FilterOptionValue[] | null> | null) {
    options.value = { ...options.value, ...(filterValues ?? {}) }
    if (props.resetPageOnFilterChange) options.value.page = 1
    reload()
}

type SortDir = 'asc' | 'desc'
function nextSort(clickedKey: string) {
    const sortBy = (options.value as any).sortBy as string | undefined
    const sortDir = (options.value as any).sortDir as SortDir | undefined

    // different column => start asc
    if (sortBy !== clickedKey) return { sortBy: clickedKey, sortDir: 'asc' as const }
    // same column cycle
    if (sortDir === undefined) return { sortBy: clickedKey, sortDir: 'asc' as const }
    if (sortDir === 'asc') return { sortBy: clickedKey, sortDir: 'desc' as const }
    return { sortBy: undefined, sortDir: undefined }
}

function handleSorterChange(sorter: DataTableSortState | null) {
    const key = (sorter as any)?.columnKey ?? (sorter as any)?.key
    if (!key) {
        (options.value as any).sortBy = undefined;
        (options.value as any).sortDir = undefined;
    } else {
        const next = nextSort(String(key));
        (options.value as any).sortBy = next.sortBy;
        (options.value as any).sortDir = next.sortDir;
    }

    if (props.resetPageOnSortChange) options.value.page = 1
    reload()
}

onMounted(async () => {
    // if (props.reloadOnMount)
    await reload()
})

</script>

<template>
    <p class="hidden">{{ rows.length }}</p>
    <SkeletonTable v-if="initLoading" :columns="columns" />
    <div v-else>
        <slot name="toolbar" :options="options" :filterApplied="filterApplied" :resetFilters="resetAndReload"
            :reload="reload" :checkedRowKeys="checkedRowKeysModel" />
        <n-data-table remote selectable :columns="internalColumns" :data="rows" :loading="loading"
            :pagination="!noPagination && options" :row-key="rowKey" :scroll-x="scrollX"
            :checked-row-keys="checkedRowKeysModel" @update:checked-row-keys="checkedRowKeysModel = $event"
            @update:page="handlePageChange" @update:page-size="handlePageSizeChange"
            @update:filters="handleFiltersChange" @update:sorter="handleSorterChange">
            <template #empty>
                <slot name="empty" />
            </template>
        </n-data-table>
    </div>
</template>

<style scoped></style>