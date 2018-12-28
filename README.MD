<h1 align="center">
  <img src="https://raw.githubusercontent.com/EasyGraphQL/easygraphql-now/master/logo.png" alt="EasyGraphQL Mock " width="350">
  <br>
    easygraphql-mock
  <br>
  <br>
</h1>

[![Coverage Status](https://coveralls.io/repos/github/EasyGraphQL/easygraphql-mock/badge.svg?branch=master)](https://coveralls.io/github/EasyGraphQL/easygraphql-mock?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/EasyGraphQL/easygraphql-mock.svg)](https://greenkeeper.io/)

`easygraphql-mock` is a node library used to create mocks of a schema. 
It will create mocks of all the types that are on the GraphQL Schema, including the nested types.

## Installation

To install the package on your project just run on the root of your project
```shell
$ npm install easygraphql-mock --save
```

## How to use it?

+ Import [`easygraphql-mock`](https://github.com/EasyGraphQL/easygraphql-mock) package.
+ Read the schema.
+ Initialize the mock, and pass the schema as the first argument.
  + If there are multiples schemas pass an array with the schemas an argument.
  + **Note**: In order to use multiples schema files, the queries and mutations must be extended.
+ The second argument is optional and it is going to be your custom schema, in case you want to pass it.

*In case you have a custom scalar, set it on the second argument, if it's not set it will be {}*

### One schema file
```js
'use strict' 

const easygraphqlMock = require('easygraphql-mock')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')

const mockedSchema = easygraphqlMock(userSchema)
```

### Multiples schemas files
```js
'use strict' 

const easygraphqlMock = require('easygraphql-mock')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

const mockedSchema = easygraphqlMock([userSchema, familySchema])
```

### Custom schema
You can set some values to the fields that you want on the schema. To do that, you might pass an object as a second argument. 
It must have the same name of the type and the field that you want to set.

```js
'use strict' 

const easygraphqlMock = require('easygraphql-mock')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

const mockedSchema = easygraphqlMock([userSchema, familySchema], {
  CustomScalarDate: '2018-10-10',
  Family: {
    name: 'Super test 1',
    ages: [10],
    familyRelation: 'Mother',
    familyRelationArr: ['Mother', 'Brother']
  }
})
```

### Result
Here is the result of `mockedSchema.Family`

```js
{ 
  name: 'Super test 1',
  ages: [ 10 ],
  createdAt: '2018-10-10',
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
        username: 'tNfwN',
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