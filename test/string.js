/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

'use strict'

const { expect } = require('chai')
const randomStringData = require('../util/randomData/string')

describe('#Util', () => {
  describe('#randomStringData', () => {
    it('Should return an array of strings with full names', () => {
      const field = {
        isArray: true,
        noNull: true,
        name: 'fullName'
      }

      const stringArr = randomStringData(field)

      expect(stringArr).to.be.a('array')
      expect(stringArr.length).to.be.gt(0)
      expect(stringArr[0]).to.be.a('string')
    })

    it('Should create a number string', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'id'
      }

      const string = randomStringData(field)

      expect(string).to.be.a('string')
      expect(string.length).to.be.gt(0)
      expect(parseInt(string)).to.be.a('number')
    })

    it('Should create a lastname string', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'last'
      }

      const string = randomStringData(field)

      expect(string).to.be.a('string')
      expect(string.length).to.be.gt(0)
    })

    it('Should create a gender string', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'gender'
      }

      const string = randomStringData(field)

      expect(string).to.be.a('string')
      expect(string.length).to.be.gt(0)
    })

    it('Should create a prefix string', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'prefix'
      }

      const string = randomStringData(field)

      expect(string).to.be.a('string')
      expect(string.length).to.be.gt(0)
    })

    it('Should create a phone string', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'phone'
      }

      const string = randomStringData(field)

      expect(string).to.be.a('string')
      expect(string.length).to.be.gt(0)
      expect(string).to.include('-')
    })

    it('Should create a profession string', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'profession'
      }

      const string = randomStringData(field)

      expect(string).to.be.a('string')
      expect(string.length).to.be.gt(0)
    })

    it('Should create a date string', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'date'
      }

      const string = randomStringData(field)

      expect(string).to.be.a('string')
      expect(string.length).to.be.gt(0)
    })

    it('Should create a address string', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'address'
      }

      const string = randomStringData(field)

      expect(string).to.be.a('string')
      expect(string.length).to.be.gt(0)
    })

    it('Should create a city string', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'city'
      }

      const string = randomStringData(field)

      expect(string).to.be.a('string')
      expect(string.length).to.be.gt(0)
    })

    it('Should create a country string', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'country'
      }

      const string = randomStringData(field)

      expect(string).to.be.a('string')
      expect(string.length).to.be.gt(0)
    })

    it('Should create a random string', () => {
      const field = {
        isArray: false,
        noNull: true,
        name: 'test'
      }

      const string = randomStringData(field)

      expect(string).to.be.a('string')
      expect(string.length).to.be.gt(0)
    })
  })

  it('Should create a timezone string', () => {
    const field = {
      isArray: false,
      noNull: true,
      name: 'timezone'
    }

    const string = randomStringData(field)

    expect(string).to.be.a('string')
    expect(string.length).to.be.gt(0)
  })

  it('Should create a weekday string', () => {
    const field = {
      isArray: false,
      noNull: true,
      name: 'weekday'
    }

    const string = randomStringData(field)

    expect(string).to.be.a('string')
    expect(string).to.be.oneOf(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
  })
})
