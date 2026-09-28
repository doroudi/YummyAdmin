/**
 * Kept as a thin re-export so both historical import paths
 * (`~/models/ChartProps` and `~/models/ChartsProps`) keep working.
 * The single source of truth lives in `./ChartsProps.ts`.
 */
export type {
  ChartLegendPosition,
  ChartOption,
  ChartProps,
  ChartType,
  SimpleChartProps,
} from './ChartsProps.ts'
