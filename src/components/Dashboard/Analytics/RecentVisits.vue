<script setup lang="ts">
import { type DataTableColumns, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { storeToRefs } from 'pinia'
// const { t } = useI18n()
const store = useAnalyticsDashboardStore()
const { isLoadingVisits, visitsStatData } = storeToRefs(store)

const columns: DataTableColumns<RowData> = [
    {
        title: 'Url',
        key: 'url',
        render(row) {
            return h(
                NText,
                {},
                {
                    default: () => row.url,
                },
            )
        },
    },

    {
        title: 'Count',
        key: 'count',
        // render: (row) => renderPrice(row.price, t('currencySign')),
    },
]
</script>

<template>
    <div>
        <SkeletonTable v-if="isLoadingVisits" :columns="columns" />
        <n-data-table v-else-if="visitsStatData?.pages" remote :bordered="false" :columns="columns" :data="visitsStatData?.pages" :scroll-x="500" />
    </div>
</template>
