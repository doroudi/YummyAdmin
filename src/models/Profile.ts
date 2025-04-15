export interface Profile {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  role: string
  location: string
  socials: Social[]
  avatar: string
  bio: string
  phone: string
  address: Address
}

export interface Social {
  name: string
  url: string
}

export interface Address {
  country: string
  city: string
  postalCode: string
}

export interface ProfileSettings {
  notifications: NotificationSetting[]
}

export interface NotificationSetting {
  type: string
  email: boolean
  push: boolean
  sms: boolean
}
