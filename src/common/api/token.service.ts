class TokenService {
  getLocalRefreshToken() {
    const account = JSON.parse(localStorage.getItem('account') ?? '')
    return account.user?.refreshToken
  }

  getLocalAccessToken() {
    const account = JSON.parse(localStorage.getItem('account') ?? '{}')
    return account.user?.token
  }

  updateLocalAccessToken(token: string) {
    const account = JSON.parse(localStorage.getItem('account') ?? '')
    account.user.token = token
    localStorage.setItem('account', JSON.stringify(account))
  }

  getUser() {
    return JSON.parse(localStorage.getItem('account') ?? '')
  }

  setUser(user: any) {
    // eslint-disable-next-line no-console
    localStorage.setItem('account', JSON.stringify(user))
  }

  removeUser() {
    localStorage.removeItem('account')
  }
}
export default new TokenService()
