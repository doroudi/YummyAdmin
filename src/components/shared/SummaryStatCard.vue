<script setup lang="ts">
import {
  ArrowDown24Filled as DownIcon,
  ArrowUp24Filled as UpIcon,
} from '@vicons/fluent'
import type { SummaryStatDto } from '~/models/SummaryStat'

interface Props {
  title: string
  data: SummaryStatDto
  loading: boolean
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'var(--primary-color)',
  loading: true,
})
</script>

<template>
  <div class="p-2 dashboard-card" v-bind="props">
    <Card no-shadow>
      <div class="inner flex flex-col">
        <div class="head flex justify-between items-center">
          <h4 class="title text-gray-600 dark:text-gray-200">
            {{ title }}
          </h4>
        </div>
        <section>
          <div class="flex flex-column items-center justify-between">
            <div class="w-25 overflow-hidden">
              <h3 class="text-gray-700 dark:text-gray-200 value">
                <n-number-animation v-if="data" :from="0" :to="data.count" /> <span class="-ms-2">
                  {{ data?.suffix }}</span>
              </h3>

              <span v-if="!loading && data && data.progress">
                <div class="badge flex items-center"
                  :class="data.progress && data.progress > 0 ? 'badge-success' : 'badge-error'">
                  <n-icon class="me-.5 pt-.5" size=".8rem"
                    :component="data.progress && data.progress > 0 ? UpIcon : DownIcon" />

                  <span>{{ `${data.progress}%` }}</span>
                </div>
              </span>
            </div>
            <Sparkline v-if="!loading && data && data.progressFlow" width="190px" :data="data.progressFlow"
              :color="color" />
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
      font-size: 1rem;
      margin-top: -5px;
    }

    .badge {
      font-size: .7rem;
      border-radius: 4px;
      display: inline-block;
      padding: 1px 6px;

      &.badge-success {
        background-color: color-mix(in srgb, var(--success-color), var(--background) 95%);
        color: var(--success-color);
      }

      &.badge-error {
        background-color: color-mix(in srgb, var(--error-color), var(--background) 95%);
        color: var(--error-color);
      }
    }
  }
}

.rtl {
  .dashboard-card {
    .value {
      direction: ltr;
      text-align: right;
    }
  }
    .badge { 
      direction: ltr;
    }
}
</style>
