<script setup lang="ts">
import type { SummaryStatDto } from '~/models/SummaryStat'

interface Props {
  title: string
  icon: any
  data: SummaryStatDto
  loading: boolean
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'var(--primary-color)',
  loading: true,
})
const counter = ref(0)
const element = ref()

watch(
  () => props.data,
  () => {
    if (!props.data) return

    counter.value = 0
    setTimeout(() => {
      doAnimate()
    }, 230)
  },
  { immediate: true, deep: true },
)

function doAnimate() {
  const countFrom = 0
  const countTo = props.data.count

  const duration = 2000
  if (countTo <= 0) return

  const animate = () => {
    let startTime: number

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime

      const progress = Math.min((currentTime - startTime) / duration, 1)
      const currentNumber = Math.floor(progress * (countTo - countFrom))

      counter.value = currentNumber + countFrom

      if (progress < 1)
        element.value.animationFrameID = window.requestAnimationFrame(step)
      else window.cancelAnimationFrame(element.value.animationFrameID)
    }

    window.requestAnimationFrame(step)
  }

  animate()
}
</script>

<template>
  <div class="p-2 dashboard-card" v-bind="props">
    <Card no-shadow>
      <div class="inner flex flex-col">
        <div class="head flex justify-between items-center">
          <NIcon class="icon opacity-80" :color="color" :component="icon" />
          <span v-if="!loading && data && data.progress">
            <n-badge
              :value="`${data.progress}%`"
              :type="data.progress && data.progress > 0 ? 'success' : 'warning'"
            />
          </span>
        </div>
        <section>
          <div class="flex flex-column items-center justify-between">
            <div class="w-25 overflow-hidden">
              <h3 ref="element" class="text-gray-700 dark:text-gray-200 value">
                {{ counter }}
              </h3>
              <h4 class="title text-gray-600 dark:text-gray-200">
                {{ title }}
              </h4>
            </div>
            <Sparkline v-if="!loading && data && data.progressFlow" :data="data.progressFlow" :color="color" />
          </div>
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
