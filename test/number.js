/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

'use strict'

const { expect } = require('chai')
const randomNumberData = require('../util/randomData/number')

describe('#Util', () => {
  describe('#randomNumberData', () => {
    it('Should return an array of numbers with age', () => {
      const field = {
        isArray: true,
        noNull: true,
        name: 'age'
      }

      const numberArr = randomNumberData(field)

      expect(numberArr).to.be.a('array')
      expect(numberArr.length).to.be.gt(0)
      expect(numberArr[0]).to.be.a('number')
    })

    it('Can return null', () => {
      const field = {
        isArray: false,
        noNull: false,
        name: 'test'
      }

      const number = randomNumberData(field)

      if (typeof number === 'number') {
        expect(number).to.be.a('number')
      } else {
        expect(number).to.be.null
      }
    })

    it('Should return an random float number', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'test'
      }

      const number = randomNumberData(field, true)

      expect(number).to.be.a('number')
      expect(number).to.be.gt(0)
    })

    it('Should return an random number', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'test'
      }

      const number = randomNumberData(field)

      expect(number).to.be.a('number')
    })

    it('Should return a timestamp number', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'timestamp'
      }

      const number = randomNumberData(field)

      expect(number).to.be.a('number')
      expect(number).to.be.gt(0)
    })

    it('Should return a hammertime number', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'hammertime'
      }

      const number = randomNumberData(field)

      expect(number).to.be.a('number')
      expect(number).to.be.gt(0)
    })

    it('Should return a hour number', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'hour'
      }

      const number = randomNumberData(field)

      expect(number).to.be.a('number')
      expect(number).to.be.gte(0)
      expect(number).to.be.lt(24)
    })

    it('Should return a minute number', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'minute'
      }

      const number = randomNumberData(field)

      expect(number).to.be.a('number')
      expect(number).to.be.gte(0)
      expect(number).to.be.lt(60)
    })

    it('Should return a second number', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'second'
      }

      const number = randomNumberData(field)

      expect(number).to.be.a('number')
      expect(number).to.be.gte(0)
      expect(number).to.be.lt(60)
    })

    it('Should return a millisecond number', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'millisecond'
      }

      const number = randomNumberData(field)

      expect(number).to.be.a('number')
      expect(number).to.be.gte(0)
      expect(number).to.be.lt(1000)
    })

    it('Should return a year number', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'year'
      }

      const number = randomNumberData(field)

      expect(number).to.be.a('number')
      expect(number).to.be.gte(0)
      expect(number).to.be.lt(2300)
    })
  })
})
