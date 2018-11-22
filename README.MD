<h1 align="center">
  <img src="https://raw.githubusercontent.com/EasyGraphQL/easygraphql-now/master/logo.png" alt="EasyGraphQL Mock " width="350">
  <br>
    easygraphql-mock
  <br>
  <br>
</h1>

Easy GraphQL mock is a node library used to create mocks of the schema. It will create
mocks of all the types that are on the GraphQL Schema, nested types are supported.

## Installation

[![Greenkeeper badge](https://badges.greenkeeper.io/EasyGraphQL/easygraphql-mock.svg)](https://greenkeeper.io/)

```bash
$ npm install easygraphql-mock --save
```

## Usage
To get started with the mocks, you might need to follow the next steps:

### Basic
```js
const fs = require('fs')
const path = require('path')
const mocker = require('easygraphql-mock')
// Read the `graphql` file with the schema
const schemaCode = fs.readFileSync(path.join(__dirname, 'schema', 'schema.gql'), 'utf8')

const mock = mocker(schemaCode)

// All the types that are on the file are going to be created with a mock
console.log(mock.Me)
```

### With definitions
You can set some values to the fields that you want on the schema. To do that, you might pass
an object to `easygqlmock` as a second argument. It should have the name of the type and the
field that you want to set.

```js
const fs = require('fs')
const path = require('path')
const mocker = require('easygraphql-mock')
// Read the `graphql` file with the schema
const schemaCode = fs.readFileSync(path.join(__dirname, 'schema', 'schema.gql'), 'utf8')

const mock = mocker(schemaCode, {
  Family: {
    name: 'Super test 1',
    ages: [10],
    familyRelation: 'Mother',
    familyRelationArr: ['Mother', 'Brother']
  }
})

// All the types that are on the file are going to be created with a mock
console.log(mock.Family)
console.log(mock.Family.name) // 'Super test 1'
```

## Use multiple Schema files
You can pass multiple schema files, just be shure that you extend the queries and mutations and 
when you're creating the mock pass an array with the files:


```js
const fs = require('fs')
const path = require('path')
const mocker = require('easygraphql-mock')
// Read the `graphql` file with the schema
const studentSchema = fs.readFileSync(path.join(__dirname, 'schema', 'student.gql'), 'utf8')
const schoolSchema = fs.readFileSync(path.join(__dirname, 'schema', 'school.gql'), 'utf8')

const mock = mocker([studentSchema, schoolSchema])

// All the types that are on the file are going to be created with a mock
console.log(mock.Student)
console.log(mock.School) 
```

## Result

If the `gql` schema has:
```graphql
enum FamilyRelation {
  Father
  Mother
  Brother
}

type Family {
  name: String!
  ages: [Int]!
  user: User!
  familyRelation: FamilyRelation!
  familyRelationArr: [FamilyRelation]!
}

type User {
  email: String!
  username: String!
  fullName: String!
  phone: String!
  family: Family!
}
```

Run `mocker`
```js
const mock = mocker(schemaCode, {
  Family: {
    name: 'Super test 1',
    ages: [10],
    familyRelation: 'Mother',
    familyRelationArr: ['Mother', 'Brother']
  }
})
console.log(mock.Family)
```

And something like this will be the result for `mock.Family`
```js
{ 
  name: 'Super test 1',
  ages: [ 10 ],
  user: { 
    email: 'ulalilid@herem.gl',
    username: 'tNfwN',
    fullName: 'Nathan Lewis',
    phone: '(231) 616-1744',
    family: { 
      name: 'Super test 1',
      ages: [ 10 ],
      user: { 
        email: 'ulalilid@herem.gl',
        username: tNfwN',
        fullName: 'Nathan Lewis',
        phone: '(231) 616-1744',
        family: '...'
      },
      familyRelation: 'Mother',
      familyRelationArr: [ 'Mother', 'Brother' ] 
    }
  },
  familyRelation: 'Mother',
  familyRelationArr: [ 'Mother', 'Brother' ] 
}
```

## Demo
Here is a [Demo](https://github.com/EasyGraphQL/easygraphql-mock-demo) that can be useful!

# License
### The MIT License

Copyright (c) 2018 EasyGraphQL

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.