<script setup lang="ts">
import { storeToRefs } from 'pinia'

const store = useProfileStore()
const { userProfile } = storeToRefs(store)
</script>

<template>
  <div class="profile-header flex flex-col items-center pb-8">
    <NAvatar class="my-3" round :size="75" :src="userProfile.avatar" alt="avatar" />
    <div class="profile-section__info">
      <h4 text-center font-bold text-5>
        {{ `${userProfile.firstName} ${userProfile.lastName}` }}
      </h4>
      <p font-light text-center>
        {{ userProfile.role }} | {{ userProfile.location }}
      </p>
    </div>
  </div>
</template>
