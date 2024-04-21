<script setup lang="ts">
const resource = useRoute().path.split('/').pop()
const { t } = useI18n()
onMounted(() => {
})
</script>

<template>
  <Layout class="flex justify-center items-center">
    <div class="error-message">
      <h1>
        4<span class="emoji" />4
      </h1>
      <h2>
        OOPS! PAGE <span v-if="resource" class="gray">'/{{ resource }}'</span> NOT FOUND
      </h2>
      <p>
        {{ t('common.404Message') }}
      </p>

      <router-link to="/">
        <n-button text-sm rounded type="success" m="3 t8">
          {{ t('common.goHome') }}
        </n-button>
      </router-link>
    </div>
  </Layout>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
