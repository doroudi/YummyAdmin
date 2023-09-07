<script setup lang="ts">
import { NIcon } from 'naive-ui/es/icon'

const props = defineProps({
  icon: { type: Object, required: true },
  title: { type: String, required: true },
  value: { type: Number, required: true },
  progress: { type: Number, required: false },
})
</script>

<template>
  <div class="p-2 w-1/4">
    <Card>
      <div class="inner flex flex-col">
        <div class="head flex justify-between items-center">
          <NIcon :component="icon" class="icon" :class="(props.progress && props.progress > 0) ? 'text-lime-500' : 'text-amber-500'" />
          <span>
            <n-badge
              :value="`${props.progress}%`"
              :type="props.progress && props.progress > 0 ? 'success' : 'warning'"
            />
          </span>
        </div>

        <section>
          <h3 class="value">
            {{ props.value }}
          </h3>
          <h4 class="title">
            {{ props.title }}
          </h4>
        </section>
      </div>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.inner {
    .icon {
        font-size: 1.7rem;
        font-weight: bold;
    }

    .value {
        font-size: 1.7rem;
        font-weight: 500;
        /* font-family: segoe ui; */
        margin-top: 7px;
    }

    .title {
        font-size: 0.9rem;
        margin-top: -5px;
        color: #707070;
    }
}
</style>
