<script setup lang='ts'>
import {
  WeatherMoon48Regular as MoonIcon,
  WeatherSunny48Regular as SunIcon,
} from '@vicons/fluent'

const layoutStore = useLayoutStore()
</script>

<template>
  <n-button text @click="layoutStore.toggleTheme()">
    <template #icon>
      <NIcon size="1.4rem">
        <SunIcon v-if="isDark" />
        <MoonIcon v-else />
      </NIcon>
    </template>
  </n-button>
</template>

<style scoped lang='scss'></style>
