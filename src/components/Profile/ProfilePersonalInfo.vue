<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const store = useProfileStore()
const { userProfile, isLoading } = storeToRefs(store)

function editProfile() {

}
</script>

<template>
  <section>
    <div class="p-8 w-full md:w-3/4 mx-auto">
      <n-form size="large" :model="userProfile" @submit.prevent="editProfile()">
        <n-grid :span="24" :x-gap="42" :y-gap="18">
          <n-form-item-gi :span="12" class="mb-1" path="firstName" :label="t('profile.firstName')">
            <n-input id="name" v-model:value="userProfile.firstName" autofocus :placeholder="t('profile.firstName')" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" class="mb-1" path="lastName" :label="t('profile.lastName')">
            <n-input
              id="lastName"
              v-model:value="userProfile.lastName" type="text"
              :placeholder="t('profile.lastName')"
            />
          </n-form-item-gi>

          <n-form-item-gi :span="12" class="mb-1" path="location" :label="t('profile.location')">
            <n-input
              id="location"
              v-model:value="userProfile.location" type="text"
              :placeholder="t('profile.location')"
            />
          </n-form-item-gi>

          <n-form-item-gi :span="12" class="mb-1" path="phone" :label="t('profile.phone')">
            <n-input
              id="phone"
              v-model:value="userProfile.phone" type="text"
              :placeholder="t('profile.phone')"
            />
          </n-form-item-gi>

          <n-gi :span="24">
            <div flex justify-start>
              <n-button attr-type="submit" size="large" type="primary" :loading="isLoading">
                {{ t('profile.save') }}
              </n-button>
            </div>
          </n-gi>
        </n-grid>
      </n-form>
    </div>
  </section>
</template>
