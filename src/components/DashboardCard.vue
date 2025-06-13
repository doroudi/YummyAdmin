<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  progress: { type: Number, required: false },
  bottomBorder: { type: Boolean, required: false },
  color: { type: String, required: false },
})

const value = ref(0)
const element = ref()
onMounted(() => {
  const countFrom = 0
  const countTo = props.value

  const duration = 2000
  if (countTo <= 0) return

  const animate = () => {
    let startTime: number

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime

      const progress = Math.min((currentTime - startTime) / duration, 1)
      const currentNumber = Math.floor(progress * (countTo - countFrom))

      value.value = currentNumber + countFrom

      if (progress < 1)
        element.value.animationFrameID = window.requestAnimationFrame(step)
      else window.cancelAnimationFrame(element.value.animationFrameID)
    }

    window.requestAnimationFrame(step)
  }

  animate()
})
</script>

<template>
  <div class="p-2 dashboard-card w-full sm:w-1/2 md:w-1/4" v-bind="props">
    <Card no-shadow bottom-border>
      <div class="inner flex flex-col">
        <div class="head flex justify-between items-center">
          <slot />
          <span>
            <n-badge
              :value="`${props.progress}%`"
              :type="props.progress && props.progress > 0 ? 'success' : 'warning'"
            />
          </span>
        </div>
        <section>
          <h3 ref="element" class="text-gray-700 dark:text-gray-200 value">
            {{ value }}
          </h3>
          <h4 class="title text-gray-800 dark:text-gray-200">
            {{ props.title }}
          </h4>
        </section>
      </div>
    </Card>
  </div>
</template>

<style lang="scss">
.dashboard-card {
  .inner {
    .icon {
      font-size: 1.7rem;
      font-weight: bold;
    }

    .value {
      font-size: 1.7rem;
      font-weight: 500;
      margin-top: 7px;
    }

    .title {
      font-size: 0.9rem;
      margin-top: -5px;
    }
  }
}
</style>
