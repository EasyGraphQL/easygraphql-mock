'use strict'

const Chance = require('chance')
const constants = require('../constants')

const chance = new Chance()

function randomStringData (field) {
  let data

  // If it is an array, create a random length array of strings
  if (field.isArray) {
    const arrLength = Math.floor(Math.random() * 10) + 1
    const dataArr = []
    for (let i = 0; i < arrLength; i++) {
      dataArr.push(createDataType(field.name.toLowerCase()))
    }
    data = dataArr
  } else {
    data = createDataType(field.name.toLowerCase())
  }

  // If the field can be null, randomly return null or the random string
  if (!field.noNull) {
    const selectedAnswer = Math.floor(Math.random() * 2)
    return [null, data][selectedAnswer]
  }

  return data
}

function createDataType (fieldName) {
  switch (fieldName) {
    case constants.name:
    case constants.firstName:
    case constants.first:
      return chance.first()

    case constants.lastName:
    case constants.last:
      return chance.last()

    case constants.fullName:
      return chance.name()

    case constants.gender:
      return chance.gender()

    case constants.prefix:
      return chance.prefix()

    case constants.email:
      return chance.email()

    case constants.phone:
      return chance.phone()

    case constants.profession:
      return chance.profession()

    case constants.date:
      return chance.date({ string: true })

    case constants.id:
      return createId()

    default:
      return createString()
  }
}

function createId () {
  return createNumberString(2, true)
}

function createString (length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  length = length || Math.floor((Math.random() * 20) + 5)
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

function createNumberString (length, gtCero = false) {
  const chars = gtCero ? '123456789' : '0123456789'
  length = length || 3
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

module.exports = randomStringData
