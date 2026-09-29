import { useApi } from '~/composables/useApi'
import type {
  ForgetPasswordResponse,
  LoginResponse,
  LoginViewModel,
  RegisterResponse,
  RegisterViewModel,
} from '~/models/Account'

export const useAccountService = () => {
  const api = useApi('account')

  async function login(loginInfo: LoginViewModel): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('login', loginInfo)
    return response
  }

  async function register(
    registerModel: RegisterViewModel,
  ): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('register', registerModel)
    return response
  }

  async function forgetPassword(
    forgetPasswordModel: LoginViewModel,
  ): Promise<ForgetPasswordResponse> {
    const response = await api.post<ForgetPasswordResponse>(
      'forget-password',
      forgetPasswordModel,
    )
    return response
  }

  return {
    login,
    register,
    forgetPassword,
  }
}
