import capitalize from 'lodash/capitalize'
import assignIn from 'lodash/assignIn'
import isFunction from 'lodash/isFunction'
import cloneDeep from 'lodash/cloneDeep'

// Creates mutation and state for a key that can be set to true/false
// mutations are <key>True and <key>False e.g. loadingTrue and loadingFalse
export const makeTrueFalse = (key, defaultValue = true) => ({
  state: {
    [key]: defaultValue
  },
  mutations: {
    [`${key}True`]: (state) => (state[key] = true),
    [`${key}False`]: (state) => (state[key] = false)
  }
})

const makeSetterKey = key => `set${capitalize(key)}`

export const makeSetter = (key, defaultValue = null) => ({
  state: {
    [key]: defaultValue
  },
  mutations: {
    [makeSetterKey(key)]: (state, value) => (state[key] = value)
  }
})

export const makeToggler = (key, defaultValue = true) => ({
  state: {
    [key]: defaultValue
  },
  mutations: {
    [`toggle${capitalize(key)}`]: (state) => (state[key] = !state[key])
  }
})

export const makeResetter = (key, defaultValue = null) => ({
  state: {
    [key]: defaultValue
  },
  mutations: {
    [`reset${capitalize(key)}`]: (state) => (state[key] = defaultValue)
  }
})

export const callMutations = (key, ...methods) => ({
  state: {},
  mutations: {
    [key]: () => {
      // TODO This doesn't work because the "this" object isnt' what we expected
      console.log(this)
      methods.forEach(method => this.mutations[method]())
    }
  }
})

export const makeResetAll = (...methods) => callMutations('resetAll', ...methods)

export const combine = (...methods) => {
  const obj = {
    state: {},
    mutations: {}
  }

  methods.forEach(opts => {
    let method, args

    // Allow for a shorter non-array version
    if (isFunction(opts)) {
      method = opts
      args = []
    } else {
      [method, ...args] = opts
    }
    const {state, mutations} = method(...args)

    obj.state = assignIn(obj.state, state)
    obj.mutations = assignIn(obj.mutations, mutations)
  })
  return obj
}

export const combineFunction = (...methods) => {
  const {state, mutations} = combine(...methods)

  return {
    state: () => cloneDeep(state),
    mutations
  }
}

export const makeModel = function (name) {
  return {
    get() {
      return this[name]
    }
  }
}

export const makeSetterModel = function (name) {
  return {
    ...makeModel(name),
    set(v) {
      this[makeSetterKey(name)](v)
    }
  }
}

export const makeTrueFalseModel = function (name) {
  return {
    ...makeModel(name),
    set(v) {
      this[`${name}${v ? 'True' : 'False'}`]()
    }
  }
}

export const makeSetReset = (key, defaultValue) => combine(
  [makeSetter, key, defaultValue],
  [makeResetter, key, defaultValue]
)
