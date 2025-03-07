export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  address: Address[]
  joinDate: Date
  birthDate: Date
  ordersCount?: number
  avatar?: string
}

export interface Address {
  id: string
  province: Province
  city: City
  text: string
}

export interface City {
  id: string
  provinceId: string
  name: string
}

export interface Province {
  id: string
  name: string
}

export interface CustomerCreateModel extends Customer {

}
