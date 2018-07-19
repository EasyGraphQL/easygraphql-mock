<h1 align="center">
  <img src="https://cdn.rawgit.com/EasyGraphQL/easygraphql-mock/baab331c/EasyGraphQL.png" alt="EasyGraphQL Mock " width="350">
  <br>
  EasyGraphQL Mock 
  <br>
  <br>
</h1>

Easy GraphQL mock is a node library used to create mocks of the schema. It will create
mocks of all the types that are on the GraphQL Schema, nested types are supported.

## Installation
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
  Me: {
    email: 'test@test.com'
  }
})

// All the types that are on the file are going to be created with a mock
console.log(mock.Me)
console.log(mock.Me.email) // 'test@test.com'
```

## Result

If the `gql` schema has:
```graphql
type Me {
  id: ID!
  email: String
  username: [String]!
  fullName: String!
  result: Float
  phone: [Int]!
  apiKey: String!
  friends: [User]!
  verified: Boolean!
}

type User {
  email: String!
  username: String!
  fullName: String!
  phone: String!
}
```

Run `mocker`
```js
const mock = mocker(schemaCode, {
  Me: {
    id: '123',
    fullName: 'Hello World!',
    username: ['estrada9166'],
    result: 10
  }
})
console.log(mock.Me)
```

And something like this will be the result
```js
{ id: '123',
  email: null,
  username: [ 'estrada9166' ],
  fullName: 'Hello World!',
  result: 10,
  phone:
   [ 7534724385,
     9263352762,
     1681394931 ],
  apiKey: 'bHjVBtthqJNiD',
  friends:
   [ { email: 'ADXYwQl@TbOD.com',
       username: 'WvshkLncWMeWuqmDIJ',
       fullName: 'PLmtYCCuiiYTs',
       phone: '(614)-054-5551' },
     { email: 'mBDCzWB@DDRN.com',
       username: 'JnUbiaddMmcC',
       fullName: 'IfXumMC',
       phone: '(535)-528-2819' },
     { email: 'uKzyenG@ZegA.com',
       username: 'vOkoEWyTRnSFWB',
       fullName: 'MVoBlKaqqgbgXNMijBLay',
       phone: '(472)-781-0329' },
     { email: 'haXXGeT@vIVR.com',
       username: 'BuruVBagIgPnINNxCM',
       fullName: 'aNFEWbDNEApYGId',
       phone: '(467)-394-9571' } ],
  verified: false 
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