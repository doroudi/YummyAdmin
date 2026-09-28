/**
 * Class-name joiner used by the vendored uipkge chart primitives.
 *
 * Upstream (`@/lib/utils`) wraps `clsx` + `tailwind-merge`. This project is
 * UnoCSS-based and does not ship Tailwind, so the merge step is dropped: the
 * only call sites are `<utility string>, props.class`, which never conflict.
 */
export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | Record<string, unknown>

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = []

  const walk = (value: ClassValue): void => {
    if (
      value === null ||
      value === undefined ||
      value === false ||
      value === ''
    )
      return

    if (typeof value === 'string' || typeof value === 'number') {
      classes.push(String(value))
      return
    }

    if (Array.isArray(value)) {
      for (const item of value) walk(item)
      return
    }

    if (typeof value === 'object') {
      for (const [key, enabled] of Object.entries(value)) {
        if (enabled) classes.push(key)
      }
    }
  }

  for (const input of inputs) walk(input)

  return [...new Set(classes.join(' ').split(/\s+/).filter(Boolean))].join(' ')
}
