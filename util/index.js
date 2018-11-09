/* eslint-disable valid-typeof */
'use strict'

const getCustomMockData = require('./customMock')
const constants = require('./constants')
const randomStringData = require('./randomData/string')
const randomNumberData = require('./randomData/number')
const randomBooleanData = require('./randomData/boolean')
const { randomNumber } = require('./utils')

const memoize = (fn) => {
  const cache = {}
  return (type, customMock, schema, deepLevel) => {
    if (type in cache) {
      return cache[type]
    } else {
      const result = fn(type, customMock, schema, deepLevel)
      cache[type] = result
      return result
    }
  }
}

const mockedField = (type, customMock, schema, deepLevel = 0) => {
  // This will be the result of each field inside the type, the key is going to
  // be the same name that is set inside the type.
  const mockField = {}
  // Validate if the type have fields that need to be mocked.
  if (schema[type].fields && schema[type].fields.length > 0) {
    schema[type].fields.forEach(field => {
      const data = createData(field, type, customMock, schema, deepLevel)
      // If the mocked value is valid, it will be asigned to the field name.
      if (data === null || data || typeof data === 'boolean') {
        mockField[field.name] = data
      }
    })
  }
  return mockField
}

const memoizedField = memoize(mockedField)

function createData (field, schemaName, customMock = {}, schema, deepLevel) {
  deepLevel++
  if (deepLevel > 9) {
    return {}
  }

  // Validate if the schema name exists on the custom mock and also check if the
  // actual field exists, in case that it exists, make the validations to set it
  // as result.
  if (customMock[schemaName] && customMock[schemaName][field.name]) {
    return getCustomMockData(field, schemaName, customMock, schema)
  }

  // Handle the existing types, if it is not one of the regular ones it should be
  // a nested one, so the default must handle it.
  switch (field.type) {
    // The ID type is string by default on GraphQL.
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
      // and visit that node; in case it is an array, create it.
      if (schema[field.type]) {
        if (field.isArray) {
          const arrLength = randomNumber(1, 3)
          const dataArr = []
          for (let i = 0; i < arrLength; i++) {
            if (schema[field.type].values.length > 0) {
              const values = schema[field.type].values
              const selectedValue = randomNumber(0, values.length - 1)
              dataArr.push(values[selectedValue])
            } else {
              dataArr.push(
                memoizedField(field.type, customMock, schema, deepLevel)
              )
            }
          }
          return dataArr
        }

        // Before looking for a nested type, validate if the field is a enum on
        // the schema, and if it has defined values, in that case, we can choose
        // an existing value.
        if (schema[field.type].values.length > 0) {
          const values = schema[field.type].values
          const selectedValue = randomNumber(0, values.length - 1)
          return values[selectedValue]
        }

        // To handle a nested data, we might pass, the fields of the nested data,
        // The field.type that is going to be the new schema name, also the custom mock,
        // the complete schema and the deep level to prevent an infint loop.
        return memoizedField(field.type, customMock, schema, deepLevel)
      }
  }
}

module.exports = memoizedField
