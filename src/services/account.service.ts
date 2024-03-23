import { ApiService } from '~/common/api/api-service'
import type { LoginResponse, LoginViewModel } from '~/models/Login'

const apiService = new ApiService('account')
class AccountService {
  async login(loginInfo: LoginViewModel): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>('login', loginInfo)
    return response
  }
}

export default new AccountService()
