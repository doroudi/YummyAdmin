<script setup lang='ts'>
import {
    Settings48Regular as CustomizeIcon,
} from '@vicons/fluent'

const layout = useLayoutStore()
</script>

<template>
    <div v-bind="$attrs">
        <n-button quaternary circle @click="layout.toggleTheme()">
            <template #icon>
                <NIcon size="1.4rem">
                    <CustomizeIcon class="rotate-animated" />
                </NIcon>
            </template>
        </n-button>
    </div>
</template>

<style scoped lang='scss'></style>
