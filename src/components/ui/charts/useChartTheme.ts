/**
 * Chart theme bridge - vendored from uipkge (`uipkge.dev/vue/charts`), MIT.
 *
 * Upstream resolves Tailwind v4 design tokens (`--chart-1`..`--chart-5`,
 * `--muted-foreground`, `--border`, `--popover`, ...). This project is
 * UnoCSS + SCSS, so the same names are either defined in
 * `src/styles/main.scss` or fall back to the equivalent YummyAdmin token
 * (`--primary-color`, `--main-content`, `--border-color`, `--error-color`).
 *
 * Values resolve at runtime through `getComputedStyle`, so a theme-colour or
 * dark-mode switch repaints every chart without a re-mount: `themeKey` is
 * bumped whenever `<html>`'s class/style changes.
 */
import { type ComputedRef, computed, ref } from 'vue'

const themeKey = ref(0)

if (typeof window !== 'undefined') {
  // Bump once after the first paint so the very first computed pass reads
  // resolved CSS values rather than the static fallbacks below.
  requestAnimationFrame(() => themeKey.value++)

  new MutationObserver(() => themeKey.value++).observe(
    document.documentElement,
    {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme'],
    },
  )
}

// ECharts' canvas renderer does not accept every modern CSS colour format.
// Assigning an unparsable token to `fillStyle` silently leaves the sentinel
// colour in place, turning a whole chart black - so normalise through canvas
// and convert OKLCH by hand first.
let _hexCanvas: CanvasRenderingContext2D | null = null

export function toCanvasColor(cssColor: string): string {
  const value = cssColor.trim()
  const match = value.match(
    /^oklch\(\s*([+-]?(?:\d+\.?\d*|\.\d+))(%?)\s+([+-]?(?:\d+\.?\d*|\.\d+))\s+([+-]?(?:\d+\.?\d*|\.\d+))(?:deg)?(?:\s*\/\s*([+-]?(?:\d+\.?\d*|\.\d+))(%?))?\s*\)$/i,
  )

  if (match) {
    const lightness = Number(match[1]) / (match[2] === '%' ? 100 : 1)
    const chroma = Number(match[3])
    const hue = (Number(match[4]) * Math.PI) / 180
    const alpha =
      match[5] == null ? 1 : Number(match[5]) / (match[6] === '%' ? 100 : 1)
    const a = chroma * Math.cos(hue)
    const b = chroma * Math.sin(hue)

    const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
    const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
    const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3
    const linear = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ]
    const rgb = linear.map((channel) => {
      const encoded =
        channel <= 0.0031308
          ? 12.92 * channel
          : 1.055 * channel ** (1 / 2.4) - 0.055
      return Math.round(Math.min(1, Math.max(0, encoded)) * 255)
    })

    return alpha < 1
      ? `rgba(${rgb.join(', ')}, ${alpha})`
      : `rgb(${rgb.join(', ')})`
  }

  if (typeof document === 'undefined') return cssColor
  if (!_hexCanvas)
    _hexCanvas = document.createElement('canvas').getContext('2d')
  if (!_hexCanvas) return cssColor

  _hexCanvas.fillStyle = '#010203'
  _hexCanvas.fillStyle = value
  const normalized = _hexCanvas.fillStyle as string
  return normalized === '#010203' && value.toLowerCase() !== '#010203'
    ? value
    : normalized
}

