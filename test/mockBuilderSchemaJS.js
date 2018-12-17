/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

'use strict'

const { expect } = require('chai')
const easygqlmock = require('../lib/mockBuilder')

const schemaCode = require('./schema-js')

describe('Create a mock of GraphQL Schema', () => {
  let mock

  before(() => {
    mock = easygqlmock(schemaCode)
  })

  describe('Type User', () => {
    it('Mock should have the type User', () => {
      expect(mock.User).to.exist
      expect(mock.User.email).to.be.a('string')
      expect(mock.User.fullName).to.be.a('string')
      expect(mock.User.username).to.be.a('string')
    })
  })
})
