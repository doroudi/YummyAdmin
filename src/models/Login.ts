export interface LoginViewModel {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  isSucceed: boolean
}

export interface Account {
  username?: string
  token: string
}
