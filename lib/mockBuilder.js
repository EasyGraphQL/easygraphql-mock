'use strict'

const schemaParser = require('./schemaParser')
const memoizedField = require('../util')

function mockBuilder (schemaCode, customMock) {
  // Parse the schema on the GQL file to create a cutom object easier to loop
  // and create mocks.
  const schema = schemaParser(schemaCode)

  // This will be the result to return, when the mocks of the types are ready
  // those will be set to this object using as key the name of the type.
  const mockSchema = {}
  for (const type of Object.keys(schema)) {
    const mockField = memoizedField(type, customMock, schema)
    if (JSON.stringify(mockField) !== JSON.stringify({})) {
      mockSchema[type] = mockField
    }
  }

  return mockSchema
}

module.exports = mockBuilder
