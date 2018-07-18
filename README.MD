# Easy GQL Mock 

Easy GraphQL mock is a node library used to create mocks of the schema. It will create
mocks of all the types that are on the GraphQL Schema, nested types are supported.

## Installation
```bash
$ npm install easygqlmock --save
```

## Usage
To get started with the mocks, you might need to follow the next steps:

### Basic
```js
const fs = require('fs')
const path = require('path')
const easygqlmock = require('easygqlmock')
// Read the `graphql` file with the schema
const schemaCode = fs.readFileSync(path.join(__dirname, 'schema', 'schema.gql'), 'utf8')

const mock = easygqlmock(schemaCode)

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
const easygqlmock = require('easygqlmock')
// Read the `graphql` file with the schema
const schemaCode = fs.readFileSync(path.join(__dirname, 'schema', 'schema.gql'), 'utf8')

const mock = easygqlmock(schemaCode, {
  Me: {
    email: 'test@test.com'
  }
})

// All the types that are on the file are going to be created with a mock
console.log(mock.Me)
console.log(mock.Me.email) // 'test@test.com'
```

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