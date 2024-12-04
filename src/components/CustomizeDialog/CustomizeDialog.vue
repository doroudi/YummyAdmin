<script setup>
import {
  WeatherMoon48Regular as MoonIcon,
  WeatherSunny48Regular as SunIcon,
} from '@vicons/fluent'

const { t } = useI18n()
const theme = ref('light')
const layout = useLayoutStore()
function setLight() {
  if (layout.isDark)
    layout.toggleTheme()
}

function setDark() {
  if (!layout.isDark)
    layout.toggleTheme()
}
</script>

<template>
  <div class="section">
    <NTag type="primary" :bordered="false" size="small" class="mb-3 font-bold">
      {{ t('customize.theme') }}
    </NTag>

    <n-space justify="center" size="large">
      <NButton
        ghost class="p-7" :type="layout.isDark === false ? 'primary' : 'default'"
        size="large" @click="setLight"
      >
        <template #icon>
          <NIcon>
            <SunIcon />
          </NIcon>
        </template>
      </NButton>

      <NButton
        ghost class="w-full p-7" :type="layout.isDark ? 'primary' : 'default'" size="large"
        @click="setDark"
      >
        <template #icon>
          <NIcon>
            <MoonIcon />
          </NIcon>
        </template>
      </NButton>
    </n-space>
  </div>
  <div class="section">
    <NTag type="primary" :bordered="false" size="small" class="mb-3 font-bold">
      {{ t('customize.color') }}
    </NTag>
  </div>
  <div class="section">
    <NTag type="primary" :bordered="false" size="small" class="mb-3 font-bold">
      {{ t('customize.layout') }}
    </NTag>
  </div>
</template>

<style lang="scss" scoped>
.section {
    margin-bottom: 1rem;
    .section-title {
        font-weight: 500;
        padding: 0.2rem 0;
        border-bottom: solid 1px #CCC;
        margin-bottom:1rem;
    }
}
</style>
