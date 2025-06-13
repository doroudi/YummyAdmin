import { http, HttpResponse, delay } from 'msw'
import type {
  ForgetPasswordResponse,
  ForgetPasswordViewModel,
  LoginResponse,
  LoginViewModel,
  RegisterResponse,
  RegisterViewModel,
} from '~/models/Account'

const handlers = [
  http.post('*/api/account/login', async ({ request }) => {
    const user = (await request.json()) as LoginViewModel
    if (user.username === 'Yummy' && user.password === 'Admin!') {
      const response: LoginResponse = {
        token: 'JWT_Fake_Token',
        isSucceed: true,
      }
      await delay(1000)
      return HttpResponse.json(response, { status: 200 })
    }

    return HttpResponse.json(null, {
      status: 400,
      statusText: 'UserName or Password is not correct',
    })
  }),

  http.post('*/api/account/register', async ({ request }) => {
    const user = (await request.json()) as RegisterViewModel
    if (user.username.toLowerCase() === 'yummy')
      return HttpResponse.json(null, {
        status: 400,
        statusText: 'user name is already taken!',
      })

    const response: RegisterResponse = {
      token: 'JWT_Fake_Token',
      isSucceed: true,
    }
    await delay(1000)
    return HttpResponse.json(response, { status: 200 })
  }),

  http.post('*/api/account/forget-password', async ({ request }) => {
    const user = (await request.json()) as ForgetPasswordViewModel
    if (user.email !== 'yummy@admin.io')
      return HttpResponse.json(null, {
        status: 400,
        statusText: 'Email is not found',
      })

    const response: ForgetPasswordResponse = { isSucceed: true }
    return HttpResponse.json(response, { status: 200 })
  }),
]

export default handlers
