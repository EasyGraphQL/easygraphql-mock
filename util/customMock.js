/* eslint-disable valid-typeof */
const constants = require('./constants')

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

function getCustomMockData (field, schemaName, customMock, schema) {
  const mockedVal = customMock[schemaName][field.name]

  // Validate if the field can't be null and the passed value  doesn't exists
  // or is null.
  if (field.noNull && !mockedVal) {
    throw new Error(`Field name ${field.name.toUpperCase()} must have a value`)
  }

  // Validate if the field must be an array and the passed value is not.
  if (field.isArray && !Array.isArray(mockedVal)) {
    throw new Error(`Field name ${field.name.toUpperCase()} type that is defined 
      in the options is not valid, it must be an array`
    )
  }

  // Validate if each value inside the array is the same type as it should be
  // on the schema.
  if (field.isArray) {
    mockedVal.forEach(element => {
      // First validate if the field is enum value, in case that it is, check if
      // the values of it exist on the schema enum.
      if (schema[field.type] && schema[field.type].values.length > 0) {
        if (!schema[field.type].values.some(val => val === element)) {
          throw new Error(`The value ${element.toUpperCase()} is not on the 
            enum ${field.type}`
          )
        }
      } else if (typeof element !== fieldTypes(field.type)) {
        throw new Error(`Field name ${field.name.toUpperCase()} values on the 
          array are different on the Schema`
        )
      }
    })
  }

  // Validate that the field is enum, in case it is, check that the mocked value
  // exists on the enum values and return it.
  if (!field.isArray && schema[field.type] && schema[field.type].values.length > 0) {
    if (!schema[field.type].values.some(val => val === mockedVal)) {
      throw new Error(`The value ${mockedVal.toUpperCase()} is not on the 
        enum ${field.type}`
      )
    }
    return mockedVal
  }

  // Validate that the type of value mocked is the same as the one deffined on
  // the schema.
  if (!field.isArray && typeof mockedVal !== fieldTypes(field.type)) {
    throw new Error(`Field name ${field.name.toUpperCase()} type is different 
      on the Schema`
    )
  }

  // If the mocked value pass all the validations, it is ready to be returned!
  return mockedVal
}

module.exports = getCustomMockData
