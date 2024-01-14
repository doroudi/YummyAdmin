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
}

export interface Address {

}

export interface CustomerCreateModel extends Customer {

}
