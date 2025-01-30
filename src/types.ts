export type AppModule = (app: any, router: any) => void
export type Filter = (ctx: any) => void

export function nameof<TObject>(obj: TObject, key: keyof TObject): string
export function nameof<TObject>(key: keyof TObject): string
export function nameof(key1: any, key2?: any): any {
  return key2 ?? key1
}
