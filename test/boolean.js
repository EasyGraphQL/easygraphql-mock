/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

'use strict'

const { expect } = require('chai')
const randomBooleanData = require('../util/randomData/boolean')

describe('#Util', () => {
  describe('#randomBooleanData', () => {
    it('Should return an array of boolean', () => {
      const field = {
        isArray: true,
        noNull: true,
        name: 'age'
      }

      const booleanArr = randomBooleanData(field)

      expect(booleanArr).to.be.a('array')
      expect(booleanArr.length).to.be.gt(0)
      expect(booleanArr[0]).to.be.a('boolean')
    })

    it('Can return null', () => {
      const field = {
        isArray: false,
        noNull: false,
        name: 'test'
      }

      const boolean = randomBooleanData(field)

      if (typeof boolean === 'boolean') {
        expect(boolean).to.be.a('boolean')
      } else {
        expect(boolean).to.be.null
      }
    })
  })
})
