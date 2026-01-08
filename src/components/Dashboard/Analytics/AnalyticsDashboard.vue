<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const store = useAnalyticsDashboardStore()
const { summaryStat, isLoadingStats } = storeToRefs(store)

onMounted(() => {
  store.getSummaryStat()
  store.getVisitsStat()
})
</script>

<template>
  <div>
    <div class="margin-outside flex flex-wrap">
      <SummaryStatCard
        class="w-full sm:w-1/2 md:w-1/4" :loading="isLoadingStats" :data="summaryStat.visitors"
        :title="t('analyticsDashboard.visitors')" color="#00a096"
      />
      <SummaryStatCard
        class="w-full sm:w-1/2 md:w-1/4" :loading="isLoadingStats" :data="summaryStat.visits"
        :title="t('analyticsDashboard.visits')" color="#DB0B51"
      />
      <SummaryStatCard
        class="w-full sm:w-1/2 md:w-1/4" :loading="isLoadingStats" :data="summaryStat.views"
        :title="t('analyticsDashboard.views')" color="#9575cd"
      />
      <SummaryStatCard
        class="w-full sm:w-1/2 md:w-1/4" :loading="isLoadingStats" :data="summaryStat.bounceRate"
        :title="t('analyticsDashboard.bounceRate')" color="#FF8000"
      />
    </div>
    <div>
      <div class="flex flex-col lg:flex-row margin-outside pb-3">
        <div class="w-full lg:w-2/3">
          <UsersLocationChart />
        </div>
        <div class="flex flex-col w-full lg:w-1/3">
          <UsersPlatformChart class="w-full" />
          <UsersGenderChart class="w-full" />
        </div>
      </div>

      <div class="flex flex-wrap margin-outside">
        <div class="w-full lg:w-1/2 px-2">
          <Card :title="t('analyticsDashboard.pages')">
            <RecentVisits />
          </Card>
        </div>
        <div class="w-full lg:w-1/2 px-2">
          <Card :title="t('analyticsDashboard.source')">
            <VisitSources />
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>