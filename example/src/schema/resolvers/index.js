'use strict'

const user = require('./user')

const resolvers = {
  createUser: user.createUser,
  login: user.login,
  updatePassword: user.updatePassword,
  getMe: user.getMe,
  getUserByUsername: user.getUserByUsername
}

module.exports = resolvers
