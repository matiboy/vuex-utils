import * as utils from './utils'
import * as form from './form'
import * as loading from './loading'

export const funcToArray = fn => (...args) => [fn, ...args]

// Utils
export const makeTrueFalse = funcToArray(utils.makeTrueFalse)
export const makeSetReset = funcToArray(utils.makeSetReset)
export const makeSetter = funcToArray(utils.makeSetter)
export const makeResetter = funcToArray(utils.makeResetter)
export const makeToggler = funcToArray(utils.makeToggler)
export const makeArray = funcToArray(utils.makeArray)

// Form
export const makeDisplayablePassword = funcToArray(form.makeDisplayablePassword)
export const makeEmail = funcToArray(form.makeEmail)
export const makePassword = funcToArray(form.makePassword)
export const makeErrorMessage = funcToArray(form.makeErrorMessage)
export const makeCode = funcToArray(form.makeCode)

// Loading
export const makeLoading = funcToArray(loading.makeLoading)

