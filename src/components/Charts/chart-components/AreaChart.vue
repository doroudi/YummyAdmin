<script setup lang="ts">
const props = withDefaults(defineProps(), {
  colors: () => [
    'var(--primary-color)',
    'var(--primary-color-shade1)',
    'var(--primary-color-shade2)',
    'var(--primary-color-shade3)',
  ],
  height: 400,
  loading: false,
  data: () => null,
})

const options = {
  chart: {
    type: 'area',
    sparkline: {
      enabled: true,
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      gradientToColors: ['var(--main-content)', props.color],
      type: 'vertical',
      shadeIntensity: 0,
      opacityFrom: 0.3,
      opacityTo: 0.1,
    },
  },
}
</script>

<template>
    <BaseChart type="area" :height="height" :data="data" :options="options" :colors="colors" />
</template>

<style lang="scss" scoped></style>
