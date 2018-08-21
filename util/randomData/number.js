'use strict'

const Chance = require('chance')
const constants = require('../constants')

const chance = new Chance()

function randomNumberData (field, float) {
  let data

  // If it is an array, create a random length array of numbers
  if (field.isArray) {
    const arrLength = Math.floor(Math.random() * 10) + 1
    const dataArr = []
    for (let i = 0; i < arrLength; i++) {
      dataArr.push(createDataType(field, float))
    }
    data = dataArr
  } else {
    data = createDataType(field, float)
  }

  // If the field can be null, randomly return null or the random number
  if (!field.noNull) {
    const selectedAnswer = Math.floor(Math.random() * 2)
    return [null, data][selectedAnswer]
  }

  return data
}

function createDataType (field, float) {
  if (float) {
    return createRandomNumber(float)
  }

  switch (field.name.toLowerCase()) {
    case constants.age:
      return chance.age()

    case constants.phone:
      return createPhone()

    default:
      return createRandomNumber()
  }
}

function createPhone () {
  const a = Math.floor(Math.random() * 10000000)
  const b = Math.floor(Math.random() * 1000) + 1
  return parseInt(('' + a + b))
}

function createRandomNumber (float) {
  if (float) {
    const precision = 100
    return Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision)
  }

  return Math.floor(Math.random() * 11)
}

module.exports = randomNumberData
