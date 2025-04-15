<script setup lang="ts">
import { storeToRefs } from 'pinia'

const profileStore = useProfileStore()
const { userProfile } = storeToRefs(profileStore)
</script>

<template>
  <div class="h-auto flex flex-col justify-end">
    <div class="p-2">
      <Card>
        <div class="flex flex-row justify-between">
          <div class="flex flex-row md:pt-4">
            <span class="text-9 me-2">👋</span>
            <div>
              <p class="text-lg">
                <HyperText :text="`Welcome back ${userProfile?.firstName}`" :duration="800" :animate-on-load="true" />
              </p>
              <p class="inline-flex items-center">
                Have a great day, Enjoy using
              </p>
              <span class="font-bold text-lg text-primary ms-2">
                <HyperText text="YummyAdmin" :duration="800" :animate-on-load="true" />
              </span>
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
