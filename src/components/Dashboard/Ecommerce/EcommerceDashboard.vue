<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const notify = useNotifyStore()
const store = useDashboardStore()
const profileStore = useProfileStore()
const { userProfile } = storeToRefs(profileStore)
const layout = useLayoutStore()

onMounted(() => {
  store.getSummaryStat()
  if (!layout.isWelcomeShown) {
    setTimeout(() => {
      notify.notify({ body: t('notify.welcome'), type: 'success', duration: 10000 })
      layout.showWelcome()
    }, 2000)
  }
})
</script>

<template>
  <div>
    <div class="flex flex-col lg:flex-row margin-outside pb-1 ">
      <div class="p-2 w-full lg:w-2/3">
        <NCard class="bg-indigo-200">
          <div class="welcome-box">
            <h3>Hi 👋 {{ `${userProfile.firstName} ${userProfile.lastName}` }}</h3>
            <p>Welcome to YummyAdmin</p>
          </div>
        </NCard>
      </div>
      <div class="p-2 w-full lg:w-1/3">
        <NCard>
          New Stats goes here
        </NCard>
      </div>
    </div>
    <div>
      <div class="flex flex-col lg:flex-row margin-outside pb-3">
        <div class="flex flex-col w-full lg:w-1/3">
          <RegisterSourceChart />
          <UsersPlatformChart />
        </div>
        <div class="w-full lg:w-2/3 p-2">
          <Card :title="t('dashboard.summary')">
            <BarChart />
          </Card>
        </div>
      </div>

      <div class="flex flex-wrap margin-outside">
        <div class="w-full lg:w-1/2 px-2">
          <Card :title="t('dashboard.recentOrders')">
            <RecentOrders />
          </Card>
        </div>
        <div class="w-full lg:w-1/2 px-2">
          <Card :title="t('dashboard.trendingProducts')">
            <TrendingProducts />
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