// Convert any CSS colour (hex, rgb, oklch, color()) + alpha 0..1 to a
// canvas-safe `rgba(r,g,b,a)`. `colorString + '40'` (8-digit hex alpha) only
// works while `colorString` stays `#rrggbb`; once a token resolves to oklch()
// the gradient stops break and the canvas paint throws every frame.
export function toRgba(cssColor: string, alpha: number): string {
  const normalized = toCanvasColor(cssColor)

  if (normalized.startsWith('#') && normalized.length === 7) {
    const r = Number.parseInt(normalized.slice(1, 3), 16)
    const g = Number.parseInt(normalized.slice(3, 5), 16)
    const b = Number.parseInt(normalized.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${alpha})`
  }
  if (normalized.startsWith('rgba('))
    return normalized.replace(/,\s*[\d.]+\s*\)$/, `,${alpha})`)

  if (normalized.startsWith('rgb('))
    return normalized.replace(/^rgb\(/, 'rgba(').replace(/\)$/, `,${alpha})`)

  return cssColor
}

function resolveVar(names: string[], fallback: string): string {
  if (typeof window === 'undefined') return fallback

  const styles = getComputedStyle(document.documentElement)
  for (const name of names) {
    const value = styles.getPropertyValue(name).trim()
    // A token can be declared as `var(--other)` and still compute to an empty
    // string when the referenced custom property is missing - keep walking.
    if (value && !value.startsWith('var(')) return toCanvasColor(value)
  }

  return fallback
}

/**
 * Resolve a colour coming from *this project's* props (`'var(--primary-color)'`,
 * `'#00ad4c'`, ...) into something ECharts can paint onto a canvas.
 */
export function resolveCssColor(input: string): string {
  if (!input) return input

  const value = input.trim()
  const match = value.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*([\s\S]+))?\)$/)

  if (match) {
    const resolved =
      typeof window === 'undefined'
        ? ''
        : getComputedStyle(document.documentElement)
            .getPropertyValue(match[1]!)
            .trim()

    if (resolved) return toCanvasColor(resolved)
    if (match[2]) return toCanvasColor(match[2].trim())

    return value
  }

  return toCanvasColor(value)
}

// Light-mode fallbacks roughly matching the YummyAdmin brand green so the
// first paint does not flicker before the tokens resolve.
export const CHART_FALLBACK = [
  '#00ad4c',
  '#008a3c',
  '#007935',
  '#00692e',
  '#ff7300',
]

export const chartColors: ComputedRef<string[]> = computed(() => {
  themeKey.value
  return Array.from({ length: 5 }, (_, i) =>
    resolveVar([`--chart-${i + 1}`], CHART_FALLBACK[i]!),
  )
})

export const chartTextColor: ComputedRef<string> = computed(() => {
  themeKey.value
  return resolveVar(['--muted-foreground', '--chart-text-color'], '#6e6b7b')
})

export const chartAxisColor: ComputedRef<string> = computed(() => {
  themeKey.value
  return resolveVar(['--border', '--border-color'], '#e0dfdf')
})

export const chartSplitLineColor: ComputedRef<string> = computed(() => {
  themeKey.value
  return resolveVar(['--border', '--border-color'], '#efefef')
})

export const chartTooltipBg: ComputedRef<string> = computed(() => {
  themeKey.value
  return resolveVar(['--popover', '--main-content'], 'rgba(255,255,255,0.96)')
})

export const chartTooltipBorder: ComputedRef<string> = computed(() => {
  themeKey.value
  return resolveVar(['--border', '--border-color'], '#e0dfdf')
})

export const chartTooltipText: ComputedRef<string> = computed(() => {
  themeKey.value
  return resolveVar(['--popover-foreground'], '#2f2b3d')
})

export const chartBgColor: ComputedRef<string> = computed(() => {
  themeKey.value
  return resolveVar(['--card', '--main-content'], '#ffffff')
})

// The app accent, for the one highlighted element on a chart - a focused bar
// or a selected series. Category series keep using `chartColors`.
export const chartAccentColor: ComputedRef<string> = computed(() => {
  themeKey.value
  return resolveVar(['--primary', '--primary-color'], '#00ad4c')
})

// Out-of-bounds / failure colour for charts that encode good vs bad rather
// than a category.
export const chartDangerColor: ComputedRef<string> = computed(() => {
  themeKey.value
  return resolveVar(['--destructive', '--error-color'], '#ff4d4f')
})

/**
 * Two-level deep merge for ECharts option blocks (`xAxis`, `yAxis`, `grid`,
 * `tooltip`, `legend`, ...). Top-level keys merge shallowly, and one nested
 * level (`axisLabel`, `axisLine`, `splitLine`, ...) merges shallowly too, so a
 * consumer passing `xAxis: { axisLabel: { fontSize: 9 } }` keeps the wrapper's
 * colour + font defaults. Arrays and primitives replace outright.
 */
export function mergeOptionBlock<T extends Record<string, any>>(
  base: T,
  user: Partial<T> | undefined,
): T {
  if (!user) return base

  const out: any = { ...base }
  for (const key of Object.keys(user)) {
    const baseValue = (base as any)[key]
    const userValue = (user as any)[key]
    if (
      baseValue != null &&
      userValue != null &&
      typeof baseValue === 'object' &&
      typeof userValue === 'object' &&
      !Array.isArray(baseValue) &&
      !Array.isArray(userValue)
    ) {
      out[key] = { ...baseValue, ...userValue }
    } else {
      out[key] = userValue
    }
  }
  return out
}

// Default gauge stoplight: teal (safe) -> amber (warning) -> red (danger).
export const gaugeThresholds: Array<[number, string]> = [
  [0.6, '#14b8a6'],
  [0.85, '#f59e0b'],
  [1, '#dc2626'],
]
