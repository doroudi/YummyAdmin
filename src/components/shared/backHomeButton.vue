<template>
    <router-link to="/">
        <n-button round size="large" primary type="warning" m="3 t8">
            <template #icon>
                <n-icon size="1.4rem" class="home-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 16 16">
                        <g fill="none">
                            <path
                                d="M7.146 10.854l-2.5-2.5a.5.5 0 0 1 0-.708l2.5-2.5a.5.5 0 1 1 .708.708L6.207 7.5H11a.5.5 0 0 1 0 1H6.207l1.647 1.646a.5.5 0 0 1-.708.708zM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm7 6A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"
                                fill="currentColor"></path>
                        </g>
                    </svg>
                </n-icon>
            </template>
            {{ t('common.goHome') }}
        </n-button>
    </router-link>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.rtl {
    .home-icon {
        transform: rotate(180deg);
    }
}
</style>