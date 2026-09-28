# Vendored uipkge charts

These primitives are **copied source**, not an npm dependency. They come from the
[uipkge registry](https://uipkge.dev/vue/charts) (`UI Package`, MIT), which ships
"Apache ECharts wrappers" you install into your own tree and own forever.

```
npx shadcn-vue@latest add https://uipkge.dev/r/vue/area-chart.json
```

## What was changed on the way in

YummyAdmin is Vite + UnoCSS + Naive UI with its own SCSS token set, so the
upstream Tailwind v4 assumptions were retargeted rather than reproduced:

| Upstream                     | Here                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| `cn` from `@/lib/utils`      | `cn` from `~/common/utils/cn` (no `clsx`/`tailwind-merge`)  |
| `class="size-full"`          | `class="w-full h-full"` (UnoCSS)                            |
| `focus-visible:ring-ring`    | dropped - no `ring` colour in the UnoCSS theme              |
| `--chart-1..5`, `--popover`… | defined in `src/styles/main.scss`, updated by `App.vue`     |

Two upstream defects were corrected in place; both are marked with a
`NOTE (vendored):` comment in the source.

- `BarChart.vue` computed an `isHorizontal` flag it never read. Removed — this
  project compiles with `noUnusedLocals`.
- `AreaChart`, `LineChart`, `BarChart` and `PolarBarChart` built their legend as
  `userLegend?.show === false ? undefined : merge(…)`. Handing `undefined` to
  ECharts lets it fall back to its **own** default legend, which made
  "hide the legend" impossible on multi-series charts. They now always merge,
  so an explicit `legend: { show: false }` is honoured.

`useChartTheme.ts` keeps upstream's runtime `getComputedStyle` resolution and
its OKLCH → canvas conversion, but each token now falls back through the
YummyAdmin equivalent (`--chart-1` → `--primary-color`, `--card` →
`--main-content`, `--border` → `--border-color`, …).

## Importing

They are deliberately **excluded from `unplugin-vue-components` auto-import**
(see the `globs` option in `vite.config.ts`) because names like `AreaChart`
would collide with the app's own wrappers in
`src/components/Charts/chart-components`. Import them explicitly:

```ts
import { AreaChart } from '~/components/ui/charts'
```

## Updating

Re-run the registry install for a component and re-apply the substitutions above,
or diff against `https://uipkge.dev/r/vue/<name>.json`. The registry has no
upgrade path by design - these files are yours to edit.

Used by `src/components/Charts/chart-components/*` (the app-facing wrappers) and
`src/components/Dashboard/**` via those wrappers.
