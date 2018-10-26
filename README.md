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

## MongoDB
- First, install mongo from https://www.mongodb.com, (I just downloaded the community version)

* Make sure the mongo PATH is added to your environment variables so you can access mongo from your command line
    - test that it is working by running `mongo -nodb` in the terminal, you should enter the mongo shell
    

- Run `yarn add mongoose --save`
- Run `yarn add mongodb --save`

- Next run `mongod`
    - You should see a message `waiting for connections on port 27017`

- Finally, open another terminal and run the command `mongo`, this will open up a shell to manually do operations on our databases


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

module.exports = *Schema;
```

To register the model with the application, put `require('./models/*);` above the required `app.use(require('./routes'));` in the file **app.js**.

### Schema Methods

Can have methods, getters, and setters

### Bcrypt
Allows for password hashing!
simply run `yarn add bcrypt`

### Adding a user with Postman
If you want to add yourself or some other user, go into Postman and make a post request, go to body and click the 'raw' tab, then select json text. A user takes the form of this json object:

{
    "firstName": "Dwight",
    "lastName": "Shrute",
    "email": "email@email.com",
    "username": "blahblah",
    "password": "super_secret_pswd"
}

Make sure you have a mongodb open and you are running yarn start-api

---------------------------------------------------

Want to see if your user got added to the database?

Open a new shell and run the following commands:
    `mongo`
    `use group10`
    `db.users.find().pretty()`

I am using the email address to determine whether or not the account is added to the database. If the email already exists in mongo then it is not added. You can also test this with Postman.

