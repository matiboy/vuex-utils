import {makeTrueFalse} from './utils'

export const makeLoading = (stateKey = 'loading', defaultValue = false) => makeTrueFalse(stateKey, defaultValue)
