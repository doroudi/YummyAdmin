<template>
    <div class="flex justify-center items-center h-100vh">
        <div class="error-message z-10">
            <img src="@/assets/images/maintenance.svg" class="w-130" />
            <p class="text-lg mt-8 dark:text-white">
                {{ t('common.maintenanceDetail') }}
            </p>
            <BackHomeButton />
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()
</script>


<route lang="yaml">
meta:
  layout: ErrorLayout
</route>