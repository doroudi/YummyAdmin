export interface MessageItem {
  id: string
  from: Contact
  title: string
  badge?: number
  updated: Date
}

export interface Contact {
  name: string
  avatar: string
}
