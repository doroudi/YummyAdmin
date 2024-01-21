import { ApiService } from '~/common/api/api-service'
import type { LoginResponse, LoginViewModel } from '~/models/Login'

const apiService = new ApiService('account')
class AccountService {
  async login(loginInfo: LoginViewModel): Promise<LoginResponse> {
    const response = await apiService.post<any>('login', loginInfo)
    return response.data
  }
}

export default new AccountService()
