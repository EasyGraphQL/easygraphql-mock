/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

'use strict'

const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const easygqlmock = require('../lib/mockBuilder')

const studentSchema = fs.readFileSync(path.join(__dirname, 'schema', 'student.gql'), 'utf8')
const schoolSchema = fs.readFileSync(path.join(__dirname, 'schema', 'school.gql'), 'utf8')
const locationSchema = fs.readFileSync(path.join(__dirname, 'schema', 'location.gql'), 'utf8')

describe('Parse arr of schemas into one obj', () => {
  let mock

  before(() => {
    mock = easygqlmock([studentSchema, schoolSchema, locationSchema])
  })

  describe('Type Student', () => {
    it('Should have the Student', () => {
      expect(mock.Student).to.exist
      expect(mock.Student.email).to.be.a('string')
      expect(mock.Student.username).to.be.a('string')
      expect(mock.Student.fullName).to.be.a('string')
    })
  })

  describe('Type School', () => {
    it('Should have the school info', () => {
      expect(mock.School).to.exist
      expect(mock.School.name).to.be.a('string')
      expect(mock.School.location).to.exist
      expect(mock.School.location.id).to.be.a('string')
      expect(mock.School.users).to.be.a('array')
      expect(mock.School.users.length).to.be.gt(0)
    })
  })

  describe('Type Location', () => {
    it('Should have the location info', () => {
      expect(mock.Location).to.exist
      expect(mock.Location.id).to.be.a('string')
      expect(mock.Location.name).to.be.a('string')
    })
  })

  describe('Queries', () => {
    it('Should have all the queries', () => {
      expect(mock.Query.getStudentByUsername).to.exist
      expect(mock.Query.getStudents).to.exist
      expect(mock.Query.getSchoolByLocation).to.exist
      expect(mock.Query.getSchools).to.exist
      expect(mock.Query.getLocations).to.exist
      expect(mock.Query.search).to.exist
      expect(mock.Query.search.some(member => member.__typename === 'Student')).to.be.true
      expect(mock.Query.search.some(member => member.__typename === 'School')).to.be.true
      expect(mock.Query.search.some(member => member.__typename === 'Location')).to.be.true
    })
  })

  describe('Mutations', () => {
    it('Should have all the mutations', () => {
      expect(mock.Mutation.createStudent).to.exist
      expect(mock.Mutation.createStudents).to.exist
      expect(mock.Mutation.createSchool).to.exist
      expect(mock.Mutation.createLocation).to.exist
    })
  })
})
