const handlers: any[] = []
Object.values(import.meta.glob('./handlers/*.ts', { eager: true })).forEach(
  (i: any) => {
    handlers.push(...i.default)
  },
)
export default handlers
