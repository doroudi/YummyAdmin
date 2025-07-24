<script setup lang="ts">
import {
  FullScreenMaximize24Regular as MaximizeIcon,
  FullScreenMinimize24Regular as MinimizeIcon,
} from '@vicons/fluent'

const { t } = useI18n()
const isFullScreen = ref<boolean>(document.fullscreenElement !== null)
function toggleFullScreen() {
  if (isFullScreen.value) document.exitFullscreen()
  else document.documentElement.requestFullscreen()

  isFullScreen.value = !isFullScreen.value
  window.umami?.track('ToggleFullScreen')
}
</script>

<template>
    <n-tooltip placement="top" trigger="hover">
        <template #trigger>
            <n-button class="hidden md:flex" quaternary circle @click="toggleFullScreen()">
                <template #icon>
                    <NIcon size="1.4rem">
                        <MinimizeIcon v-if="isFullScreen" />
                        <MaximizeIcon v-else />
                    </NIcon>
                </template>
            </n-button>
        </template>
        <span>{{ t('button.toggle_fullscreen') }}</span>
    </n-tooltip>
</template>

<style lang="scss" scoped></style>