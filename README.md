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