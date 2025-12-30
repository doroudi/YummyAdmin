<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import type { ChartData, SimpleChartSeries } from '~/models/ChartData'

const { t } = useI18n()

type LocalChartProps = {
  data?: ChartData | SimpleChartSeries | null
  colors?: string[]
  colorScheme?: string
  height?: number
  type?: string
  error?: any
  options?: any
  showLegend?: boolean
  loading?: boolean
  legendPosition: 'bottom' | 'right' | 'left'
}

const props = withDefaults(defineProps<LocalChartProps>(), {
  data: () => null as ChartData | SimpleChartSeries | null,
  colors: () => null,
  colorScheme: null,
  height: 400,
  type: 'line',
  error: null,
  options: null,
})

const { defaultOptions, safeSeries, validateChartData, showChart } =
  Array.isArray(props.data)
    ? useSimpleChartOptions(props)
    : useChartOptions(props)

const activeOptions = computed(
  () =>
    showChart && {
      ...defaultOptions.value,
      ...props.options,
    },
)
</script>


<template>
    <div class="chart-container">
        <div v-if="loading" class="chart-loading">
            <div class="loading-spinner"></div>
            <p class="loading-text">{{ t('charts.loading') }}</p>
        </div>

        <div v-else-if="error" class="chart-error">
            <div class="error-icon">⚠️</div>
            <p class="error-text">{{ error }}</p>
            <button v-if="$slots['error-action']" class="error-action" @click="$emit('error-action')">
                <slot name="error-action"></slot>
            </button>
        </div>

        <div v-else-if="!data || !validateChartData(data)" class="chart-no-data">
            <div class="no-data-icon">📊</div>
            <p class="no-data-text">{{ t('charts.notData') }}</p>
        </div>

        <div v-else-if="showChart" class="chart-wrapper">
            <VueApexCharts v-bind="$attrs" :type="type" :options="activeOptions" :height="height" :series="safeSeries"
                class="chart-component" />
        </div>

        <div v-else class="chart-fallback">
            <p>{{ t('charts.unableToDisplay') }}</p>
            <!-- TODO: use localization -->
        </div>

        <div v-if="$slots.footer" class="chart-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style scoped>
.chart-container {
    position: relative;
    width: 100%;
    min-height: 200px;
}

.chart-loading,
.chart-error,
.chart-no-data,
.chart-fallback {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: v-bind(height + 'px');
    border-radius: var(--border-radius);
    ;
    padding: 2rem;
    text-align: center;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e0e0e0;
    border-top-color: var(--primary-color, #7367f0);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-text,
.error-text,
.no-data-text {
    color: #6E6B7B;
    margin: 0.5rem 0;
    font-size: 0.875rem;
}

.error-icon,
.no-data-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.error-action {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: var(--primary-color, #7367f0);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.875rem;
    transition: opacity 0.2s;
}

.error-action:hover {
    opacity: 0.9;
}

.chart-wrapper {
    position: relative;
    transition: opacity 0.3s ease;
}

.chart-component {
    width: 100%;
}

.chart-footer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
    font-size: 0.75rem;
    color: #6E6B7B;
    text-align: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {

    .chart-loading,
    .chart-error,
    .chart-no-data,
    .chart-fallback {
        height: auto;
        min-height: 200px;
        padding: 1rem;
    }
}
</style>