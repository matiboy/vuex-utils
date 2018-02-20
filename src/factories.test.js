import chai from 'chai'
chai.expect()
const expect = chai.expect
import {funcToArray} from './factories'

describe('Factories', () => {
  describe('funcToArray', () => {
    it('should return a function', () => {
      expect(funcToArray(() => null)).to.be.a('function')
    })
    it('should return a function that returns an array with fn as first value', () => {
      const fn = () => null
      const arrayWrapper = funcToArray(fn)
      expect(arrayWrapper(1,2,3)).to.be.eql([fn, 1, 2, 3])
    })
  })
})