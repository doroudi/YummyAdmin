<script setup lang="ts">
const resource = useRoute().path.split('/').pop()
const { t } = useI18n()
</script>

<template>
  <Layout class="flex justify-center items-center">
    <div class="error-message">
      <h1>
        4<span class="emoji" />4
      </h1>
      <h2>
        {{ t('common.oops') }} <span v-if="resource" class="gray">'/{{ resource }}'</span> {{ t('common.notFound') }}
      </h2>
      <p>
        {{ t('common.404Message') }}
      </p>

      <router-link to="/">
        <n-button round size="large" secondary type="warning" m="3 t8">
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
