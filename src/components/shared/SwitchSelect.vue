<script setup lang="ts">
interface Props {
  value: string
  ranges: Array<{
    label: string
    value: string
  }>
}
const props = defineProps<Props>()
const emit = defineEmits(['update:value'])
const localValue = ref<string>(props.value)
watch(
  () => localValue.value,
  (val: string) => {
    emit('update:value', val)
  },
)
</script>

<template>
  <div class="flex justify-center switch-select">
    <n-radio-group v-model:value="localValue" size="small" type="info">
      <n-radio-button v-for="item of ranges" :key="item.label" :value="item.value" :label="item.label" round />
    </n-radio-group>
  </div>
</template>

<style lang="scss">
.switch-select {
    .n-radio-group {
        .n-radio-button {
            border: none;
            border-radius: var(--n-button-border-radius);
            margin: 0 0.2rem;
            background-color: #CCCCCC28;

            &:hover {
                border: none;
            }

            &.n-radio-button--checked {
              background-color: rgb(from var(--primary-color) r g b / .5);
              color: var(--n-color-text);
            }

            .n-radio-button__state-border {
                display: none;
            }
        }

        .n-radio-group__splitor {
            display: none;
        }

        &.n-radio-group--button-group {
            .n-radio-group__splitor {
                display: none;
            }

        }
    }

}
</style>
