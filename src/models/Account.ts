export interface LoginViewModel {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  isSucceed: boolean
}

export interface RegisterViewModel {
  username: string
  password: string
}

export interface RegisterResponse {
  token: string
  isSucceed: boolean
}

export interface ForgetPasswordViewModel {
  email: string
}

export interface ForgetPasswordResponse {
  isSucceed: boolean
}

export interface Account {
  username?: string
  token: string
}
