export interface VisitStat {
  pages: PageVisit[]
  sources: VisitSource[]
}

export interface PageVisit {
  url: string
  count: number
}

export interface VisitSource {
  name: string
  count: number
}
