/* eslint-disable valid-typeof */
'use strict'

const getCustomMockData = require('./customMock')
const constants = require('./constants')
const randomStringData = require('./randomData/string')
const randomNumberData = require('./randomData/number')
const randomBooleanData = require('./randomData/boolean')
const { randomNumber } = require('./utils')

let cache = {}
const memoize = (fn) => {
  return (type, customMock, schema) => {
    if (type in cache) {
      return cache[type]
    } else {
      // To handle cycles in schema types put a reference to the mocked field in
      // the cache before attempting to compute its properties.
      const result = {}
      if (schema[type].type === 'InterfaceTypeDefinition' && schema[type].implementedTypes.length) {
        result['__typename'] = schema[type].implementedTypes[0]
      } else {
        result['__typename'] = type
      }
      cache[type] = result
      const mock = fn(type, customMock, schema)
      Object.assign(result, mock)
      return result
    }
  }
}

const clearMemoizedFields = () => {
  cache = {}
}

const mockedField = (type, customMock, schema) => {
  // This will be the result of each field inside the type, the key is going to
  // be the same name that is set inside the type.
  const mockField = {}
  // Validate if the type have fields that need to be mocked.
  if (schema[type].fields && schema[type].fields.length > 0) {
    schema[type].fields.forEach(field => {
      const data = createData(field, type, customMock, schema)
      if (data === undefined) {
        throw new Error(`Type "${field.type}" not found in document.`)
      }
      // If the mocked value is valid, it will be asigned to the field name.
      mockField[field.name] = data
    })
  }
  return mockField
}

const memoizedField = memoize(mockedField)

function createData (field, schemaName, customMock = {}, schema) {
  // Validate if the field is a scalar, if it's validate if there is a custom
  // value to assign to it.
  if (
    schema[field.type] &&
    schema[field.type].type === 'ScalarTypeDefinition' &&
    customMock[field.type]
  ) {
    return customMock[field.type]
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
            // Validate if is enun value
            if (schema[field.type].values.length > 0) {
              dataArr.push(selecteEnumVal(field, schema))
            // validate if is union
            } else if (schema[field.type].types.length > 0) {
              const types = getUnionVals(field, schema)
              types.forEach(type =>
                dataArr.push(memoizedField(type, customMock, schema))
              )
            } else {
              dataArr.push(
                memoizedField(field.type, customMock, schema)
              )
            }
          }
          return dataArr
        }

        // Before looking for a nested type, validate if the field is a enum on
        // the schema, and if it has defined values, in that case, we can choose
        // an existing value.
        if (schema[field.type].values.length > 0) {
          return selecteEnumVal(field, schema)
        }

        // If the nensted type is an union, the values that are going to be assigned
        // are going to be one of each type inside the union.
        if (schema[field.type].types.length > 0) {
          const type = getUnionVal(field, schema)
          return memoizedField(type, customMock, schema)
        }

        // To handle a nested data, we might pass, the fields of the nested data,
        // The field.type that is going to be the new schema name, also the custom mock,
        // the complete schema and the deep level to prevent an infint loop.
        return memoizedField(field.type, customMock, schema)
      }
  }
}

function selecteEnumVal (field, schema) {
  const values = schema[field.type].values
  const selectedValue = randomNumber(0, values.length - 1)
  return values[selectedValue]
}

function getUnionVal (field, schema) {
  const types = schema[field.type].types
  const selectedValue = randomNumber(0, types.length - 1)
  return types[selectedValue]
}

function getUnionVals (field, schema) {
  return schema[field.type].types
}

module.exports = { memoizedField, clearMemoizedFields }
