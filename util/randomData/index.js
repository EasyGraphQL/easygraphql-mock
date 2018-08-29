/* eslint-disable valid-typeof */

'use strict'

const constants = require('../constants')
const randomStringData = require('./string')
const randomNumberData = require('./number')
const randomBooleanData = require('./boolean')

function createData (field, schemaName, opts = {}, schema, deepLevel, nestedCall) {
  // In case the user set some values to the mock
  if (opts[schemaName] && opts[schemaName][field.name]) {
    // If the field can't be null and the value doesn't exists
    if (field.noNull && !opts[schemaName][field.name]) {
      throw new Error(`Field name ${field.name.toUpperCase()} must have a value`)
    }
    // If the GQL Schema is set as an array
    if (field.isArray && !Array.isArray(opts[schemaName][field.name])) {
      throw new Error(`Field name ${field.name.toUpperCase()} type that is defined in the options is not valid, it must be an array`)
    }
    // If it is an array but the values inside it are not the same as the GQL Schema
    if (field.isArray) {
      opts[schemaName][field.name].forEach(element => {
        if (typeof element !== field.type.toLowerCase()) {
          throw new Error(`Field name ${field.name.toUpperCase()} values on the array are different on the Schema`)
        }
      })
    }
    // If the type of the value is not the same as the QGL Schema
    if (!field.isArray && typeof opts[schemaName][field.name] !== fieldTypes(field.type)) {
      throw new Error(`Field name ${field.name.toUpperCase()} type is different on the Schema`)
    }
    // If the user set the value for a field on a Schema, return it!
    return opts[schemaName][field.name]
  }

  switch (field.type) {
    case constants.ID:
    case constants.string:
      return randomStringData(field)

    case constants.int:
      return randomNumberData(field)

    case constants.float:
      return randomNumberData(field, true)

    case constants.boolean:
      return randomBooleanData(field)

    default:
      // In case that the type is not found, check if it exists on the schema,
      // and visit that node, in case it is an array, create it
      if (schema[field.type]) {
        if (field.isArray && !nestedCall) {
          const arrLength = Math.floor(Math.random() * 10) + 1
          const dataArr = []
          for (let i = 0; i < arrLength; i++) {
            dataArr.push(mockNestedData(schema[field.type].fields, field.type, opts, schema, deepLevel))
          }
          return dataArr
        }

        return mockNestedData(schema[field.type].fields, field.type, opts, schema, deepLevel)
      }
  }
}

// Convert the type of the field to return the type and check the typeof
function fieldTypes (type) {
  switch (type) {
    case constants.ID:
    case constants.string:
      return 'string'

    case constants.int:
    case constants.float:
      return 'number'

    default:
  }
}

function mockNestedData (fields, schemaName, opts, schema, deepLevel = 0) {
  deepLevel++
  const mockField = {}
  // validate if the Schema has fields with the types
  if (fields && fields.length > 0 && deepLevel < 10) {
    // Loop all the fields, to access the name and type (to create the random value)
    fields.forEach(field => {
      let data

      // If it is an array, create a random length array of strings
      if (field.isArray && field.type !== constants.ID && field.type !== constants.string && field.type !== constants.int && field.type !== constants.float) {
        const arrLength = Math.floor(Math.random() * 10) + 1
        const dataArr = []
        for (let i = 0; i < arrLength; i++) {
          dataArr.push(createData(field, schemaName, opts, schema, deepLevel, true))
        }
        data = dataArr
      } else {
        data = createData(field, schemaName, opts, schema, deepLevel, true)
      }

      // If the field can be null, randomly return null or the random string
      if (!field.noNull) {
        const selectedAnswer = Math.floor(Math.random() * 2)
        data = [null, data][selectedAnswer]
      }

      // If there is a way to mock the field, set it on mockfield obj with the random value
      if (data === null || data || typeof data === 'boolean') {
        mockField[field.name] = data
      }
    })
  }
  return mockField
}

module.exports = createData
