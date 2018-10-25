/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

'use strict'

const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const easygqlmock = require('../lib/mockBuilder')

const schemaCode = fs.readFileSync(path.join(__dirname, 'schema', 'schema.gql'), 'utf8')

describe('Create a mock of GraphQL Schema', () => {
  let mock

  before(() => {
    mock = easygqlmock(schemaCode, {
      Me: {
        id: '123',
        fullName: 'Hello World!',
        username: ['estrada9166'],
        result: 10
      }
    })
  })

  describe('Type Me', () => {
    // type Me {
    //   id: ID!
    //   email: String
    //   username: [String]!
    //   fullName: String!
    //   result: Float
    //   phone: [Int]!
    //   apiKey: String!
    //   users: [User]!
    //   verified: Boolean!
    // }

    it('Mock should have the type Me', () => {
      expect(mock.Me).to.exist
      expect(mock.Me.id).to.be.a('string')
      expect(mock.Me.id).to.be.eq('123')
      expect(mock.Me.username).to.be.a('array')
      expect(mock.Me.username[0]).to.be.a('string')
      expect(mock.Me.username[0]).to.be.eq('estrada9166')
      expect(mock.Me.fullName).to.be.a('string')
      expect(mock.Me.fullName).to.be.eq('Hello World!')
      expect(mock.Me.phone).to.be.a('array')
      expect(mock.Me.phone[0]).to.be.a('number')
      expect(mock.Me.apiKey).to.be.a('string')
      expect(mock.Me.users).to.exist
      expect(mock.Me.users[0].email).to.be.a('string')
      expect(mock.Me.users[0].family).to.exist
      expect(mock.Me.users[0].family.name).to.be.a('string')
      expect(['Father', 'Mother', 'Brother']).to.include(mock.Me.users[0].family.familyRelation)
      expect(mock.Me.verified).to.be.a('boolean')
    })
  })

  describe('Type User', () => {
    // type User {
    //   email: String!
    //   username: String!
    //   fullName: String!
    //   phone: String!
    //   family: Family!
    // }

    it('Mock should have the type User', () => {
      expect(mock.User).to.exist
      expect(mock.User.email).to.be.a('string')
      expect(mock.User.username).to.be.a('string')
      expect(mock.User.fullName).to.be.a('string')
      expect(mock.User.phone).to.be.a('string')
    })

    it('User mock should have the family type with a user mock nested', () => {
      expect(mock.User.family).to.exist
      expect(mock.User.family.name).to.be.a('string')
      expect(mock.User.family.ages).to.be.a('array')
      expect(mock.User.family.user).to.exist
      expect(mock.User.family.user.email).to.be.a('string')
      expect(mock.User.family.user.username).to.be.a('string')
      expect(mock.User.family.user.fullName).to.be.a('string')
      expect(mock.User.family.user.phone).to.be.a('string')
    })
  })

  describe('Type UserInput', () => {
    // input UserInput {
    //   email: String!
    //   username: String!
    //   fullName: String!
    //   password: String!
    // }

    it('Mock should have the type UserInput', () => {
      expect(mock.UserInput).to.exist
      expect(mock.UserInput.email).to.be.a('string')
      expect(mock.UserInput.username).to.be.a('string')
      expect(mock.UserInput.fullName).to.be.a('string')
      expect(mock.UserInput.password).to.be.a('string')
    })
  })

  describe('Type LoginInput', () => {
    // input LoginInput {
    //   email: String!
    //   password: String!
    // }

    it('Mock should have the type LoginInput', () => {
      expect(mock.LoginInput).to.exist
      expect(mock.LoginInput.email).to.be.a('string')
      expect(mock.LoginInput.password).to.be.a('string')
    })
  })

  describe('Type UpdatePasswordInput', () => {
    // input UpdatePasswordInput {
    //   oldPassword: String!
    //   newPassword: String!
    // }

    it('Mock should have the type UpdatePasswordInput', () => {
      expect(mock.UpdatePasswordInput).to.exist
      expect(mock.UpdatePasswordInput.oldPassword).to.be.a('string')
      expect(mock.UpdatePasswordInput.newPassword).to.be.a('string')
    })
  })
})
