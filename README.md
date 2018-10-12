This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Getting Started](#getting-started)

## Getting Started

- Install Node
- Install Yarn
- Run `yarn` command
- Run `yarn start` to run the project

## MongoDB Schemas:

### Links:
* [Link](https://mongoosejs.com/docs/schematypes.html#strings) to Schema docs. <br>
* [Example](https://thinkster.io/tutorials/node-json-api/creating-the-user-model) of creating a Model <br>
* [Most Helpful Data](https://www.youtube.com/watch?v=dQw4w9WgXcQ) I found <br>
* Left a Lot of Comments in `src/data/models/answer.js`

### Types:

Type | Description |
--- | --- |
String | self-explanatory
Number | self-explanatory
Date | not hooked into mongoose change, if you change it with a method you must tell mongoose about the change manually
Buffer |  idk to be honest
Boolean | plain JavaScript booleans
Mixed | harder to maintain, but can have multiple things
ObjectId | idk
Array | holds arrays of SchemaTypes or arrays of subdocuments
Decimal128 | 128-bit decimal floating points
Map | keys must be strings

### Generic Schema Example:
```javascript
// this would be held in models/*.js
// * is is upper camelcase

var mongoose *Schema = require('mongoose')

var *Schema = new mongoose.Schema({
    varname1: Type,
    varname2: Type,
    //...
})

mongoose.model('*', *Schema);
```

To register the model with the application, put `require('./models/*);` above the required `app.use(require('./routes'));` in the file **app.js**.

### Schema Methods

Can have methods, getters, and setters