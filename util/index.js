/* eslint-disable valid-typeof */
'use strict'

const getCustomMockData = require('./customMock')
const constants = require('./constants')
const randomStringData = require('./randomData/string')
const randomNumberData = require('./randomData/number')
const randomBooleanData = require('./randomData/boolean')
const { randomNumber } = require('./utils')

/*
* Field:
* {
*   name: 'username',
*   arguments: [],
*   noNull: true,
*   isArray: true,
*   type: 'String'
* }
* SchemaName:
* User
* CustomMock:
* {
*   User: {
*     email: 'mocked@email.com',
*     username: 'mock',
*     fullName: 'Mock Name',
*     Family: {
*       name: 'Family name',
*       ages: [10, 20, 30]
*     }
*   }
* }
* Schema:
* {
*   User: {
*     type: 'ObjectType',
*     description: undefined,
*     fields:[
*       { name: 'email',
*         arguments: [],
*         noNull: true,
*         isArray: false,
*         type: 'String' },
*       { name: 'username',
*         arguments: [],
*         noNull: true,
*         isArray: false,
*         type: 'String' },
*       { name: 'fullName',
*         arguments: [],
*         noNull: true,
*         isArray: false,
*         type: 'String' },
*       { name: 'phone',
*         arguments: [],
*         noNull: true,
*         isArray: false,
*         type: 'String' },
*       { name: 'family',
*         arguments: [],
*         noNull: true,
*         isArray: false,
*         type: 'Family' }
*     ],
*     values: []
*   }
* }
*/

function createData (field, schemaName, customMock = {}, schema, deepLevel) {
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
        // Now that we are going to handle a nested type, lets check first if it
        // exists on the custom mock, so when process it we can searhc if there is
        // a mock for it.
        const newcustomMock = customMock[schemaName] ? customMock[schemaName] : customMock

        if (field.isArray) {
          const arrLength = randomNumber(1, 10)
          const dataArr = []
          for (let i = 0; i < arrLength; i++) {
            if (schema[field.type].values.length > 0) {
              const values = schema[field.type].values
              const selectedValue = randomNumber(0, values.length - 1)
              dataArr.push(values[selectedValue])
            } else {
              dataArr.push(
                mockNestedData(
                  schema[field.type].fields,
                  field.type,
                  newcustomMock,
                  schema,
                  deepLevel
                )
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
        return mockNestedData(
          schema[field.type].fields,
          field.type,
          newcustomMock,
          schema,
          deepLevel
        )
      }
  }
}

// This method will make all the process for all the nested types.
function mockNestedData (fields, schemaName, customMock, schema, deepLevel = 0) {
  // Must check the deeplevel, we don't want to create an infinite loop.
  deepLevel++
  const mockField = {}
  // validate if the Schema has fields with the types
  if (fields && fields.length > 0 && deepLevel < 10) {
    // Loop all the fields, to access the name and type (to create the random value)
    fields.forEach(field => {
      let data

      // If it is an array of nested types, we will create a random number to
      // create random values, also, we want to check if it is a nested type
      // so we can make a recursive call.
      if (field.isArray && schema[field.type] && !schema[field.type].values.length) {
        const newcustomMock = customMock[schemaName] ? customMock[schemaName] : customMock
        const arrLength = randomNumber(1, 10)
        const dataArr = []
        for (let i = 0; i < arrLength; i++) {
          dataArr.push(
            mockNestedData(
              schema[field.type].fields,
              field.type,
              newcustomMock,
              schema,
              deepLevel
            )
          )
        }
        data = dataArr
      } else {
        // In case that the field is not a nnested type, we should do the
        // process to create the data as it was the first time.
        data = createData(field, schemaName, customMock, schema, deepLevel)
      }

      // Validate that the field can be null, in case that it can be, return
      // the mocked value or the null value.
      if (!field.noNull) {
        const selectedAnswer = randomNumber(0, 1)

        data = [null, data][selectedAnswer]
      }

      // If the data is valid, set into the mockField (nested type), all the
      // properties that had been mocked.
      if (data === null || data || typeof data === 'boolean') {
        mockField[field.name] = data
      }
    })
  }
  return mockField
}

module.exports = createData
