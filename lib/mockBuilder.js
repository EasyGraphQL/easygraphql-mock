'use strict'

const schemaParser = require('./schemaParser')
const createData = require('../util')

function mockBuilder (schemaCode, customMock) {
  // Parse the schema on the GQL file to create a cutom object easier to loop
  // and create mocks.
  const schema = schemaParser(schemaCode)

  // This will be the result to return, when the mocks of the types are ready
  // those will be set to this object using as key the name of the type.
  const mockSchema = {}
  for (const type of Object.keys(schema)) {
    // This will be the result of each field inside the type, the key is going to
    // be the same name that is set inside the type.
    const mockField = {}
    // Validate if the type have fields that need to be mocked.
    if (schema[type].fields && schema[type].fields.length > 0) {
      schema[type].fields.forEach(field => {
        const data = createData(field, type, customMock, schema)
        // If the mocked value is valid, it will be asigned to the field name.
        if (data === null || data || typeof data === 'boolean') {
          mockField[field.name] = data
        }
      })
    }
    if (JSON.stringify(mockField) !== JSON.stringify({})) {
      mockSchema[type] = mockField
    }
  }
  return mockSchema
}

module.exports = mockBuilder
