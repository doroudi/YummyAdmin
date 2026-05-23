<script setup lang="ts">
const loadingBar = useLoadingBar()
const router = useRouter()

router.beforeEach((to: any, from: any) => {
    if (to.path !== from.path) loadingBar.start()
})
router.afterEach(() => {
    loadingBar.finish()
})

</script>

<template>
    <DarkModeContainer class="z-1" />
    <RouterView />
</template>