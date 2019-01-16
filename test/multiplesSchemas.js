/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

'use strict'

const { expect } = require('chai')
const easygraphqlMock = require('../lib/mockBuilder')

describe('#Multilples schemas', () => {
  const schema1 = `
    type Author {
      name: String!
    }
  `

  const schema2 = `
    type Author {
      title: String!
      favoriteProject: Project!
    }

    type Project {
      name: String!
    }
  `

  it('Should return schema1 info', () => {
    const mockedSchema1 = easygraphqlMock(schema1)

    expect(mockedSchema1.Author.name).to.be.a('string')
  })

  it('Should return schema2 info', () => {
    const mockedSchema2 = easygraphqlMock(schema2)

    expect(mockedSchema2.Author.title).to.be.a('string')
    expect(mockedSchema2.Author.favoriteProject).to.be.an('object')
    expect(mockedSchema2.Author.favoriteProject.name).to.be.a('string')
    expect(mockedSchema2.Project.name).to.be.a('string')
  })
})
