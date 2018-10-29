'use strict'

const Chance = require('chance')
const constants = require('../constants')
const { randomNumber } = require('../utils')

const chance = new Chance()

function randomNumberData (field, float) {
  let data

  // If it is an array, create a random length array of numbers
  if (field.isArray) {
    const arrLength = randomNumber(1, 10)
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
    const selectedAnswer = randomNumber(0, 1)
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
    case constants.ages:
      return chance.age()

    case constants.timestamp:
    case constants.timestamps:
      return chance.timestamp()

    case constants.hammertime:
    case constants.hammertimes:
      return chance.hammertime()

    case constants.hour:
    case constants.hours:
      return chance.hour()

    case constants.minute:
    case constants.minutes:
    case constants.second:
    case constants.seconds:
      return chance.second()

    case constants.millisecond:
    case constants.milliseconds:
      return chance.millisecond()

    case constants.year:
    case constants.years:
      return parseInt(chance.year())

    default:
      return createRandomNumber()
  }
}

function createRandomNumber (float) {
  if (float) {
    const precision = 100
    return Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision)
  }

  return Math.floor(Math.random() * 11)
}

module.exports = randomNumberData
