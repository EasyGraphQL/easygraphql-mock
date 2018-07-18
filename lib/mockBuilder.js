'use strict'

const schemaParser = require('./schemaParser')
const createData = require('../util/randomData')

function mockBuilder (schemaCode, opts) {
  const schema = schemaParser(schemaCode)

  const mockSchema = {}
  for (const key of Object.keys(schema)) {
    const mockField = {}
    // validate if the Schema has fields with the types
    if (schema[key].fields && schema[key].fields.length > 0) {
      // Loop all the fields, to access the name and type (to create the random value)
      schema[key].fields.forEach(field => {
        const data = createData(field, key, opts, schema)
        // If there is a way to mock the field, set it on mockfield obj with the random value
        if (data === null || data || typeof data === 'boolean') {
          mockField[field.name] = data
        }
      })
    }
    if (JSON.stringify(mockField) !== JSON.stringify({})) {
      mockSchema[key] = mockField
    }
  }
  return mockSchema
}

module.exports = mockBuilder
