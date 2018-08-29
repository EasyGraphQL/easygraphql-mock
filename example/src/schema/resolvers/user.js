'use strict'

const mocker = require('../../../../index')

const user = {
  createUser: ({ input }, { schemaCode }) => {
    const mock = mocker(schemaCode, {
      User: {
        email: input.email,
        username: input.username,
        fullName: input.fullName
      }
    })

    return mock.User
  },

  login: ({ input }, { schemaCode }) => {
    const mock = mocker(schemaCode, {
      Me: {
        email: input.email
      }
    })

    return mock.Me
  },

  updatePassword: ({ input }, { schemaCode }) => {
    const mock = mocker(schemaCode)

    return mock.Me
  },

  getMe: async (args, { schemaCode }) => {
    const mock = mocker(schemaCode, {
      User: {
        email: 'test@test.com'
      }
    })
    return mock.Me
  },

  getUserByUsername: async (args, { schemaCode }) => {
    const mock = mocker(schemaCode, {
      User: {
        username: args.username
      }
    })

    return mock.User
  }
}

module.exports = user
