import type { FormItemRule } from 'naive-ui/es/form/src/interface'

const validations = {
  telephone(rule: FormItemRule, value: string) {
    if (/\d{11}/g.test(value)) return true

    return new Error('phone number is not valid')
  },
  captcha(rule: FormItemRule, value: string) {
    if (/\d{4}\b/.test(value)) return true

    return new Error('captcha must be 4 digits')
  },
  email(rule: FormItemRule, value: string) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (emailRegex.test(value)) return true
    return new Error('email is not valid')
  },
  verification(rule: FormItemRule, value: string) {
    const pattern = /\d{5}\b/
    if (pattern.test(value)) return true

    return new Error('verification code must be 5 digits')
  },
  password(rule: FormItemRule, value: string) {
    if (!value) return new Error('password is required')

    if (value.length < 5)
      return new Error('password must be at least 5 characters')

    return true
  },
}

export default validations
