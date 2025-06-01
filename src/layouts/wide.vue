<script setup lang="ts">
import DefaultLayout from './default.vue'

defineOptions({
  name: 'WideLayout',
  components: {
    DefaultLayout,
  },
})
</script>

<template>
  <DefaultLayout :is-fluid="true" full-screen />
</template>
