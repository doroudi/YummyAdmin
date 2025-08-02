export interface ChatItem {
  id: string
  from: Contact
  title: string
  badge?: number
  updated: Date
  isUnread: boolean
}

export interface MessageItem {
  id: string
  senderId?: string
  content: string
  created: Date
  updated: Date
}

export interface Contact {
  id: string
  name: string
  avatar: string
}
