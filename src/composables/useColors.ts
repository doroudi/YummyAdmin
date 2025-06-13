export default function useColors() {
  const primaryColors = [
    '#00ad4c',
    '#DB0B51',
    '#4FC3F7',
    '#f8b334',
    '#FF8000',
    '#00a096',
    '#9575cd',
  ]

  function buildThemeColorSeries(count: number) {
    const color = useLayoutStore().themeColor
    const series = []
    for (let i = 0; i < count; i++) series.push(makeDarker(color, 1 + i * 0.2))

    return series
  }

  function makeLighter(color: string, ratio: number) {
    const r = Math.floor(Number.parseInt(color.slice(1, 3), 16) * ratio)
    const g = Math.floor(Number.parseInt(color.slice(3, 5), 16) * ratio)
    const b = Math.floor(Number.parseInt(color.slice(5, 7), 16) * ratio)
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  function makeDarker(color: string, ratio: number) {
    const r = Math.floor(Number.parseInt(color.slice(1, 3), 16) / ratio)
    const g = Math.floor(Number.parseInt(color.slice(3, 5), 16) / ratio)
    const b = Math.floor(Number.parseInt(color.slice(5, 7), 16) / ratio)
    const result = `#${toHex(r)}${toHex(g)}${toHex(b)}`

    return result
  }

  function toHex(num: number) {
    const hexValue = num.toString(16)
    if (hexValue.length === 1) return `0${hexValue}`

    return hexValue
  }

  return {
    buildThemeColorSeries,
    makeLighter,
    makeDarker,
    primaryColors,
  }
}
