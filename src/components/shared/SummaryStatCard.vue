<script setup lang="ts">
import type { SummaryStatDto } from '~/models/SummaryStat'

interface Props {
  title: string
  icon: any
  data: SummaryStatDto
  loading: boolean
}
const props = defineProps<Props>()

const value = ref(0)
const element = ref()

watch(() => props.data, () => {
  value.value = 0
  doAnimate()
}, { deep: true })

function doAnimate() {
  const countFrom = 0
  const countTo = props.data.count

  const duration = 2000
  if (countTo <= 0)
    return

  const animate = () => {
    let startTime: number

    const step = (currentTime: number) => {
      if (!startTime)
        startTime = currentTime

      const progress = Math.min((currentTime - startTime) / duration, 1)
      const currentNumber = Math.floor(progress * (countTo - countFrom))

      value.value = currentNumber + countFrom

      if (progress < 1)
        element.value.animationFrameID = window.requestAnimationFrame(step)
      else
        window.cancelAnimationFrame(element.value.animationFrameID)
    }

    window.requestAnimationFrame(step)
  }

  animate()
}
</script>

<template>
  <div class="p-2 dashboard-card w-full sm:w-1/2 md:w-1/4" v-bind="props">
    <Card no-shadow>
      <div class="inner flex flex-col">
        <div class="head flex justify-between items-center">
          <NIcon class="icon text-primary opacity-80" :component="props.icon" />
          <span>
            <n-badge
              :value="`${props.data.progress}%`"
              :type="props.data.progress && props.data.progress > 0 ? 'success' : 'warning'"
            />
          </span>
        </div>
        <section>
          <div class="flex flex-column items-center justify-between">
            <div w-20>
              <h3 ref="element" class="text-gray-700 dark:text-gray-200 value">
                {{ value }}
              </h3>
              <h4 class="title text-gray-600 dark:text-gray-200">
                {{ props.title }}
              </h4>
            </div>
            <Sparkline v-if="!loading" :data="props.data.progressFlow" />
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
