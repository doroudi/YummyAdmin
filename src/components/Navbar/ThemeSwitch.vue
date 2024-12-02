<script setup lang='ts'>
import {
  WeatherMoon48Regular as MoonIcon,
  WeatherSunny48Regular as SunIcon,
} from '@vicons/fluent'

const layout = useLayoutStore()
</script>

<template>
  <div v-bind="$attrs">
    <n-button quaternary circle @click="layout.toggleTheme()">
      <template #icon>
        <NIcon size="1.4rem">
          <SunIcon v-if="layout.isDark" />
          <MoonIcon v-else />
        </NIcon>
      </template>
    </n-button>
  </div>
</template>

<style scoped lang='scss'></style>
