import { ApiService } from '~/common/api/api-service'
import type { ForgetPasswordResponse, LoginResponse, LoginViewModel, RegisterResponse, RegisterViewModel } from '~/models/Account'

const apiService = new ApiService('account')
class AccountService {
  async login(loginInfo: LoginViewModel): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>('login', loginInfo)
    return response
  }

  async register(registerModel: RegisterViewModel): Promise<RegisterResponse> {
    const response = await apiService.post<RegisterResponse>('register', registerModel)
    return response
  }

  async forgetPassword(forgetPasswordModel: LoginViewModel): Promise<ForgetPasswordResponse> {
    const response = await apiService.post<ForgetPasswordResponse>('forget-password', forgetPasswordModel)
    return response
  }
}

export default new AccountService()
