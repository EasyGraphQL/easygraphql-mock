'use strict'

const { randomNumber } = require('../utils')

function randomBooleanData (field) {
  let data

  // If it is an array, create a random length array of strings
  if (field.isArray) {
    const arrLength = randomNumber(1, 10)
    const dataArr = []
    for (let i = 0; i < arrLength; i++) {
      dataArr.push(createRandomBoolean())
    }
    data = dataArr
  } else {
    data = createRandomBoolean()
  }

  // If the field can be null, randomly return null or the random string
  if (!field.noNull) {
    const selectedAnswer = randomNumber(0, 1)
    return [null, data][selectedAnswer]
  }
  return data
}

function createRandomBoolean () {
  const selectedAnswer = randomNumber(0, 1)
  return [true, false][selectedAnswer]
}

module.exports = randomBooleanData
