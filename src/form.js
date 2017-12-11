import {combine, makeResetter, makeToggler, makeSetReset} from './utils'
import capitalize from 'lodash/capitalize'

export const makeEmail = () => makeSetReset('email', '')

export const makePassword = () => makeSetReset('password', '')

export const makeErrorMessage = () => makeSetReset('errorMessage', {})

export const makeCode = () => makeSetReset('code', '')

export const makeDisplayablePassword = (key = 'password', defaultValue = '', hide = true) => combine(
  [makePassword, key, defaultValue],
  [makeToggler, `hide${capitalize(key)}`, hide],
  [makeResetter, `hide${capitalize(key)}`, hide],
)
