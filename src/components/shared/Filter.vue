<script setup lang="ts">
import {
    Filter24Regular as FilterIcon
} from '@vicons/fluent'
const show = ref(false)

const { t } = useI18n()
function toggleShow() {
    show.value = !show.value
}
</script>

<template>
    <NButton secondary type="primary" @click="toggleShow" class="ms-2">
        <template #icon>
            <NIcon>
                <FilterIcon />
            </NIcon>
        </template>
        {{ t('common.filter') }}
    </NButton>
    <n-collapse-transition :show="show">
        <slot />
    </n-collapse-transition>
</template>



<style scoped></style>