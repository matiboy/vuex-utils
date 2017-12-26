# Vuex Utils

Utility functions for common Vuex patterns. Creates state (or state method) and mutations

## Common patterns

* Set a property, with an initial value.
* Reset a property to an initial value.
* Toggle a boolean.
* Create a model from a state+mutation.
* `combine` into a state/mutations object

### Specific patterns (extensions of the common patterns)

* Loading: true/false (initially false)
* Email set/reset.
* Password with show/hide property

## Getting started

1. `npm install vuex-utils`
2. Use to build your state

## Examples

### Typical login form

```js
import {makeEmail, makeDisplayablePassword, makeErrorMessage} from 'vuex-utils/form'
import {combine} from 'vuex-utils'

const {state, mutations} = combine(
  makeEmail,
  makeDisplayablePassword,
  makeErrorMessage
)

/*
> state: {
  email: '',
  password: '',
  hidePassword: true,
  errorMessage: {}
}

> mutations: {
  setEmail: ...,
  resetEmail: ...,
  setPassword: ...,
  resetPassword: ...,
  setErrormessage: ...,
  resetErrormessage: ...,
  toggleHidepassword: ...,
  resetHidepassword: ...,
}
*/

```

### Method that clones the state
```js
import {combine, makeSetter} from 'vuex-utils'
import {makeLoading} from 'vuex-utils/loading'

const {state, mutations} = combineFunction(
  makeLoading,
  [makeSetter, 'amount', 0]
)


/*
State is now a method that returns a clone of the state object, as Vuex expects
> state: () => {
  loading: false,
  amount: 0
}

> mutations: {
  loadingTrue: ...,
  loadingFalse: ...,
  setAmount: ...
}

*/
```
