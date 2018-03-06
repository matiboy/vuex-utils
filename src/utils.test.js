import chai from 'chai'
chai.expect()
const expect = chai.expect
import {makeArray} from './utils'

describe('Utils', () => {
  describe('makeArray', () => {
    describe('state', () => {
      it('should add a key to the state', () => {
        const { state } = makeArray('items', [])
        expect(state).to.have.property('items')
      })
      it('should set to an empty array by default', () => {
        const { state } = makeArray('items')
        expect(state.items).to.be.an('Array').which.has.length(0)
      })
      it('should set to its initial value', () => {
        const initial = [{id: 1, a: 42}]
        const { state } = makeArray('items', initial)
        expect(state.items).to.equal(initial)
      })
    })
    describe('mutations', () => {
      it('should able to add an item to the array', () => {
        const { state, mutations } = makeArray('items', [1, 2, 3])
        mutations.pushItems(state, 4)
        expect(state.items).to.contain(4)
      })
      it('should able to add multiple items to an array', () => {
        const { state, mutations } = makeArray('items', [1, 2, 3])
        mutations.pushItems(state, [4, 5, 6])
        expect(state.items).to.have.length(6)        
      })
      it('should able to add multiple items to an array', () => {
        const { state, mutations } = makeArray('items', [
          {id: 1, name: 'abc'}, {id: 2, name: 'def'}, {id: 3, name: 'efg'}
        ])
        const newItems = [{id: 4, name: 'abc'}, {id: 5, name: 'def'}]
        mutations.pushItems(state, newItems)
        expect(state.items).to.have.length(5)        
      })
      it('should able to remove an item to the array', () => {
        const { state, mutations } = makeArray('items', [1, 2, 3])
        mutations.removeItems(state, 1)
        expect(state.items).not.to.contain(1)
      })
      it('should able to remove an item to the array', () => {
        const { state, mutations } = makeArray('items', [
          {id: 1, name: 'abc'}, {id: 2, name: 'def'}, {id: 3, name: 'efg'}
        ])
        mutations.removeItems(state, x => x.name === 'abc')
        expect(state.items).to.have.length(2)
        expect(state.items[0].id).to.equal(2)
      })
      it('should able to clear the array', () => {
        const { state, mutations } = makeArray('items')
        mutations.clearItems(state)
        expect(state.items).to.have.length(0)
      })
    })
  })
})