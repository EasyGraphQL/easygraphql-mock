'use strict'

const fs = require('fs')
const path = require('path')
var { expect } = require('chai')
const schemaParser = require('../lib/schemaParser')

const schemaCode = fs.readFileSync(path.join(__dirname, 'schema', 'schema.gql'), 'utf8')

describe('Parse GraphQL schema into an object', () => {
  let schema

  before(() => {
    schema = schemaParser(schemaCode)
  })

  describe('schemaDefinition', () => {
    // schema {
    //   query: Query
    //   mutation: Mutation
    // }

    it('Schema should have the Query and Mutation property', () => {
      expect(schema.schemaDefinition).to.exist
      expect(schema.schemaDefinition.query).to.exist
      expect(schema.schemaDefinition.mutation).to.exist
    })

    it('Schema definition should have the type, operation and field of the definition', () => {
      expect(schema.schemaDefinition.query).to.deep.equal({ type: 'OperationType', operation: 'query', field: 'Query' })
      expect(schema.schemaDefinition.mutation).to.deep.equal({ type: 'OperationType', operation: 'mutation', field: 'Mutation' })
    })
  })

  describe('Type Me', () => {
    // type Me {
    //   id: ID!
    //   email: String
    //   username: [String]!
    //   result: Float
    //   fullName: String!
    //   phone: [Int]!
    //   apiKey: String!
    //   users: [User]!
    //   verified: Boolean!
    // }

    it('Schema should have the type Me', () => {
      expect(schema.Me).to.exist
      expect(schema.Me.type).to.be.eq('ObjectType')
      expect(schema.Me.description).to.be.eq(undefined)
      expect(schema.Me.fields.length).to.be.gt(0)
      expect(schema.Me.fields.length).to.be.eq(9)
    })

    it('Schema should have the properties with the null type and array type', () => {
      expect(schema.Me.fields).to.have.deep.include({name: 'id', type: 'ID', noNull: true, isArray: false, arguments: []})
      expect(schema.Me.fields).to.have.deep.include({name: 'email', type: 'String', noNull: false, isArray: false, arguments: []})
      expect(schema.Me.fields).to.have.deep.include({name: 'username', type: 'String', noNull: true, isArray: true, arguments: []})
      expect(schema.Me.fields).to.have.deep.include({name: 'fullName', type: 'String', noNull: true, isArray: false, arguments: []})
      expect(schema.Me.fields).to.have.deep.include({name: 'phone', type: 'Int', noNull: true, isArray: true, arguments: []})
      expect(schema.Me.fields).to.have.deep.include({name: 'apiKey', type: 'String', noNull: true, isArray: false, arguments: []})
    })
  })

  describe('Type User', () => {
    // type User {
    //   email: String!
    //   username: String!
    //   fullName: String!
    //   phone: String!
    // }

    it('Schema should have the type User', () => {
      expect(schema.User).to.exist
      expect(schema.User.type).to.be.eq('ObjectType')
      expect(schema.User.description).to.be.eq(undefined)
      expect(schema.User.fields.length).to.be.gt(0)
      expect(schema.User.fields.length).to.be.eq(5)
    })

    it('Schema should have the properties with the null type and array type', () => {
      expect(schema.User.fields).to.have.deep.include({name: 'email', type: 'String', noNull: true, isArray: false, arguments: []})
      expect(schema.User.fields).to.have.deep.include({name: 'username', type: 'String', noNull: true, isArray: false, arguments: []})
      expect(schema.User.fields).to.have.deep.include({name: 'fullName', type: 'String', noNull: true, isArray: false, arguments: []})
      expect(schema.User.fields).to.have.deep.include({name: 'phone', type: 'String', noNull: true, isArray: false, arguments: []})
    })
  })

  describe('Type UserInput', () => {
    // input UserInput {
    //   email: String!
    //   username: String!
    //   fullName: String!
    //   password: String!
    // }

    it('Schema should have the type UserInput', () => {
      expect(schema.UserInput).to.exist
      expect(schema.UserInput.type).to.be.eq('InputType')
      expect(schema.UserInput.description).to.be.eq(undefined)
      expect(schema.UserInput.fields.length).to.be.gt(0)
      expect(schema.UserInput.fields.length).to.be.eq(4)
    })

    it('Schema should have the properties with the null type and array type', () => {
      expect(schema.UserInput.fields).to.have.deep.include({name: 'email', type: 'String', noNull: true, isArray: false, arguments: []})
      expect(schema.UserInput.fields).to.have.deep.include({name: 'username', type: 'String', noNull: true, isArray: false, arguments: []})
      expect(schema.UserInput.fields).to.have.deep.include({name: 'fullName', type: 'String', noNull: true, isArray: false, arguments: []})
      expect(schema.UserInput.fields).to.have.deep.include({name: 'password', type: 'String', noNull: true, isArray: false, arguments: []})
    })
  })

  describe('Type LoginInput', () => {
    // input LoginInput {
    //   email: String!
    //   password: String!
    // }

    it('Schema should have the type LoginInput', () => {
      expect(schema.LoginInput).to.exist
      expect(schema.LoginInput.type).to.be.eq('InputType')
      expect(schema.LoginInput.description).to.be.eq(undefined)
      expect(schema.LoginInput.fields.length).to.be.gt(0)
      expect(schema.LoginInput.fields.length).to.be.eq(2)
    })

    it('Schema should have the properties with the null type and array type', () => {
      expect(schema.LoginInput.fields).to.have.deep.include({name: 'email', type: 'String', noNull: true, isArray: false, arguments: []})
      expect(schema.LoginInput.fields).to.have.deep.include({name: 'password', type: 'String', noNull: true, isArray: false, arguments: []})
    })
  })

  describe('Type UpdatePasswordInput', () => {
    // input UpdatePasswordInput {
    //   oldPassword: String!
    //   newPassword: String!
    // }

    it('Schema should have the type UpdatePasswordInput', () => {
      expect(schema.UpdatePasswordInput).to.exist
      expect(schema.UpdatePasswordInput.type).to.be.eq('InputType')
      expect(schema.UpdatePasswordInput.description).to.be.eq(undefined)
      expect(schema.UpdatePasswordInput.fields.length).to.be.gt(0)
      expect(schema.UpdatePasswordInput.fields.length).to.be.eq(2)
    })

    it('Schema should have the properties with the null type and array type', () => {
      expect(schema.UpdatePasswordInput.fields).to.have.deep.include({name: 'oldPassword', type: 'String', noNull: true, isArray: false, arguments: []})
      expect(schema.UpdatePasswordInput.fields).to.have.deep.include({name: 'newPassword', type: 'String', noNull: true, isArray: false, arguments: []})
    })
  })

  describe('Type Query', () => {
    // type Query {
    //   getMe: Me
    //   getUserByUsername(username: String!, id: Int!): User
    // }

    it('Schema should have the type Query with all the queries', () => {
      expect(schema.Query).to.exist
      expect(schema.Query.type).to.be.eq('ObjectType')
      expect(schema.Query.description).to.be.eq(undefined)
      expect(schema.Query.fields.length).to.be.gt(0)
      expect(schema.Query.fields.length).to.be.eq(2)
    })

    it('Schema should have the properties with the null type and array type', () => {
      const getUserByUsernameArguments = [{ name: 'username', noNull: true, isArray: false, type: 'String' }, { name: 'id', noNull: true, isArray: false, type: 'Int' } ]
      expect(schema.Query.fields).to.have.deep.include({name: 'getMe', type: 'Me', noNull: false, isArray: false, arguments: []})
      expect(schema.Query.fields).to.have.deep.include({name: 'getUserByUsername', type: 'User', noNull: false, isArray: false, arguments: getUserByUsernameArguments})
    })
  })

  describe('Type Mutation', () => {
    // type Mutation {
    //   createUser(input: UserInput!): Me
    //   login(input: LoginInput!): Me
    //   updatePassword(input: UpdatePasswordInput!): Me
    // }

    it('Schema should have the type Query with all the queries', () => {
      expect(schema.Mutation).to.exist
      expect(schema.Mutation.type).to.be.eq('ObjectType')
      expect(schema.Mutation.description).to.be.eq(undefined)
      expect(schema.Mutation.fields.length).to.be.gt(0)
      expect(schema.Mutation.fields.length).to.be.eq(3)
    })

    it('Schema should have the properties with the null type and array type', () => {
      const createUserArguments = [{ name: 'input', noNull: true, isArray: false, type: 'UserInput' }]
      const loginArguments = [{ name: 'input', noNull: true, isArray: false, type: 'LoginInput' }]
      const updatePasswordArguments = [{ name: 'input', noNull: true, isArray: false, type: 'UpdatePasswordInput' }]

      expect(schema.Mutation.fields).to.have.deep.include({name: 'createUser', type: 'Me', noNull: false, isArray: false, arguments: createUserArguments})
      expect(schema.Mutation.fields).to.have.deep.include({name: 'login', type: 'Me', noNull: false, isArray: false, arguments: loginArguments})
      expect(schema.Mutation.fields).to.have.deep.include({name: 'updatePassword', type: 'Me', noNull: false, isArray: false, arguments: updatePasswordArguments})
    })
  })
})
