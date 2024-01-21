import { HttpResponse, delay, http } from 'msw'
import type { LoginResponse, LoginViewModel } from '@/models/Login'

const handlers = [
  http.post('/api/account/login', async ({ request }) => {
    const user = (await request.json()) as LoginViewModel
    if (user.username === 'admin' && user.password === 'admin') {
      const response: LoginResponse = { token: 'JWT_Fake_Token', isSucceed: true }
      await delay(1000)
      return HttpResponse.json(response, { status: 200 })
    }
    else {
      return HttpResponse.json(null, { status: 400, statusText: 'UserName or Password is not correct' })
    }
  }),
]

export default handlers
