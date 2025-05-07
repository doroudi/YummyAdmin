<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="h-auto flex flex-col justify-end">
    <div class="p-2">
      <Card>
        <div class="flex flex-row justify-between">
          <div class="flex flex-row md:pt-4">
            <span class="text-9 me-2">👋</span>
            <div>
              <h3 class="text-lg font-bold">
                {{ t('dashboard.welcome') }}
              </h3>

              <p class="inline-flex items-center">
                {{ t('dashboard.greeting_message') }}
              </p>
            </div>
          </div>
          <img
            src="@/assets/images/3d-female-character-waving.png" width="140px"
            class="hidden md:block -mt-24 -mb-4 me-6"
          >
        </div>
      </card>
    </div>
  </div>
</template>

<style scoped>

</style>
